# Global Business Quest

An interactive game teaching business etiquette across cultures.

![Game Logo](images/logo.png)

## Quick Start

1. Open Roblox
2. Search for "Global Business Quest" in Experiences
3. Click Play to begin

## Demo Controls

- Mouse/Touch**: Select options, navigate menus
- Keyboard**: Arrow keys to navigate, Enter to select
- ESC: Pause game/access menu

## Demo Content

This prototype includes two playable levels:

- Japan: Business card exchange and greeting protocols
- France: Business dining etiquette

## Key Features

- Interactive business scenarios with multiple-choice etiquette decisions
- Real-time feedback on cultural appropriateness
- Scoring system that tracks your business etiquette competence
- Cross-cultural learning through gameplay

## Project Structure

```
GlobalBusinessQuest/
├── assets/                # Game assets (images, audio)
├── src/                   # Source code
│   ├── GameEngine.lua     # Core game functionality
│   ├── ScenarioManager.lua # Scenario management
│   ├── EtiquetteRules.lua # Cultural etiquette validation
│   └── UI.lua             # User interface components
├── data/                  # Game content
│   ├── japan.json         # Japan scenarios and rules
│   └── france.json        # France scenarios and rules
├── demo_video.mp4         # Demo video (backup if live demo fails)
└── README.md              # This file
```

## Technical Details

- Built with Lua on Roblox platform
- Modular architecture with three layers:
  - Data layer (scenarios, rules, player data)
  - Business logic (game engine, rule validation)
  - Presentation layer (UI, feedback system)
- Leverages Roblox's 3D environment for immersive business scenarios

## Next Steps

- Add more countries (China, UAE, Germany)
- Implement multiplayer mode for role-playing

## Contact

Email: email@xxxx.com
Project repo: github.com/roblox-chase/global-business-quest
