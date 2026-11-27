#!/bin/bash
# Permanent KWin rule: wallpaper stays below panel and never takes focus

RULE_FILE="$HOME/.config/kwinrulesrc"
cp "$RULE_FILE" "$RULE_FILE.bak.$(date +%s)" 2>/dev/null || true

# Remove old arasaka rule if exists
sed -i '/\[arasaka-wallpaper\]/,/^$/d' "$RULE_FILE" 2>/dev/null || true

cat >> "$RULE_FILE" << 'RULE'

[arasaka-wallpaper]
Description=Arasaka Terminal Wallpaper
title=ARASAKA
titlematch=2
types=1
desktop=1
desktoprule=2
below=true
belowrule=2
above=false
aboverule=2
skiptaskbar=true
skiptaskbarrule=2
skippager=true
skippagerrule=2
noborder=true
noborderrule=2
fullscreen=true
fullscreenrule=2
acceptfocus=false
acceptfocusrule=2
focusstealingprevention=4
focusstealingpreventionrule=2
RULE

echo "Rule updated. Reloading KWin..."
qdbus org.kde.KWin /KWin reconfigure 2>/dev/null || true
echo "Done."
