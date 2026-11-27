# Arasaka Terminal: Windows build (live wallpaper)

A flat red-and-black corporate HUD inspired by sci-fi megacorp terminals, with real, useful data. Fan project, not affiliated with any rights holder.

## What it shows
Weather (Open-Meteo, no key), CPU/GPU/RAM load with a graph, media player (cover, seek bar, prev/pause/next, equalizer: bass bars, mids line, highs ticks), calendar with day countdown, internet status/ping/speed test, world clocks, event log.
Panels collapse (click header) and can be dragged. Click the central logo to replay the login animation. F = fullscreen.

## Language
English or Russian, chosen automatically from your system language. The `EN/RU` button in the footer switches it, or set `lang: "en"` in the `CFG` block at the top of `script.js`.

## Notes
- Set your city and time zones in `CFG` (top of `script.js`). Taskbar offset: `--taskbar` in `styles.css`. Your own logo: put `logo.png` next to `index.html`.

## Settings menu (SETTINGS button in the footer)
- **Language:** Русский, English, Español, Deutsch.
- **Color:** 6 presets (red, amber, green, cyan, blue, violet) plus a hue slider.
- **Widgets:** show or hide weather, PC load, player, calendar, internet, event log, world clocks, logo.
- **Units and format:** °C / °F, wind m/s, km/h or mph, 24h / 12h clock, week starts on Monday or Sunday.
- **City:** type any city (Open-Meteo geocoding) and the weather follows. Three world clocks are selectable.
- **Effects:** scanlines, sweep line, login animation on/off. Reset button.

Settings are stored in the browser storage. Web engine may not keep them between restarts; if so, set the defaults at the top of `script.js` (`CFG`).
To add a language: add an object to `TR` and its code to `LANGS` in `script.js` (keys are the Russian strings). Spanish and German were translated by an AI: native-speaker review is welcome.
