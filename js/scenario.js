// Global Business Quest - Scenario Management
// This file manages the game scenarios, interactions and cultural learning outcome

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

// ScenarioManager class to handle all game scenarios
class ScenarioManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.scenarios = {};
    this.currentScenario = null;
    this.currentInteractionIndex = 0;
    
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
    
    // Signal to game that scenario is starting
    this.game.onScenarioStart(this.currentScenario);
    
    return true;
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
    
    return true;
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

// Additional scenario data to extend Japan and France scenarios
const additionalScenarios = {
  // Additional Japanese business scenarios
  japan: {
    name: 'Japan',
    description: 'Navigate formal business meetings in Tokyo',
    scenarios: [
      {
        id: 'tokyo_meeting_advanced',
        title: 'Tokyo Contract Negotiation',
        description: 'You need to negotiate a business contract with Japanese partners',
        scene: 'tokyo_office',
        interactions: [
          {
            id: 'decision_making',
            prompt: 'Your Japanese counterparts say they need to "take the proposal back to review." What does this likely mean?',
            options: [
              { 
                text: 'They need to consult with their team in a "ringi" decision-making process', 
                correct: true,
                feedback: 'Correct! Japanese companies often use a collective decision-making process called "ringi" where proposals circulate among all stakeholders before final approval.' 
              },
              { 
                text: 'They are not interested but don\'t want to say "no" directly', 
                correct: false,
                feedback: 'While Japanese business culture does avoid direct refusals, "taking it back to review" usually genuinely means they need internal consultation, not that they\'re rejecting your offer.' 
              },
              { 
                text: 'They are trying to stall to get better terms', 
                correct: false,
                feedback: 'This interpretation misunderstands Japanese business processes, which value thorough internal consultation. This is rarely a negotiation tactic, but rather standard procedure.' 
              }
            ]
          },
          {
            id: 'after_hours',
            prompt: 'Your Japanese colleagues invite you for drinks after the meeting. How should you respond?',
            options: [
              { 
                text: 'Politely accept - after-hours socializing is an important part of building business relationships in Japan', 
                correct: true,
                feedback: 'Correct! In Japanese business culture, after-hours socializing (nominication) is considered an important extension of business relationships.' 
              },
              { 
                text: 'Decline, explaining you prefer to keep business and social life separate', 
                correct: false,
                feedback: 'In Japan, the line between business and social relationships is less distinct. Declining could be seen as unwillingness to build a proper business relationship.' 
              },
              { 
                text: 'Suggest rescheduling for during office hours instead', 
                correct: false,
                feedback: 'This misses the purpose of after-hours gatherings in Japanese business culture, which is to build relationships in a more relaxed setting where people can speak more freely.' 
              }
            ]
          }
        ]
      }
    ]
  },
  
  // Additional French business scenarios
  france: {
    name: 'France',
    description: 'Learn the art of business lunches in Paris',
    scenarios: [
      {
        id: 'paris_negotiation',
        title: 'French Contract Discussion',
        description: 'You need to finalize a business agreement with your French partners',
        scene: 'paris_restaurant',
        interactions: [
          {
            id: 'disagreement',
            prompt: 'There\'s a point of disagreement in the contract. How should you handle it?',
            options: [
              { 
                text: 'Discuss it thoroughly with logical arguments, even if it causes tension', 
                correct: true,
                feedback: 'Correct! French business culture values intellectual debate and doesn\'t shy away from respectful confrontation to resolve issues.' 
              },
              { 
                text: 'Avoid confrontation and suggest a compromise immediately', 
                correct: false,
                feedback: 'In French business culture, thoroughly exploring different perspectives through debate is valued. Rushing to compromise without proper discussion might be seen as avoiding important issues.' 
              },
              { 
                text: 'Ask to discuss it privately later to avoid awkwardness', 
                correct: false,
                feedback: 'French professionals generally don\'t view open disagreement as awkward, but rather as a normal part of business. Direct discussion is typically preferred over private side conversations.' 
              }
            ]
          },
          {
            id: 'presentation_style',
            prompt: 'You need to present your proposal to the French team. What approach should you take?',
            options: [
              { 
                text: 'Present a strong theoretical framework before getting into practical applications', 
                correct: true,
                feedback: 'Correct! French business culture values conceptual understanding and theoretical frameworks. Starting with the "why" before the "how" is often appreciated.' 
              },
              { 
                text: 'Focus only on practical benefits and return on investment', 
                correct: false,
                feedback: 'While practical benefits are important, French business culture also values the intellectual foundation of proposals. A purely pragmatic approach may seem superficial.' 
              },
              { 
                text: 'Keep it very brief and to-the-point to respect their time', 
                correct: false,
                feedback: 'French business meetings often involve thorough discussion and analysis. An overly brief presentation might be seen as lacking substance or depth.' 
              }
            ]
          }
        ]
      }
    ]
  }
};

// Export all necessary items for use in the main game
export { Scenario, ScenarioManager, additionalScenarios };
