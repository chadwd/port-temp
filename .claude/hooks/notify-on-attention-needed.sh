#!/bin/bash

# Hook: Notify when user attention is needed
# Simple approach: Play sound (works in background) + log to visible file

TOOL_NAME="$1"
STATUS="$2"

# Sound file - change to your preference
# Options in /System/Library/Sounds/: Ping, Glass, Hero, Submarine, Blow, Bottle, Frog, Funk, Pop, Purr, Tink
SOUND_FILE="/System/Library/Sounds/Glass.aiff"

# Check what triggered
if [[ "$TOOL_NAME" == "Task" && "$STATUS" == "success" ]]; then
    afplay "$SOUND_FILE" 2>/dev/null &
    say -v Samantha -r 200 "Complete" &

elif [[ "$TOOL_NAME" == "AskUserQuestion" ]]; then
    afplay "$SOUND_FILE" 2>/dev/null &
    say -v Samantha -r 200 "Agent needs feedback" &
fi

exit 0
