# NPM Package Brainstorm: Claude Code Notifications

## Package Concept

**Name Ideas:**
- `claude-code-notifier`
- `@claude-hooks/notifications`
- `cc-notify` (simple, memorable)
- `agent-notifier`
- `claude-attention`

**Tagline:** "Multimodal notifications for Claude Code agent completion"

## Core Value Proposition

A cross-platform notification system for Claude Code hooks that provides:
- Visual notifications (system banners)
- Auditory signals (system sounds)
- Spoken announcements (TTS)
- Easy configuration via JSON or CLI
- Extensible event handling

## Package Structure

```
claude-code-notifier/
├── package.json
├── README.md
├── LICENSE (MIT)
├── bin/
│   └── cc-notify          # CLI entry point
├── src/
│   ├── index.js           # Main export
│   ├── notifiers/
│   │   ├── macos.js       # macOS implementation
│   │   ├── linux.js       # Linux (libnotify)
│   │   └── windows.js     # Windows (PowerShell)
│   ├── tts/
│   │   ├── macos.js       # say command
│   │   ├── linux.js       # espeak/festival
│   │   └── windows.js     # PowerShell Add-Type
│   └── config.js          # Configuration loader
├── hooks/
│   └── notify-on-attention-needed.sh  # Pre-built hook
├── config/
│   └── default.json       # Default configuration
└── docs/
    ├── setup.md           # Installation guide
    └── customization.md   # Advanced config
```

## Installation Experience

```bash
# Install globally
npm install -g claude-code-notifier

# Install in project
npm install --save-dev claude-code-notifier

# Setup wizard (interactive)
npx claude-code-notifier setup

# Or quick setup (non-interactive)
npx claude-code-notifier setup --quick
```

## Setup Wizard Flow

```
Welcome to Claude Code Notifier!

This tool adds notifications when agents complete tasks or need feedback.

Where is your .claude directory? [auto-detected: /Users/you/project/.claude]

Which events should trigger notifications?
[x] Task completion
[x] Question asked (AskUserQuestion)
[ ] Command errors (Bash failures)
[ ] Long-running commands (>30s)

Notification preferences:
[x] Visual (system notifications)
[x] Auditory (system sounds)
[x] Spoken (text-to-speech)

TTS Voice: [Samantha ▼]
Speaking Rate: [200 wpm]

✓ Created hook: .claude/hooks/cc-notify.sh
✓ Updated settings: .claude/settings.json
✓ Configuration saved: .claude/notifier-config.json

Test your setup:
  cc-notify test

Get help:
  cc-notify --help
```

## CLI Interface

```bash
# Setup
cc-notify setup                    # Interactive wizard
cc-notify setup --quick            # Use defaults
cc-notify setup --config ./cfg.json # Use config file

# Test
cc-notify test                     # Test all notification types
cc-notify test --visual            # Test visual only
cc-notify test --tts               # Test TTS only

# Configure
cc-notify config --voice Alex      # Change TTS voice
cc-notify config --rate 220        # Change TTS speed
cc-notify config --disable-tts     # Turn off TTS
cc-notify config --enable-tts      # Turn on TTS
cc-notify config --list-voices     # Show available voices

# Trigger manually (for testing/automation)
cc-notify send "Task completed" --sound Glass
cc-notify send "Build failed" --sound Basso --tts

# Uninstall
cc-notify uninstall                # Remove hooks and config
```

## Configuration File

`.claude/notifier-config.json`

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
  }
}
```

## Cross-Platform Support

### macOS
- Visual: `osascript -e 'display notification'`
- Auditory: System sounds via `osascript`
- TTS: `say` command

### Linux
- Visual: `notify-send` (libnotify)
- Auditory: `paplay` or `aplay` with custom sound files
- TTS: `espeak`, `festival`, or `spd-say`

### Windows
- Visual: PowerShell `New-BurntToastNotification` or Windows 10 Toast
- Auditory: `[System.Media.SystemSounds]::Asterisk.Play()`
- TTS: PowerShell `Add-Type -AssemblyName System.Speech`

## API Design

```javascript
// Programmatic usage
const { notify, setupHook, config } = require('claude-code-notifier');

// Send notification
await notify({
  type: 'taskComplete',
  message: 'Task completed',
  sound: 'Glass',
  speak: true
});

// Setup hook programmatically
await setupHook({
  claudeDir: './.claude',
  events: ['Task', 'AskUserQuestion'],
  config: { tts: { voice: 'Samantha' } }
});

// Get/set config
const cfg = config.get();
config.set('tts.voice', 'Alex');
config.save();
```

## Advanced Features

### 1. Custom Sound Packs
```bash
cc-notify sounds install retro-pack
cc-notify sounds list
cc-notify sounds preview Glass
```

### 2. Do Not Disturb Integration
```bash
cc-notify config --dnd-hours 22-7  # Quiet hours
cc-notify config --dnd-check       # Respect system DND
```

### 3. Notification History
```bash
cc-notify history                  # Show recent notifications
cc-notify history --today
cc-notify history --clear
```

### 4. Webhooks/Integrations
```json
{
  "integrations": {
    "slack": {
      "enabled": true,
      "webhook": "https://hooks.slack.com/...",
      "events": ["taskComplete"]
    },
    "discord": {
      "enabled": true,
      "webhook": "https://discord.com/api/webhooks/...",
      "events": ["error"]
    }
  }
}
```

### 5. Analytics/Insights
```bash
cc-notify stats                    # Show notification stats
# Output:
# Tasks completed today: 42
# Questions asked: 8
# Average task duration: 2m 14s
# Most active agent: Explore (23 runs)
```

## Distribution Strategy

### NPM Package
- Publish to npmjs.org as `claude-code-notifier`
- Semantic versioning
- GitHub releases with changelog

### GitHub Repository
```
github.com/username/claude-code-notifier
├── README.md (badges, demo GIF, quick start)
├── CONTRIBUTING.md
├── CHANGELOG.md
└── .github/
    ├── workflows/
    │   ├── test.yml
    │   └── publish.yml
    └── ISSUE_TEMPLATE/
```

### Documentation Site
- GitHub Pages or Vercel
- Interactive examples
- Configuration playground
- Video demos

### Marketing
- Blog post: "Never Miss an Agent Completion Again"
- Tweet thread with demo video
- Reddit: r/ClaudeCode, r/programming
- Hacker News launch
- Claude.ai Community Forum

## Monetization Options (if applicable)

**Free (Core):**
- Basic notifications (visual, auditory, TTS)
- Single-user setup
- Open source (MIT)

**Pro (Optional):**
- Team notifications (Slack/Discord)
- Advanced analytics dashboard
- Custom sound packs
- Priority support

## Technical Challenges

### 1. Platform Detection
```javascript
const platform = process.platform;
const notifier = require(`./notifiers/${platform}.js`);
```

### 2. Graceful Degradation
If TTS unavailable, fall back to visual + auditory

### 3. Permission Handling
Some systems require notification permissions

### 4. Testing
- Unit tests for each notifier
- Integration tests with mock Claude Code environment
- CI/CD with GitHub Actions

### 5. Hook Installation
- Auto-detect `.claude` directory
- Merge with existing hooks (don't overwrite)
- Validate settings.json syntax

## Success Metrics

- NPM downloads per week
- GitHub stars
- Issue resolution time
- Community contributions
- Positive feedback/testimonials

## Phase 1 MVP (Week 1-2)

- [x] macOS support only
- [x] Basic CLI (`setup`, `test`)
- [x] Core notifications (visual, auditory, TTS)
- [x] Two events: Task, AskUserQuestion
- [x] Simple config file
- [x] README with setup instructions
- [ ] Publish to npm

## Phase 2 Features (Week 3-4)

- [ ] Linux support
- [ ] Windows support
- [ ] Advanced config options
- [ ] Custom sounds
- [ ] DND integration
- [ ] Notification history

## Phase 3 Integrations (Month 2)

- [ ] Slack/Discord webhooks
- [ ] Analytics/stats
- [ ] Documentation site
- [ ] Video tutorials
- [ ] Community templates

## Questions to Answer

1. **License:** MIT (most permissive) or Apache 2.0?
2. **Name:** Which package name resonates best?
3. **Scope:** Start macOS-only or delay for cross-platform?
4. **Dependencies:** Minimize or use libraries like `node-notifier`?
5. **Configuration:** YAML, JSON, or both?
6. **Target audience:** Solo developers or teams?

## Competitive Landscape

**Existing tools:**
- `node-notifier` - Generic notifications, no TTS
- `terminal-notifier` - macOS only, no config
- Custom shell scripts - Not cross-platform

**Our advantage:**
- Built specifically for Claude Code
- Multimodal (visual + audio + TTS)
- Easy setup wizard
- Cross-platform vision
- Event-driven configuration

## Next Steps

1. **Validate interest:** Post in Claude Code community, gauge feedback
2. **Choose name:** Poll or decide on branding
3. **Create repo:** Initialize with package structure
4. **Build MVP:** macOS support with core features
5. **Alpha test:** Dogfood internally, gather feedback
6. **Polish docs:** README, setup guide, examples
7. **Publish v0.1.0:** npm + GitHub release
8. **Announce:** Blog, social media, forums
9. **Iterate:** Community feedback → roadmap

## Code Name Ideas

For internal development before launch:
- Project Echo
- Project Beacon
- Project Ping
- Project Attention
- Project Signal
