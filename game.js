// Global Business Quest - Three.js Implementation
// This file sets up the core game environment and mechanics

// Check for WebGL support
if (!window.WebGLRenderingContext) {
  alert('Your browser does not support WebGL. Please use a modern browser.');
  throw new Error('WebGL not supported');
}

// Import Three.js and necessary modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { InteractionManager, enhancedInteractions, BaseEnvironment } from './interactions.js';
import { ScenarioManager, additionalScenarios } from './scenarios.js';
import { UIManager } from './ui.js';
import { TokyoOfficeEnvironment } from './countries/TokyoOfficeEnvironment.js';
import { ParisRestaurantEnvironment } from './countries/ParisRestaurantEnvironment.js';
import { JapanModule } from './countries/JapanModule.js';
import { FranceModule } from './countries/FranceModule.js';
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
    
    // Load country modules
    this.countryModules = {
      japan: JapanModule,
      france: FranceModule
    };
    
    // Game configuration - now using modules for country data
    this.countries = {
      japan: {
        name: this.countryModules.japan.metadata.name,
        description: this.countryModules.japan.metadata.description,
        scenarios: this.countryModules.japan.scenarios
      },
      france: {
        name: this.countryModules.france.metadata.name,
        description: this.countryModules.france.metadata.description,
        scenarios: this.countryModules.france.scenarios
      }
    };
    
    // Three.js setup
    if (!this.initThreeJS()) {
      console.error("Failed to initialize Three.js, cannot continue");
      return;
    }
    
    // Initialize managers
    this.initManagers();
    
    // Initialize resources
    this.initResources();
    
    // Start the game
    this.showCountrySelection();
  }
  
  initThreeJS() {
    console.log("Initializing Three.js...");
    
    try {
      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
      
      // Camera setup
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 1.6, 5); // Positioning camera at human eye level
      
      // Renderer setup with error checking
      try {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
      } catch (error) {
        console.error("WebGL renderer creation failed:", error);
        alert("Failed to initialize WebGL. Please use a modern browser that supports WebGL.");
        return false;
      }
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      
      // Get the container and add the renderer
      const container = document.getElementById('game-container');
      if (!container) {
        console.error("Could not find game-container element!");
        return false;
      }
      container.appendChild(this.renderer.domElement);
      
      // Controls setup
      try {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going below ground
      } catch (error) {
        console.error("OrbitControls initialization failed:", error);
        // We can continue without controls if necessary
      }
      
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
      return true;
    } catch (error) {
      console.error("Three.js initialization failed:", error);
      return false;
    }
  }
  
  initManagers() {
    try {
      // Initialize UI manager
      this.uiManager = new UIManager(this);
      
      // Initialize scenario manager
      this.scenarioManager = new ScenarioManager(this);
      this.scenarioManager.initializeScenarios();
      
      // Initialize interaction manager
      this.interactionManager = new InteractionManager(this);
      
      console.log("Game managers initialized successfully");
    } catch (error) {
      console.error("Failed to initialize game managers:", error);
    }
  }
  
  initResources() {
    // Load country images
    this.countryImages = {
      japan: 'assets/images/countries/japan.jpg',
      france: 'assets/images/countries/france.jpg'
    };
    
    // Load 3D environment models
    this.environmentModels = {
      tokyo_office: 'assets/models/environments/tokyo_office.gltf',
      paris_restaurant: 'assets/models/environments/paris_restaurant.gltf'
    };
  }
  
  loadEnvironmentModel(modelName) {
    return new Promise((resolve, reject) => {
      const modelPath = this.environmentModels[modelName];
      if (!modelPath) {
        console.error(`Model ${modelName} not found`);
        reject(new Error(`Model ${modelName} not found`));
        return;
      }
      
      this.loader.load(
        modelPath,
        (gltf) => {
          console.log(`Model ${modelName} loaded successfully`);
          resolve(gltf.scene);
        },
        (xhr) => {
          console.log(`${modelName} loading: ${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
          console.error(`Error loading model ${modelName}:`, error);
          reject(error);
        }
      );
    });
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
  
  async loadCountryScene(country) {
    // Clear existing scene objects (except for lights and ground)
    this.clearScene();
    
    // Reset interactive objects
    this.interactiveObjects = [];
    
    // Apply country-specific scene settings from the module
    if (this.countryModules[country]) {
      const sceneSettings = this.countryModules[country].sceneSettings;
      if (sceneSettings) {
        // Apply background color
        if (sceneSettings.background) {
          this.scene.background = new THREE.Color(sceneSettings.background);
        }
        
        // Update lighting
        this.updateLighting(sceneSettings);
      }
    }
    
    // Load appropriate scene based on country
    try {
      if (country === 'japan') {
        // Try to load the environment model first
        try {
          const model = await this.loadEnvironmentModel('tokyo_office');
          this.scene.add(model);
        } catch (error) {
          console.warn("Could not load Tokyo office model, falling back to generated environment");
          this.activeEnvironment = new TokyoOfficeEnvironment(this.scene);
        }
      } else if (country === 'france') {
        // Try to load the environment model first
        try {
          const model = await this.loadEnvironmentModel('paris_restaurant');
          this.scene.add(model);
        } catch (error) {
          console.warn("Could not load Paris restaurant model, falling back to generated environment");
          this.activeEnvironment = new ParisRestaurantEnvironment(this.scene);
        }
      }
    } catch (error) {
      console.error("Error loading country scene:", error);
    }
    
    // Set up camera position
    this.positionCameraForScene(country);
  }
  
  updateLighting(sceneSettings) {
    // Update ambient light
    if (sceneSettings.ambientLight) {
      this.scene.children.forEach(child => {
        if (child instanceof THREE.AmbientLight) {
          child.color.set(sceneSettings.ambientLight.color);
          child.intensity = sceneSettings.ambientLight.intensity;
        }
      });
    }
    
    // Update directional light
    if (sceneSettings.directionalLight) {
      this.scene.children.forEach(child => {
        if (child instanceof THREE.DirectionalLight) {
          child.color.set(sceneSettings.directionalLight.color);
          child.intensity = sceneSettings.directionalLight.intensity;
          if (sceneSettings.directionalLight.position) {
            child.position.set(...sceneSettings.directionalLight.position);
          }
        }
      });
    }
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
    
    // Update controls if they exist
    if (this.controls) {
      this.controls.update();
    }
    
    // Update active environment if it exists
    if (this.activeEnvironment && this.activeEnvironment.animate) {
      this.activeEnvironment.animate(performance.now());
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
    
    // Check for unlocked scenarios
    this.checkUnlockedScenarios();
  }
  
  checkUnlockedScenarios() {
    // Check completion rewards in the current scenario
    const currentScenario = this.scenarioManager.currentScenario;
    if (currentScenario.completion && currentScenario.completion.rewards) {
      const rewards = currentScenario.completion.rewards;
      
      // If score meets minimum requirements
      if (currentScenario.calculateScore() >= rewards.minScore) {
        // Unlock new scenarios
        if (rewards.unlocks && rewards.unlocks.length > 0) {
          rewards.unlocks.forEach(scenarioId => {
            this.unlockScenario(scenarioId);
          });
        }
        
        // Add cultural insights to player's knowledge
        if (rewards.culturalInsights && rewards.culturalInsights.length > 0) {
          rewards.culturalInsights.forEach(insight => {
            this.addCulturalKnowledge(this.currentCountry, insight);
          });
        }
      }
    }
  }
  
  unlockScenario(scenarioId) {
    // Find the scenario in all countries
    for (const countryId in this.countries) {
      const country = this.countries[countryId];
      const scenario = country.scenarios.find(s => s.id === scenarioId);
      if (scenario) {
        console.log(`Unlocked scenario: ${scenario.title}`);
        scenario.locked = false;
        return true;
      }
    }
    return false;
  }
  
  // Event handlers for scenario and interaction events
  onScenarioStart(scenario) {
    console.log("Scenario started:", scenario.title);
    
    // Position characters if specified in the scenario
    if (scenario.characters && this.activeEnvironment && this.activeEnvironment.positionCharacters) {
      this.activeEnvironment.positionCharacters(scenario.characters);
    }
  }
  
  onInteractionStart(interaction) {
    console.log("Interaction started:", interaction.id);
  }
  
  onOptionSelected(interaction, option) {
    console.log("Option selected in scenario:", option.text);
    
    // Record the player's choice in the scenario
    this.scenarioManager.selectOption(option);
    
    // Update cultural competence if specified
    if (option.culturalCompetence) {
      this.addCulturalCompetence(this.currentCountry, option.culturalCompetence);
    }
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
      this.culturalCompetence[country] = {
        knowledge: [],
        score: 0
      };
    }
    
    if (!this.culturalCompetence[country].knowledge.includes(key)) {
      this.culturalCompetence[country].knowledge.push(key);
      console.log("Cultural knowledge gained:", country, key);
    }
  }
  
  // Add to the cultural competence score
  addCulturalCompetence(country, points) {
    if (!this.culturalCompetence[country]) {
      this.culturalCompetence[country] = {
        knowledge: [],
        score: 0
      };
    }
    
    this.culturalCompetence[country].score += points;
    console.log(`Cultural competence for ${country} updated: ${this.culturalCompetence[country].score}`);
  }
  
  // Get player's cultural competence level for a country
  getCulturalCompetenceLevel(country) {
    if (!this.culturalCompetence[country]) return 0;
    
    // Calculate level based on score and knowledge
    const score = this.culturalCompetence[country].score;
    const knowledgeCount = this.culturalCompetence[country].knowledge.length;
    
    // Simple formula: every 20 points or 5 knowledge items equals one level
    return Math.floor((score / 20) + (knowledgeCount / 5));
  }
  
  // Get Japanese greeting based on time of day
  // Helper method that utilizes the JapanModule's function
  getJapaneseGreeting() {
    if (typeof this.countryModules.japan.getJapaneseGreeting === 'function') {
      const now = new Date();
      return this.countryModules.japan.getJapaneseGreeting(now);
    }
    return "Konnichiwa";
  }
}

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded, initializing game...");
  try {
    const game = new GlobalBusinessQuest();
  } catch (error) {
    console.error("Failed to initialize game:", error);
    alert("Failed to initialize the game. See console for details.");
  }
});
