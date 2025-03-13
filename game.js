// Global Business Quest - Main Game Controller
// This file sets up the core game environment and mechanics with mobile optimizations

// Import Three.js and related modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import game modules
import { countries, createCountryEnvironment } from './countries.js';
import { UIManager } from './ui.js';
// Import Cultural Competence System
import { CulturalCompetenceSystem } from './cultural-competence.js';

// Main Game Class
class GlobalBusinessQuest {
    constructor() {
        console.log("Starting Global Business Quest...");
        
        // Game state
        this.currentCountry = null;
        this.currentScenario = null;
        this.currentInteraction = null;
        this.playerScore = 0;
        this.countries = countries;
        this.activeEnvironment = null;
        this.completedCountries = {};
        
        // Initialize Cultural Competence System
        this.competenceSystem = new CulturalCompetenceSystem();
        
        // Add listener for skill unlock events
        document.addEventListener('culturalSkillUnlocked', (event) => {
            // Show notification for new skill
            this.uiManager.showSkillUnlockNotification(
                event.detail.countryId,
                event.detail.skillId,
                event.detail.skillName,
                event.detail.skillDescription
            );
        });
        
        // Detect if mobile device
        this.isMobile = this.detectMobile();
        console.log("Device detected as:", this.isMobile ? "mobile" : "desktop");
        
        // Initialize Three.js
        if (!this.initThreeJS()) {
            console.error("Failed to initialize Three.js, cannot continue");
            return;
        }
        
        // Initialize UI manager
        try {
            this.uiManager = new UIManager(this);
            
            // Start the game by showing country selection
            this.uiManager.showCountrySelection();
        } catch (error) {
            console.error("Failed to initialize UI manager:", error);
            this.showErrorMessage("Failed to initialize UI: " + error.message);
        }
        
        // Add orientation change listener for mobile
        if (this.isMobile) {
            window.addEventListener('orientationchange', () => {
                console.log("Orientation changed, adjusting display...");
                setTimeout(() => this.onWindowResize(), 200); // Delay to allow browser to update dimensions
            });
        }
        
        // Listen for competence data updated events
        document.addEventListener('competenceDataUpdated', (event) => {
            // Update UI with new competence data
            if (this.uiManager) {
                this.uiManager.updateScoreDisplay(event.detail.totalCompetence);
                this.uiManager.updateCountrySelectionWithCompetence();
            }
        });
        
        // Listen for cultural level up events
        document.addEventListener('culturalLevelUp', (event) => {
            // Show level up notification
            if (this.uiManager) {
                this.uiManager.showLevelUpNotification(
                    event.detail.countryId, 
                    event.detail.newTitle
                );
            }
        });
    }
    
    // Method to initialize game flow event listeners
    initGameFlowEventListeners() {
        console.log("Initializing game flow event listeners");
        
        // Event delegation for continue buttons on the completion screens
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('continue-journey-button')) {
                this.continueGame();
            } else if (event.target.classList.contains('restart-game-button')) {
                this.reset();
            }
        });
    }
    
    // Cultural Competence System Methods
    
    // Method to award competence points based on scenario performance
    awardCompetencePoints(countryId, points) {
        if (this.competenceSystem) {
            return this.competenceSystem.addCompetencePoints(countryId, points);
        }
        return false;
    }
    
    // Method to get competence level for a country
    getCompetenceLevel(countryId) {
        if (this.competenceSystem) {
            return this.competenceSystem.getCompetenceLevel(countryId);
        }
        return 0;
    }
    
    // Method to get competence title for a country
    getCompetenceTitle(countryId) {
        if (this.competenceSystem) {
            return this.competenceSystem.getCompetenceTitle(countryId);
        }
        return "Novice";
    }
    
    // Method to get all competence data
    getCompetenceSummary() {
        if (this.competenceSystem) {
            return this.competenceSystem.getCompetenceSummary();
        }
        return null;
    }
    
    // Method to reset all competence data (for testing)
    resetCompetenceProgress() {
        if (this.competenceSystem) {
            return this.competenceSystem.resetProgress();
        }
        return false;
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || (window.innerWidth <= 768);
    }
    
    initThreeJS() {
        console.log("Initializing Three.js...");
        
        try {
            // Scene setup
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
            
            // Camera setup - adjust for mobile
            const fov = this.isMobile ? 85 : 75; // Wider FOV on mobile for better view
            this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            // Position camera based on device
            if (this.isMobile) {
                this.camera.position.set(0, 2, 7); // Further back on mobile for better view
            } else {
                this.camera.position.set(0, 1.6, 5); // Standard position on desktop
            }
            
            // Renderer setup with error checking
            try {
                this.renderer = new THREE.WebGLRenderer({ 
                    antialias: !this.isMobile, // Disable antialiasing on mobile for performance
                    powerPreference: this.isMobile ? 'low-power' : 'high-performance'
                });
            } catch (error) {
                console.error("WebGL renderer creation failed:", error);
                this.showErrorMessage("Failed to initialize WebGL. Please use a modern browser that supports WebGL.");
                return false;
            }
            
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(this.isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);
            this.renderer.shadowMap.enabled = !this.isMobile; // Disable shadows on mobile for performance
            
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
                
                // Adjust controls for mobile
                if (this.isMobile) {
                    this.controls.rotateSpeed = 0.7; // Slower rotation for easier control
                    this.controls.enableZoom = false; // Disable pinch zoom on mobile to avoid conflicts
                    this.controls.enablePan = false; // Disable panning on mobile
                }
            } catch (error) {
                console.error("OrbitControls initialization failed:", error);
                // We can continue without controls if necessary
            }
            
            // Lighting setup
            this.addLights();
            
            // Basic ground
            this.addGround();
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize(), false);
            
            // Start animation loop with performance optimization
            this.lastTime = 0;
            this.animate();
            
            console.log("Three.js initialization complete!");
            return true;
        } catch (error) {
            console.error("Three.js initialization failed:", error);
            this.showErrorMessage(`Three.js initialization failed: ${error.message}`);
            return false;
        }
    }
    
    showErrorMessage(message) {
        // Create or get error display element
        let errorDisplay = document.getElementById('error-display');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.id = 'error-display';
            errorDisplay.style.position = 'fixed';
            errorDisplay.style.top = '10px';
            errorDisplay.style.left = '10px';
            errorDisplay.style.right = '10px';
            errorDisplay.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
            errorDisplay.style.color = 'white';
            errorDisplay.style.padding = '15px';
            errorDisplay.style.borderRadius = '5px';
            errorDisplay.style.zIndex = '1000';
            errorDisplay.style.textAlign = 'center';
            document.body.appendChild(errorDisplay);
        }
        
        errorDisplay.innerHTML = message;
        errorDisplay.style.display = 'block';
        
        // Auto-hide after 7 seconds on mobile
        if (this.isMobile) {
            setTimeout(() => {
                errorDisplay.style.opacity = '0';
                errorDisplay.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    errorDisplay.style.display = 'none';
                    errorDisplay.style.opacity = '1';
                }, 500);
            }, 7000);
        }
    }
    
    addLights() {
        // Ambient light
        const ambientIntensity = this.isMobile ? 0.7 : 0.5; // Brighter ambient on mobile
        const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 10, 7.5);
        dirLight.castShadow = !this.isMobile; // Don't cast shadows on mobile for performance
        
        // Optimize shadow settings based on device
        if (!this.isMobile) {
            // Higher quality shadows for desktop
            dirLight.shadow.mapSize.width = 1024;
            dirLight.shadow.mapSize.height = 1024;
            dirLight.shadow.camera.near = 0.5;
            dirLight.shadow.camera.far = 50;
        }
        
        this.scene.add(dirLight);
    }
    
    addGround() {
        // Use smaller plane on mobile for performance
        const groundSize = this.isMobile ? 50 : 100;
        const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x1a5e1a });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = !this.isMobile; // No shadows on mobile
        this.scene.add(ground);
    }
    
    onWindowResize() {
        // Update mobile detection on resize
        this.isMobile = this.detectMobile();
        
        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update pixel ratio with limits for mobile
        this.renderer.setPixelRatio(this.isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);
        
        console.log("Resized game view for", this.isMobile ? "mobile" : "desktop");
    }
    
    animate(time) {
        requestAnimationFrame((t) => this.animate(t));
        
        // For mobile, limit frames for battery saving
        if (this.isMobile) {
            // Skip frames on mobile for power saving (target ~30fps)
            if (time - this.lastTime < 33) { // ~30fps
                return;
            }
            this.lastTime = time;
        }
        
        try {
            // Update controls if they exist
            if (this.controls) {
                this.controls.update();
            }
            
            // Update active environment if it exists
            if (this.activeEnvironment && this.activeEnvironment.animate) {
                this.activeEnvironment.animate(time);
            }
            
            // Render scene
            this.renderer.render(this.scene, this.camera);
        } catch (error) {
            console.error("Error in animation loop:", error);
            // Don't show error to user since this would appear every frame
            // Just log to console for debugging
        }
    }
    
    selectCountry(countryId) {
        console.log("Country selected:", countryId);
        this.currentCountry = countryId;
        
        try {
            // Update scene background color
            const country = this.countries[countryId];
            if (country && country.color) {
                this.scene.background = new THREE.Color(country.color);
            }
            
            // Load the country environment
            this.activeEnvironment = createCountryEnvironment(this.scene, countryId);
            
            // Position camera appropriately based on device
            if (this.isMobile) {
                // Further back and higher for better visibility on mobile
                this.camera.position.set(0, 2.5, 5.5);
            } else {
                this.camera.position.set(0, 2, 4);
            }
            
            this.camera.lookAt(0, 0.5, 0);
            
            // Start first scenario
            this.startScenario(country.scenarios[0]);
        } catch (error) {
            console.error("Error creating country environment:", error);
            this.showErrorMessage(`Error creating environment: ${error.message}`);
        }
    }
    
    startScenario(scenario) {
        console.log("Starting scenario:", scenario.title);
        this.currentScenario = scenario;
        
        try {
            // Show scenario in UI
            this.uiManager.showScenario(scenario);
            
            // Start with the first interaction
            this.currentInteractionIndex = 0;
            this.nextInteraction();
        } catch (error) {
            console.error("Error starting scenario:", error);
            this.showErrorMessage(`Error starting scenario: ${error.message}`);
        }
    }
    
    nextInteraction() {
        try {
            // Check if we have more interactions
            if (this.currentInteractionIndex < this.currentScenario.interactions.length) {
                const interaction = this.currentScenario.interactions[this.currentInteractionIndex];
                this.currentInteraction = interaction;
                
                // Show interaction in UI
                this.uiManager.showInteraction(interaction);
            } else {
                // End of scenario - call endScenario instead of the old implementation
                this.endScenario();
            }
        } catch (error) {
            console.error("Error loading next interaction:", error);
            this.showErrorMessage(`Error loading next interaction: ${error.message}`);
        }
    }
    
    selectOption(interaction, option) {
        console.log("Option selected:", option.text);
        
        try {
            // Show feedback
            this.uiManager.showFeedback(option);
            
            // Update score if correct
            if (option.correct) {
                this.playerScore += 10;
                this.uiManager.updateScoreDisplay(this.playerScore);
                
                // Check if this question/option relates to a specific cultural skill
                if (interaction.skillId && this.currentCountry) {
                    // Mark relevant interactions for skill acquisition
                    console.log(`This interaction relates to the ${interaction.skillId} skill in ${this.currentCountry}`);
                }
            }
            
            // Move to next interaction after a delay
            this.currentInteractionIndex++;
            
            // Adjust delay based on device - mobile users might need more time to read
            const feedbackDelay = this.isMobile ? 3500 : 3000;
            
            // Automatically advance to next question after a delay
            setTimeout(() => {
                this.uiManager.hideFeedback();
                this.nextInteraction();
            }, feedbackDelay);
        } catch (error) {
            console.error("Error processing option selection:", error);
            this.showErrorMessage(`Error processing selection: ${error.message}`);
        }
    }
    
    // Method to handle scenario completion
    endScenario() {
        console.log("Scenario complete");
        
        try {
            // On mobile, simplify the 3D scene when showing completion to improve performance
            if (this.isMobile && this.activeEnvironment) {
                // Reduce animation complexity or stop non-essential animations
                this.simplifyScene();
            }
            
            // Award competence points for scenario completion
            if (this.currentCountry) {
                // Add points based on player score
                this.awardCompetencePoints(this.currentCountry, this.playerScore);
                
                // Show scenario completion screen with cultural competence update
                this.uiManager.showScenarioComplete(this.currentCountry, this.playerScore);
                
                // Reset player score for next scenario
                this.playerScore = 0;
                
                // Check if all scenarios for this country are complete
                this.checkCountryCompletion();
            }
            
        } catch (error) {
            console.error("Error ending scenario:", error);
            this.showErrorMessage(`Error completing scenario: ${error.message}`);
            
            // Fallback to country selection
            setTimeout(() => {
                this.uiManager.showCountrySelection();
            }, 1000);
        }
    }
    
    // Method to check for country completion and proceed to Game Complete if needed
    checkCountryCompletion() {
        if (!this.currentCountry) return;
        
        const country = this.countries[this.currentCountry];
        if (!country) return;
        
        // For demonstration, we'll consider the country complete after the first scenario
        // In a real implementation, you would track which scenarios are completed
        
        // Store completion status
        if (!this.completedCountries) {
            this.completedCountries = {};
        }
        this.completedCountries[this.currentCountry] = true;
        
        // Check if all available countries are completed
        const allCountriesCompleted = Object.keys(this.countries).every(
            countryId => this.completedCountries[countryId]
        );
        
        // If all countries are completed, show the game complete screen after a delay
        if (allCountriesCompleted) {
            console.log("All countries completed! Showing game complete screen...");
            setTimeout(() => {
                this.uiManager.showGameComplete();
            }, 5000); // Give user time to read scenario completion first
        }
    }
    
    // Method to handle continue/restart functionality
    continueGame() {
        // Reset current country and scenario
        this.currentCountry = null;
        this.currentScenario = null;
        
        // Return to country selection
        this.uiManager.showCountrySelection();
        
        // Ensure competence profile is updated
        if (this.uiManager.hasCompetenceSystem()) {
            this.uiManager.updateCountrySelectionWithCompetence();
        }
    }
    
    // Extended reset method to handle game complete condition
    reset() {
        // Reset competence system if it exists
        if (this.competenceSystem) {
            this.competenceSystem.resetProgress();
        }
        
        // Reset game state
        this.playerScore = 0;
        this.currentCountry = null;
        this.currentScenario = null;
        this.completedCountries = {};
        
        // Reset the UI
        if (this.uiManager) {
            this.uiManager.showCountrySelection();
            this.uiManager.updateScoreDisplay(0);
        }
    }
    
    simplifyScene() {
        // This method reduces scene complexity for mobile when showing completion screen
        
        // Remove or hide non-essential elements
        try {
            // Example: Find and disable any animations or particles
            this.scene.traverse((object) => {
                // Disable any particle systems or complex animations
                // This is a placeholder - actual implementation depends on your scene structure
                if (object.userData && object.userData.isComplexAnimation) {
                    object.visible = false;
                }
            });
            
            // Reduce shadow quality even further
            this.renderer.shadowMap.enabled = false;
            
            console.log("Simplified scene for mobile completion screen");
        } catch (error) {
            console.error("Error simplifying scene:", error);
            // Non-critical error, don't show to user
        }
    }
}

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing game...");
    
    // Add a small delay on mobile to ensure all resources are ready
    const initDelay = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 100 : 0;
    
    setTimeout(() => {
        try {
            const game = new GlobalBusinessQuest();
            
            // Initialize game flow event listeners
            game.initGameFlowEventListeners();
            
            // Attach game instance to window for debugging (optional, remove in production)
            window.gameInstance = game;
            
        } catch (error) {
            console.error("Failed to initialize game:", error);
            
            // Create error display if it doesn't exist
            let errorDisplay = document.getElementById('error-display');
            if (!errorDisplay) {
                errorDisplay = document.createElement('div');
                errorDisplay.id = 'error-display';
                errorDisplay.style.position = 'fixed';
                errorDisplay.style.top = '10px';
                errorDisplay.style.left = '10px';
                errorDisplay.style.right = '10px';
                errorDisplay.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
                errorDisplay.style.color = 'white';
                errorDisplay.style.padding = '15px';
                errorDisplay.style.borderRadius = '5px';
                errorDisplay.style.zIndex = '1000';
                errorDisplay.style.textAlign = 'center';
                document.body.appendChild(errorDisplay);
            }
            
            errorDisplay.innerHTML = `Failed to initialize game: ${error.message}`;
            errorDisplay.style.display = 'block';
        }
    }, initDelay);
});
