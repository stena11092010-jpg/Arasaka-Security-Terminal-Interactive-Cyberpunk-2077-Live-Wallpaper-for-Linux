## Cómo instalarlo. ¡Este tutorial está pensado principalmente para KDE Plasma!

### 1. Instalar las dependencias
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
  qt5-webengine se eliminó de los repositorios de Arch en 2025, por lo que debes instalarlo desde AUR (por ejemplo, con yay)
  ```bash
  yay -S qt5-webengine
  ```
### 2. Instala el complemento «HTML Wallpaper» para KDE Plasma (o utiliza uno similar para tu entorno de escritorio)
  <img width="937" height="261" alt="imagen" src="https://github.com/user-attachments/assets/b79ee22e-85a0-45ce-b987-a00c810a9473" />


### 3. Añade el script al inicio automático
1. Haz que el script sea ejecutable:
   ```bash
   chmod +x /ruta/a/linux-helper.py
   ```
2. Crea un archivo de servicio de systemd:
   ```bash
   sudo nano /etc/systemd/system/arasaka-helper.service
   ```
3. Pega la siguiente configuración:
   ```ini
   [Unit]
   Description=Mi script de Python
   After=network.target

   [Service]
   Type=simple
   User=<nombre de usuario>
   WorkingDirectory=/ruta/a/<carpeta con linux-helper.py>
   ExecStart=/usr/bin/python3 /ruta/a/<carpeta con linux-helper.py>/linux-helper.py
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```
   4. Pulsa «Ctrl + O»
      «Intro»
      «Ctrl + X»
### 4. Configura el fondo de pantalla en los ajustes
  1) Haz clic con el botón derecho del ratón en el escritorio >> «Escritorio y fondo de pantalla»
  2) A continuación, utiliza esta configuración: <img width="810" height="660" alt="imagen" src="https://github.com/user-attachments/assets/42ea9c6f-0358-42f9-a68c-05ded9249e93" />
  3) Reinicia
### 5. ¡Listo!
  <img width="1600" height="900" alt="imagen" src="https://github.com/user-attachments/assets/f7ba1018-c4c4-4215-927b-15dcdd9f0664" />

## P.D.
Si quieres utilizarlo en otro entorno de escritorio, solo tienes que añadir el script al inicio automático e instalar la dirección 127.0.0.1:5511 como fondo de pantalla.

Traducción realizada con la versión gratuita del traductor DeepL.com
