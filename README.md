# NodeJs-Raspberry-Pi

## LTS NodeJS Install:

```sh
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
node -v
```

## Git Install:
```sh
sudo apt install git
git -v
```

## Start web server (port 8181)
```sh
git clone https://github.com/kele6ra/rpi_nodejs_led
cd rpi_nodejs_led
sudo node index.mjs
```