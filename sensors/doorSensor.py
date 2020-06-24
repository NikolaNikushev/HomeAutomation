import RPi.GPIO as GPIO
import time
import sys
import signal
import socket

import json
import urllib2
import requests
from retrying import retry

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

def retry_if_io_error(exception):
    #Return True if we should retry (in this case when it's an IOError), False otherwise
    return isinstance(exception, IOError)

## getting the IP address using socket.gethostbyname() method
hostname = socket.gethostname()
serverIp = socket.gethostbyname(hostname)
serverAddress = 'http://' + serverIp + ':8000'
print ("Contacting to " + serverAddress)
@retry(wait_fixed=10000, retry_on_exception=retry_if_io_error)
def register():
    print "Registering device."
    data = {
               "name": "Front Door Sensor",
               "room":{"name":"Lobby"},
           }
    req = urllib2.Request(serverAddress + '/device')
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req, json.dumps(data))
    print "Registered"
    loaded = json.load(response)
    return  loaded
def reportStatus():
    data = {
               "name": "Front Door Sensor",
               "room":{"name":"Lobby"},
               "status": "active"
           }
    req = urllib2.Request(serverAddress + '/device/update')
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req, json.dumps(data))
    loaded = json.load(response)
    print "Pinged status",  loaded.get('status')
    return  loaded
def sendNotification(data):
    print "Sending notification"
    req = urllib2.Request(serverAddress + '/notification')
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req, json.dumps(data))
    return json.load(response)

def cleanup():
    global timerStarted
    global timeStarted
    global notifications
    timerStarted = False
    timeStarted = 0
    if len(notifications) <= 0:
         return
    for notification in notifications:
         response = requests.delete(serverAddress + '/notification/' + notification)
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
    global timerStarted
    global timeStarted
    timerStarted = True
    timeStarted = time.time()

def handleTimerStarted():
    global timerStarted
    global notifications
    global startTimer
    minimumSeconds = 30
    if(timerStarted == False or len(notifications) > 0):
        return
    if(time.time() > timeStarted + minimumSeconds):
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
       notifications = notifications + response
       print notifications

def run():
    register()
    reportStatus()
    global isOpen
    global oldIsOpen
    global DOOR_SENSOR_PIN
    lastStatusReport = time.time()
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
         now = time.time()
         if(now > lastStatusReport + 30 ):  # every 30 seconds + 0.1 miliseconds wait per loop
              reportStatus()
              lastStatusReport = now
         time.sleep(0.1)
run()
