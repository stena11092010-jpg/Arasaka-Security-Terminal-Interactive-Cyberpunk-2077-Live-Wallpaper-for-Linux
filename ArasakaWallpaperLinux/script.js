(() => {
  "use strict";
  /* ===== НАСТРОЙКИ: поменяйте город и часовые пояса под себя ===== */
  const CFG = {
    lang: "auto", /* "auto" | "ru" | "en" */
    city: "БИРОБИДЖАН", lat: 48.79, lon: 132.92,
    zones: [["ТОКИО", "Asia/Tokyo"], ["МОСКВА", "Europe/Moscow"], ["ЛОС-АНДЖЕЛЕС", "America/Los_Angeles"]],
  };
  /* ---- настройки пользователя (меню) ---- */
  const DEF = { lang: "auto", hue: 356, temp: "c", wind: "ms", h12: "0", sun: "0", lines: "1", scan: "1", boot: "1", city: null,
    zones: CFG.zones.map((z) => z[1]), w: { weather: 1, load: 1, player: 1, calendar: 1, net: 1, log: 1, world: 1, logo: 1 } };
  let CS = JSON.parse(JSON.stringify(DEF));
  try { const sv = JSON.parse(localStorage.getItem("arasakaCfg") || "{}"); Object.assign(CS, sv); CS.w = Object.assign({}, DEF.w, sv.w || {}); } catch (e) {}
  const saveCS = () => { try { localStorage.setItem("arasakaCfg", JSON.stringify(CS)); } catch (e) {} };
  const hsl = (s, l, a = 1) => "hsla(" + CS.hue + "," + s + "%," + l + "%," + a + ")";

  /* ---- язык / language: ru, en, es, de (чтобы добавить язык: новый объект в TR и в LANGS) ---- */
  const TR = {
 "en": {
  "ARASAKA // Терминал": "ARASAKA // Terminal",
  "ТЕРМИНАЛ БЕЗОПАСНОСТИ": "SECURITY TERMINAL",
  "ПОГОДА": "WEATHER",
  "ЗАГРУЗКА...": "LOADING...",
  "ВЕТЕР": "WIND",
  "ВЛАЖНОСТЬ": "HUMIDITY",
  "3 ДНЯ": "3 DAYS",
  "ПО ЧАСАМ": "HOURLY",
  "НАГРУЗКА ПК": "PC LOAD",
  "ЦП": "CPU",
  "ГП": "GPU",
  "ОЗУ": "RAM",
  "График за последнюю минуту. Клик по строке выше выбирает ЦП, ГП или ОЗУ": "Last-minute graph. Click a row above to pick CPU, GPU or RAM",
  "Данные ПК доступны при запуске в Lively Wallpaper": "PC data is available when running in Lively Wallpaper",
  "ПЛЕЕР": "PLAYER",
  "Клик: история треков": "Click: track history",
  "НИЧЕГО НЕ ИГРАЕТ": "NOTHING PLAYING",
  "Клик: перемотка": "Click to seek",
  "Предыдущий": "Previous",
  "Пауза / играть": "Pause / play",
  "Следующий": "Next",
  "БАС": "BASS",
  "СРЕДНИЕ": "MIDS",
  "ВЕРХА": "HIGHS",
  "Эквалайзер и обложка работают в Lively. Шкала и кнопки: запустите media-helper.bat": "Equalizer and cover art work in Lively. Seek bar and buttons: run media-helper.bat",
  "Клик: повторный вход": "Click: replay login",
  "КАЛЕНДАРЬ": "CALENDAR",
  "Прошлый месяц": "Previous month",
  "Сбросить на сегодня": "Reset to today",
  "СЕГОДНЯ": "TODAY",
  "Следующий месяц": "Next month",
  "ИНТЕРНЕТ": "INTERNET",
  "ДОСТУП": "ACCESS",
  "ПИНГ": "PING",
  "СРЕДНИЙ / ДЖИТТЕР": "AVG / JITTER",
  "СКОРОСТЬ ↓": "SPEED ↓",
  "СКОРОСТЬ ↑": "SPEED ↑",
  "КАНАЛ (ОЦЕНКА)": "LINK (EST.)",
  "Пинг за последние минуты": "Ping over the last minutes",
  "ТЕСТ СКОРОСТИ": "SPEED TEST",
  "НЕ ЗАПУСКАЛСЯ": "NOT RUN YET",
  "ЖУРНАЛ СОБЫТИЙ": "EVENT LOG",
  "ВСЕ": "ALL",
  "ВАЖНЫЕ": "IMPORTANT",
  "ОЧИСТИТЬ": "CLEAR",
  "ТОЛЬКО ДЛЯ УПОЛНОМОЧЕННОГО ПЕРСОНАЛА": "AUTHORIZED PERSONNEL ONLY",
  "Приложения, окна, питание": "Apps, windows, power",
  "ПРИЛОЖЕНИЯ": "APPLICATIONS",
  "Вернуть окна на место": "Put windows back",
  "СБРОС ОКОН": "RESET WINDOWS",
  "Поиск...": "Search...",
  "ЗАКРЫТЬ ✕": "CLOSE ✕",
  "БЛОКИРОВКА": "LOCK",
  "ВЫХОД": "LOG OUT",
  "ПЕРЕЗАГРУЗКА": "RESTART",
  "ВЫКЛЮЧЕНИЕ": "SHUT DOWN",
  "ДОСТУП РАЗРЕШЁН": "ACCESS GRANTED",
  "БИРОБИДЖАН": "BIROBIDZHAN",
  "ВЛАДИВОСТОК": "VLADIVOSTOK",
  "ТОКИО": "TOKYO",
  "МОСКВА": "MOSCOW",
  "ЛОС-АНДЖЕЛЕС": "LOS ANGELES",
  "ПН": "MON",
  "ВТ": "TUE",
  "СР": "WED",
  "ЧТ": "THU",
  "ПТ": "FRI",
  "СБ": "SAT",
  "ВС": "SUN",
  "ДО ": "UNTIL ",
  " ДН.": " DAYS",
  ": ПРОШЛО ": ": PASSED ",
  "ЯСНО": "CLEAR",
  "МАЛООБЛАЧНО": "PARTLY CLOUDY",
  "ПАСМУРНО": "OVERCAST",
  "ТУМАН": "FOG",
  "МОРОСЬ": "DRIZZLE",
  "ДОЖДЬ": "RAIN",
  "СНЕГ": "SNOW",
  "ЛИВЕНЬ": "SHOWERS",
  "СНЕГОПАД": "SNOW SHOWERS",
  "ГРОЗА": "THUNDERSTORM",
  "ОЩУЩАЕТСЯ ": "FEELS LIKE ",
  " М/С": " M/S",
  "НЕТ ДАННЫХ": "NO DATA",
  "ПОГОДА: ОШИБКА ЗАПРОСА": "WEATHER: REQUEST FAILED",
  " МБИТ/С": " MBIT/S",
  "ИСТОРИЯ ПУСТА": "HISTORY EMPTY",
  "ПЛЕЕР: ВОСПРОИЗВЕДЕНИЕ ОСТАНОВЛЕНО": "PLAYER: PLAYBACK STOPPED",
  "БЕЗ НАЗВАНИЯ": "UNTITLED",
  "ИГРАЕТ: ": "PLAYING: ",
  "ПЛЕЕР: ПОМОЩНИК ПОДКЛЮЧЁН": "PLAYER: HELPER CONNECTED",
  "ПЛЕЕР: ПОМОЩНИК НЕДОСТУПЕН": "PLAYER: HELPER UNAVAILABLE",
  "Назад на 10 с": "Back 10 s",
  "Вперёд на 10 с": "Forward 10 s",
  "ПЛЕЕР: ЗАПУСТИТЕ media-helper.bat": "PLAYER: START media-helper.bat",
  "ЗАРЯД НИЖЕ 20%": "BATTERY BELOW 20%",
  "ПИТАНИЕ: ОТ СЕТИ": "POWER: AC",
  "ПИТАНИЕ: ОТ БАТАРЕИ": "POWER: BATTERY",
  "СЕТЬ: ": "NETWORK: ",
  "В СЕТИ": "ONLINE",
  "НЕТ СОЕДИНЕНИЯ": "NO CONNECTION",
  "   ЗАРЯД: ": "   BATTERY: ",
  " (ЗАРЯДКА)": " (CHARGING)",
  "ARASAKA OS 4.2 // ЗАГРУЗКА ЯДРА": "ARASAKA OS 4.2 // KERNEL LOAD",
  "ПРОВЕРКА ПРОПУСКА ............ OK": "VERIFYING BADGE ............... OK",
  "МОНТИРОВАНИЕ ЗАЩИЩЁННОГО ТОМА .. OK": "MOUNTING SECURE VOLUME ........ OK",
  "РУКОПОЖАТИЕ NETWATCH .......... OK": "NETWATCH HANDSHAKE ............ OK",
  "ЗАГРУЗКА ИНТЕРФЕЙСА ........... OK": "LOADING INTERFACE ............. OK",
  "Клик: свернуть. Перетащите, чтобы переместить окно": "Click: collapse. Drag to move the window",
  "НЕТ СЕТИ": "NO NETWORK",
  "ДОСТУП ЕСТЬ": "ONLINE",
  "НЕТ ИНТЕРНЕТА": "NO INTERNET",
  "ИНТЕРНЕТ: ДОСТУП ВОССТАНОВЛЕН": "INTERNET: ACCESS RESTORED",
  "ИНТЕРНЕТ: ДОСТУП ПОТЕРЯН": "INTERNET: ACCESS LOST",
  " МС": " MS",
  " МС / ": " MS / ",
  " МБИТ/С (": " MBIT/S (",
  "ТЕСТ...": "TESTING...",
  "ТЕСТ СКОРОСТИ: ": "SPEED TEST: ",
  "ОШИБКА ТЕСТА": "TEST FAILED",
  "ТЕСТ СКОРОСТИ: ОШИБКА": "SPEED TEST: FAILED",
  "OS: ОБОЛОЧКА АКТИВНА": "OS: SHELL ACTIVE",
  "<small>ОТКРЫТЫЕ ОКНА</small>": "<small>OPEN WINDOWS</small>",
  "ЗАПУСК: ": "LAUNCH: ",
  "ТОЧНО?": "SURE?",
  "СЕАНС ОТКРЫТ": "SESSION OPEN",
  "СЕТЬ: ПОДКЛЮЧЕНО": "NETWORK: CONNECTED",
  "СЕТЬ: СОЕДИНЕНИЕ ПОТЕРЯНО": "NETWORK: CONNECTION LOST",
  "ЭКРАН: СВЁРНУТО": "DISPLAY: MINIMIZED",
  "ЭКРАН: АКТИВЕН": "DISPLAY: ACTIVE",
  "НАСТРОЙКИ": "SETTINGS",
  "Настройки": "Settings",
  "ЯЗЫК": "LANGUAGE",
  "ЦВЕТ": "COLOR",
  "ВИДЖЕТЫ": "WIDGETS",
  "ЕДИНИЦЫ": "UNITS",
  "ТЕМПЕРАТУРА": "TEMPERATURE",
  "ВРЕМЯ": "TIME",
  "НЕДЕЛЯ С": "WEEK STARTS",
  "ГОРОД": "CITY",
  "НАЙТИ": "FIND",
  "Введите город": "Enter a city",
  "ГОРОД НЕ НАЙДЕН": "CITY NOT FOUND",
  "МИРОВЫЕ ЧАСЫ": "WORLD CLOCKS",
  "ЭФФЕКТЫ": "EFFECTS",
  "СКАНЛАЙНЫ": "SCANLINES",
  "БЕГУЩАЯ ЛИНИЯ": "SWEEP LINE",
  "АНИМАЦИЯ ВХОДА": "LOGIN ANIMATION",
  "ВКЛ": "ON",
  "ВЫКЛ": "OFF",
  "СБРОС НАСТРОЕК": "RESET SETTINGS",
  "ЛОГОТИП": "LOGO",
  "КРАСНЫЙ": "RED",
  "ЯНТАРНЫЙ": "AMBER",
  "ЗЕЛЁНЫЙ": "GREEN",
  "ГОЛУБОЙ": "CYAN",
  "СИНИЙ": "BLUE",
  "ФИОЛЕТОВЫЙ": "VIOLET",
  " КМ/Ч": " KM/H"
 },
 "es": {
  "ТЕРМИНАЛ БЕЗОПАСНОСТИ": "TERMINAL DE SEGURIDAD",
  "ПОГОДА": "CLIMA",
  "ЗАГРУЗКА...": "CARGANDO...",
  "ВЕТЕР": "VIENTO",
  "ВЛАЖНОСТЬ": "HUMEDAD",
  "3 ДНЯ": "3 DÍAS",
  "ПО ЧАСАМ": "POR HORAS",
  "НАГРУЗКА ПК": "CARGA DEL PC",
  "График за последнюю минуту. Клик по строке выше выбирает ЦП, ГП или ОЗУ": "Gráfico del último minuto. Pulsa una fila para elegir CPU, GPU o RAM",
  "Данные ПК доступны при запуске в Lively Wallpaper": "Los datos del PC están disponibles en Lively Wallpaper",
  "ПЛЕЕР": "REPRODUCTOR",
  "Клик: история треков": "Clic: historial de pistas",
  "НИЧЕГО НЕ ИГРАЕТ": "NADA SONANDO",
  "Клик: перемотка": "Clic para avanzar",
  "Предыдущий": "Anterior",
  "Пауза / играть": "Pausa / reproducir",
  "Следующий": "Siguiente",
  "БАС": "GRAVES",
  "СРЕДНИЕ": "MEDIOS",
  "ВЕРХА": "AGUDOS",
  "Эквалайзер и обложка работают в Lively. Шкала и кнопки: запустите media-helper.bat": "El ecualizador y la carátula funcionan en Lively. Barra y botones: ejecuta media-helper.bat",
  "Клик: повторный вход": "Clic: repetir inicio",
  "КАЛЕНДАРЬ": "CALENDARIO",
  "Прошлый месяц": "Mes anterior",
  "Сбросить на сегодня": "Volver a hoy",
  "СЕГОДНЯ": "HOY",
  "Следующий месяц": "Mes siguiente",
  "ДОСТУП": "ACCESO",
  "СРЕДНИЙ / ДЖИТТЕР": "PROM. / JITTER",
  "СКОРОСТЬ ↓": "VELOCIDAD ↓",
  "СКОРОСТЬ ↑": "VELOCIDAD ↑",
  "КАНАЛ (ОЦЕНКА)": "ENLACE (EST.)",
  "Пинг за последние минуты": "Ping de los últimos minutos",
  "ТЕСТ СКОРОСТИ": "TEST DE VELOCIDAD",
  "НЕ ЗАПУСКАЛСЯ": "SIN EJECUTAR",
  "ЖУРНАЛ СОБЫТИЙ": "REGISTRO DE EVENTOS",
  "ВСЕ": "TODO",
  "ВАЖНЫЕ": "IMPORTANTE",
  "ОЧИСТИТЬ": "LIMPIAR",
  "ТОЛЬКО ДЛЯ УПОЛНОМОЧЕННОГО ПЕРСОНАЛА": "SOLO PERSONAL AUTORIZADO",
  "Приложения, окна, питание": "Apps, ventanas, energía",
  "ПРИЛОЖЕНИЯ": "APLICACIONES",
  "Вернуть окна на место": "Restablecer ventanas",
  "СБРОС ОКОН": "RESTABLECER VENTANAS",
  "Поиск...": "Buscar...",
  "ЗАКРЫТЬ ✕": "CERRAR ✕",
  "БЛОКИРОВКА": "BLOQUEAR",
  "ВЫХОД": "CERRAR SESIÓN",
  "ПЕРЕЗАГРУЗКА": "REINICIAR",
  "ВЫКЛЮЧЕНИЕ": "APAGAR",
  "ДОСТУП РАЗРЕШЁН": "ACCESO CONCEDIDO",
  "ТОКИО": "TOKIO",
  "МОСКВА": "MOSCÚ",
  "ЛОС-АНДЖЕЛЕС": "LOS ÁNGELES",
  "ПН": "LUN",
  "ВТ": "MAR",
  "СР": "MIÉ",
  "ЧТ": "JUE",
  "ПТ": "VIE",
  "СБ": "SÁB",
  "ВС": "DOM",
  "ДО ": "HASTA ",
  " ДН.": " DÍAS",
  ": ПРОШЛО ": ": HACE ",
  "ЯСНО": "DESPEJADO",
  "МАЛООБЛАЧНО": "POCO NUBOSO",
  "ПАСМУРНО": "NUBLADO",
  "ТУМАН": "NIEBLA",
  "МОРОСЬ": "LLOVIZNA",
  "ДОЖДЬ": "LLUVIA",
  "СНЕГ": "NIEVE",
  "ЛИВЕНЬ": "CHUBASCOS",
  "СНЕГОПАД": "NEVADAS",
  "ГРОЗА": "TORMENTA",
  "ОЩУЩАЕТСЯ ": "SENSACIÓN ",
  "НЕТ ДАННЫХ": "SIN DATOS",
  "ПОГОДА: ОШИБКА ЗАПРОСА": "CLIMA: ERROR DE SOLICITUD",
  "ИСТОРИЯ ПУСТА": "HISTORIAL VACÍO",
  "ПЛЕЕР: ВОСПРОИЗВЕДЕНИЕ ОСТАНОВЛЕНО": "REPRODUCTOR: DETENIDO",
  "БЕЗ НАЗВАНИЯ": "SIN TÍTULO",
  "ИГРАЕТ: ": "SONANDO: ",
  "ПЛЕЕР: ПОМОЩНИК ПОДКЛЮЧЁН": "REPRODUCTOR: ASISTENTE CONECTADO",
  "ПЛЕЕР: ПОМОЩНИК НЕДОСТУПЕН": "REPRODUCTOR: ASISTENTE NO DISPONIBLE",
  "Назад на 10 с": "Atrás 10 s",
  "Вперёд на 10 с": "Adelante 10 s",
  "ПЛЕЕР: ЗАПУСТИТЕ media-helper.bat": "REPRODUCTOR: EJECUTA media-helper.bat",
  "ЗАРЯД НИЖЕ 20%": "BATERÍA BAJO 20%",
  "ПИТАНИЕ: ОТ СЕТИ": "ENERGÍA: RED",
  "ПИТАНИЕ: ОТ БАТАРЕИ": "ENERGÍA: BATERÍA",
  "СЕТЬ: ": "RED: ",
  "В СЕТИ": "EN LÍNEA",
  "НЕТ СОЕДИНЕНИЯ": "SIN CONEXIÓN",
  "   ЗАРЯД: ": "   BATERÍA: ",
  " (ЗАРЯДКА)": " (CARGANDO)",
  "ARASAKA OS 4.2 // ЗАГРУЗКА ЯДРА": "ARASAKA OS 4.2 // CARGANDO NÚCLEO",
  "ПРОВЕРКА ПРОПУСКА ............ OK": "VERIFICANDO CREDENCIAL ........ OK",
  "МОНТИРОВАНИЕ ЗАЩИЩЁННОГО ТОМА .. OK": "MONTANDO VOLUMEN SEGURO ....... OK",
  "РУКОПОЖАТИЕ NETWATCH .......... OK": "ENLACE NETWATCH ............... OK",
  "ЗАГРУЗКА ИНТЕРФЕЙСА ........... OK": "CARGANDO INTERFAZ ............. OK",
  "Клик: свернуть. Перетащите, чтобы переместить окно": "Clic: contraer. Arrastra para mover la ventana",
  "НЕТ СЕТИ": "SIN RED",
  "ДОСТУП ЕСТЬ": "EN LÍNEA",
  "НЕТ ИНТЕРНЕТА": "SIN INTERNET",
  "ИНТЕРНЕТ: ДОСТУП ВОССТАНОВЛЕН": "INTERNET: ACCESO RESTABLECIDO",
  "ИНТЕРНЕТ: ДОСТУП ПОТЕРЯН": "INTERNET: ACCESO PERDIDO",
  "ТЕСТ...": "PROBANDO...",
  "ТЕСТ СКОРОСТИ: ": "TEST DE VELOCIDAD: ",
  "ОШИБКА ТЕСТА": "PRUEBA FALLIDA",
  "ТЕСТ СКОРОСТИ: ОШИБКА": "TEST DE VELOCIDAD: FALLÓ",
  "OS: ОБОЛОЧКА АКТИВНА": "SO: ENTORNO ACTIVO",
  "<small>ОТКРЫТЫЕ ОКНА</small>": "<small>VENTANAS ABIERTAS</small>",
  "ЗАПУСК: ": "INICIAR: ",
  "ТОЧНО?": "¿SEGURO?",
  "СЕАНС ОТКРЫТ": "SESIÓN ABIERTA",
  "СЕТЬ: ПОДКЛЮЧЕНО": "RED: CONECTADA",
  "СЕТЬ: СОЕДИНЕНИЕ ПОТЕРЯНО": "RED: CONEXIÓN PERDIDA",
  "ЭКРАН: СВЁРНУТО": "PANTALLA: MINIMIZADA",
  "ЭКРАН: АКТИВЕН": "PANTALLA: ACTIVA",
  "НАСТРОЙКИ": "AJUSTES",
  "Настройки": "Ajustes",
  "ЯЗЫК": "IDIOMA",
  "ЦВЕТ": "COLOR",
  "ВИДЖЕТЫ": "WIDGETS",
  "ЕДИНИЦЫ": "UNIDADES",
  "ТЕМПЕРАТУРА": "TEMPERATURA",
  "ВРЕМЯ": "HORA",
  "НЕДЕЛЯ С": "SEMANA EMPIEZA",
  "ГОРОД": "CIUDAD",
  "НАЙТИ": "BUSCAR",
  "Введите город": "Escribe una ciudad",
  "ГОРОД НЕ НАЙДЕН": "CIUDAD NO ENCONTRADA",
  "МИРОВЫЕ ЧАСЫ": "RELOJES MUNDIALES",
  "ЭФФЕКТЫ": "EFECTOS",
  "СКАНЛАЙНЫ": "LÍNEAS DE BARRIDO",
  "БЕГУЩАЯ ЛИНИЯ": "LÍNEA MÓVIL",
  "АНИМАЦИЯ ВХОДА": "ANIMACIÓN DE INICIO",
  "ВКЛ": "SÍ",
  "ВЫКЛ": "NO",
  "СБРОС НАСТРОЕК": "RESTABLECER AJUSTES",
  "ЛОГОТИП": "LOGOTIPO",
  "КРАСНЫЙ": "ROJO",
  "ЯНТАРНЫЙ": "ÁMBAR",
  "ЗЕЛЁНЫЙ": "VERDE",
  "ГОЛУБОЙ": "CIAN",
  "СИНИЙ": "AZUL",
  "ФИОЛЕТОВЫЙ": "VIOLETA",
  " КМ/Ч": " KM/H"
 },
 "de": {
  "ТЕРМИНАЛ БЕЗОПАСНОСТИ": "SICHERHEITSTERMINAL",
  "ПОГОДА": "WETTER",
  "ЗАГРУЗКА...": "LADEN...",
  "ВЕТЕР": "WIND",
  "ВЛАЖНОСТЬ": "FEUCHTE",
  "3 ДНЯ": "3 TAGE",
  "ПО ЧАСАМ": "STÜNDLICH",
  "НАГРУЗКА ПК": "PC-LAST",
  "График за последнюю минуту. Клик по строке выше выбирает ЦП, ГП или ОЗУ": "Verlauf der letzten Minute. Zeile anklicken für CPU, GPU oder RAM",
  "Данные ПК доступны при запуске в Lively Wallpaper": "PC-Daten sind in Lively Wallpaper verfügbar",
  "ПЛЕЕР": "PLAYER",
  "Клик: история треков": "Klick: Titelverlauf",
  "НИЧЕГО НЕ ИГРАЕТ": "NICHTS LÄUFT",
  "Клик: перемотка": "Klicken zum Spulen",
  "Предыдущий": "Zurück",
  "Пауза / играть": "Pause / Wiedergabe",
  "Следующий": "Weiter",
  "БАС": "BÄSSE",
  "СРЕДНИЕ": "MITTEN",
  "ВЕРХА": "HÖHEN",
  "Эквалайзер и обложка работают в Lively. Шкала и кнопки: запустите media-helper.bat": "Equalizer und Cover funktionieren in Lively. Leiste und Tasten: media-helper.bat starten",
  "Клик: повторный вход": "Klick: Anmeldung wiederholen",
  "КАЛЕНДАРЬ": "KALENDER",
  "Прошлый месяц": "Vorheriger Monat",
  "Сбросить на сегодня": "Auf heute zurücksetzen",
  "СЕГОДНЯ": "HEUTE",
  "Следующий месяц": "Nächster Monat",
  "ДОСТУП": "ZUGANG",
  "СРЕДНИЙ / ДЖИТТЕР": "Ø / JITTER",
  "СКОРОСТЬ ↓": "GESCHW. ↓",
  "СКОРОСТЬ ↑": "GESCHW. ↑",
  "КАНАЛ (ОЦЕНКА)": "LINK (GESCH.)",
  "Пинг за последние минуты": "Ping der letzten Minuten",
  "ТЕСТ СКОРОСТИ": "SPEEDTEST",
  "НЕ ЗАПУСКАЛСЯ": "NOCH NICHT GESTARTET",
  "ЖУРНАЛ СОБЫТИЙ": "EREIGNISPROTOKOLL",
  "ВСЕ": "ALLE",
  "ВАЖНЫЕ": "WICHTIG",
  "ОЧИСТИТЬ": "LEEREN",
  "ТОЛЬКО ДЛЯ УПОЛНОМОЧЕННОГО ПЕРСОНАЛА": "NUR FÜR BEFUGTES PERSONAL",
  "Приложения, окна, питание": "Apps, Fenster, Energie",
  "ПРИЛОЖЕНИЯ": "ANWENDUNGEN",
  "Вернуть окна на место": "Fenster zurücksetzen",
  "СБРОС ОКОН": "FENSTER ZURÜCKSETZEN",
  "Поиск...": "Suchen...",
  "ЗАКРЫТЬ ✕": "SCHLIESSEN ✕",
  "БЛОКИРОВКА": "SPERREN",
  "ВЫХОД": "ABMELDEN",
  "ПЕРЕЗАГРУЗКА": "NEUSTART",
  "ВЫКЛЮЧЕНИЕ": "HERUNTERFAHREN",
  "ДОСТУП РАЗРЕШЁН": "ZUGRIFF GEWÄHRT",
  "ТОКИО": "TOKIO",
  "МОСКВА": "MOSKAU",
  "ЛОС-АНДЖЕЛЕС": "LOS ANGELES",
  "ПН": "MO",
  "ВТ": "DI",
  "СР": "MI",
  "ЧТ": "DO",
  "ПТ": "FR",
  "СБ": "SA",
  "ВС": "SO",
  "ДО ": "BIS ",
  " ДН.": " TAGE",
  ": ПРОШЛО ": ": VERGANGEN ",
  "ЯСНО": "KLAR",
  "МАЛООБЛАЧНО": "LEICHT BEWÖLKT",
  "ПАСМУРНО": "BEDECKT",
  "ТУМАН": "NEBEL",
  "МОРОСЬ": "NIESELREGEN",
  "ДОЖДЬ": "REGEN",
  "СНЕГ": "SCHNEE",
  "ЛИВЕНЬ": "SCHAUER",
  "СНЕГОПАД": "SCHNEESCHAUER",
  "ГРОЗА": "GEWITTER",
  "ОЩУЩАЕТСЯ ": "GEFÜHLT ",
  "НЕТ ДАННЫХ": "KEINE DATEN",
  "ПОГОДА: ОШИБКА ЗАПРОСА": "WETTER: ANFRAGE FEHLGESCHLAGEN",
  "ИСТОРИЯ ПУСТА": "VERLAUF LEER",
  "ПЛЕЕР: ВОСПРОИЗВЕДЕНИЕ ОСТАНОВЛЕНО": "PLAYER: WIEDERGABE GESTOPPT",
  "БЕЗ НАЗВАНИЯ": "OHNE TITEL",
  "ИГРАЕТ: ": "SPIELT: ",
  "ПЛЕЕР: ПОМОЩНИК ПОДКЛЮЧЁН": "PLAYER: HELFER VERBUNDEN",
  "ПЛЕЕР: ПОМОЩНИК НЕДОСТУПЕН": "PLAYER: HELFER NICHT VERFÜGBAR",
  "Назад на 10 с": "10 s zurück",
  "Вперёд на 10 с": "10 s vor",
  "ПЛЕЕР: ЗАПУСТИТЕ media-helper.bat": "PLAYER: media-helper.bat STARTEN",
  "ЗАРЯД НИЖЕ 20%": "AKKU UNTER 20%",
  "ПИТАНИЕ: ОТ СЕТИ": "STROM: NETZTEIL",
  "ПИТАНИЕ: ОТ БАТАРЕИ": "STROM: AKKU",
  "СЕТЬ: ": "NETZWERK: ",
  "В СЕТИ": "ONLINE",
  "НЕТ СОЕДИНЕНИЯ": "KEINE VERBINDUNG",
  "   ЗАРЯД: ": "   AKKU: ",
  " (ЗАРЯДКА)": " (LÄDT)",
  "ARASAKA OS 4.2 // ЗАГРУЗКА ЯДРА": "ARASAKA OS 4.2 // KERNEL LADEN",
  "ПРОВЕРКА ПРОПУСКА ............ OK": "AUSWEIS PRÜFEN ................ OK",
  "МОНТИРОВАНИЕ ЗАЩИЩЁННОГО ТОМА .. OK": "SICHERES VOLUMEN EINBINDEN .... OK",
  "РУКОПОЖАТИЕ NETWATCH .......... OK": "NETWATCH-HANDSHAKE ............ OK",
  "ЗАГРУЗКА ИНТЕРФЕЙСА ........... OK": "OBERFLÄCHE LADEN .............. OK",
  "Клик: свернуть. Перетащите, чтобы переместить окно": "Klick: einklappen. Ziehen zum Verschieben",
  "НЕТ СЕТИ": "KEIN NETZ",
  "ДОСТУП ЕСТЬ": "ONLINE",
  "НЕТ ИНТЕРНЕТА": "KEIN INTERNET",
  "ИНТЕРНЕТ: ДОСТУП ВОССТАНОВЛЕН": "INTERNET: ZUGANG WIEDERHERGESTELLT",
  "ИНТЕРНЕТ: ДОСТУП ПОТЕРЯН": "INTERNET: ZUGANG VERLOREN",
  "ТЕСТ...": "TESTE...",
  "ТЕСТ СКОРОСТИ: ": "SPEEDTEST: ",
  "ОШИБКА ТЕСТА": "TEST FEHLGESCHLAGEN",
  "ТЕСТ СКОРОСТИ: ОШИБКА": "SPEEDTEST: FEHLGESCHLAGEN",
  "OS: ОБОЛОЧКА АКТИВНА": "OS: SHELL AKTIV",
  "<small>ОТКРЫТЫЕ ОКНА</small>": "<small>OFFENE FENSTER</small>",
  "ЗАПУСК: ": "START: ",
  "ТОЧНО?": "SICHER?",
  "СЕАНС ОТКРЫТ": "SITZUNG GEÖFFNET",
  "СЕТЬ: ПОДКЛЮЧЕНО": "NETZWERK: VERBUNDEN",
  "СЕТЬ: СОЕДИНЕНИЕ ПОТЕРЯНО": "NETZWERK: VERBINDUNG VERLOREN",
  "ЭКРАН: СВЁРНУТО": "ANZEIGE: MINIMIERT",
  "ЭКРАН: АКТИВЕН": "ANZEIGE: AKTIV",
  "НАСТРОЙКИ": "EINSTELLUNGEN",
  "Настройки": "Einstellungen",
  "ЯЗЫК": "SPRACHE",
  "ЦВЕТ": "FARBE",
  "ВИДЖЕТЫ": "WIDGETS",
  "ЕДИНИЦЫ": "EINHEITEN",
  "ТЕМПЕРАТУРА": "TEMPERATUR",
  "ВРЕМЯ": "ZEIT",
  "НЕДЕЛЯ С": "WOCHE BEGINNT",
  "ГОРОД": "STADT",
  "НАЙТИ": "SUCHEN",
  "Введите город": "Stadt eingeben",
  "ГОРОД НЕ НАЙДЕН": "STADT NICHT GEFUNDEN",
  "МИРОВЫЕ ЧАСЫ": "WELTZEIT",
  "ЭФФЕКТЫ": "EFFEKTE",
  "СКАНЛАЙНЫ": "SCANLINES",
  "БЕГУЩАЯ ЛИНИЯ": "LAUFLINIE",
  "АНИМАЦИЯ ВХОДА": "ANMELDEANIMATION",
  "ВКЛ": "AN",
  "ВЫКЛ": "AUS",
  "СБРОС НАСТРОЕК": "EINSTELLUNGEN ZURÜCKSETZEN",
  "ЛОГОТИП": "LOGO",
  "КРАСНЫЙ": "ROT",
  "ЯНТАРНЫЙ": "BERNSTEIN",
  "ЗЕЛЁНЫЙ": "GRÜN",
  "ГОЛУБОЙ": "CYAN",
  "СИНИЙ": "BLAU",
  "ФИОЛЕТОВЫЙ": "VIOLETT",
  " КМ/Ч": " KM/H"
 }
};
  const LANGS = ["ru", "en", "es", "de"];
  let LANG = new URLSearchParams(location.search).get("lang");
  if (!LANGS.includes(LANG)) LANG = LANGS.includes(CS.lang) ? CS.lang : LANGS.includes(CFG.lang) ? CFG.lang : (navigator.language || "").slice(0, 2).toLowerCase();
  if (!LANGS.includes(LANG)) LANG = "en";
  const LOC = { ru: "ru-RU", en: "en-GB", es: "es-ES", de: "de-DE" }[LANG];
  const T = (s) => (LANG === "ru" ? s : (TR[LANG] && TR[LANG][s]) || TR.en[s] || s);
  document.documentElement.lang = LANG;
  if (LANG !== "ru") {
    document.title = T(document.title);
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (x) => (/^(SCRIPT|STYLE)$/.test(x.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let x; (x = w.nextNode()); ) { const t = x.nodeValue.trim(), v = T(t); if (v !== t) x.nodeValue = x.nodeValue.replace(t, v); }
    document.querySelectorAll("[title],[placeholder]").forEach((el) => ["title", "placeholder"].forEach((a) => { const v = el.getAttribute(a); if (v && T(v) !== v) el.setAttribute(a, T(v)); }));
  }

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const nav = navigator;

  /* ---- журнал (только реальные события) ---- */
  function log(msg, hl) {
    const d = new Date(), el = $("log"), l = document.createElement("div");
    l.className = hl ? "imp" : ""; l.innerHTML = '<span class="t">' + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "</span> " + (hl ? '<span class="hl">' + msg + "</span>" : msg);
    el.appendChild(l);
    while (el.children.length > 40) el.removeChild(el.firstChild);
  }

  /* ---- часы, дата, календарь ---- */
  const tm = (tz) => new Date().toLocaleTimeString(LOC, { timeZone: tz, hourCycle: CS.h12 === "1" ? "h12" : "h23" });
  let calDay = -1;
  const WD = [T("ПН"), T("ВТ"), T("СР"), T("ЧТ"), T("ПТ"), T("СБ"), T("ВС")];
  let view = null, sel = null;
  function calendar() {
    const t = new Date();
    if (!view) view = { y: t.getFullYear(), m: t.getMonth() };
    const { y, m } = view, first = (new Date(y, m, 1).getDay() + (CS.sun === "1" ? 0 : 6)) % 7, n = new Date(y, m + 1, 0).getDate();
    let h = (CS.sun === "1" ? [WD[6]].concat(WD.slice(0, 6)) : WD).map((x) => "<b>" + x + "</b>").join("");
    for (let i = 0; i < first; i++) h += "<span></span>";
    for (let i = 1; i <= n; i++) {
      const isT = y === t.getFullYear() && m === t.getMonth() && i === t.getDate();
      const isS = sel && sel.y === y && sel.m === m && sel.d === i;
      h += '<span data-d="' + i + '" class="' + (isT ? "today " : "") + (isS ? "sel" : "") + '">' + i + "</span>";
    }
    $("cal").innerHTML = h;
    $("calh").textContent = new Date(y, m, 1).toLocaleDateString(LOC, { month: "long", year: "numeric" }).toUpperCase();
    let s = T("СЕГОДНЯ");
    if (sel) {
      const days = Math.round((new Date(sel.y, sel.m, sel.d) - new Date(t.getFullYear(), t.getMonth(), t.getDate())) / 864e5);
      const dt = new Date(sel.y, sel.m, sel.d).toLocaleDateString(LOC, { day: "numeric", month: "long" }).toUpperCase();
      s = days === 0 ? T("СЕГОДНЯ") : days > 0 ? T("ДО ") + dt + ": " + days + T(" ДН.") : dt + T(": ПРОШЛО ") + -days + T(" ДН.");
    }
    $("calSel").textContent = s;
  }
  function clocks() {
    const d = new Date();
    $("clock").textContent = tm();
    $("date").textContent = d.toLocaleDateString(LOC, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase();
    $("world").innerHTML = CS.zones.map((z) => "<div><small>" + zoneLabel(z) + "</small><b>" + tm(z) + "</b></div>").join("");
    if (d.getDate() !== calDay) { calDay = d.getDate(); calendar(); }
  }

  /* ---- погода (Open-Meteo, без ключа) ---- */
  const wmo = (c) => T(c === 0 ? "ЯСНО" : c < 3 ? "МАЛООБЛАЧНО" : c === 3 ? "ПАСМУРНО" : c < 50 ? "ТУМАН" : c < 60 ? "МОРОСЬ" : c < 70 ? "ДОЖДЬ" : c < 80 ? "СНЕГ" : c < 85 ? "ЛИВЕНЬ" : c < 90 ? "СНЕГОПАД" : "ГРОЗА");
  const fT = (c) => Math.round(CS.temp === "f" ? (c * 9) / 5 + 32 : c) + "°";
  const fW = (ms) => (CS.wind === "kmh" ? Math.round(ms * 3.6) + T(" КМ/Ч") : CS.wind === "mph" ? Math.round(ms * 2.237) + " mph" : Math.round(ms) + T(" М/С"));
  let wxFailed = false, wxTab = "d", wxj = null;
  const wxd = { d: "", h: "" };
  function renderWx() {
    if (!wxj) return;
    const j = wxj, c = j.current, dl = j.daily;
    $("wt").textContent = fT(c.temperature_2m); $("wd").textContent = wmo(c.weather_code);
    $("wf").textContent = T("ОЩУЩАЕТСЯ ") + fT(c.apparent_temperature);
    $("ww").textContent = fW(c.wind_speed_10m); $("wh").textContent = c.relative_humidity_2m + "%";
    wxd.d = dl.time.slice(1).map((t, i) => "<div><small>" + new Date(t + "T12:00").toLocaleDateString(LOC, { weekday: "short" }).toUpperCase() + "</small><b>" + fT(dl.temperature_2m_max[i + 1]) + "</b><small>" + fT(dl.temperature_2m_min[i + 1]) + "</small></div>").join("");
    const k = Math.max(0, j.hourly.time.findIndex((t) => t >= c.time.slice(0, 13) + ":00"));
    wxd.h = [1, 2, 3, 4, 5, 6].map((n) => { const x = k + n * 2; return "<div><small>" + j.hourly.time[x].slice(11, 16) + "</small><b>" + fT(j.hourly.temperature_2m[x]) + "</b></div>"; }).join("");
    renderFc();
  }
  async function weather() {
    const P = CS.city || CFG;
    try {
      wxj = await (await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + P.lat + "&longitude=" + P.lon +
        "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&timezone=auto&forecast_days=4&wind_speed_unit=ms")).json();
      renderWx(); wxFailed = false;
    } catch (e) { $("wd").textContent = T("НЕТ ДАННЫХ"); if (!wxFailed) log(T("ПОГОДА: ОШИБКА ЗАПРОСА"), true); wxFailed = true; }
  }

  /* ---- нагрузка ПК: отдаёт Lively (LivelyInfo.json -> --system-information) ---- */
  const H = { cpu: [], gpu: [], ram: [] }; let metric = "cpu";
  function spark(id, a, max) {
    const c = $(id), x = c.getContext("2d"), w = c.width, hh = c.height;
    x.clearRect(0, 0, w, hh);
    if (a.length < 2) return;
    const m = max || Math.max(...a, 1), st = w / 59, x0 = w - (a.length - 1) * st;
    x.beginPath();
    a.forEach((v, i) => { const px = x0 + i * st, py = hh - 3 - (v / m) * (hh - 6); i ? x.lineTo(px, py) : x.moveTo(px, py); });
    x.strokeStyle = hsl(100, 58); x.lineWidth = 2; x.stroke();
    x.lineTo(w, hh); x.lineTo(x0, hh); x.fillStyle = hsl(86, 45, .18); x.fill();
  }
  let lastLively = 0;
  function applySys(o) {
    const set = (k, v) => {
      if (v == null) { $(k).textContent = "—"; $(k + "B").style.width = "0"; return; }
      v = Math.max(0, Math.min(100, v)); $(k).textContent = Math.round(v) + "%"; $(k + "B").style.width = v + "%";
      H[k].push(v); if (H[k].length > 60) H[k].shift();
    };
    set("cpu", o.CurrentCpu); set("gpu", o.CurrentGpu3D); set("ram", (1 - o.CurrentRamAvail / o.TotalRam) * 100);
    spark("spLoad", H[metric], 100);
    const mb = (x) => ((x * 8) / 1048576).toFixed(1) + T(" МБИТ/С");
    $("nd").textContent = mb(o.CurrentNetDown); $("nu").textContent = mb(o.CurrentNetUp);
    $("sysnote").hidden = true;
  }
  window.livelySystemInformation = (raw) => { lastLively = performance.now(); applySys(JSON.parse(raw)); };
  async function sysPoll() { /* Linux: данные от helper-linux.py, если Lively их не присылает */
    if (performance.now() - lastLively < 3000) return;
    try { const o = await (await fetch(HELPER + "/sys", { cache: "no-store" })).json(); if (o.CurrentCpu !== undefined) applySys(o); } catch (e) {}
  }

  /* ---- плеер: Lively (обложка, эквалайзер) + помощник Windows (шкала, кнопки) ---- */
  const HELPER = "http://127.0.0.1:5511";
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  let lastTrack = "", artData = null, artUrl = null;
  const TH = [];
  const histRender = () => { $("thist").innerHTML = TH.length ? TH.map((t, i) => (i + 1) + ". " + esc(t)).join("<br>") : T("ИСТОРИЯ ПУСТА"); };
  const np = { ok: false, status: "", pos: 0, dur: 0, at: 0, seek: false, canNext: true, canPrev: true };
  const fmtT = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return ((s / 60) | 0) + ":" + pad(s % 60); };
  function applyArt() {
    const a = $("art");
    if (artData) { a.style.backgroundImage = "url(data:image/" + (artData.startsWith("/9j") ? "jpeg" : "png") + ";base64," + artData + ")"; a.textContent = ""; }
    else if (artUrl) { a.style.backgroundImage = "url(" + artUrl + ")"; a.textContent = ""; }
    else { a.style.backgroundImage = ""; a.textContent = "♪"; }
  }
  function setTrack(o) {
    if (!o) {
      $("tt").textContent = T("НИЧЕГО НЕ ИГРАЕТ"); $("ta").textContent = ""; $("tl").textContent = "";
      if (lastTrack) log(T("ПЛЕЕР: ВОСПРОИЗВЕДЕНИЕ ОСТАНОВЛЕНО"));
      lastTrack = ""; return;
    }
    $("tt").textContent = o.Title || T("БЕЗ НАЗВАНИЯ"); $("ta").textContent = o.Artist || ""; $("tl").textContent = o.AlbumTitle || "";
    const key = (o.Artist || "") + " — " + (o.Title || "");
    if (key !== lastTrack) { lastTrack = key; TH.unshift(key); TH.length = Math.min(TH.length, 5); histRender(); log(T("ИГРАЕТ: ") + esc(key), true); }
  }
  window.livelyCurrentTrack = (raw) => {
    let o = null;
    try { o = JSON.parse(raw); } catch (e) {}
    artData = o && o.Thumbnail ? o.Thumbnail : null; applyArt();
    if (!np.ok) setTrack(o);
  };
  let npPolling = false, npFailures = 0;
  async function npPoll() {
    // Lively's WebView can slow down media-state requests. Never queue overlapping
    // polls: queued requests used to stall the helper and make controls appear dead.
    if (npPolling) return;
    npPolling = true;
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 5000);
    try {
      const res = await fetch(HELPER + "/state?t=" + Date.now(), { signal: ac.signal, cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const o = await res.json();
      npFailures = 0;
      if (!np.ok) log(T("ПЛЕЕР: ПОМОЩНИК ПОДКЛЮЧЁН"), true);
      np.ok = true;
      if (o.ui === "launcher") ovOpen(true);
      if (o.title === undefined) { np.status = ""; setTrack(null); }
      else { Object.assign(np, { status: o.status, pos: o.pos, dur: o.dur, at: performance.now(), seek: !!o.canSeek, canNext: o.canNext !== false, canPrev: o.canPrev !== false }); setTrack({ Title: o.title, Artist: o.artist, AlbumTitle: o.album });
        const nu = o.art ? HELPER + "/art?k=" + encodeURIComponent(o.title || "") : null;
        if (nu !== artUrl) { artUrl = nu; applyArt(); } }
    } catch (e) {
      npFailures++;
      // Keep transient helper hiccups from disabling the buttons immediately.
      if (npFailures >= 3) {
        if (np.ok) log(T("ПЛЕЕР: ПОМОЩНИК НЕДОСТУПЕН"), true);
        np.ok = false; np.status = "";
      }
    } finally {
      clearTimeout(to);
      npPolling = false;
      $("npnote").hidden = np.ok;
      renderNp();
    }
  }
  function renderNp() {
    const playing = np.status === "Playing", has = np.ok && np.dur > 0;
    const pos = has ? Math.min(np.dur, np.pos + (playing ? performance.now() - np.at : 0)) : 0;
    $("tpos").textContent = has ? fmtT(pos) : "--:--"; $("tdur").textContent = has ? fmtT(np.dur) : "--:--";
    $("seekFill").style.width = has ? (pos / np.dur) * 100 + "%" : "0";
    $("bPlay").textContent = playing ? "❚❚" : "▶";
    $("npCtl").classList.toggle("off", !np.ok);
    $("seek").classList.toggle("off", !(has && np.seek));
    $("bPrev").title = np.canPrev ? T("Предыдущий") : T("Назад на 10 с");
    $("bNext").title = np.canNext ? T("Следующий") : T("Вперёд на 10 с");
  }
  const curPos = () => (np.dur ? Math.min(np.dur, np.pos + (np.status === "Playing" ? performance.now() - np.at : 0)) : 0);
  const cmd = (p) => {
    if (!np.ok) { log(T("ПЛЕЕР: ЗАПУСТИТЕ media-helper.bat"), true); return; }
    fetch(HELPER + p + (p.includes("?") ? "&" : "?") + "t=" + Date.now(), { mode: "no-cors", cache: "no-store" }).catch(() => {});
    setTimeout(npPoll, 250);
  };
  $("bPrev").addEventListener("click", () => (np.canPrev || !np.seek ? cmd("/prev") : cmd("/seek?ms=" + Math.max(0, Math.round(curPos() - 10000)))));
  $("bPlay").addEventListener("click", () => cmd("/playpause"));
  $("bNext").addEventListener("click", () => (np.canNext || !np.seek ? cmd("/next") : cmd("/seek?ms=" + Math.min(np.dur, Math.round(curPos() + 10000)))));
  $("seekBar").addEventListener("click", (e) => {
    if (!np.ok || !np.dur || !np.seek) return;
    const r = e.currentTarget.getBoundingClientRect();
    cmd("/seek?ms=" + Math.round(((e.clientX - r.left) / r.width) * np.dur));
  });

  /* ---- эквалайзер: Lively --audio (128 значений 0..1, первые 64 - левый канал) ---- */
  const eqc = $("eq"), eqx = eqc.getContext("2d");
  const raw = new Array(64).fill(0), sm = new Array(64).fill(0), peak = new Array(64).fill(0);
  let audioAt = 0, eqIdle = false;
  window.livelyAudioListener = (a) => { for (let i = 0; i < 64; i++) raw[i] = ((a[i] || 0) + (a[i + 64] || 0)) / 2; audioAt = performance.now(); };
  function eqLoop() {
    requestAnimationFrame(eqLoop);
    if (!eqc.offsetParent) return;
    const w = eqc.width, h = eqc.height, base = h - 4, on = performance.now() - audioAt < 1500;
    for (let i = 0; i < 64; i++) { const t = on ? raw[i] : 0; sm[i] += (t - sm[i]) * (t > sm[i] ? 0.5 : 0.12); peak[i] = Math.max(sm[i], peak[i] - 0.012); }
    const quiet = !on && sm.every((v) => v < 0.004);
    if (quiet && eqIdle) return; /* тишина: не перерисовываем каждый кадр */
    eqIdle = quiet;
    eqx.clearRect(0, 0, w, h);
    const z1 = w * 0.3, z2 = w * 0.68;
    const bw = z1 / 6;
    for (let i = 0; i < 6; i++) { /* БАС: толстые столбцы + метки пиков */
      const v = Math.min(1, sm[i] * 1.4), bh = 3 + v * (h - 10), x = i * bw;
      eqx.fillStyle = hsl(86, 45, .9); eqx.fillRect(x + 3, base - bh, bw - 6, bh);
      eqx.fillStyle = "#fff"; eqx.fillRect(x + 3, base - Math.min(1, peak[i] * 1.4) * (h - 10) - 4, bw - 6, 2);
    }
    eqx.beginPath(); /* СРЕДНИЕ: ломаная линия */
    for (let i = 0; i < 24; i++) {
      const v = Math.min(1, sm[6 + i] * 1.8), x = z1 + 8 + (i / 23) * (z2 - z1 - 16), y = base - 3 - v * (h - 14);
      i ? eqx.lineTo(x, y) : eqx.moveTo(x, y);
    }
    eqx.strokeStyle = hsl(100, 58); eqx.lineWidth = 2; eqx.lineJoin = "round"; eqx.shadowColor = hsl(86, 45); eqx.shadowBlur = 8; eqx.stroke(); eqx.shadowBlur = 0;
    const n = 34, hw = (w - z2 - 8) / n;
    for (let i = 0; i < n; i++) { /* ВЕРХА: тонкие штрихи с «зависающими» точками */
      const k = 30 + i, v = Math.min(1, sm[k] * 2.6), x = z2 + 8 + i * hw, bh = 2 + v * (h - 14), ww = Math.max(1, hw - 2);
      eqx.fillStyle = hsl(100, 58, .55); eqx.fillRect(x, base - bh, ww, bh);
      eqx.fillStyle = "#fff"; eqx.fillRect(x, base - Math.min(1, peak[k] * 2.6) * (h - 14) - 5, ww, 2);
    }
    eqx.fillStyle = hsl(86, 45, .35); eqx.fillRect(z1, 4, 1, h - 8); eqx.fillRect(z2, 4, 1, h - 8);
  }

  /* ---- батарея и сеть ---- */
  const bat = { lvl: null, chg: false };
  let low = false;
  (nav.getBattery ? nav.getBattery() : Promise.reject()).then((b) => {
    const u = () => { bat.lvl = b.level; bat.chg = b.charging; };
    u(); b.addEventListener("levelchange", () => { u(); if (b.level < 0.2 && !b.charging && !low) { low = true; log(T("ЗАРЯД НИЖЕ 20%"), true); } if (b.charging) low = false; });
    b.addEventListener("chargingchange", () => { u(); log(b.charging ? T("ПИТАНИЕ: ОТ СЕТИ") : T("ПИТАНИЕ: ОТ БАТАРЕИ"), true); });
  }).catch(() => {});
  function status() {
    $("st").textContent = T("СЕТЬ: ") + (nav.onLine ? T("В СЕТИ") : T("НЕТ СОЕДИНЕНИЯ")) + (bat.lvl == null ? "" : T("   ЗАРЯД: ") + Math.round(bat.lvl * 100) + "%" + (bat.chg ? T(" (ЗАРЯДКА)") : ""));
  }

  /* ---- анимация входа ---- */
  const FX = () => Array.from(document.querySelectorAll(".top,.col .panel,.mid,.foot"));
  const reveal = () => FX().forEach((e, i) => setTimeout(() => e.classList.add("shown"), i * 110));
  let booting = false;
  function boot(force) {
    if (!force && CS.boot === "0") { $("boot").style.display = "none"; return; }
    if (booting) return;
    booting = true;
    const el = $("boot"), out = $("bootLog"), bar = $("bootBar"), ok = $("bootOk");
    FX().forEach((e) => { e.classList.add("fx"); e.classList.remove("shown"); });
    el.style.display = ""; el.classList.remove("off"); ok.classList.remove("on"); out.textContent = ""; bar.style.width = "0";
    const L = [T("ARASAKA OS 4.2 // ЗАГРУЗКА ЯДРА"), T("ПРОВЕРКА ПРОПУСКА ............ OK"), T("МОНТИРОВАНИЕ ЗАЩИЩЁННОГО ТОМА .. OK"), T("РУКОПОЖАТИЕ NETWATCH .......... OK"), T("ЗАГРУЗКА ИНТЕРФЕЙСА ........... OK")];
    let i = 0;
    (function step() {
      if (i < L.length) { out.textContent += L[i++] + "\n"; bar.style.width = (i / L.length) * 100 + "%"; setTimeout(step, 320); }
      else { ok.classList.add("on"); setTimeout(() => { el.classList.add("off"); reveal(); booting = false; setTimeout(() => { if (!booting) el.style.display = "none"; }, 700); }, 900); }
    })();
  }

  /* ---- интерактивность (мышь) ---- */
  const pos = {}; let zi = 20;
  try { Object.assign(pos, JSON.parse(localStorage.getItem("arasakaPos") || "{}")); } catch (e) {}
  const place = (p, k) => { p.style.translate = pos[k] ? pos[k][0] + "px " + pos[k][1] + "px" : ""; };
  document.querySelectorAll(".panel").forEach((p) => {
    const h = p.querySelector("h2"), k = h.firstChild.textContent;
    h.title = T("Клик: свернуть. Перетащите, чтобы переместить окно"); place(p, k);
    h.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      const sx = e.clientX, sy = e.clientY, o = pos[k] || [0, 0]; let moved = false;
      h.setPointerCapture(e.pointerId);
      const mv = (ev) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 5) return;
        if (!moved) { moved = true; p.classList.add("drag"); p.style.zIndex = ++zi; }
        pos[k] = [o[0] + dx, o[1] + dy]; place(p, k);
      };
      const up = () => {
        h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); p.classList.remove("drag");
        if (moved) { h._m = true; try { localStorage.setItem("arasakaPos", JSON.stringify(pos)); } catch (e) {} }
      };
      h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
    });
    h.addEventListener("click", () => { if (h._m) { h._m = false; return; } p.classList.toggle("min"); });
  });
  $("resetWin").addEventListener("click", () => {
    Object.keys(pos).forEach((k) => delete pos[k]);
    try { localStorage.removeItem("arasakaPos"); } catch (e) {}
    document.querySelectorAll(".panel").forEach((p) => { p.style.translate = ""; p.classList.remove("min"); });
  });

  /* ---- погода: вкладки ---- */
  const renderFc = () => { $("days").innerHTML = wxd[wxTab]; };
  document.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => {
    wxTab = b.dataset.t; document.querySelectorAll("[data-t]").forEach((x) => x.classList.toggle("on", x === b)); renderFc();
  }));

  /* ---- нагрузка: выбор графика; плеер: история; журнал: фильтр ---- */
  document.querySelectorAll(".m").forEach((r) => r.addEventListener("click", () => {
    metric = r.dataset.m; document.querySelectorAll(".m").forEach((x) => x.classList.toggle("sel", x === r)); spark("spLoad", H[metric], 100);
  }));
  $("npTrack").addEventListener("click", () => { $("thist").hidden = !$("thist").hidden; histRender(); });
  document.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => {
    $("log").classList.toggle("imp", b.dataset.f === "imp"); document.querySelectorAll("[data-f]").forEach((x) => x.classList.toggle("on", x === b));
  }));
  $("logClr").addEventListener("click", () => { $("log").innerHTML = ""; });

  /* ---- интернет: доступ, пинг, тест скорости ---- */
  const P = []; let inet = null;
  async function ping() {
    const ac = new AbortController(), to = setTimeout(() => ac.abort(), 4000), t = performance.now();
    let ok = false, ms = 0;
    try { await fetch("https://www.gstatic.com/generate_204?" + Date.now(), { mode: "no-cors", cache: "no-store", signal: ac.signal }); ok = true; ms = Math.round(performance.now() - t); } catch (e) {}
    clearTimeout(to);
    if (ok) { P.push(ms); if (P.length > 60) P.shift(); }
    $("inet").textContent = !nav.onLine ? T("НЕТ СЕТИ") : ok ? T("ДОСТУП ЕСТЬ") : T("НЕТ ИНТЕРНЕТА");
    $("inet").className = ok ? "ok" : "bad";
    if (inet !== null && inet !== ok) log(ok ? T("ИНТЕРНЕТ: ДОСТУП ВОССТАНОВЛЕН") : T("ИНТЕРНЕТ: ДОСТУП ПОТЕРЯН"), true);
    inet = ok;
    const avg = P.length ? Math.round(P.reduce((a, b) => a + b, 0) / P.length) : null;
    const jit = P.length > 1 ? Math.round(P.slice(1).reduce((a, v, i) => a + Math.abs(v - P[i]), 0) / (P.length - 1)) : 0;
    $("ping").textContent = ok ? ms + T(" МС") : "—";
    $("avg").textContent = avg == null ? "—" : avg + T(" МС / ") + jit + T(" МС");
    const c = nav.connection;
    $("ctype").textContent = c && c.effectiveType ? c.effectiveType.toUpperCase() + (c.downlink ? " ~" + c.downlink + T(" МБИТ/С") : "") : "—";
    spark("spPing", P);
  }
  async function speedTest() {
    const b = $("spBtn");
    if (b.disabled) return;
    b.disabled = true; b.textContent = T("ТЕСТ...");
    try {
      const t = performance.now();
      const buf = await (await fetch("https://speed.cloudflare.com/__down?bytes=10000000&r=" + Date.now(), { cache: "no-store" })).arrayBuffer();
      const mbps = (buf.byteLength * 8) / 1e6 / ((performance.now() - t) / 1000), d = new Date();
      $("spRes").textContent = mbps.toFixed(1) + T(" МБИТ/С (") + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ")";
      log(T("ТЕСТ СКОРОСТИ: ") + mbps.toFixed(1) + T(" МБИТ/С"), true);
    } catch (e) { $("spRes").textContent = T("ОШИБКА ТЕСТА"); log(T("ТЕСТ СКОРОСТИ: ОШИБКА"), true); }
    b.disabled = false; b.textContent = T("ТЕСТ СКОРОСТИ");
  }
  $("spBtn").addEventListener("click", speedTest);

  $("emblem").addEventListener("click", () => boot(true));
  $("calPrev").addEventListener("click", () => { view.m--; if (view.m < 0) { view.m = 11; view.y--; } calendar(); });
  $("calNext").addEventListener("click", () => { view.m++; if (view.m > 11) { view.m = 0; view.y++; } calendar(); });
  $("calSel").addEventListener("click", () => { view = null; sel = null; calendar(); });
  $("cal").addEventListener("click", (e) => { const d = e.target.dataset && e.target.dataset.d; if (d) { sel = { y: view.y, m: view.m, d: +d }; calendar(); } });

  /* ---- режим Arasaka OS (Linux): приложения, окна, питание ---- */
  const TOKEN = new URLSearchParams(location.search).get("t") || "";
  let apps = [];
  const priv = async (p) => (await fetch(HELPER + p + (p.includes("?") ? "&" : "?") + "t=" + encodeURIComponent(TOKEN), { cache: "no-store" })).json();
  async function osInit() {
    if (!TOKEN) return;
    try { const a = await priv("/apps"); if (!Array.isArray(a)) return; apps = a; $("bApps").hidden = false; log(T("OS: ОБОЛОЧКА АКТИВНА"), true); } catch (e) {}
  }
  function ovRender() {
    const q = $("ovQ").value.trim().toLowerCase();
    $("ovList").innerHTML = apps.filter((a) => a.name.toLowerCase().includes(q)).map((a) => '<button data-id="' + esc(a.id) + '">' + esc(a.name) + "</button>").join("");
  }
  async function ovOpen(on) {
    $("ov").hidden = !on;
    if (!on) return;
    $("ovQ").value = ""; ovRender(); $("ovQ").focus();
    try {
      const w = await priv("/windows");
      $("ovWin").innerHTML = Array.isArray(w) && w.length ? T("<small>ОТКРЫТЫЕ ОКНА</small>") + w.map((x) => '<button data-w="' + esc(x.id) + '">' + esc(x.title) + "</button>").join("") : "";
    } catch (e) {}
  }
  $("bApps").addEventListener("click", () => ovOpen($("ov").hidden));
  $("ovX").addEventListener("click", () => ovOpen(false));
  $("ovQ").addEventListener("input", ovRender);
  $("ovList").addEventListener("click", (e) => {
    const id = e.target.dataset && e.target.dataset.id;
    if (id) { priv("/launch?id=" + encodeURIComponent(id)).catch(() => {}); log(T("ЗАПУСК: ") + esc(e.target.textContent), true); ovOpen(false); }
  });
  $("ovWin").addEventListener("click", (e) => {
    const w = e.target.dataset && e.target.dataset.w;
    if (w) { priv("/focus?id=" + encodeURIComponent(w)).catch(() => {}); ovOpen(false); }
  });
  let armed = null;
  $("ovPwr").addEventListener("click", (e) => {
    const b = e.target, a = b.dataset && b.dataset.a;
    if (!a) return;
    if (a === "lock") { priv("/power?a=lock").catch(() => {}); ovOpen(false); return; }
    if (armed === a) { priv("/power?a=" + a).catch(() => {}); return; }
    armed = a; const t = b.textContent; b.textContent = T("ТОЧНО?"); setTimeout(() => { b.textContent = t; armed = null; }, 3000);
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape") { ovOpen(false); stOpen(false); } });

  /* ---- меню настроек ---- */
  const ZONES = ["Asia/Vladivostok", "Asia/Tokyo", "Asia/Shanghai", "Asia/Dubai", "Europe/Moscow", "Europe/Kyiv", "Europe/Berlin", "Europe/London", "America/New_York", "America/Chicago", "America/Los_Angeles", "Australia/Sydney"];
  const ZN = { "Asia/Tokyo": "ТОКИО", "Europe/Moscow": "МОСКВА", "America/Los_Angeles": "ЛОС-АНДЖЕЛЕС" };
  const zoneLabel = (z) => (ZN[z] ? T(ZN[z]) : z.split("/").pop().replace(/_/g, " ").toUpperCase());
  const HUES = [["КРАСНЫЙ", 356], ["ЯНТАРНЫЙ", 38], ["ЗЕЛЁНЫЙ", 140], ["ГОЛУБОЙ", 186], ["СИНИЙ", 215], ["ФИОЛЕТОВЫЙ", 275]];
  const WIDGETS = [["weather", "ПОГОДА"], ["load", "НАГРУЗКА ПК"], ["player", "ПЛЕЕР"], ["calendar", "КАЛЕНДАРЬ"], ["net", "ИНТЕРНЕТ"], ["log", "ЖУРНАЛ СОБЫТИЙ"], ["world", "МИРОВЫЕ ЧАСЫ"], ["logo", "ЛОГОТИП"]];
  const setCity = () => { $("city").textContent = CS.city ? CS.city.name.toUpperCase() : T(CFG.city); };
  function applyAll() {
    document.documentElement.style.setProperty("--h", CS.hue);
    document.body.classList.toggle("no-lines", CS.lines === "0");
    document.body.classList.toggle("no-scan", CS.scan === "0");
    Object.keys(CS.w).forEach((k) => document.querySelectorAll('[data-w="' + k + '"]').forEach((el) => { el.hidden = !CS.w[k]; }));
    const lg = $("logo"), svg = /logo\.svg/.test(lg.currentSrc || lg.src);
    lg.style.filter = (svg ? "hue-rotate(" + (CS.hue - 356) + "deg) " : "") + "drop-shadow(0 0 18px " + hsl(86, 45, 0.45) + ")";
  }
  $("logo").addEventListener("load", applyAll);
  const seg = (k, opts) => '<span class="seg">' + opts.map(([v, l]) => '<button data-k="' + k + '" data-v="' + v + '">' + l + "</button>").join("") + "</span>";
  const row = (label, body) => '<div class="st-row"><span>' + T(label) + "</span>" + body + "</div>";
  const onoff = (k) => seg(k, [["1", T("ВКЛ")], ["0", T("ВЫКЛ")]]);
  function stMark() {
    const q = (s) => document.querySelectorAll("#stBody " + s);
    q("[data-k]").forEach((b) => b.classList.toggle("on", String(CS[b.dataset.k]) === b.dataset.v));
    q("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === LANG));
    q("[data-hue]").forEach((b) => b.classList.toggle("on", +b.dataset.hue === +CS.hue));
    q("[data-wk]").forEach((b) => b.classList.toggle("on", !!CS.w[b.dataset.wk]));
    q("[data-z]").forEach((el) => { el.value = CS.zones[+el.dataset.z]; });
    const h = $("stHue"); if (h) h.value = CS.hue;
  }
  function stBuild() {
    const langs = [["ru", "РУССКИЙ"], ["en", "ENGLISH"], ["es", "ESPAÑOL"], ["de", "DEUTSCH"]];
    $("stBody").innerHTML =
      row("ЯЗЫК", '<span class="seg">' + langs.map(([v, l]) => '<button data-lang="' + v + '">' + l + "</button>").join("") + "</span>") +
      row("ЦВЕТ", '<span class="seg">' + HUES.map(([n, h]) => '<button class="sw" data-hue="' + h + '" title="' + T(n) + '" style="background:hsl(' + h + ',86%,45%)"></button>').join("") + '</span><input type="range" id="stHue" min="0" max="360">') +
      row("ВИДЖЕТЫ", '<span class="seg">' + WIDGETS.map(([k, n]) => '<button data-wk="' + k + '">' + T(n) + "</button>").join("") + "</span>") +
      row("ТЕМПЕРАТУРА", seg("temp", [["c", "°C"], ["f", "°F"]])) + row("ВЕТЕР", seg("wind", [["ms", "m/s"], ["kmh", "km/h"], ["mph", "mph"]])) +
      row("ВРЕМЯ", seg("h12", [["0", "24H"], ["1", "12H"]])) + row("НЕДЕЛЯ С", seg("sun", [["0", T("ПН")], ["1", T("ВС")]])) +
      row("ГОРОД", '<input type="text" id="stCity" placeholder="' + T("Введите город") + '"><button class="seg-b" id="stFind">' + T("НАЙТИ") + '</button><small id="stMsg"></small>') +
      row("МИРОВЫЕ ЧАСЫ", [0, 1, 2].map((i) => '<select data-z="' + i + '">' + ZONES.map((z) => '<option value="' + z + '">' + zoneLabel(z) + "</option>").join("") + "</select>").join("")) +
      row("СКАНЛАЙНЫ", onoff("lines")) + row("БЕГУЩАЯ ЛИНИЯ", onoff("scan")) + row("АНИМАЦИЯ ВХОДА", onoff("boot")) +
      '<div class="st-row"><button class="seg-b" id="stReset">' + T("СБРОС НАСТРОЕК") + "</button></div>";
    stMark();
  }
  function stOpen(on) { $("stPanel").hidden = !on; if (on) stBuild(); }
  function renderAll(keepUi) { saveCS(); applyAll(); if (!keepUi) stMark(); clocks(); calendar(); renderWx(); }
  async function stFind() {
    const q = $("stCity").value.trim();
    if (!q) return;
    $("stMsg").textContent = "...";
    try {
      const r = await (await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=" + LANG + "&name=" + encodeURIComponent(q))).json(), c = r.results && r.results[0];
      if (!c) { $("stMsg").textContent = T("ГОРОД НЕ НАЙДЕН"); return; }
      CS.city = { name: c.name, lat: c.latitude, lon: c.longitude }; saveCS(); setCity(); weather();
      $("stMsg").textContent = c.name + (c.country ? ", " + c.country : "");
    } catch (e) { $("stMsg").textContent = T("ГОРОД НЕ НАЙДЕН"); }
  }
  const goLang = (l) => { const u = new URL(location.href); if (l) u.searchParams.set("lang", l); else u.searchParams.delete("lang"); location.href = u.toString(); };
  $("bSet").addEventListener("click", () => stOpen($("stPanel").hidden));
  $("stX").addEventListener("click", () => stOpen(false));
  $("stBody").addEventListener("click", (e) => {
    const d = e.target.dataset || {}, id = e.target.id;
    if (d.k) { CS[d.k] = d.v; renderAll(); }
    else if (d.hue) { CS.hue = +d.hue; renderAll(); }
    else if (d.wk) { CS.w[d.wk] = CS.w[d.wk] ? 0 : 1; renderAll(); }
    else if (d.lang) { CS.lang = d.lang; saveCS(); goLang(d.lang); }
    else if (id === "stFind") stFind();
    else if (id === "stReset") { CS = JSON.parse(JSON.stringify(DEF)); saveCS(); goLang(null); }
  });
  $("stBody").addEventListener("input", (e) => { if (e.target.id === "stHue") { CS.hue = +e.target.value; renderAll(true); } });
  $("stBody").addEventListener("change", (e) => { const i = e.target.dataset && e.target.dataset.z; if (i !== undefined) { CS.zones[+i] = e.target.value; renderAll(); } });
  $("stBody").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "stCity") stFind(); });

  /* ---- запуск ---- */
  applyAll(); setCity();
  $("city").textContent = T(CFG.city);
  clocks(); setInterval(clocks, 1000);
  status(); setInterval(status, 2000);
  weather(); setInterval(weather, 15 * 60 * 1000);
  ping(); setInterval(ping, 5000);
  eqLoop(); npPoll(); setInterval(npPoll, 2000); sysPoll(); setInterval(sysPoll, 1000); osInit(); setInterval(renderNp, 250);
  log(T("СЕАНС ОТКРЫТ"), true);
  boot(false);
  addEventListener("online", () => log(T("СЕТЬ: ПОДКЛЮЧЕНО"), true));
  addEventListener("offline", () => log(T("СЕТЬ: СОЕДИНЕНИЕ ПОТЕРЯНО"), true));
  document.addEventListener("visibilitychange", () => log(document.hidden ? T("ЭКРАН: СВЁРНУТО") : T("ЭКРАН: АКТИВЕН")));
  addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "f" && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  });
})();
