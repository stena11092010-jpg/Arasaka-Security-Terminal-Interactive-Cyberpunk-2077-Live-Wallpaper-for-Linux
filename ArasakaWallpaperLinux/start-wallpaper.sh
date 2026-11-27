#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# helper
if ! pgrep -f "linux-helper.py" > /dev/null; then
  nohup python3 "$DIR/linux-helper.py" > /tmp/arasaka-helper.log 2>&1 &
  sleep 0.5
fi

BROWSER=""
if command -v chromium-browser >/dev/null; then BROWSER="chromium-browser"
elif command -v chromium >/dev/null; then BROWSER="chromium"
elif command -v google-chrome >/dev/null; then BROWSER="google-chrome"
elif command -v firefox >/dev/null; then BROWSER="firefox"
else echo "Install chromium or firefox"; exit 1; fi

# Launch
if [[ "$BROWSER" == "firefox" ]]; then
  firefox --kiosk "file://$DIR/index.html" &
else
  $BROWSER --app="file://$DIR/index.html" --kiosk --disable-web-security \
    --user-data-dir=/tmp/arasaka-chrome --no-first-run &
fi

sleep 2

# Force properties via kdotool if available
if command -v kdotool >/dev/null; then
  WIN=$(kdotool search --name "ARASAKA" 2>/dev/null | head -1)
  if [[ -n "$WIN" ]]; then
    kdotool windowstate --id "$WIN" below,fullscreen,skip_taskbar,skip_pager
    # Try to disable focus
    kdotool set_window_type --id "$WIN" desktop 2>/dev/null || true
  fi
elif command -v wmctrl >/dev/null; then
  wmctrl -r "ARASAKA" -b add,below,fullscreen,sticky,skip_taskbar,skip_pager 2>/dev/null || true
fi

echo "Launched. If panel still appears on focus — run ./install-kwin-rule.sh once."
