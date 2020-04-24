https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/
https://www.axllent.org/docs/view/nodejs-service-with-systemd/

```
sudo cp * /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/*.service
sudo systemctl daemon-reload
sudo systemctl enable doorSensor.service
sudo systemctl start doorSensor.service
sudo systemctl status doorSensor.service

sudo systemctl enable server.service
sudo systemctl start server.service
sudo systemctl status server.service
```
