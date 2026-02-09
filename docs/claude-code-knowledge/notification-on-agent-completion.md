# Notification on Agent Completion

## Job to Be Done

**When I delegate work to a Claude Code agent, I want to know when it needs my attention, so I can context-switch away and return at the right moment without constantly checking.**

## Problem

Users delegate long-running tasks to agents (research, exploration, planning) and multitask while waiting. Without notification, they must:
- Constantly check terminal for completion
- Miss blocking questions that halt progress
- Waste time checking too early or too late

This creates friction in the delegation workflow and reduces the value of agent autonomy.

## Solution: Hook with Sound + Text-to-Speech

A hook that provides **auditory and spoken feedback** when user attention is needed:

1. **Agent completes work** (Task tool finishes) → Glass sound + "Complete"
2. **Agent asks a question** (AskUserQuestion blocks progress) → Glass sound + "Agent needs feedback"

**Two notification channels:**
- Auditory: macOS system sound (Glass) via `afplay`
- Spoken: Text-to-speech via `say` (accessibility + eyes-free awareness)

> **Why not `osascript`?** Earlier versions used `osascript` for system notification banners, but `afplay` + `say` proved simpler and more reliable. No permission issues, no notification center clutter.

### Implementation

**Hook script:** `.claude/hooks/notify-on-attention-needed.sh`

```bash
#!/bin/bash

# Hook: Notify when user attention is needed
# Simple approach: Play sound (works in background) + TTS

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
```

**Settings configuration:** `.claude/settings.json`

Note: AskUserQuestion uses **PreToolUse** (fires before the question renders), while Task uses **PostToolUse** (fires after the agent returns).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "AskUserQuestion",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/notify-on-attention-needed.sh AskUserQuestion"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Task",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/notify-on-attention-needed.sh Task success"
          }
        ]
      }
    ]
  }
}
```

### UX Design Principles Applied

**1. Just-in-time information**
- Notifications only fire when action is required
- No noise for background work in progress

**2. Signal differentiation via speech**
- Same Glass sound for both events (simple, recognizable)
- TTS message differentiates: "Complete" vs "Agent needs feedback"
- Speech is unambiguous even when not looking at screen

**3. Non-intrusive interruption**
- Sound + speech don't steal focus or create UI chrome
- Better than terminal beeping, visual polling, or notification banners
- No notification center clutter to dismiss

**4. Low cognitive overhead**
- Spoken message clearly states what happened
- No need to remember what you delegated
- Sound provides ambient awareness even off-screen

**5. Respects user autonomy**
- User chooses when to respond
- Enables true parallel work (reading, coding elsewhere)

**6. Multimodal accessibility**
- Auditory (system sound) for ambient awareness
- Spoken (TTS) for eyes-free workflows and accessibility
- Redundant signals ensure notification reaches user regardless of context

## Customization Options

**Change voice or speed** (edit the `say` lines in the script):
```bash
# Change voice (run `say -v ?` to see all available voices)
say -v Alex -r 200 "Complete"         # Male voice
say -v Victoria -r 200 "Complete"     # Female voice (British)
say -v Samantha -r 200 "Complete"     # Female voice (US, default)

# Adjust speaking rate
say -v Samantha -r 180 "Complete"     # Slower
say -v Samantha -r 240 "Complete"     # Faster

# Disable TTS entirely — just remove the `say` lines
```

**Change notification sound:**
```bash
# macOS system sounds in /System/Library/Sounds/
# Basso, Blow, Bottle, Frog, Funk, Glass,
# Hero, Morse, Ping, Pop, Purr, Sosumi,
# Submarine, Tink
SOUND_FILE="/System/Library/Sounds/Ping.aiff"
```

**Add more tools to monitor:**
```bash
elif [[ "$TOOL_NAME" == "Bash" && "$STATUS" == "error" ]]; then
    afplay "$SOUND_FILE" 2>/dev/null &
    say -v Samantha -r 200 "Command failed" &
```

## Setup Instructions

1. Create hook file: `.claude/hooks/notify-on-attention-needed.sh`
2. Make executable: `chmod +x .claude/hooks/notify-on-attention-needed.sh`
3. Add hooks to `.claude/settings.json`:
   - **PreToolUse** → `AskUserQuestion` (fires before question renders)
   - **PostToolUse** → `Task` (fires after agent returns)
4. Restart Claude Code to load hooks

## Related Patterns

- **Progress indicators** - For short tasks, show inline spinners
- **Background tasks** - For parallel work, use async task execution
- **Attention management** - Group notifications, add quiet hours, debounce rapid events

## Impact

**Before:** User polls terminal every 30-60 seconds, breaking concentration

**After:** User receives just-in-time notification, returns only when needed

**Result:** True delegation, deeper focus on parallel work, faster feedback loops

## Revision History

| Date | Change |
|------|--------|
| 2026-02-08 | v2: Replaced `osascript` with `afplay` + `say`. Split hooks into PreToolUse (AskUserQuestion) and PostToolUse (Task). Simplified script — removed config vars, inline TTS. |
| 2026-02-05 | v1: Initial implementation with `osascript` notifications, configurable TTS, dual sounds (Glass/Ping). Rolled back due to complexity. |
