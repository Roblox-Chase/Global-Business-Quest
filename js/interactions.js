// Global Business Quest - Interactions Management
// This file handles player interactions and cultural learning feedback

import * as THREE from 'three';
import { TokyoOfficeEnvironment } from './countries/TokyoOfficeEnvironment.js';
import { ParisRestaurantEnvironment } from './countries/ParisRestaurantEnvironment.js';

// InteractionManager handles all user interactions within the game scenarios
export class InteractionManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.currentInteraction = null;
    this.currentOptions = [];
    this.feedbackTimeout = null;
    this.activeEnvironment = null;
    this.culturalHighlights = {};
    
    // DOM Elements for UI interactions
    this.interactionUI = document.getElementById('interaction-ui');
    this.feedbackUI = document.getElementById('feedback-ui');
    
    // Initialize interaction events
    this.initEvents();
    
    // Cultural highlights for each country
    this.initCulturalHighlights();
  }
  
  // Initialize event listeners
  initEvents() {
    // Listen for option selection
    document.addEventListener('option-selected', (event) => {
      const optionId = event.detail.optionId;
      this.processSelection(optionId);
    });
    
    // Listen for environment changes
    document.addEventListener('environment-changed', (event) => {
      this.activeEnvironment = event.detail.environment;
      this.setupEnvironmentInteractions();
    });
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
  
  // Set up environment-specific interactions
  setupEnvironmentInteractions() {
    if (!this.activeEnvironment) return;
    
    if (this.activeEnvironment instanceof TokyoOfficeEnvironment) {
      this.setupTokyoInteractions();
    } else if (this.activeEnvironment instanceof ParisRestaurantEnvironment) {
      this.setupParisInteractions();
    }
  }
  
  // Set up Tokyo office-specific interactions
  setupTokyoInteractions() {
    // Add interactivity to business card holder
    const businessCardHolder = this.findObject(this.activeEnvironment.officeItems, "businessCardHolder");
    if (businessCardHolder) {
      this.makeObjectInteractive(businessCardHolder, "business_cards", "japan");
    }
    
    // Add interactivity to seating
    const conferenceTable = this.findObject(this.activeEnvironment.officeItems, "conferenceTable");
    if (conferenceTable) {
      this.makeObjectInteractive(conferenceTable, "seating_arrangement", "japan");
    }
  }
  
  // Set up Paris restaurant-specific interactions
  setupParisInteractions() {
    // Add interactivity to dining table
    const playerTable = this.findObject(this.activeEnvironment.restaurantItems, "playerTable");
    if (playerTable) {
      this.makeObjectInteractive(playerTable, "dining_etiquette", "france");
    }
    
    // Add interactivity to wine glasses for conversation timing
    const wineGlasses = this.findObjectsOfType(this.activeEnvironment.restaurantItems, "wineGlassBowl");
    if (wineGlasses && wineGlasses.length > 0) {
      wineGlasses.forEach(glass => {
        this.makeObjectInteractive(glass, "conversation_timing", "france");
      });
    }
  }
  
  // Find an object by name in a THREE.Group
  findObject(group, name) {
    let foundObject = null;
    
    group.traverse((child) => {
      if (child.name === name) {
        foundObject = child;
      }
    });
    
    return foundObject;
  }
  
  // Find objects by geometry type
  findObjectsOfType(group, geometryType) {
    const foundObjects = [];
    
    group.traverse((child) => {
      if (child.geometry && child.geometry.type === geometryType) {
        foundObjects.push(child);
      }
    });
    
    return foundObjects;
  }
  
  // Make an object interactive for cultural learning
  makeObjectInteractive(object, highlightKey, country) {
    // Save original material for restoration
    const originalMaterial = object.material.clone();
    
    // Add hover effect
    object.userData.originalMaterial = originalMaterial;
    object.userData.isInteractive = true;
    object.userData.highlightKey = highlightKey;
    object.userData.country = country;
    
    // Add to interactable objects for raycasting
    if (!this.game.interactiveObjects.includes(object)) {
      this.game.interactiveObjects.push(object);
    }
  }
  
  // Handle object click
  handleObjectClick(object) {
    if (!object.userData.isInteractive) return;
    
    const highlightKey = object.userData.highlightKey;
    const country = object.userData.country;
    
    if (this.culturalHighlights[country] && this.culturalHighlights[country][highlightKey]) {
      this.showCulturalHighlight(country, highlightKey);
    }
  }
  
  // Show cultural highlight information
  showCulturalHighlight(country, highlightKey) {
    const highlight = this.culturalHighlights[country][highlightKey];
    
    // Move camera to highlight position if specified
    if (highlight.camera) {
      this.game.moveCamera(highlight.camera.position, highlight.camera.lookAt);
    }
    
    // Show information tooltip
    this.showTooltip(highlight.description, highlight.position);
    
    // Add to player's cultural knowledge
    this.game.addCulturalKnowledge(country, highlightKey);
  }
  
  // Show information tooltip in the 3D world
  showTooltip(text, position) {
    // Create tooltip container if it doesn't exist
    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.id = 'tooltip';
      this.tooltip.style.position = 'absolute';
      this.tooltip.style.padding = '10px';
      this.tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
      this.tooltip.style.color = 'white';
      this.tooltip.style.borderRadius = '5px';
      this.tooltip.style.maxWidth = '300px';
      this.tooltip.style.transform = 'translate(-50%, -100%)';
      this.tooltip.style.pointerEvents = 'none';
      this.tooltip.style.opacity = '0';
      this.tooltip.style.transition = 'opacity 0.3s';
      document.body.appendChild(this.tooltip);
    }
    
    // Update tooltip content
    this.tooltip.textContent = text;
    
    // Position tooltip
    const screenPosition = this.getScreenPosition(position);
    this.tooltip.style.left = screenPosition.x + 'px';
    this.tooltip.style.top = screenPosition.y + 'px';
    
    // Show tooltip
    this.tooltip.style.opacity = '1';
    
    // Hide tooltip after a delay
    clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = setTimeout(() => {
      this.tooltip.style.opacity = '0';
    }, 5000);
  }
  
  // Convert 3D position to screen coordinates
  getScreenPosition(position) {
    const vector = position.clone();
    vector.project(this.game.camera);
    
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    
    return {
      x: (vector.x * halfWidth) + halfWidth,
      y: -(vector.y * halfHeight) + halfHeight
    };
  }
  
  // Present a scenario interaction to the player
  presentInteraction(interaction) {
    this.currentInteraction = interaction;
    this.currentOptions = interaction.options;
    
    // Update the UI
    this.updateInteractionUI();
  }
  
  // Update the interaction UI with current interaction data
  updateInteractionUI() {
    if (!this.interactionUI || !this.currentInteraction) return;
    
    // Clear existing content
    this.interactionUI.innerHTML = '';
    
    // Add prompt
    const promptElement = document.createElement('p');
    promptElement.className = 'interaction-prompt';
    promptElement.textContent = this.currentInteraction.prompt;
    this.interactionUI.appendChild(promptElement);
    
    // Add options
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'interaction-options';
    
    this.currentOptions.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.className = 'interaction-option';
      optionButton.textContent = option.text;
      optionButton.dataset.optionId = index;
      
      optionButton.addEventListener('click', () => {
        this.processSelection(index);
      });
      
      optionsContainer.appendChild(optionButton);
    });
    
    this.interactionUI.appendChild(optionsContainer);
    
    // Show the UI
    this.interactionUI.style.display = 'block';
  }
  
  // Process player's option selection
  processSelection(optionIndex) {
    if (!this.currentInteraction || optionIndex >= this.currentOptions.length) return;
    
    const selectedOption = this.currentOptions[optionIndex];
    
    // Hide interaction UI
    this.interactionUI.style.display = 'none';
    
    // Show feedback
    this.showFeedback(selectedOption);
    
    // Notify game of selection
    this.game.onOptionSelected(this.currentInteraction, selectedOption);
  }
  
  // Show feedback for the selected option
  showFeedback(option) {
    if (!this.feedbackUI) return;
    
    // Clear existing content
    this.feedbackUI.innerHTML = '';
    
    // Add feedback content
    const resultElement = document.createElement('h3');
    resultElement.textContent = option.correct ? 'Correct!' : 'Not quite right';
    resultElement.style.color = option.correct ? '#28a745' : '#dc3545';
    this.feedbackUI.appendChild(resultElement);
    
    const feedbackText = document.createElement('p');
    feedbackText.textContent = option.feedback;
    this.feedbackUI.appendChild(feedbackText);
    
    // Add cultural insight if available
    if (option.culturalInsight) {
      const insightContainer = document.createElement('div');
      insightContainer.className = 'cultural-insight';
      
      const insightTitle = document.createElement('h4');
      insightTitle.textContent = 'Cultural Insight';
      insightContainer.appendChild(insightTitle);
      
      const insightText = document.createElement('p');
      insightText.textContent = option.culturalInsight;
      insightContainer.appendChild(insightText);
      
      this.feedbackUI.appendChild(insightContainer);
    }
    
    // Add continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Continue';
    continueButton.className = 'continue-button';
    continueButton.addEventListener('click', () => {
      this.hideFeedback();
      this.game.nextInteraction();
    });
    this.feedbackUI.appendChild(continueButton);
    
    // Show feedback UI
    this.feedbackUI.style.display = 'block';
    
    // If correct, highlight relevant cultural elements in the scene
    if (option.correct && option.highlightKey) {
      this.highlightCulturalElement(option.highlightKey);
    }
  }
  
  // Hide feedback UI
  hideFeedback() {
    if (this.feedbackUI) {
      this.feedbackUI.style.display = 'none';
    }
  }
  
  // Highlight a cultural element in the 3D scene
  highlightCulturalElement(highlightKey) {
    const country = this.game.currentCountry;
    if (!country || !this.culturalHighlights[country] || !this.culturalHighlights[country][highlightKey]) return;
    
    const highlight = this.culturalHighlights[country][highlightKey];
    
    // Move camera to focus on the highlight if specified
    if (highlight.camera) {
      this.game.moveCamera(highlight.camera.position, highlight.camera.lookAt);
    }
    
    // Highlight objects if specified
    if (highlight.objects && highlight.objects.length > 0) {
      this.highlightObjects(highlight.objects);
    }
  }
  
  // Highlight specific objects in the scene
  highlightObjects(objectNames) {
    const environment = this.activeEnvironment;
    if (!environment) return;
    
    // Get the appropriate group based on environment type
    const group = environment instanceof TokyoOfficeEnvironment ? 
                  environment.officeItems : 
                  environment.restaurantItems;
    
    // Find and highlight each object
    objectNames.forEach(name => {
      const object = this.findObject(group, name);
      if (object) {
        this.pulseObject(object);
      }
    });
  }
  
  // Create a pulsing highlight effect on an object
  pulseObject(object) {
    // Save original material
    if (!object.userData.originalMaterial) {
      object.userData.originalMaterial = object.material.clone();
    }
    
    // Create highlight material
    const highlightMaterial = object.material.clone();
    highlightMaterial.emissive = new THREE.Color(0x3399ff);
    highlightMaterial.emissiveIntensity = 0.5;
    
    // Apply highlight material
    object.material = highlightMaterial;
    
    // Pulse animation
    let pulseTime = 0;
    const pulseDuration = 2000; // ms
    
    const pulse = () => {
      pulseTime += 16; // Approximately 60fps
      
      if (pulseTime < pulseDuration) {
        const intensity = 0.5 + 0.5 * Math.sin(pulseTime / 200);
        object.material.emissiveIntensity = intensity;
        
        requestAnimationFrame(pulse);
      } else {
        // Restore original material
        object.material = object.userData.originalMaterial;
      }
    };
    
    pulse();
  }
  
  // Update interaction state based on game tick
  update(time) {
    // Update interactive object highlights
    this.updateInteractiveObjects(time);
    
    // Update tooltip positions if visible
    if (this.tooltip && this.tooltip.style.opacity !== '0') {
      const tooltipPosition = this.getTooltipPosition();
      if (tooltipPosition) {
        const screenPosition = this.getScreenPosition(tooltipPosition);
        this.tooltip.style.left = screenPosition.x + 'px';
        this.tooltip.style.top = screenPosition.y + 'px';
      }
    }
  }
  
  // Get current tooltip position
  getTooltipPosition() {
    if (!this.activeEnvironment) return null;
    
    // Default position above the center of the environment
    return new THREE.Vector3(0, 2, 0);
  }
  
  // Update interactive object effects
  updateInteractiveObjects(time) {
    if (!this.game.interactiveObjects || !this.game.interactiveObjects.length) return;
    
    this.game.interactiveObjects.forEach(object => {
      if (object.userData.isInteractive && object.userData.isHovered) {
        // Subtle pulse effect for hovered objects
        const intensity = 0.3 + 0.2 * Math.sin(time * 0.005);
        if (object.material && object.material.emissive) {
          object.material.emissive.setRGB(intensity, intensity, intensity);
        }
      }
    });
  }
  
  // Handle mouse hover over interactive objects
  handleObjectHover(object, isHovering) {
    if (!object.userData.isInteractive) return;
    
    object.userData.isHovered = isHovering;
    
    if (isHovering) {
      // Create hover effect material
      const hoverMaterial = object.userData.hoverMaterial || object.material.clone();
      hoverMaterial.emissive = new THREE.Color(0xffffff);
      hoverMaterial.emissiveIntensity = 0.3;
      
      // Store for restoration
      if (!object.userData.hoverMaterial) {
        object.userData.hoverMaterial = hoverMaterial;
      }
      
      // Apply hover material
      object.material = hoverMaterial;
      
      // Show cursor as pointer
      document.body.style.cursor = 'pointer';
    } else {
      // Restore original material
      if (object.userData.originalMaterial) {
        object.material = object.userData.originalMaterial;
      }
      
      // Restore cursor
      document.body.style.cursor = 'default';
    }
  }
}

// Enhanced interactions with additional cultural insights - Japan and France only
export const enhancedInteractions = {
  japan: {
    tokyo_meeting: [
      {
        id: "greeting",
        prompt: "How do you greet your Japanese business partners?",
        options: [
          { 
            text: "Bow slightly", 
            correct: true,
            feedback: "Correct! A respectful bow is the appropriate greeting in Japanese business culture.",
            culturalInsight: "The depth and duration of a bow in Japan indicates the level of respect. For business situations, a bow of about 30 degrees held for 2-3 seconds is appropriate for colleagues of similar rank.",
            highlightKey: "bowing"
          },
          { 
            text: "Offer a firm handshake", 
            correct: false,
            feedback: "While handshakes are becoming more common in international business in Japan, starting with a bow shows respect for local customs.",
            culturalInsight: "In international settings, some Japanese businesspeople will offer a handshake after a bow, but allowing them to initiate this is considered more respectful."
          },
          { 
            text: "Give a friendly hug", 
            correct: false,
            feedback: "Physical contact like hugging is considered too familiar and inappropriate in Japanese business settings.",
            culturalInsight: "Japanese business culture values maintaining appropriate personal space. Personal topics and physical contact are generally avoided in professional settings."
          }
        ]
      },
      {
        id: "business_cards",
        prompt: "Your Japanese counterpart presents their business card to you. What should you do?",
        options: [
          { 
            text: "Take it with both hands, examine it respectfully, and place it carefully on the table in front of you", 
            correct: true,
            feedback: "Correct! Business cards (meishi) are treated with great respect in Japan. They are an extension of the person and should be handled carefully.",
            culturalInsight: "The exchange of business cards (meishi koukan) is almost ceremonial in Japan. Cards should be presented and received with both hands, studied for a moment to acknowledge the person's details, and then placed carefully on the table for the duration of the meeting.",
            highlightKey: "business_cards"
          },
          { 
            text: "Take it with one hand and put it in your pocket", 
            correct: false,
            feedback: "Placing a business card in your pocket immediately is considered disrespectful in Japan.",
            culturalInsight: "In Japanese business culture, putting someone's card away immediately or treating it casually can suggest you don't value the connection or the person's status."
          },
          { 
            text: "Take it and write notes on it", 
            correct: false,
            feedback: "Writing on someone's business card is considered very disrespectful in Japanese business culture.",
            culturalInsight: "Business cards represent the person and their company. Writing on them is seen as defacing the person's identity and professional standing."
          }
        ]
      },
      {
        id: "seating_arrangement",
        prompt: "Where should you sit in the meeting room?",
        options: [
          { 
            text: "Wait to be directed to a seat by your host", 
            correct: true,
            feedback: "Correct! In Japanese meetings, guests are typically directed where to sit based on hierarchy and protocol.",
            culturalInsight: "Seating arrangements in Japanese business settings follow specific hierarchical rules. The highest-ranking person typically sits furthest from the door, with subordinates closer to the door. As a guest, waiting to be seated shows respect for these customs.",
            highlightKey: "seating_arrangement"
          },
          { 
            text: "Take the seat at the head of the table to show confidence", 
            correct: false,
            feedback: "Taking the seat at the head of the table could be seen as presumptuous and disrespectful of hierarchy.",
            culturalInsight: "In Japanese business culture, hierarchy is important and spatial arrangements reflect this. The most senior person usually takes the 'kamiza' (seat of honor) position."
          },
          { 
            text: "Sit anywhere that's convenient", 
            correct: false,
            feedback: "Japanese business meetings have specific seating protocols based on rank and status.",
            culturalInsight: "Seating in Japanese meetings is not random or based on convenience. There's a specific order that respects company hierarchy and the host-guest relationship."
          }
        ]
      }
    ]
  },
  france: {
    paris_lunch: [
      {
        id: "greeting",
        prompt: "How do you greet your French business associates?",
        options: [
          { 
            text: "A light handshake and 'Bonjour Madame/Monsieur'", 
            correct: true,
            feedback: "Correct! A handshake with 'Bonjour' (or 'Bonjour Madame/Monsieur') is the appropriate formal greeting in French business culture.",
            culturalInsight: "Using titles (Madame/Monsieur) is important in French business settings. First names are typically only used after being invited to do so, which may take several meetings.",
            highlightKey: "greeting"
          },
          { 
            text: "Kiss on both cheeks", 
            correct: false,
            feedback: "While 'la bise' (cheek kisses) is common in social settings in France, it's typically not appropriate for initial business meetings unless you know the person well.",
            culturalInsight: "La bise (cheek kissing) is primarily for social settings or between colleagues who know each other well. The number of kisses varies by region in France, from one to four."
          },
          { 
            text: "Just say 'Hey' with a wave", 
            correct: false,
            feedback: "This greeting is too casual for French business culture, which values formality and politeness in professional settings.",
            culturalInsight: "French business culture places high value on politeness and proper etiquette. Casual American-style greetings can be perceived as lacking respect or sophistication."
          }
        ]
      },
      {
        id: "dining_etiquette",
        prompt: "What is the proper dining etiquette at a French business lunch?",
        options: [
          { 
            text: "Keep hands visible on the table, not in your lap", 
            correct: true,
            feedback: "Correct! In France, it's proper etiquette to keep your hands visible on the table, not in your lap.",
            culturalInsight: "The French custom of keeping hands on the table (not under it) dates back to medieval times when it showed you weren't hiding weapons. Today, it's simply considered proper dining etiquette.",
            highlightKey: "dining_etiquette"
          },
          { 
            text: "Eat quickly to show appreciation for the food", 
            correct: false,
            feedback: "French business meals are meant to be enjoyed at a leisurely pace. Eating quickly might suggest you're not appreciating the food or the company.",
            culturalInsight: "In France, meals are cultural experiences to be savored. Business lunches often last 1.5-2 hours, with conversation and relationship-building being as important as the food."
          },
          { 
            text: "Wait to eat until the host says 'Bon appétit'", 
            correct: true,
            feedback: "Correct! It's polite to wait until the host says 'Bon appétit' before beginning to eat.",
            culturalInsight: "The phrase 'Bon appétit' signals the start of the meal. It's also polite to wait until everyone at the table has been served before beginning to eat.",
            highlightKey: "dining_etiquette"
          }
        ]
      },
      {
        id: "business_discussion",
        prompt: "When is the appropriate time to begin discussing business during the lunch?",
        options: [
          { 
            text: "After some general conversation and when the main course is served", 
            correct: true,
            feedback: "Correct! In France, it's customary to engage in general conversation before discussing business matters, usually around the main course.",
            culturalInsight: "French business culture values building relationships before conducting business. Starting with lighter topics like culture, travel, or food shows you value the personal relationship beyond just the transaction.",
            highlightKey: "conversation_timing"
          },
          { 
            text: "Immediately after ordering", 
            correct: false,
            feedback: "Starting business talk immediately is considered too direct and may be perceived as rude or impatient in French business culture.",
            culturalInsight: "The French separate relationship-building from business discussions. Beginning with business immediately can make you appear overly transactional and not interested in building a proper business relationship."
          },
          { 
            text: "Not at all - a business lunch is purely social", 
            correct: false,
            feedback: "While relationship building is important, a business lunch in France does typically include business discussion, just not at the very beginning.",
            culturalInsight: "French business lunches have an informal structure: aperitifs and small talk, followed by starter course and general conversation, then main course with business discussion, and dessert for wrapping up business or returning to lighter topics."
          }
        ]
      },
      {
        id: "wine_etiquette",
        prompt: "Your French host offers wine with lunch. What is the appropriate response?",
        options: [
          { 
            text: "Accept a small amount and sip slowly throughout the meal", 
            correct: true,
            feedback: "Correct! Having a modest amount of wine with a business lunch is acceptable in French culture.",
            culturalInsight: "Wine is an integral part of French dining culture, even at business meals. Moderation is key - a glass sipped slowly shows appreciation for the culture without concerns about professionalism.",
            highlightKey: "dining_etiquette"
          },
          { 
            text: "Decline and ask for water instead", 
            correct: false,
            feedback: "While it's perfectly acceptable to decline alcohol, doing so without explanation might seem dismissive of an important cultural tradition.",
            culturalInsight: "If you don't drink alcohol, a simple explanation with an alternative beverage preference is appreciated. Many French people will understand dietary, religious, or personal reasons for abstaining."
          },
          { 
            text: "Drink multiple glasses quickly to show appreciation", 
            correct: false,
            feedback: "Drinking excessively during a business lunch is not appropriate in French business culture.",
            culturalInsight: "While wine is important in French culture, business lunches are still professional occasions. Maintaining composure and moderation shows respect for both the cultural tradition and the business relationship."
          }
        ]
      }
    ]
  }
};

// Export the InteractionManager and enhanced interactions
export { InteractionManager, enhancedInteractions };
