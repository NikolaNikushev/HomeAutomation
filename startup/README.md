https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/


```
sudo cp * /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/*.service
sudo systemctl daemon-reload
sudo systemctl enable sample.service
```
