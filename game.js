// Global Business Quest - Three.js Implementation
// This file sets up the core game environment and mechanics

// Import Three.js and necessary modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { InteractionManager, enhancedInteractions, BaseEnvironment } from './interactions.js';
import { ScenarioManager, additionalScenarios } from './scenarios.js';
import { UIManager } from './ui.js';
import { TokyoOfficeEnvironment } from './countries/TokyoOfficeEnvironment.js';
import { ParisRestaurantEnvironment } from './countries/ParisRestaurantEnvironment.js';
import { textureManager } from './utils/textures.js';

// Main Game Class
class GlobalBusinessQuest {
  constructor() {
    console.log("Starting GlobalBusinessQuest...");
    console.log("THREE.js version:", THREE.REVISION);
    
    // Game state
    this.currentCountry = null;
    this.currentScenario = null;
    this.playerScore = 0;
    this.culturalCompetence = {};
    this.unlockedCountries = ['japan', 'france']; // Starting countries
    this.interactiveObjects = []; // For tracking interactive objects in scenes
    
    // Game configuration
    this.countries = {
      japan: {
        name: 'Japan',
        description: 'Navigate formal business meetings in Tokyo',
        scenarios: [
          {
            id: 'tokyo_meeting',
            title: 'Tokyo Office Meeting',
            description: 'You\'re attending your first business meeting in Tokyo',
            scene: 'tokyo_office',
            interactions: [
              {
                id: 'greeting',
                prompt: 'How do you greet your Japanese business partners?',
                options: [
                  { 
                    text: 'Bow slightly', 
                    correct: true,
                    feedback: 'Correct! A respectful bow is the appropriate greeting in Japanese business culture.' 
                  },
                  { 
                    text: 'Offer a firm handshake', 
                    correct: false,
                    feedback: 'While handshakes are becoming more common in international business in Japan, starting with a bow shows respect for local customs.' 
                  },
                  { 
                    text: 'Give a friendly hug', 
                    correct: false,
                    feedback: 'Physical contact like hugging is considered too familiar and inappropriate in Japanese business settings.' 
                  }
                ]
              },
              {
                id: 'business_cards',
                prompt: 'Your Japanese counterpart presents their business card to you. What should you do?',
                options: [
                  { 
                    text: 'Take it with both hands, examine it respectfully, and place it carefully on the table', 
                    correct: true,
                    feedback: 'Correct! Business cards (meishi) are treated with great respect in Japan. They are an extension of the person and should be handled carefully.' 
                  },
                  { 
                    text: 'Take it with one hand and put it in your pocket', 
                    correct: false,
                    feedback: 'Placing a business card in your pocket immediately is considered disrespectful in Japan.' 
                  },
                  { 
                    text: 'Take it and write notes on it', 
                    correct: false,
                    feedback: 'Writing on someone\'s business card is considered very disrespectful in Japanese business culture.' 
                  }
                ]
              }
            ]
          }
        ]
      },
      france: {
        name: 'France',
        description: 'Learn the art of business lunches in Paris',
        scenarios: [
          {
            id: 'paris_lunch',
            title: 'Parisian Business Lunch',
            description: 'You\'re invited to a business lunch at a restaurant in Paris',
            scene: 'paris_restaurant',
            interactions: [
              {
                id: 'greeting',
                prompt: 'How do you greet your French business associates?',
                options: [
                  { 
                    text: 'A light handshake and "Bonjour"', 
                    correct: true,
                    feedback: 'Correct! A handshake with "Bonjour" (or "Bonjour Madame/Monsieur") is the appropriate formal greeting in French business culture.' 
                  },
                  { 
                    text: 'Kiss on both cheeks', 
                    correct: false,
                    feedback: 'While "la bise" (cheek kisses) is common in social settings in France, it\'s typically not appropriate for initial business meetings unless you know the person well.' 
                  },
                  { 
                    text: 'Just say "Hey" with a wave', 
                    correct: false,
                    feedback: 'This greeting is too casual for French business culture, which values formality and politeness in professional settings.' 
                  }
                ]
              },
              {
                id: 'business_discussion',
                prompt: 'When is the appropriate time to begin discussing business during the lunch?',
                options: [
                  { 
                    text: 'After some general conversation and when the main course is served', 
                    correct: true,
                    feedback: 'Correct! In France, it\'s customary to engage in general conversation before discussing business matters, usually around the main course.' 
                  },
                  { 
                    text: 'Immediately after ordering', 
                    correct: false,
                    feedback: 'Starting business talk immediately is considered too direct and may be perceived as rude or impatient in French business culture.' 
                  },
                  { 
                    text: 'Not at all - a business lunch is purely social', 
                    correct: false,
                    feedback: 'While relationship building is important, a business lunch in France does typically include business discussion, just not at the very beginning.' 
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    
    // Three.js setup
    this.initThreeJS();
    
    // Initialize managers
    this.initManagers();
    
    // Start the game
    this.showCountrySelection();
  }
  
  initThreeJS() {
    console.log("Initializing Three.js...");
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1.6, 5); // Positioning camera at human eye level
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    
    // Get the container and add the renderer
    const container = document.getElementById('game-container');
    container.appendChild(this.renderer.domElement);
    
    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below ground
    
    // Lighting setup
    this.addLights();
    
    // Basic ground
    this.addGround();
    
    // Scene assets loader
    this.loader = new GLTFLoader();
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(), false);
    
    // Animation loop
    this.animate();
    
    console.log("Three.js initialization complete!");
  }
  
  initManagers() {
    // Initialize UI manager
    this.uiManager = new UIManager(this);
    
    // Initialize scenario manager
    this.scenarioManager = new ScenarioManager(this);
    this.scenarioManager.initializeScenarios();
    
    // Initialize interaction manager
    this.interactionManager = new InteractionManager(this);
  }
  
  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Directional light (sun)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);
  }
  
  addGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x1a5e1a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }
  
  loadCountryScene(country) {
    // Clear existing scene objects (except for lights and ground)
    this.clearScene();
    
    // Reset interactive objects
    this.interactiveObjects = [];
    
    // Load appropriate scene based on country
    if (country === 'japan') {
      this.activeEnvironment = new TokyoOfficeEnvironment(this.scene, this.loader);
    } else if (country === 'france') {
      this.activeEnvironment = new ParisRestaurantEnvironment(this.scene, this.loader);
    }
    
    // Set up camera position
    this.positionCameraForScene(country);
  }
  
  positionCameraForScene(country) {
    if (country === 'japan') {
      this.camera.position.set(0, 1.6, 4);
      this.camera.lookAt(0, 1.6, 0);
    } else if (country === 'france') {
      this.camera.position.set(0, 1.6, 4);
      this.camera.lookAt(0, 1.6, 0);
    }
  }
  
  clearScene() {
    // Keep track of permanent objects (lights, ground)
    const permanentObjects = [];
    this.scene.children.forEach(child => {
      if (child instanceof THREE.AmbientLight || 
          child instanceof THREE.DirectionalLight || 
          (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry)) {
        permanentObjects.push(child);
      }
    });
    
    // Clear scene
    this.scene.clear();
    
    // Add back permanent objects
    permanentObjects.forEach(obj => this.scene.add(obj));
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Update controls
    this.controls.update();
    
    // Update active environment if it exists
    if (this.activeEnvironment && this.activeEnvironment.update) {
      this.activeEnvironment.update(performance.now());
    }
    
    // Update interaction manager
    if (this.interactionManager && this.interactionManager.update) {
      this.interactionManager.update(performance.now());
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  showCountrySelection() {
    console.log("Showing country selection...");
    
    // Use UI manager to show country selection
    this.uiManager.showCountrySelection();
  }
  
  selectCountry(countryId) {
    console.log("Country selected:", countryId);
    this.currentCountry = countryId;
    
    // Load the country's 3D scene
    this.loadCountryScene(countryId);
    
    // Show first scenario
    const scenarios = this.countries[countryId].scenarios;
    if (scenarios && scenarios.length > 0) {
      this.startScenario(scenarios[0].id);
    }
  }
  
  startScenario(scenarioId) {
    console.log("Starting scenario:", scenarioId);
    
    // Use scenario manager to start the scenario
    this.scenarioManager.startScenario(scenarioId);
    
    // Get the scenario object
    const scenario = this.scenarioManager.currentScenario;
    
    // Show scenario UI
    this.uiManager.showScenario(scenario);
    
    // Show first interaction
    this.nextInteraction();
  }
  
  nextInteraction() {
    // Get current interaction from scenario manager
    const interaction = this.scenarioManager.getCurrentInteraction();
    
    if (interaction) {
      // Show interaction in UI
      this.uiManager.showInteraction(interaction);
      
      // Present interaction in the game world
      this.interactionManager.presentInteraction(interaction);
    } else {
      // No more interactions, scenario complete
      this.endScenario();
    }
  }
  
  selectOption(interaction, option) {
    console.log("Option selected:", option.text);
    
    // Process selection with interaction manager
    this.interactionManager.processSelection(option);
    
    // Show feedback
    this.uiManager.showFeedback(option);
    
    // Update score
    if (option.correct) {
      this.playerScore += 10;
      this.uiManager.updateScoreDisplay();
    }
    
    // Move to next interaction after a delay
    setTimeout(() => {
      this.uiManager.hideFeedback();
      this.scenarioManager.nextInteraction();
      this.nextInteraction();
    }, 3000);
  }
  
  endScenario() {
    console.log("Scenario complete");
    
    // Calculate score
    const score = this.scenarioManager.currentScenario.calculateScore();
    
    // Update player's total score
    this.playerScore = this.scenarioManager.getTotalScore();
    
    // Show scenario completion in UI
    this.uiManager.showScenarioComplete(this.scenarioManager.currentScenario, score);
  }
  
  // Event handlers for scenario and interaction events
  onScenarioStart(scenario) {
    console.log("Scenario started:", scenario.title);
  }
  
  onInteractionStart(interaction) {
    console.log("Interaction started:", interaction.id);
  }
  
  onOptionSelected(interaction, option) {
    console.log("Option selected in scenario:", option.text);
    
    // Record the player's choice in the scenario
    this.scenarioManager.selectOption(option);
  }
  
  onScenarioComplete(scenario, score) {
    console.log("Scenario completed:", scenario.title, "Score:", score);
  }
  
  // Camera movement
  moveCamera(position, lookAt) {
    // Animate camera to new position
    const duration = 1000; // ms
    const startPosition = this.camera.position.clone();
    const startTime = performance.now();
    
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth movement
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      
      // Update camera position
      this.camera.position.lerpVectors(startPosition, position, easeProgress);
      
      // Look at the target
      this.camera.lookAt(lookAt);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  // Track cultural knowledge gained
  addCulturalKnowledge(country, key) {
    if (!this.culturalCompetence[country]) {
      this.culturalCompetence[country] = [];
    }
    
    if (!this.culturalCompetence[country].includes(key)) {
      this.culturalCompetence[country].push(key);
      console.log("Cultural knowledge gained:", country, key);
    }
  }
  
  // Get player's cultural competence level for a country
  getCulturalCompetenceLevel(country) {
    if (!this.culturalCompetence[country]) return 0;
    
    return this.culturalCompetence[country].length;
  }
