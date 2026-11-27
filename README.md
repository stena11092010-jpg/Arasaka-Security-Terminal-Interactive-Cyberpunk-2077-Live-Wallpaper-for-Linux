## How to install. This tutorial made primary for KDE Plasma!

### 1. Install Dependencies
* **Fedora:**
  ```bash
  sudo dnf install python3 python3-psutil playerctl qt5-qtwebengine
  ```
* **Debian/Ubuntu:**
  ```bash
  sudo apt update && sudo apt install -y python3 python3-psutil playerctl libqt5webengine5
  ```
* **Arch:**
  ```bash
  sudo pacman -Syu python python-psutil playerctl
  ```
  qt5 webengine was deleted from arch repos in 2025, so you need to install it from AUR (for example with yay)
  ```bash
  yay -S qt5-webengine
  ```
### 2. Install "HTML Wallpaper" plugin for KDE Plasma(or use analog for your DE)
  <img width="937" height="261" alt="image" src="https://github.com/user-attachments/assets/b79ee22e-85a0-45ce-b987-a00c810a9473" />


### 3. Add script to AutoStart
1. Make the script executable:
   ```bash
   chmod +x /path/to/linux-helper.py
   ```
2. Create a systemd service file:
   ```bash
   sudo nano /etc/systemd/system/arasaka-helper.service
   ```
3. Paste the following configuration:
   ```ini
   [Unit]
   Description=My Python Script
   After=network.target

   [Service]
   Type=simple
   User=<username>
   WorkingDirectory=/path/to/<folder with linux-helper.py>
   ExecStart=/usr/bin/python3 /path/to/<folder with linux-helper.py>/linux-helper.py
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```
   4. Press "Ctrl + O"
      "Enter"
      "Ctrl + X"
### 4. Set wallpaper in settings
  1) RMB on desktop >> "Desktop and wallpaper"
  2) Then use this settings: <img width="810" height="660" alt="image" src="https://github.com/user-attachments/assets/42ea9c6f-0358-42f9-a68c-05ded9249e93" />
  3) Reboot
### 5. Done!
  <img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/f7ba1018-c4c4-4215-927b-15dcdd9f0664" />

## P.S.
If you wanna use it on other DE, you can just add script to autostart and install address 127.0.0.1:5511 as a wallpaper .
