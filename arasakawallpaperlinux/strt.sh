#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! pgrep -f "linux-helper.py" > /dev/null; then
  nohup python3 "$DIR/linux-helper.py" > /tmp/arasaka-helper.log 2>&1 &
fi

if ! pgrep -f "http.server 5510" > /dev/null; then
  nohup python3 -m http.server 5510 --bind 127.0.0.1 -d "$DIR" > /tmp/arasaka-web.log 2>&1 &
fi
