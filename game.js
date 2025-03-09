// Global Business Quest - Main Game Controller
// This file sets up the core game environment and mechanics

// Import Three.js and related modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import game modules
import { countries, createCountryEnvironment } from './countries.js';
import { UIManager } from './ui.js';

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
        
        // Initialize Three.js
        if (!this.initThreeJS()) {
            console.error("Failed to initialize Three.js, cannot continue");
            return;
        }
        
        // Initialize UI manager
        this.uiManager = new UIManager(this);
        
        // Start the game by showing country selection
        this.uiManager.showCountrySelection();
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
                document.getElementById('error-display').innerHTML = "Failed to initialize WebGL. Please use a modern browser that supports WebGL.";
                document.getElementById('error-display').style.display = 'block';
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
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize(), false);
            
            // Start animation loop
            this.animate();
            
            console.log("Three.js initialization complete!");
            return true;
        } catch (error) {
            console.error("Three.js initialization failed:", error);
            document.getElementById('error-display').innerHTML = `Three.js initialization failed: ${error.message}`;
            document.getElementById('error-display').style.display = 'block';
            return false;
        }
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 10, 7.5);
        dirLight.castShadow = true;
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
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    selectCountry(countryId) {
        console.log("Country selected:", countryId);
        this.currentCountry = countryId;
        
        // Update scene background color
        const country = this.countries[countryId];
        if (country && country.color) {
            this.scene.background = new THREE.Color(country.color);
        }
        
        // Load the country environment
        try {
            this.activeEnvironment = createCountryEnvironment(this.scene, countryId);
            
            // Position camera appropriately
            this.camera.position.set(0, 2, 4);
            this.camera.lookAt(0, 0.5, 0);
            
            // Start first scenario
            this.startScenario(country.scenarios[0]);
        } catch (error) {
            console.error("Error creating country environment:", error);
            document.getElementById('error-display').innerHTML = `Error creating environment: ${error.message}`;
            document.getElementById('error-display').style.display = 'block';
        }
    }
    
    startScenario(scenario) {
        console.log("Starting scenario:", scenario.title);
        this.currentScenario = scenario;
        
        // Show scenario in UI
        this.uiManager.showScenario(scenario);
        
        // Start with the first interaction
        this.currentInteractionIndex = 0;
        this.nextInteraction();
    }
    
    nextInteraction() {
        // Check if we have more interactions
        if (this.currentInteractionIndex < this.currentScenario.interactions.length) {
            const interaction = this.currentScenario.interactions[this.currentInteractionIndex];
            this.currentInteraction = interaction;
            
            // Show interaction in UI
            this.uiManager.showInteraction(interaction);
        } else {
            // End of scenario
            this.endScenario();
        }
    }
    
    selectOption(interaction, option) {
        console.log("Option selected:", option.text);
        
        // Show feedback
        this.uiManager.showFeedback(option);
        
        // Update score if correct
        if (option.correct) {
            this.playerScore += 10;
            this.uiManager.updateScoreDisplay(this.playerScore);
        }
        
        // Move to next interaction
        this.currentInteractionIndex++;
    }
    
    endScenario() {
        console.log("Scenario complete");
        
        // For now, just go back to country selection
        setTimeout(() => {
            this.uiManager.showCountrySelection();
        }, 1000);
    }
}

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing game...");
    try {
        const game = new GlobalBusinessQuest();
    } catch (error) {
        console.error("Failed to initialize game:", error);
        document.getElementById('error-display').innerHTML = `Failed to initialize game: ${error.message}`;
        document.getElementById('error-display').style.display = 'block';
    }
});
