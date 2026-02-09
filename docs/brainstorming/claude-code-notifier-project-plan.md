# Claude Code Notifier - Project Plan

**Complete specification for building claude-code-notifier npm package**

Version: 1.0
Date: 2026-02-07
Status: Ready for implementation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Solution Architecture](#solution-architecture)
4. [Technical Specification](#technical-specification)
5. [Installation & Setup Experience](#installation--setup-experience)
6. [CLI Interface](#cli-interface)
7. [Configuration Schema](#configuration-schema)
8. [Cross-Platform Strategy](#cross-platform-strategy)
9. [API Design](#api-design)
10. [Testing Strategy](#testing-strategy)
11. [Documentation Plan](#documentation-plan)
12. [Distribution & Marketing](#distribution--marketing)
13. [Development Phases](#development-phases)
14. [Success Metrics](#success-metrics)
15. [Open Questions](#open-questions)

---

## Project Overview

**claude-code-notifier** is a cross-platform notification system for Claude Code hooks that provides multimodal feedback when agent work completes or requires user attention.

### What It Is

An npm package that integrates with Claude Code's hook system to send:
- **Visual** notifications (system banners)
- **Auditory** signals (system sounds)
- **Spoken** announcements (text-to-speech)

When:
- Agents complete tasks (Task tool finishes)
- Agents need user input (AskUserQuestion blocks)
- Commands fail (optional)
- Long-running operations complete (optional)

### Why It Exists

**Job to Be Done:** When I delegate work to a Claude Code agent, I want to know when it needs my attention, so I can context-switch away and return at the right moment without constantly checking.

**Problem Solved:** Users must poll terminal or miss blocking questions, creating friction in delegation workflow.

### Core Value

- True delegation - work in parallel without polling
- Multimodal awareness - visual, auditory, and spoken feedback
- Accessible - works for eyes-free workflows
- Cross-platform - macOS, Linux, Windows support
- Easy setup - interactive wizard, zero-config defaults

---

## Problem Statement

### User Pain Points

1. **Constant Polling** - Must check terminal every 30-60s to see if agent finished
2. **Missed Questions** - Agent blocks waiting for input while user is away
3. **Broken Flow** - Frequent checking breaks concentration on parallel work
4. **No Peripheral Awareness** - Terminal provides no ambient signals

### Current Workarounds

- Set timer and check periodically (unreliable)
- Stay in terminal watching output (defeats delegation)
- Use window management to keep terminal visible (screen real estate cost)

### Impact

- **Before:** User polls every 30-60s, breaking concentration
- **After:** Just-in-time notification, return only when needed
- **Result:** True delegation, deeper focus, faster feedback loops

---

## Solution Architecture

### High-Level Design

```
Claude Code Hook System
        ↓
PostToolUse Hook (Task, AskUserQuestion)
        ↓
cc-notify.sh (installed by package)
        ↓
Platform-Specific Notifiers
        ↓
User Sees/Hears Notification
```

### Components

**1. CLI Tool (`bin/cc-notify`)**
- Setup wizard
- Configuration management
- Manual notification sending
- Testing utilities

**2. Hook Script (`hooks/cc-notify.sh`)**
- Receives tool name and status from Claude Code
- Reads configuration
- Dispatches to platform notifiers

**3. Platform Notifiers (`src/notifiers/`)**
- macOS: `osascript`, `say`
- Linux: `notify-send`, `espeak`
- Windows: PowerShell Toast, System.Speech

**4. Configuration System (`src/config.js`)**
- Default settings
- User overrides
- Schema validation

---

## Technical Specification

### Package Structure

```
claude-code-notifier/
├── package.json
├── README.md
├── LICENSE (MIT)
├── .gitignore
├── bin/
│   └── cc-notify.js          # CLI entry point
├── src/
│   ├── index.js              # Main export for programmatic use
│   ├── cli.js                # CLI command handlers
│   ├── setup.js              # Interactive setup wizard
│   ├── config.js             # Configuration loader/validator
│   ├── notifiers/
│   │   ├── index.js          # Platform detection
│   │   ├── macos.js          # macOS implementation
│   │   ├── linux.js          # Linux (libnotify + espeak)
│   │   └── windows.js        # Windows (PowerShell)
│   └── utils/
│       ├── logger.js         # Console logging
│       └── validator.js      # Config validation
├── hooks/
│   └── cc-notify.sh          # Shell script for Claude Code
├── config/
│   └── default.json          # Default configuration
├── test/
│   ├── unit/
│   ├── integration/
│   └── platform/
└── docs/
    ├── setup.md
    ├── configuration.md
    └── api.md
```

### Dependencies

**Runtime:**
- No heavy dependencies - use Node.js built-ins where possible
- `chalk` - Terminal colors (optional, for CLI UX)
- `inquirer` - Interactive prompts (setup wizard)

**Development:**
- `jest` - Testing
- `eslint` - Linting
- `prettier` - Formatting

**Platform-Specific (optional dependencies):**
- None - use system commands via child_process

### Node.js Version

- **Minimum:** Node 18+ (LTS)
- **Recommended:** Node 20+
- Use ES modules (`"type": "module"` in package.json)

### Key Technologies

**macOS:**
- `osascript` - System notifications
- `say` - Text-to-speech
- System sounds (built-in)

**Linux:**
- `notify-send` - Desktop notifications (libnotify)
- `paplay`/`aplay` - Sound playback
- `espeak` or `spd-say` - TTS

**Windows:**
- PowerShell `New-BurntToastNotification` - Toast notifications
- PowerShell `Add-Type System.Speech` - TTS
- `[System.Media.SystemSounds]` - System sounds

---

## Installation & Setup Experience

### Installation Methods

**Global (recommended):**
```bash
npm install -g claude-code-notifier
cc-notify setup
```

**Project-local:**
```bash
npm install --save-dev claude-code-notifier
npx cc-notify setup
```

**Quick setup (non-interactive):**
```bash
npx claude-code-notifier setup --quick
```

### Setup Wizard Flow

**Interactive Setup (Default):**

```
Welcome to Claude Code Notifier!

This tool adds notifications when agents complete tasks or need feedback.

? Where is your .claude directory? [auto-detected: /Users/you/project/.claude]

? Which events should trigger notifications?
  [x] Task completion
  [x] Question asked (AskUserQuestion)
  [ ] Command errors (Bash failures)
  [ ] Long-running commands (>30s)

? Notification preferences:
  [x] Visual (system notifications)
  [x] Auditory (system sounds)
  [x] Spoken (text-to-speech)

? TTS Voice: [Samantha ▼]
  Samantha (US Female)
  Alex (US Male)
  Victoria (UK Female)
  Daniel (UK Male)

? Speaking Rate: [200 wpm]

✓ Created hook: .claude/hooks/cc-notify.sh
✓ Updated settings: .claude/settings.json
✓ Configuration saved: .claude/notifier-config.json

Test your setup:
  cc-notify test

Get help:
  cc-notify --help
```

**Quick Setup (Non-Interactive):**

Uses all defaults:
- Events: Task, AskUserQuestion
- Visual: enabled
- Auditory: enabled (Glass/Ping sounds)
- TTS: enabled (default system voice, 200 wpm)

```bash
cc-notify setup --quick
# ✓ Setup complete with defaults
```

### File Modifications

**1. Creates hook script:**
`.claude/hooks/cc-notify.sh`

**2. Updates Claude settings:**
`.claude/settings.json` - adds PostToolUse hook entry

**3. Creates config file:**
`.claude/notifier-config.json` - user preferences

---

## CLI Interface

### Commands

**Setup:**
```bash
cc-notify setup                    # Interactive wizard
cc-notify setup --quick            # Use defaults
cc-notify setup --config ./cfg.json # Use config file
cc-notify setup --claude-dir ./custom/.claude # Specify directory
```

**Test:**
```bash
cc-notify test                     # Test all notification types
cc-notify test --visual            # Test visual only
cc-notify test --auditory          # Test sound only
cc-notify test --tts               # Test TTS only
```

**Configuration:**
```bash
cc-notify config --voice Alex      # Change TTS voice
cc-notify config --rate 220        # Change TTS speed
cc-notify config --disable-tts     # Turn off TTS
cc-notify config --enable-tts      # Turn on TTS
cc-notify config --list-voices     # Show available voices
cc-notify config --show            # Display current config
```

**Manual Trigger:**
```bash
cc-notify send "Task completed" --sound Glass
cc-notify send "Build failed" --sound Basso --tts
cc-notify send "Agent needs feedback" --type question
```

**Uninstall:**
```bash
cc-notify uninstall                # Remove hooks and config
cc-notify uninstall --keep-config  # Remove hooks only
```

**Help:**
```bash
cc-notify --help
cc-notify <command> --help
```

### Exit Codes

- `0` - Success
- `1` - General error
- `2` - Configuration error
- `3` - Platform not supported
- `4` - Claude directory not found

---

## Configuration Schema

### File Location

`.claude/notifier-config.json` (project-specific)

### Schema

```json
{
  "version": "1.0.0",
  "notifications": {
    "visual": {
      "enabled": true,
      "title": "Claude Code",
      "duration": 5000
    },
    "auditory": {
      "enabled": true,
      "sounds": {
        "taskComplete": "Glass",
        "questionAsked": "Ping",
        "error": "Basso"
      }
    },
    "tts": {
      "enabled": true,
      "voice": "Samantha",
      "rate": 200,
      "messages": {
        "taskComplete": "Task completed",
        "questionAsked": "Agent needs feedback",
        "error": "Command failed"
      }
    }
  },
  "events": {
    "Task": {
      "onSuccess": "taskComplete",
      "onError": "error"
    },
    "AskUserQuestion": {
      "onUse": "questionAsked"
    },
    "Bash": {
      "onError": "error",
      "longRunningThreshold": 30000
    }
  },
  "platform": {
    "name": "darwin",
    "ttsCommand": "say",
    "notifyCommand": "osascript"
  }
}
```

### Configuration Options

**notifications.visual:**
- `enabled` (boolean) - Show system notifications
- `title` (string) - Notification title
- `duration` (number) - Display time in ms

**notifications.auditory:**
- `enabled` (boolean) - Play system sounds
- `sounds` (object) - Sound names per event type

**notifications.tts:**
- `enabled` (boolean) - Use text-to-speech
- `voice` (string) - TTS voice name
- `rate` (number) - Speaking rate (WPM)
- `messages` (object) - Custom messages per event

**events:**
- Tool name → trigger configuration
- `onSuccess`, `onError`, `onUse` - event handlers
- `longRunningThreshold` - milliseconds for long-run detection

---

## Cross-Platform Strategy

### Platform Detection

```javascript
// src/notifiers/index.js
const platform = process.platform;

export function getNotifier() {
  switch (platform) {
    case 'darwin':
      return import('./macos.js');
    case 'linux':
      return import('./linux.js');
    case 'win32':
      return import('./windows.js');
    default:
      throw new Error(`Platform ${platform} not supported`);
  }
}
```

### macOS Implementation

**Visual:**
```bash
osascript -e 'display notification "Message" with title "Title" sound name "Glass"'
```

**TTS:**
```bash
say -v Samantha -r 200 "Task completed" &
```

**Available Voices:**
- Samantha (US Female)
- Alex (US Male)
- Victoria (UK Female)
- Daniel (UK Male)
- Moira (Irish)
- Karen (Australian)

**Sound Names:**
Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink

### Linux Implementation

**Visual:**
```bash
notify-send "Title" "Message" -u normal -t 5000
```

**Auditory:**
```bash
paplay /usr/share/sounds/freedesktop/stereo/complete.oga
# or
aplay notification.wav
```

**TTS:**
```bash
espeak "Task completed" -s 200 &
# or
spd-say "Task completed" -r 200 &
```

**Fallback Strategy:**
1. Try `notify-send` (most common)
2. Fall back to `zenity --notification`
3. Fall back to terminal output with bell

### Windows Implementation

**Visual (PowerShell):**
```powershell
New-BurntToastNotification -Text "Title", "Message" -Sound "Default"
```

**Auditory:**
```powershell
[System.Media.SystemSounds]::Asterisk.Play()
```

**TTS:**
```powershell
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = 0
$synth.Speak("Task completed")
```

### Graceful Degradation

If a notification channel fails:
1. Log warning (don't crash)
2. Attempt other channels
3. Minimum: terminal output with bell character

**Priority:**
Visual > Auditory > TTS > Terminal output

---

## API Design

### Programmatic Usage

```javascript
import { notify, setupHook, config } from 'claude-code-notifier';

// Send notification
await notify({
  type: 'taskComplete',
  message: 'Task completed',
  sound: 'Glass',
  speak: true
});

// Custom notification
await notify({
  visual: { title: 'Custom', message: 'Done!' },
  auditory: { sound: 'Ping' },
  tts: { message: 'All done', voice: 'Samantha', rate: 200 }
});

// Setup hook programmatically
await setupHook({
  claudeDir: './.claude',
  events: ['Task', 'AskUserQuestion'],
  config: {
    tts: { voice: 'Alex', rate: 220 }
  }
});

// Get/set config
const cfg = config.get();
config.set('tts.voice', 'Alex');
config.save();
```

### Hook Script Interface

The shell script receives arguments from Claude Code:

```bash
cc-notify.sh <TOOL_NAME> <STATUS>

# Examples:
cc-notify.sh Task success
cc-notify.sh AskUserQuestion use
cc-notify.sh Bash error
```

Script reads config and dispatches to notifiers.

---

## Testing Strategy

### Unit Tests

**What to test:**
- Configuration loading/validation
- Platform detection
- Message formatting
- Voice name validation
- Sound name mapping

**Tools:** Jest

**Location:** `test/unit/`

**Example:**
```javascript
describe('Config', () => {
  it('loads default config', () => {
    const cfg = loadConfig();
    expect(cfg.notifications.tts.enabled).toBe(true);
  });

  it('validates TTS voice', () => {
    expect(() => validateVoice('InvalidVoice')).toThrow();
  });
});
```

### Integration Tests

**What to test:**
- CLI commands execute correctly
- Hook installation modifies settings.json
- Configuration file creation
- Uninstall cleanup

**Tools:** Jest with file system mocks

**Location:** `test/integration/`

### Platform-Specific Tests

**What to test:**
- macOS: osascript and say commands work
- Linux: notify-send and espeak work
- Windows: PowerShell commands work

**Approach:**
- Run on actual platforms (GitHub Actions matrix)
- Mock command execution in unit tests
- Real execution in CI/CD

**Location:** `test/platform/`

### CI/CD Testing

**GitHub Actions Matrix:**
```yaml
strategy:
  matrix:
    os: [macos-latest, ubuntu-latest, windows-latest]
    node: [18, 20]
```

**Test Flow:**
1. Install dependencies
2. Run unit tests (all platforms)
3. Run integration tests
4. Run platform-specific tests
5. Build and package
6. Test installation (npm install -g)

---

## Documentation Plan

### README.md

**Sections:**
1. **Quick Start** - Installation and 30-second setup
2. **Features** - Visual, auditory, TTS with examples
3. **Installation** - npm install methods
4. **Setup** - Interactive wizard walkthrough
5. **Configuration** - Config file schema and options
6. **CLI Reference** - All commands with examples
7. **Troubleshooting** - Common issues
8. **Contributing** - How to contribute
9. **License** - MIT

**Badges:**
- npm version
- npm downloads
- CI status
- License
- Node version

### docs/setup.md

**Detailed setup guide:**
- Prerequisites (Node.js version)
- Installation steps (global vs local)
- Interactive wizard walkthrough
- Quick setup (--quick flag)
- Custom configuration
- Verifying installation

### docs/configuration.md

**Configuration reference:**
- Full schema documentation
- All configuration options
- Platform-specific settings
- Custom sounds
- Custom TTS voices
- Event configuration
- Examples for common scenarios

### docs/api.md

**Programmatic API:**
- `notify()` function signature
- `setupHook()` usage
- `config` methods
- TypeScript types (if added)
- Error handling
- Examples

### Examples

**examples/basic.js:**
```javascript
import { notify } from 'claude-code-notifier';

await notify({
  type: 'taskComplete',
  message: 'Build finished'
});
```

**examples/custom.js:**
```javascript
import { notify, config } from 'claude-code-notifier';

// Custom configuration
config.set('tts.voice', 'Alex');
config.set('tts.rate', 250);

await notify({
  visual: { title: 'Deployment', message: 'Production live!' },
  auditory: { sound: 'Hero' },
  tts: { message: 'Deployment complete' }
});
```

---

## Distribution & Marketing

### NPM Publishing

**Package Name:** `claude-code-notifier`

**Publish Command:**
```bash
npm publish --access public
```

**Version Strategy:** Semantic Versioning
- 0.1.0 - Initial alpha release
- 0.2.0 - Add Linux support
- 0.3.0 - Add Windows support
- 1.0.0 - Stable cross-platform release

**package.json Metadata:**
```json
{
  "name": "claude-code-notifier",
  "version": "1.0.0",
  "description": "Multimodal notifications for Claude Code agent completion",
  "keywords": ["claude-code", "notifications", "tts", "cli", "developer-tools"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/claude-code-notifier"
  },
  "bugs": {
    "url": "https://github.com/username/claude-code-notifier/issues"
  },
  "homepage": "https://github.com/username/claude-code-notifier#readme"
}
```

### GitHub Repository

**Structure:**
```
.github/
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
  workflows/
    test.yml          # Run tests on push
    publish.yml       # Publish to npm on release
    platform-test.yml # Test all platforms

README.md
CONTRIBUTING.md
CHANGELOG.md
CODE_OF_CONDUCT.md
LICENSE (MIT)
```

**GitHub Actions - Publish Workflow:**
```yaml
name: Publish to NPM
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Marketing & Launch

**Blog Post:** "Never Miss an Agent Completion Again"
- Problem statement
- Demo GIF showing notification in action
- Installation guide
- Use cases

**Social Media:**
- Twitter/X thread with demo video
- Reddit: r/ClaudeCode (when it exists), r/programming, r/commandline
- Hacker News Show HN post

**Community:**
- Announce in Claude.ai Community Forum
- Post in Anthropic Discord (if available)
- Share in developer communities

**Demo Assets:**
- Screen recording showing agent → notification flow
- GIF of setup wizard
- Screenshot of config file

---

## Development Phases

### Phase 1: MVP (macOS Only) - Week 1

**Goal:** Working notification system for macOS with core features

**Tasks:**
1. Project setup (package.json, folder structure, ES modules)
2. CLI framework (commander or yargs)
3. macOS notifier implementation (osascript, say)
4. Basic config system (JSON file)
5. Hook script (cc-notify.sh for macOS)
6. Setup command (interactive wizard)
7. Test command
8. README with macOS instructions

**Deliverables:**
- ✅ Installable via `npm install -g`
- ✅ `cc-notify setup` works on macOS
- ✅ Hook integration with Claude Code
- ✅ Visual + Auditory + TTS working
- ✅ Basic tests

**Acceptance:**
- Install, run setup, trigger notification manually
- Hook triggers notification when agent completes
- TTS voice configurable

### Phase 2: Cross-Platform - Week 2

**Goal:** Linux and Windows support

**Tasks:**
1. Platform detection abstraction
2. Linux notifier (notify-send, espeak)
3. Windows notifier (PowerShell)
4. Platform-specific tests
5. CI/CD matrix (macOS, Linux, Windows)
6. Update docs for all platforms

**Deliverables:**
- ✅ Works on Ubuntu/Debian
- ✅ Works on Windows 10/11
- ✅ Graceful degradation if tools missing
- ✅ Platform-specific documentation

### Phase 3: Polish & Features - Week 3

**Goal:** Advanced features and UX improvements

**Tasks:**
1. Configuration validation
2. Custom sounds support
3. DND (Do Not Disturb) integration
4. Notification history
5. Better error messages
6. Uninstall command
7. API documentation
8. More examples

**Deliverables:**
- ✅ `cc-notify config` command family
- ✅ Validation with helpful errors
- ✅ DND hours configuration
- ✅ History log (optional)

### Phase 4: Community & Docs - Week 4

**Goal:** Launch-ready with excellent documentation

**Tasks:**
1. Documentation site (GitHub Pages or Vercel)
2. Video tutorial
3. Contributing guide
4. Code of conduct
5. Issue templates
6. Release checklist
7. npm publish automation
8. Community outreach plan

**Deliverables:**
- ✅ Documentation site live
- ✅ Video demo published
- ✅ Ready for 1.0 release
- ✅ Marketing materials prepared

---

## Success Metrics

### Adoption Metrics

**Primary:**
- npm downloads per week (target: 100+ within first month)
- GitHub stars (target: 50+ within first month)
- Active installations (if telemetry added)

**Secondary:**
- Issues opened (engagement signal)
- PRs submitted (community interest)
- Forks (customization/contribution interest)

### Quality Metrics

- Issue resolution time (target: <48 hours)
- Test coverage (target: >80%)
- Zero critical bugs in production
- CI/CD pass rate (target: >95%)

### User Satisfaction

- Positive feedback in issues/comments
- Low uninstall rate (if measurable)
- Feature requests (shows usage)
- Testimonials/tweets

---

## Open Questions

### Decisions Needed Before Starting

1. **Package Name**
   - `claude-code-notifier` (descriptive)
   - `cc-notify` (short, memorable)
   - `@claude-hooks/notifications` (scoped)
   - **Recommendation:** `claude-code-notifier` for discoverability

2. **License**
   - MIT (most permissive, encourages adoption)
   - Apache 2.0 (patent protection)
   - **Recommendation:** MIT

3. **Scope for MVP**
   - macOS-only first, then expand (faster launch)
   - All platforms from start (delayed launch, more complex)
   - **Recommendation:** macOS-only MVP, add platforms in Phase 2

4. **Dependencies**
   - Minimize (use child_process, no extra deps)
   - Use libraries (node-notifier, etc.)
   - **Recommendation:** Minimize - keep it lightweight

5. **Configuration Format**
   - JSON (standard, easy to parse)
   - YAML (human-friendly, requires parser)
   - Both supported
   - **Recommendation:** JSON (no extra deps)

6. **Target Audience**
   - Solo developers only
   - Teams (Slack/Discord integrations)
   - **Recommendation:** Solo developers MVP, teams later

7. **Telemetry**
   - None (privacy-first)
   - Opt-in anonymous usage stats
   - **Recommendation:** None for MVP, consider opt-in later

### Technical Questions

1. **How to handle missing TTS on Linux?**
   - Fail gracefully, disable TTS
   - Prompt user to install espeak
   - **Recommendation:** Detect on setup, warn if missing, disable gracefully

2. **Should we bundle sounds or use system sounds?**
   - System sounds (platform-specific, no bundling)
   - Custom sound pack (consistent, larger package)
   - **Recommendation:** System sounds MVP, custom packs as Phase 3 feature

3. **How to handle multiple Claude projects?**
   - Project-specific config (current approach)
   - Global config with overrides
   - **Recommendation:** Project-specific, with global fallback option later

---

## Appendix: Reference Implementation

### Working macOS Hook (Proven)

This is the battle-tested implementation from `/Users/cdunbar/Repos/port-temp/.claude/hooks/notify-on-attention-needed.sh`:

```bash
#!/bin/bash

# Hook: Notify when user attention is needed
# Triggers: After Task completion or AskUserQuestion
# Purpose: Send system notification + TTS so user knows to focus back

TOOL_NAME="$1"
STATUS="$2"

# Configuration
ENABLE_TTS=true  # Set to false to disable text-to-speech
TTS_VOICE="Samantha"  # Options: Samantha, Alex, Victoria, Daniel, Karen, Moira, Tessa
TTS_RATE=200  # Speaking rate (words per minute, default 175)

# Check if this is a tool we care about
if [[ "$TOOL_NAME" == "Task" && "$STATUS" == "success" ]]; then
    # Agent finished working
    MESSAGE="Task completed"
    osascript -e 'display notification "Agent has completed its work" with title "Claude Code" sound name "Glass"'

    if [[ "$ENABLE_TTS" == true ]]; then
        say -v "$TTS_VOICE" -r "$TTS_RATE" "$MESSAGE" &
    fi

elif [[ "$TOOL_NAME" == "AskUserQuestion" ]]; then
    # Claude is asking a question
    MESSAGE="Agent needs feedback"
    osascript -e 'display notification "Claude is asking you a question" with title "Claude Code" sound name "Ping"'

    if [[ "$ENABLE_TTS" == true ]]; then
        say -v "$TTS_VOICE" -r "$TTS_RATE" "$MESSAGE" &
    fi
fi

exit 0
```

**This implementation is PROVEN to work.** The npm package should replicate this behavior across platforms.

---

## Next Steps

To start building this project in a fresh repository:

1. **Create new repo:** `claude-code-notifier`
2. **Copy this document** to the repo as `PROJECT_PLAN.md`
3. **Start with Phase 1** (macOS MVP)
4. **Reference the working hook** in Appendix for implementation guidance

**First Tasks:**
1. Initialize npm package (`npm init`)
2. Set up folder structure (bin/, src/, hooks/, test/)
3. Create CLI entry point (bin/cc-notify.js)
4. Implement macOS notifier (src/notifiers/macos.js)
5. Create setup wizard (src/setup.js)
6. Write hook script (hooks/cc-notify.sh)
7. Add tests (test/unit/, test/integration/)
8. Write README with macOS instructions

**You now have everything needed to build claude-code-notifier from scratch.**

