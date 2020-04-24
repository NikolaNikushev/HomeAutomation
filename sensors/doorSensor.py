import RPi.GPIO as GPIO
import time
import sys
import signal

import json
import urllib2
import requests

# Set Broadcom mode so we can address GPIO pins by number.
GPIO.setmode(GPIO.BCM)
# This is the GPIO pin number we have one of the door sensor
# wires attached to, the other should be attached to a ground pin.
DOOR_SENSOR_PIN = 18
# These are the GPIO pin numbers we have the lights attached to

# Initially we don't know if the door sensor is open or closed...
isOpen = None
oldIsOpen = None
timerStarted = False
timeStarted = None
notifications = []
# Clean up when the user exits with keyboard interrupt
def cleanupLights(signal, frame):
     GPIO.cleanup()
     sys.exit(0)
# Set up the door sensor pin.
GPIO.setup(DOOR_SENSOR_PIN, GPIO.IN, pull_up_down = GPIO.PUD_UP)
# Set the cleanup handler for when user hits Ctrl-C to exit
signal.signal(signal.SIGINT, cleanupLights)

while True:
     oldIsOpen = isOpen
     isOpen = GPIO.input(DOOR_SENSOR_PIN)
     handleTimerStarted()
     if (isOpen and (isOpen != oldIsOpen)):
          print "Door is Open!"
          startTimer()
     elif (isOpen != oldIsOpen):
          print "Door is Closed!"
          cleanup()
     time.sleep(0.1)

def sendNotification(data):
     print "Sending notification"
     req = urllib2.Request('http://192.168.8.140:8000/notification')
     req.add_header('Content-Type', 'application/json')
     response = urllib2.urlopen(req, json.dumps(data))
     return response

def cleanup():
     timerStarted = False
     timeStarted = 0
     if len(notifications) <= 0:
          return
     for x in notifications:
          response = requests.delete('http://192.168.8.140:8000/notification/' + x)
          print response
     print "Cleanup finished"
     data = {
                "title": "Door is closed",
                "body":"SAFE!",
                "data": {
                    "deviceName": "DoorSensor 1",
                    "didWhat": "Door was closed"
                }
            }
     response = sendNotification(data)
     notifications = []
def startTimer():
    timerStarted = True
    timeStarted = time.time()
def handleTimerStarted():
    if(timerStarted == False or len(notifications) > 0):
        return
    if(time.time() > startTimer + 5):
       data = {
                 "title": "Door is opened",
                 "body":"Alert, front door",
                 "data": {
                      "deviceName": "DoorSensor 1",
                      "didWhat": "Door was opened",
                      "type":"danger"
                 }
            }
       response = sendNotification(data)
       notifications = json.load(response)
       print notifications
