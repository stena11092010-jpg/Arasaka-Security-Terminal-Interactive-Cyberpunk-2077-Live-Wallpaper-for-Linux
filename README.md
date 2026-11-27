## How to install. This tutorial made primary for KDE Plasma!

### 1. Install Dependencies
* **Fedora:**
  ```bash
  sudo dnf install python3 python3-psutil playerctl chromium wmctrl
  ```
* **Debian/Ubuntu:**
  ```bash
  sudo apt update && sudo apt install -y python3 python3-psutil playerctl chromium wmctrl
  ```
* **Arch:**
  ```bash
  sudo pacman -Syu python python-psutil playerctl chromium wmctrl
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
   4. Press Ctrl + O
      Enter
      Ctrl + X
### 4. Set wallpaper in settings
  1) RMB on desktop >> "Desktop and wallpaper"
  2) Then use this settings: <img width="810" height="660" alt="image" src="https://github.com/user-attachments/assets/42ea9c6f-0358-42f9-a68c-05ded9249e93" />
  3) Reboot
### 5. Done!
  <img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/5968c595-0ff1-4c5d-a223-45c73196a755" />
