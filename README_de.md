## So installieren Sie das Programm. Diese Anleitung wurde in erster Linie für KDE Plasma erstellt!

### 1. Abhängigkeiten installieren
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
  qt5-webengine wurde 2025 aus den Arch-Repositories entfernt, daher müssen Sie es über AUR installieren (z. B. mit yay)
  ```bash
  yay -S qt5-webengine
  ```
### 2. Installieren Sie das Plugin „HTML Wallpaper“ für KDE Plasma (oder verwenden Sie ein entsprechendes Plugin für Ihre Desktop-Umgebung)
  <img width="937" height="261" alt="Bild" src="https://github.com/user-attachments/assets/b79ee22e-85a0-45ce-b987-a00c810a9473" />


### 3. Skript zum Autostart hinzufügen
1. Machen Sie das Skript ausführbar:
   ```bash
   chmod +x /Pfad/zu/linux-helper.py
   ```
2. Erstellen Sie eine systemd-Dienstdatei:
   ```bash
   sudo nano /etc/systemd/system/arasaka-helper.service
   ```
3. Fügen Sie die folgende Konfiguration ein:
   ```ini
   [Unit]
   Description=Mein Python-Skript
   After=network.target

   [Service]
   Type=simple
   User=<Benutzername>
   WorkingDirectory=/Pfad/zu/<Ordner mit linux-helper.py>
   ExecStart=/usr/bin/python3 /Pfad/zu/<Ordner mit linux-helper.py>/linux-helper.py
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```
   4. Drücken Sie „Strg + O“
      „Enter“
      „Strg + X“
### 4. Hintergrundbild in den Einstellungen festlegen
  1) Rechtsklick auf den Desktop >> „Desktop und Hintergrundbild“
  2) Verwenden Sie dann diese Einstellungen: <img width="810" height="660" alt="Bild" src="https://github.com/user-attachments/assets/42ea9c6f-0358-42f9-a68c-05ded9249e93" />
  3) Neustart
### 5. Fertig!
  <img width="1600" height="900" alt="Bild" src="https://github.com/user-attachments/assets/f7ba1018-c4c4-4215-927b-15dcdd9f0664" />

## P.S.
Wenn du es auf einer anderen grafischen Umgebung nutzen möchtest, kannst du das Skript einfach zum Autostart hinzufügen und die Adresse 127.0.0.1:5511 als Hintergrundbild festlegen.
