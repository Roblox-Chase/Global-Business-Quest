// Global Business Quest - Scenario Management
// This file manages the game scenarios, interactions and cultural learning outcomes
// Integrates with TokyoOfficeEnvironment and ParisRestaurantEnvironment models

// Scenario class to handle individual business scenarios
class Scenario {
  constructor(id, title, description, scene, interactions) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.scene = scene;
    this.interactions = interactions;
    this.completed = false;
    this.playerChoices = [];
  }

  // Record player choice for analytics
  recordChoice(interactionId, optionSelected) {
    this.playerChoices.push({
      interactionId: interactionId,
      selectedOption: optionSelected,
      timestamp: new Date()
    });
  }

  // Calculate score based on correct choices
  calculateScore() {
    let score = 0;
    this.playerChoices.forEach(choice => {
      if (choice.selectedOption.correct) {
        score += 10;
      }
    });
    return score;
  }

  // Get progress percentage through scenario
  getProgress() {
    if (this.interactions.length === 0) return 100;
    return Math.floor((this.playerChoices.length / this.interactions.length) * 100);
  }

  // Mark scenario as completed
  complete() {
    this.completed = true;
    return this.calculateScore();
  }

  // Reset scenario for replay
  reset() {
    this.playerChoices = [];
    this.completed = false;
  }
}

// Import environment models
import { TokyoOfficeEnvironment } from './environments/tokyoOfficeEnvironment.js';
import { ParisRestaurantEnvironment } from './environments/parisRestaurantEnvironment.js';

// ScenarioManager class to handle all game scenarios
class ScenarioManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.scenarios = {};
    this.currentScenario = null;
    this.currentInteractionIndex = 0;
    this.currentEnvironment = null;
    
    // Initialize the scenarios database
    this.initializeScenarios();
  }

  // Initialize all game scenarios
  initializeScenarios() {
    // Add scenarios from each country
    Object.keys(this.game.countries).forEach(countryId => {
      const country = this.game.countries[countryId];
      
      country.scenarios.forEach(scenarioData => {
        this.scenarios[scenarioData.id] = new Scenario(
          scenarioData.id,
          scenarioData.title,
          scenarioData.description,
          scenarioData.scene,
          scenarioData.interactions
        );
      });
    });
  }

  // Start a specific scenario
  startScenario(scenarioId) {
    if (!this.scenarios[scenarioId]) {
      console.error(`Scenario ${scenarioId} not found`);
      return false;
    }
    
    this.currentScenario = this.scenarios[scenarioId];
    this.currentInteractionIndex = 0;
    
    // Load the appropriate environment based on the scenario
    this.loadEnvironment(this.currentScenario.scene);
    
    // Signal to game that scenario is starting
    this.game.onScenarioStart(this.currentScenario);
    
    return true;
  }
  
  // Load the 3D environment for the scenario
  loadEnvironment(sceneName) {
    // Clear any existing environment
    if (this.currentEnvironment) {
      // Remove from scene
      this.game.scene.remove(this.currentEnvironment.officeItems || this.currentEnvironment.restaurantItems);
      this.currentEnvironment = null;
    }
    
    // Create the appropriate environment based on scene name
    switch (sceneName) {
      case 'tokyo_office':
        this.currentEnvironment = new TokyoOfficeEnvironment(this.game.scene);
        break;
        
      case 'paris_restaurant':
        this.currentEnvironment = new ParisRestaurantEnvironment(this.game.scene);
        
        // If this is the Paris restaurant, create the detailed table settings
        if (this.currentEnvironment.createTableSettings) {
          this.currentEnvironment.createTableSettings();
        }
        break;
        
      default:
        console.error(`Unknown scene: ${sceneName}`);
        break;
    }
    
    // Position the camera appropriately for the scene
    if (sceneName === 'tokyo_office') {
      this.game.camera.position.set(0, 1.6, 2.5);
      this.game.camera.lookAt(0, 1.6, 0);
    } else if (sceneName === 'paris_restaurant') {
      this.game.camera.position.set(0, 1.6, 4.5);
      this.game.camera.lookAt(0, 1.6, 0);
    }
  }

  // Get current interaction
  getCurrentInteraction() {
    if (!this.currentScenario) return null;
    
    return this.currentScenario.interactions[this.currentInteractionIndex];
  }

  // Process player's option selection
  selectOption(option) {
    if (!this.currentScenario) return false;
    
    const currentInteraction = this.getCurrentInteraction();
    if (!currentInteraction) return false;
    
    // Record the player's choice
    this.currentScenario.recordChoice(currentInteraction.id, option);
    
    // Signal to game that option was selected
    this.game.onOptionSelected(currentInteraction, option);
    
    // Animate the environment based on the choice if applicable
    this.animateEnvironmentResponse(currentInteraction.id, option);
    
    return true;
  }
  
  // Animate the environment in response to player choices
  animateEnvironmentResponse(interactionId, option) {
    if (!this.currentEnvironment) return;
    
    // Special animations based on scenario and interaction
    if (this.currentScenario.id.includes('tokyo')) {
      // Tokyo office scenario animations
      if (interactionId === 'greeting') {
        if (option.correct) {
          // Animate correct bow response
          this.game.playCharacterAnimation('japanese_executive', 'bow_response');
        } else {
          // Animate awkward response
          this.game.playCharacterAnimation('japanese_executive', 'uncomfortable');
        }
      } else if (interactionId === 'business_cards') {
        if (option.correct) {
          // Animate proper card exchange
          this.game.playCharacterAnimation('japanese_executive', 'pleased_nod');
        } else {
          // Animate subtle disappointment
          this.game.playCharacterAnimation('japanese_executive', 'subtle_frown');
        }
      }
    } else if (this.currentScenario.id.includes('paris')) {
      // Paris restaurant scenario animations
      if (interactionId === 'greeting') {
        if (option.correct) {
          // Animate proper French greeting
          this.game.playCharacterAnimation('french_businessman', 'handshake');
          this.game.playCharacterAnimation('french_businesswoman', 'handshake');
        } else {
          // Animate surprised reaction
          this.game.playCharacterAnimation('french_businessman', 'surprised');
          this.game.playCharacterAnimation('french_businesswoman', 'surprised');
        }
      } else if (interactionId === 'business_discussion') {
        if (option.correct) {
          // Animate natural conversation
          this.game.playCharacterAnimation('french_businessman', 'conversation');
          this.game.playCharacterAnimation('french_businesswoman', 'pour_wine');
          
          // Animate wine pouring if environment has that function
          if (this.currentEnvironment && 
              typeof this.currentEnvironment.animateWinePouring === 'function') {
            this.currentEnvironment.animateWinePouring();
          }
        } else {
          // Animate awkward response
          this.game.playCharacterAnimation('french_businessman', 'check_watch');
          this.game.playCharacterAnimation('french_businesswoman', 'uncomfortable');
        }
      }
    }
  }

  // Move to next interaction
  nextInteraction() {
    if (!this.currentScenario) return false;
    
    this.currentInteractionIndex++;
    
    // Check if we've reached the end of the scenario
    if (this.currentInteractionIndex >= this.currentScenario.interactions.length) {
      const score = this.currentScenario.complete();
      this.game.onScenarioComplete(this.currentScenario, score);
      return false;
    }
    
    // Get the next interaction and signal to game
    const nextInteraction = this.getCurrentInteraction();
    this.game.onInteractionStart(nextInteraction);
    
    return true;
  }

  // Add a new scenario
  addScenario(countryId, scenarioData) {
    // Create new scenario
    const newScenario = new Scenario(
      scenarioData.id,
      scenarioData.title,
      scenarioData.description,
      scenarioData.scene,
      scenarioData.interactions
    );
    
    // Add to scenarios database
    this.scenarios[scenarioData.id] = newScenario;
    
    // Add to country's scenarios list
    if (this.game.countries[countryId]) {
      this.game.countries[countryId].scenarios.push(scenarioData);
    }
    
    return newScenario;
  }

  // Get all scenarios for a specific country
  getCountryScenarios(countryId) {
    if (!this.game.countries[countryId]) return [];
    
    return this.game.countries[countryId].scenarios.map(
      scenarioData => this.scenarios[scenarioData.id]
    );
  }

  // Get all available scenarios (from unlocked countries)
  getAvailableScenarios() {
    const availableScenarios = [];
    
    this.game.unlockedCountries.forEach(countryId => {
      const countryScenarios = this.getCountryScenarios(countryId);
      availableScenarios.push(...countryScenarios);
    });
    
    return availableScenarios;
  }

  // Get completed scenarios
  getCompletedScenarios() {
    return Object.values(this.scenarios).filter(scenario => scenario.completed);
  }

  // Calculate total player score from all completed scenarios
  getTotalScore() {
    const completedScenarios = this.getCompletedScenarios();
    return completedScenarios.reduce((total, scenario) => total + scenario.calculateScore(), 0);
  }
}

// Additional scenario data to extend the game
const additionalScenarios = {
  // German business culture scenario
  germany: {
    name: 'Germany',
    description: 'Navigate precision and punctuality in German business meetings',
    scenarios: [
      {
        id: 'berlin_meeting',
        title: 'Berlin Product Presentation',
        description: 'You need to present your company\'s new product to potential German partners',
        scene: 'berlin_office',
        interactions: [
          {
            id: 'arrival_time',
            prompt: 'Your meeting is scheduled for 10:00 AM. When should you arrive?',
            options: [
              { 
                text: 'Exactly on time at 10:00 AM', 
                correct: false,
                feedback: 'In German business culture, arriving exactly on time is considered cutting it too close. It's better to be a few minutes early.' 
              },
              { 
                text: '5-10 minutes early', 
                correct: true,
                feedback: 'Correct! Arriving 5-10 minutes early shows respect for punctuality, which is highly valued in German business culture.' 
              },
              { 
                text: '15 minutes late to show you\'re busy and important', 
                correct: false,
                feedback: 'Being late to meetings is considered very disrespectful in German business culture and can damage your professional reputation.' 
              }
            ]
          },
          {
            id: 'presentation_style',
            prompt: 'How should you structure your product presentation?',
            options: [
              { 
                text: 'Focus on technical details, facts, and thorough analysis', 
                correct: true,
                feedback: 'Correct! German business culture values precision, thorough analysis, and well-documented facts over emotional appeals or exaggeration.' 
              },
              { 
                text: 'Keep it casual with jokes and personal anecdotes', 
                correct: false,
                feedback: 'German business meetings tend to be formal and focused on facts. Too many jokes or personal stories may be seen as unprofessional.' 
              },
              { 
                text: 'Emphasize your company\'s status and your personal achievements', 
                correct: false,
                feedback: 'German business culture values substance over status. Focus on the merits of your product rather than credentials or achievements.' 
              }
            ]
          },
          {
            id: 'feedback_response',
            prompt: 'Your German counterparts provide direct criticism about a feature of your product. How do you respond?',
            options: [
              { 
                text: 'Take offense and defend your product passionately', 
                correct: false,
                feedback: 'Taking criticism personally is not productive. In German business culture, direct feedback is normal and not meant as a personal attack.' 
              },
              { 
                text: 'Acknowledge the feedback, take notes, and propose solutions', 
                correct: true,
                feedback: 'Correct! German business culture values direct communication and problem-solving. Taking notes and proposing solutions shows professionalism.' 
              },
              { 
                text: 'Change the subject to avoid confrontation', 
                correct: false,
                feedback: 'Avoiding the issue can be seen as evasive or unprofessional in German business culture, where direct addressing of issues is valued.' 
              }
            ]
          }
        ]
      }
    ]
  },
  
  // Chinese business culture scenario
  china: {
    name: 'China',
    description: 'Build relationships and navigate protocol in Chinese business settings',
    scenarios: [
      {
        id: 'shanghai_negotiation',
        title: 'Shanghai Contract Negotiation',
        description: 'You\'re negotiating a business contract with a Chinese company in Shanghai',
        scene: 'shanghai_office',
        interactions: [
          {
            id: 'greeting_protocol',
            prompt: 'How should you greet the senior executive of the Chinese company?',
            options: [
              { 
                text: 'Greet the most senior person first with a slight bow and a handshake', 
                correct: true,
                feedback: 'Correct! Respecting hierarchy is important in Chinese business culture. Always acknowledge the most senior person first with appropriate deference.' 
              },
              { 
                text: 'Hug each person to build immediate rapport', 
                correct: false,
                feedback: 'Physical contact like hugging is not common in Chinese business settings and may cause discomfort, especially in initial meetings.' 
              },
              { 
                text: 'Greet everyone in the room equally to show fairness', 
                correct: false,
                feedback: 'While seeming fair, this approach doesn\'t acknowledge the hierarchical nature of Chinese business culture, which is important to respect.' 
              }
            ]
          },
          {
            id: 'business_cards',
            prompt: 'You receive a business card from your Chinese counterpart. What is the appropriate response?',
            options: [
              { 
                text: 'Take it with both hands, read it carefully, and place it respectfully on the table in front of you', 
                correct: true,
                feedback: 'Correct! Business cards should be received with both hands, studied respectfully, and kept visible during the meeting as a sign of respect.' 
              },
              { 
                text: 'Take it with one hand and put it in your pocket immediately', 
                correct: false,
                feedback: 'This casual handling may be seen as disrespectful. Business cards are extensions of the person in Chinese business culture.' 
              },
              { 
                text: 'Take it and immediately give feedback on the design or quality of the card', 
                correct: false,
                feedback: 'Commenting on the physical card itself misses the point of the exchange, which is about acknowledging the person and their position.' 
              }
            ]
          },
          {
            id: 'negotiation_approach',
            prompt: 'What approach should you take during the contract negotiation?',
            options: [
              { 
                text: 'Push for immediate decisions on all contract points', 
                correct: false,
                feedback: 'Chinese business culture often involves longer decision processes that respect hierarchy and consensus-building. Rushing can be counterproductive.' 
              },
              { 
                text: 'Be patient, invest time in relationship building, and respect the pace of decision-making', 
                correct: true,
                feedback: 'Correct! Building relationships (guanxi) is crucial in Chinese business. Patience and respecting their decision-making process shows cultural intelligence.' 
              },
              { 
                text: 'Set firm deadlines and ultimatums to show you\'re serious', 
                correct: false,
                feedback: 'Ultimatums can cause your Chinese counterparts to lose face, potentially damaging the relationship and jeopardizing the deal.' 
              }
            ]
          }
        ]
      }
    ]
  }
};

  // Update animation loop
  update(time) {
    // If we have an active environment, update its animations
    if (this.currentEnvironment && typeof this.currentEnvironment.animate === 'function') {
      this.currentEnvironment.animate(time);
    }
  }
  
  // Position characters in the current environment
  positionCharacters(characters) {
    if (this.currentEnvironment && 
        typeof this.currentEnvironment.positionCharacters === 'function') {
      this.currentEnvironment.positionCharacters(characters);
    } else {
      // Default positioning if environment doesn't handle it
      if (characters && characters.length > 0) {
        characters.forEach(character => {
          if (character.id === 'player') {
            character.model.position.set(0, 0, 2);
            character.model.rotation.y = Math.PI;
          } else if (this.currentScenario && this.currentScenario.id.includes('tokyo')) {
            // Default positions for Tokyo scenario
            if (character.id === 'japanese_executive') {
              character.model.position.set(0, 0, -1);
            } else if (character.id === 'japanese_assistant') {
              character.model.position.set(1, 0, -1);
            }
          } else if (this.currentScenario && this.currentScenario.id.includes('paris')) {
            // Default positions for Paris scenario
            if (character.id === 'french_businessman') {
              character.model.position.set(-0.5, 0, -1);
            } else if (character.id === 'french_businesswoman') {
              character.model.position.set(0.5, 0, -1);
            }
          }
        });
      }
    }
  }
}

// Export ScenarioManager for use in the main game
export { ScenarioManager, additionalScenarios };
