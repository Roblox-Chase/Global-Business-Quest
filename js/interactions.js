// Global Business Quest - Interactions Management
// This file handles player interactions and cultural learning feedback

import * as THREE from 'three';

// Placeholder for country-specific environments that will be added in later versions
class BaseEnvironment {
  constructor() {
    this.officeItems = new THREE.Group();
    this.restaurantItems = new THREE.Group();
  }
}

// InteractionManager handles all user interactions within the game scenarios
class InteractionManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.currentInteraction = null;
    this.currentOptions = [];
    this.feedbackTimeout = null;
    this.activeEnvironment = null;
    this.culturalHighlights = {};
    
    // Initialize cultural highlights for each country
    this.initCulturalHighlights();
  }
  
  // Initialize cultural highlights - key cultural elements to emphasize in each scenario
  initCulturalHighlights() {
    this.culturalHighlights = {
      japan: {
        "business_cards": {
          description: "Business cards (meishi) are treated with great respect in Japan and exchanged with a specific ritual.",
          objects: ["businessCardHolder"],
          position: new THREE.Vector3(0, 0.85, 0),
          camera: {
            position: new THREE.Vector3(0, 1.2, 0.5),
            lookAt: new THREE.Vector3(0, 0.8, 0)
          }
        },
        "bowing": {
          description: "Bowing is an important form of greeting in Japanese business culture, with the depth and duration indicating respect.",
          position: new THREE.Vector3(0, 1.5, 0.5),
          camera: {
            position: new THREE.Vector3(0, 1.6, 1.5),
            lookAt: new THREE.Vector3(0, 1.5, 0)
          }
        },
        "seating_arrangement": {
          description: "Seating in Japanese meetings is hierarchical, with the most senior person typically sitting furthest from the door.",
          objects: ["conferenceTable", "chairs"],
          position: new THREE.Vector3(0, 1.2, -0.5),
          camera: {
            position: new THREE.Vector3(0, 2.5, 0),
            lookAt: new THREE.Vector3(0, 0.7, 0)
          }
        }
      },
      france: {
        "greeting": {
          description: "French business greetings typically involve a light handshake and using proper titles (Monsieur/Madame).",
          position: new THREE.Vector3(0, 1.5, 2.5),
          camera: {
            position: new THREE.Vector3(0, 1.6, 4),
            lookAt: new THREE.Vector3(0, 1.5, 2.5)
          }
        },
        "dining_etiquette": {
          description: "French business meals have specific etiquette, with hands visible on the table and proper use of utensils.",
          objects: ["playerTable", "tableSettings"],
          position: new THREE.Vector3(0, 1.2, 0),
          camera: {
            position: new THREE.Vector3(0, 1.8, 1.5),
            lookAt: new THREE.Vector3(0, 0.8, 0)
          }
        },
        "conversation_timing": {
          description: "Business discussions typically begin after the main course in a French business lunch.",
          objects: ["playerTable", "wineGlasses"],
          position: new THREE.Vector3(0, 1, 0),
          camera: {
            position: new THREE.Vector3(0.5, 1.2, 1),
            lookAt: new THREE.Vector3(0, 0.8, 0)
          }
        }
      }
    };
  }
  
  // Present a scenario interaction to the player
  presentInteraction(interaction) {
    this.currentInteraction = interaction;
    this.currentOptions = interaction.options;
  }
  
  // Process player's option selection
  processSelection(optionIndex) {
    if (!this.currentInteraction || optionIndex >= this.currentOptions.length) return;
    
    const selectedOption = this.currentOptions[optionIndex];
    
    // Notify game of selection
    this.game.onOptionSelected(this.currentInteraction, selectedOption);
    
    return selectedOption;
  }
  
  // Simplified version of the method for the initial implementation
  showFeedback(option) {
    console.log("Showing feedback:", option.feedback);
    return option;
  }
}

// Enhanced interactions for more complex scenarios - placeholder for future development
const enhancedInteractions = {
  japan: {
    "keigo_usage": {
      name: "Keigo (Respectful Language)",
      description: "Using the appropriate level of formal Japanese for business settings"
    },
    "gift_giving": {
      name: "Gift Exchange",
      description: "The cultural importance of business gift giving in Japan"
    }
  },
  france: {
    "debate_style": {
      name: "French Debate Style",
      description: "The French appreciation for intellectual debate in business"
    },
    "relationship_building": {
      name: "Long-term Relationships",
      description: "Building personal connections before business transactions"
    }
  }
};

// Export the InteractionManager and enhanced interactions
export { InteractionManager, enhancedInteractions, BaseEnvironment };
