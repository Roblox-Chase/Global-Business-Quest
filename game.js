// Global Business Quest - Main Game Controller
// This file sets up the core game environment and mechanics with mobile optimizations

// Import Three.js and related modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import game modules
import { countries, createCountryEnvironment } from './countries.js';
import { UIManager } from './ui.js';
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

        // Listen for storage events to detect localStorage changes
        window.addEventListener('storage', (event) => {
            if (event.key === 'globalBusinessQuest_competence') {
                console.log("localStorage competence data changed:", event);
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

    // Debug method to output current game state
    debug() {
        console.log("Game state:", {
            currentCountry: this.currentCountry,
            currentScenario: this.currentScenario ? this.currentScenario.id : null,
            currentInteraction: this.currentInteraction ? this.currentInteraction.id : null,
            playerScore: this.playerScore,
            completedCountries: this.completedCountries || {},
            competenceData: this.competenceSystem ? this.competenceSystem.getCompetenceSummary() : null
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

        try {
            // Set the current scenario
            this.currentScenario = scenario;

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
            // Check if we have a valid scenario
            if (!this.currentScenario) {
                console.error("No current scenario found!");
                this.showErrorMessage("No scenario is currently active.");
                return;
            }

            // Debug log to verify the current scenario
            console.log("Current Scenario:", this.currentScenario.title);

            // Check if we have more interactions
            if (this.currentInteractionIndex < this.currentScenario.interactions.length) {
                const interaction = this.currentScenario.interactions[this.currentInteractionIndex];
                this.currentInteraction = interaction;

                // Debug log to verify the current interaction
                console.log("Current Interaction:", interaction.prompt);

                // Show interaction in UI
                this.uiManager.showInteraction(interaction);

                // Increment the interaction index for the next question
                this.currentInteractionIndex++;
            } else {
                // End of scenario - call the enhanced endScenario method
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

    // Enhanced method to handle scenario completion
    endScenario() {
        console.log("Scenario complete");

        try {
            // On mobile, simplify the 3D scene when showing completion to improve performance
            if (this.isMobile && this.activeEnvironment) {
                this.simplifyScene();
            }

            // Award competence points for scenario completion
            if (this.currentCountry) {
                // Add points based on player score
                this.awardCompetencePoints(this.currentCountry, this.playerScore);

                // Show scenario completion screen with cultural competence update
                this.uiManager.showScenarioComplete(this.currentCountry, this.playerScore);

                // Save progress explicitly
                if (this.competenceSystem) {
                    this.competenceSystem.saveData();
                    console.log("Saved competence data after scenario completion");
                }

                // Reset player score for next scenario
                this.playerScore = 0;

                // Check if there are more scenarios in the current country
                const country = this.countries[this.currentCountry];
                if (country && country.scenarios) {
                    const currentScenarioIndex = country.scenarios.findIndex(s => s.id === this.currentScenario.id);
                    if (currentScenarioIndex !== -1 && currentScenarioIndex < country.scenarios.length - 1) {
                        // There are more scenarios to play in this country
                        console.log("More scenarios available in this country");
                        
                        // Mark current scenario as completed
                        if (!this.completedCountries[this.currentCountry]) {
                            this.completedCountries[this.currentCountry] = [];
                        }
                        this.completedCountries[this.currentCountry].push(this.currentScenario.id);
                    } else {
                        // All scenarios in this country are completed
                        console.log("All scenarios completed for this country");
                        
                        // Mark country as fully completed
                        this.completedCountries[this.currentCountry] = 'completed';
                        
                        // Show country completion message
                        this.uiManager.showCountryComplete(this.currentCountry);
                    }
                }
            }
        } catch (error) {
            console.error("Error handling scenario completion:", error);
            this.showErrorMessage(`Error completing scenario: ${error.message}`);
        }
    }

    // Method to simplify the 3D scene for mobile performance
    simplifyScene() {
        try {
            // Remove non-essential objects or reduce their complexity
            if (this.activeEnvironment && this.activeEnvironment.simplify) {
                this.activeEnvironment.simplify();
            }
            
            // Reduce shadow quality
            if (this.renderer) {
                this.renderer.shadowMap.enabled = false;
            }
            
            console.log("Simplified 3D scene for better mobile performance");
        } catch (error) {
            console.error("Error simplifying scene:", error);
        }
    }

    // Method to continue the game after completing a scenario
    continueGame() {
        try {
            // Check if there are more scenarios in the current country
            const country = this.countries[this.currentCountry];
            if (country && country.scenarios) {
                const currentScenarioIndex = country.scenarios.findIndex(s => s.id === this.currentScenario.id);
                
                if (currentScenarioIndex !== -1 && currentScenarioIndex < country.scenarios.length - 1) {
                    // Start the next scenario in the current country
                    const nextScenario = country.scenarios[currentScenarioIndex + 1];
                    
                    console.log("Starting next scenario:", nextScenario.title);
                    this.startScenario(nextScenario);
                } else {
                    // All scenarios in this country completed, return to country selection
                    this.returnToCountrySelection();
                }
            } else {
                this.returnToCountrySelection();
            }
        } catch (error) {
            console.error("Error continuing game:", error);
            this.showErrorMessage(`Error continuing game: ${error.message}`);
            
            // Fallback to country selection
            this.returnToCountrySelection();
        }
    }

    // Method to return to country selection screen
    returnToCountrySelection() {
        console.log("Returning to country selection");
        
        try {
            // Clear current country and scenario
            this.currentCountry = null;
            this.currentScenario = null;
            this.currentInteraction = null;
            
            // Reset scene to default
            this.scene.background = new THREE.Color(0x87CEEB);
            
            // Remove country-specific environment
            if (this.activeEnvironment && this.activeEnvironment.dispose) {
                this.activeEnvironment.dispose();
            }
            this.activeEnvironment = null;
            
            // Reset camera position
            if (this.isMobile) {
                this.camera.position.set(0, 2, 7);
            } else {
                this.camera.position.set(0, 1.6, 5);
            }
            
            // Show country selection in UI
            this.uiManager.showCountrySelection();
            
            // Update country selection with current competence levels
            this.uiManager.updateCountrySelectionWithCompetence();
        } catch (error) {
            console.error("Error returning to country selection:", error);
            this.showErrorMessage(`Error returning to menu: ${error.message}`);
        }
    }

    // Method to reset the game completely
    reset() {
        console.log("Resetting game");
        
        try {
            // Reset cultural competence system
            if (this.competenceSystem) {
                this.competenceSystem.resetProgress();
            }
            
            // Reset game state
            this.playerScore = 0;
            this.completedCountries = {};
            
            // Return to country selection
            this.returnToCountrySelection();
            
            // Show reset confirmation to user
            this.uiManager.showResetConfirmation();
        } catch (error) {
            console.error("Error resetting game:", error);
            this.showErrorMessage(`Error resetting game: ${error.message}`);
        }
    }
}

// Export game class
export { GlobalBusinessQuest };
