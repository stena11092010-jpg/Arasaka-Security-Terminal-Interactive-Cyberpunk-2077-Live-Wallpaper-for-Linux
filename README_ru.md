## Как установить. Это руководство предназначено в первую очередь для KDE Plasma!

### 1. Установка зависимостей
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
  qt5-webengine был удалён из репозиториев Arch в 2025 году, поэтому его нужно установить из AUR (например, с помощью yay)
  ```bash
  yay -S qt5-webengine
  ```
### 2. Установите плагин «HTML Wallpaper» для KDE Plasma (или используйте аналог для вашего рабочего окружения)
  <img width="937" height="261" alt="image" src="https://github.com/user-attachments/assets/b79ee22e-85a0-45ce-b987-a00c810a9473" />


### 3. Добавьте скрипт в автозапуск
1. Сделайте скрипт исполняемым:
   ```bash
   chmod +x /path/to/linux-helper.py
   ```
2. Создайте файл службы systemd:
   ```bash
   sudo nano /etc/systemd/system/arasaka-helper.service
   ```
3. Вставьте следующую конфигурацию:
   ```ini
   [Unit]
   Description=Мой скрипт на Python
   After=network.target

   [Service]
   Type=simple
   User=<имя пользователя>
   WorkingDirectory=/путь/к/<папка с linux-helper.py>
   ExecStart=/usr/bin/python3 /путь/к/<папка с linux-helper.py>/linux-helper.py
   Restart=always
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```
   4. Нажмите «Ctrl + O»
      «Enter»
      «Ctrl + X»
### 4. Установите обои в настройках
  1) Щелкните правой кнопкой мыши по рабочему столу >> «Рабочий стол и обои»
  2) Затем используйте следующие настройки: <img width="810" height="660" alt="image" src="https://github.com/user-attachments/assets/42ea9c6f-0358-42f9-a68c-05ded9249e93" />
  3) Перезагрузите систему
### 5. Готово!
  <img width="1600" height="900" alt="изображение" src="https://github.com/user-attachments/assets/f7ba1018-c4c4-4215-927b-15dcdd9f0664" />

## P.S.
Если вы хотите использовать это в другом окружении рабочего стола, просто добавьте скрипт в автозапуск и установите адресс 127.0.0.1:5511 в качестве обоев.
