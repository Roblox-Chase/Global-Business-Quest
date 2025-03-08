# Global Business Quest

## Overview

Global Business Quest is an interactive educational game that teaches international business etiquette through engaging scenarios. This browser-based version uses Three.js to create immersive 3D environments where players navigate business situations in different countries and make culturally appropriate etiquette decisions.

## Features

- **Authentic Cultural Scenarios**: Learn real business customs from different countries
- **Interactive Decision Points**: Test your cultural knowledge in realistic business situations
- **Educational Feedback**: Receive immediate explanations about cultural practices
- **Progression System**: Unlock new countries and scenarios as you demonstrate mastery
- **3D Environments**: Experience business settings across different cultures
- **No Installation Required**: Access directly through any modern web browser

## Current Countries

- **Japan**: Navigate formal business meetings in Tokyo and learn proper business card etiquette, appropriate greetings, and meeting protocols
- **France**: Master the art of business lunches in Paris, including proper dining etiquette, conversation topics, and timing for business discussions

## Technical Architecture

This application is built with the following technologies:

- **Three.js**: Provides 3D rendering capabilities for immersive environments
- **JavaScript (ES6+)**: Core programming language for game logic and interactions
- **HTML5/CSS3**: Structure and styling for UI components
- **Responsive Design**: Adapts to different screen sizes for desktop and mobile play

## How to Play

1. Select a country to begin a business scenario
2. Read each situation carefully and consider cultural context
3. Choose the most appropriate response from the options provided
4. Receive feedback on your choice and learn about the cultural reasoning
5. Complete scenarios to earn Cultural Competence points
6. Unlock new countries and scenarios as you progress

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/Roblox-Chase/global-business-quest.git
cd global-business-quest
```

2. Start a local server (using Python or Node.js)
```bash
# Python 3
python -m http.server

# OR with Node.js
npx serve
```

3. Open your browser at `http://localhost:8000` (or the port provided by your server)

## Project Structure

```
global-business-quest/
│
├── index.html               # Main HTML file
├── game.js                  # Main game JavaScript file
├── styles.css               # CSS styles 
│
├── assets/                  # Game assets directory
│   ├── models/              # 3D models
│   ├── textures/            # Textures for 3D models
│   └── sounds/              # Sound effects and music
│
├── js/                      # Additional JavaScript modules
│   ├── countries/           # Country-specific logic
│   │   ├── japan.js         # Japan scenarios and content
│   │   └── france.js        # France scenarios and content
│   │
│   ├── scenarios.js         # Scenario management
│   ├── interactions.js      # Player interaction handling
│   └── ui.js                # UI components and management
│
└── README.md                # Project documentation
```

## Customization and Expansion

### Adding New Countries

To add a new country to the game:

1. Create a new country module in `js/countries/` following the pattern in existing files
2. Design cultural scenarios with decision points and appropriate feedback
3. Create 3D models and environments for the country's business settings
4. Add the country to the main game configuration

### Customizing Existing Content

Each country module contains:
- Country metadata (name, description, difficulty)
- Cultural scenarios with decision points
- Business setting descriptions
- Character interactions
- Educational feedback for player choices

These can be modified to update content or adjust difficulty levels.

## Deployment

The application can be deployed to any static web hosting service:

1. **GitHub Pages**: Primary deployment for GBQ 
2. **Vercel**: Acts an a secondary backup in case GitHub Pages is not working for primary deployment

For production deployment, consider:
- Minifying JavaScript and CSS files
- Optimizing 3D models and textures
- Implementing asset loading strategies for faster initial load

## Future Development Roadmap

Planned enhancements for future versions:

1. **Additional Countries**: Germany, China, Brazil, India, and UAE
2. **Advanced Scenarios**: Negotiation, conflict resolution, and team management
3. **Multiplayer Mode**: Collaborate with other players in international business simulations
4. **Custom Avatar Creation**: Personalize your business representative
5. **Language Learning Elements**: Basic business phrases in each country's language

## Educational Applications

Global Business Quest is designed for:

- **Business Schools**: Supplement international business courses
- **Corporate Training**: Prepare employees for international assignments
- **Individual Learners**: Self-paced education for entrepreneurs and professionals
- **Cultural Studies**: Practical application of intercultural communication theories

## Contact
For questions, suggestions, or collaboration opportunities, please contact Chase:

Email: robloxmanmail601@gmail.com
Project repo: github.com/roblox-chase/global-business-quest
