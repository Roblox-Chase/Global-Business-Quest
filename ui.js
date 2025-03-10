// Global Business Quest - UI Management
// This module handles the user interface with mobile optimizations

export class UIManager {
    constructor(gameInstance) {
        this.game = gameInstance;
        
        // Get UI elements
        this.countrySelectionUI = document.getElementById('country-selection');
        this.scenarioUI = document.getElementById('scenario-ui');
        this.feedbackUI = document.getElementById('feedback-ui');
        this.scoreDisplay = document.getElementById('score-display');
        
        // Check if elements exist, create them if they don't
        this.ensureUIElementsExist();
        
        // Detect if mobile
        this.isMobile = this.detectMobile();
        console.log("Device detected as:", this.isMobile ? "mobile" : "desktop");
        
        // Add mobile class to body if on mobile device
        if (this.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        // Country images
        this.countryImages = {
            japan: 'assets/images/countries/japan.jpg',
            france: 'assets/images/countries/france.jpg'
        };
        
        // Add viewport meta tag for mobile if not present
        this.ensureViewportMeta();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Initialize touch events for mobile
        if (this.isMobile) {
            this.initTouchEvents();
        }
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || (window.innerWidth <= 768);
    }
    
    ensureUIElementsExist() {
        // Create UI container if it doesn't exist
        let uiContainer = document.getElementById('ui-container');
        if (!uiContainer) {
            uiContainer = document.createElement('div');
            uiContainer.id = 'ui-container';
            document.body.appendChild(uiContainer);
        }
        
        // Create country selection UI if it doesn't exist
        if (!this.countrySelectionUI) {
            this.countrySelectionUI = document.createElement('div');
            this.countrySelectionUI.id = 'country-selection';
            uiContainer.appendChild(this.countrySelectionUI);
        }
        
        // Create scenario UI if it doesn't exist
        if (!this.scenarioUI) {
            this.scenarioUI = document.createElement('div');
            this.scenarioUI.id = 'scenario-ui';
            uiContainer.appendChild(this.scenarioUI);
        }
        
        // Create feedback UI if it doesn't exist
        if (!this.feedbackUI) {
            this.feedbackUI = document.createElement('div');
            this.feedbackUI.id = 'feedback-ui';
            uiContainer.appendChild(this.feedbackUI);
        }
        
        // Create score display if it doesn't exist
        if (!this.scoreDisplay) {
            this.scoreDisplay = document.createElement('div');
            this.scoreDisplay.id = 'score-display';
            document.body.appendChild(this.scoreDisplay);
        }
    }
    
    ensureViewportMeta() {
        // Check if viewport meta tag exists
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        
        // Create it if it doesn't exist
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(viewportMeta);
            console.log("Added viewport meta tag for better mobile display");
        }
    }
    
    initEventListeners() {
        // Listen for continue button clicks
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('continue-button')) {
                this.hideFeedback();
                this.game.nextInteraction();
            }
        });
        
        // Listen for window resize to update mobile status
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = this.detectMobile();
            
            // If device type changed, refresh UI
            if (wasMobile !== this.isMobile) {
                console.log("Device type changed to:", this.isMobile ? "mobile" : "desktop");
                
                if (this.isMobile) {
                    document.body.classList.add('mobile-device');
                } else {
                    document.body.classList.remove('mobile-device');
                }
                
                // Refresh current UI state
                if (this.countrySelectionUI.style.display === 'block') {
                    this.showCountrySelection();
                } else if (this.scenarioUI.style.display === 'block') {
                    // Refresh scenario (can't fully recreate state but improve appearance)
                    this.scenarioUI.querySelectorAll('.option-button').forEach(button => {
                        this.adjustButtonSizeForDevice(button);
                    });
                } else if (this.feedbackUI.style.display === 'block') {
                    this.feedbackUI.querySelectorAll('.continue-button').forEach(button => {
                        this.adjustButtonSizeForDevice(button);
                    });
                }
            }
        });
    }
    
    initTouchEvents() {
        // Add touch-specific event behaviors
        document.addEventListener('touchstart', () => {
            // This empty handler enables :active CSS styles on iOS
        }, { passive: true });
    }
    
    // Helper method to adjust element sizes based on device
    adjustButtonSizeForDevice(button) {
        if (this.isMobile) {
            button.style.minHeight = '44px'; // Minimum recommended touch target size
        } else {
            button.style.minHeight = ''; // Reset to CSS default
        }
    }
    
    showCountrySelection() {
        console.log("Showing country selection UI");
        
        // Clear previous content
        this.countrySelectionUI.innerHTML = '';
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Global Business Quest';
        this.countrySelectionUI.appendChild(title);
        
        // Add subtitle
        const subtitle = document.createElement('p');
        subtitle.textContent = 'Select a country to begin your business adventure:';
        this.countrySelectionUI.appendChild(subtitle);
        
        // Create country buttons
        Object.keys(this.game.countries).forEach(countryId => {
            const country = this.game.countries[countryId];
            
            const countryButton = document.createElement('div');
            countryButton.classList.add('country-button');
            
            // Create container for better layout
            const buttonContent = document.createElement('div');
            buttonContent.className = 'country-button-content';
            
            // Add country image
            const imageContainer = document.createElement('div');
            imageContainer.className = 'country-image';
            
            const countryImage = document.createElement('img');
            countryImage.src = this.countryImages[countryId];
            countryImage.alt = country.name;
            countryImage.onerror = function() {
                // If image fails to load, show fallback
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect fill="%23CCCCCC" width="200" height="150"/><text fill="%23888888" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" x="100" y="75">' + country.name + '</text></svg>';
                console.warn(`Image for ${countryId} could not be loaded`);
            };
            
            imageContainer.appendChild(countryImage);
            buttonContent.appendChild(imageContainer);
            
            // Add country info
            const countryInfo = document.createElement('div');
            countryInfo.className = 'country-info';
            
            countryInfo.innerHTML = `
                <h3>${country.name}</h3>
                <p>${country.description}</p>
            `;
            
            buttonContent.appendChild(countryInfo);
            countryButton.appendChild(buttonContent);
            
            // Add cultural competence level if player has a score
            if (this.game.playerScore > 0) {
                const competenceBadge = document.createElement('div');
                competenceBadge.className = 'competence-badge';
                competenceBadge.textContent = `Score: ${this.game.playerScore}`;
                countryButton.appendChild(competenceBadge);
            }
            
            // Use touchend for faster response on mobile
            if (this.isMobile) {
                let touchStarted = false;
                
                countryButton.addEventListener('touchstart', () => {
                    touchStarted = true;
                }, { passive: true });
                
                countryButton.addEventListener('touchend', (e) => {
                    if (touchStarted) {
                        e.preventDefault();
                        this.game.selectCountry(countryId);
                    }
                    touchStarted = false;
                });
                
                // Keep click for desktop fallback
                countryButton.addEventListener('click', () => {
                    this.game.selectCountry(countryId);
                });
            } else {
                countryButton.addEventListener('click', () => {
                    this.game.selectCountry(countryId);
                });
            }
            
            this.countrySelectionUI.appendChild(countryButton);
        });
        
        // Show country selection and hide other UIs
        this.countrySelectionUI.style.display = 'block';
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'none';
        
        // Add fade-in effect
        this.countrySelectionUI.classList.add('fade-in');
        setTimeout(() => {
            this.countrySelectionUI.classList.remove('fade-in');
        }, 500);
    }
    
    showScenario(scenario) {
        // Clear existing content
        this.scenarioUI.innerHTML = '';
        
        // Add title
        const title = document.createElement('h3');
        title.textContent = scenario.title;
        this.scenarioUI.appendChild(title);
        
        // Add description
        const description = document.createElement('p');
        description.textContent = scenario.description;
        this.scenarioUI.appendChild(description);
        
        // Hide country selection and show scenario UI
        this.countrySelectionUI.style.display = 'none';
        this.scenarioUI.style.display = 'block';
        
        // Add fade-in effect
        this.scenarioUI.classList.add('fade-in');
        setTimeout(() => {
            this.scenarioUI.classList.remove('fade-in');
        }, 500);
    }
    
    showInteraction(interaction) {
        // Add situation if available
        if (interaction.situation) {
            const situationElement = document.createElement('p');
            situationElement.className = 'situation';
            situationElement.textContent = interaction.situation;
            this.scenarioUI.appendChild(situationElement);
        }
        
        // Add prompt
        const promptElement = document.createElement('p');
        promptElement.className = 'prompt';
        promptElement.textContent = interaction.prompt;
        this.scenarioUI.appendChild(promptElement);
        
        // Add options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container slide-up';
        
        interaction.options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option.text;
            optionButton.classList.add('option-button');
            
            // Adjust button size for mobile devices
            this.adjustButtonSizeForDevice(optionButton);
            
            // On mobile, use touchstart/touchend for more responsive feel
            if (this.isMobile) {
                let touchStarted = false;
                
                optionButton.addEventListener('touchstart', () => {
                    touchStarted = true;
                    optionButton.classList.add('active');
                }, { passive: true });
                
                optionButton.addEventListener('touchend', (e) => {
                    optionButton.classList.remove('active');
                    if (touchStarted) {
                        e.preventDefault();
                        this.game.selectOption(interaction, option);
                    }
                    touchStarted = false;
                });
                
                optionButton.addEventListener('touchcancel', () => {
                    optionButton.classList.remove('active');
                    touchStarted = false;
                });
                
                // Keep click for desktop fallback
                optionButton.addEventListener('click', () => {
                    this.game.selectOption(interaction, option);
                });
            } else {
                optionButton.addEventListener('click', () => {
                    this.game.selectOption(interaction, option);
                });
            }
            
            optionsContainer.appendChild(optionButton);
        });
        
        this.scenarioUI.appendChild(optionsContainer);
        
        // Scroll to show options on mobile
        if (this.isMobile) {
            setTimeout(() => {
                optionsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }
    
    showFeedback(option) {
        // Clear existing content
        this.feedbackUI.innerHTML = '';
        
        // Add result
        const result = document.createElement('h3');
        result.textContent = option.correct ? 'Correct!' : 'Not quite right';
        result.style.color = option.correct ? '#28a745' : '#dc3545';
        this.feedbackUI.appendChild(result);
        
        // Add feedback text
        const feedback = document.createElement('p');
        feedback.textContent = option.feedback;
        this.feedbackUI.appendChild(feedback);
        
        // Add continue button (though we'll auto-continue after delay)
        const continueButton = document.createElement('button');
        continueButton.textContent = 'Continue';
        continueButton.className = 'continue-button';
        
        // Adjust button size for mobile devices
        this.adjustButtonSizeForDevice(continueButton);
        
        this.feedbackUI.appendChild(continueButton);
        
        // Hide scenario UI and show feedback UI with animation
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'block';
        this.feedbackUI.classList.add('fade-in');
        
        // Disable all option buttons to prevent multiple selections
        document.querySelectorAll('.option-button').forEach(button => {
            button.disabled = true;
        });
        
        // On mobile, make sure feedback is visible
        if (this.isMobile) {
            setTimeout(() => {
                this.feedbackUI.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        setTimeout(() => {
            this.feedbackUI.classList.remove('fade-in');
        }, 500);
    }
    
    hideFeedback() {
        this.feedbackUI.style.display = 'none';
    }
    
    updateScoreDisplay(score) {
        if (!this.scoreDisplay) return;
        
        this.scoreDisplay.innerHTML = `<h3>Cultural Competence: ${score}</h3>`;
        
        // Add animation to score display when it changes
        this.scoreDisplay.classList.add('fade-in');
        setTimeout(() => {
            this.scoreDisplay.classList.remove('fade-in');
        }, 500);
    }
    
    showScenarioComplete(countryId, score) {
        // Clear existing content
        this.feedbackUI.innerHTML = '';
        
        // Create a container for the completion content with animation
        const completionContainer = document.createElement('div');
        completionContainer.className = 'scenario-complete';
        
        // Add congratulations header
        const congratsHeader = document.createElement('h3');
        congratsHeader.textContent = 'Scenario Complete!';
        congratsHeader.style.color = '#28a745';
        completionContainer.appendChild(congratsHeader);
        
        // Add score message
        const scoreMsg = document.createElement('p');
        scoreMsg.textContent = `You earned ${score} points in ${this.game.countries[countryId].name}!`;
        completionContainer.appendChild(scoreMsg);
        
        // Add cultural insight
        const insightMsg = document.createElement('p');
        insightMsg.className = 'cultural-insight';
        
        // Set country-specific message
        if (countryId === 'japan') {
            insightMsg.textContent = 'You\'ve demonstrated a good understanding of Japanese business etiquette. Respect, formality, and attention to detail are highly valued in Japanese business culture.';
        } else if (countryId === 'france') {
            insightMsg.textContent = 'You\'ve shown knowledge of French business customs. The French appreciate good manners, cultural awareness, and respect for their traditions.';
        } else {
            insightMsg.textContent = 'You\'ve gained valuable cultural insights that will help you in your global business career.';
        }
        
        completionContainer.appendChild(insightMsg);
        
        // Add return button
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return to Country Selection';
        returnButton.className = 'continue-button';
        
        // Adjust button size for mobile devices
        this.adjustButtonSizeForDevice(returnButton);
        
        // Use touchend for faster response on mobile
        if (this.isMobile) {
            let touchStarted = false;
            
            returnButton.addEventListener('touchstart', () => {
                touchStarted = true;
                returnButton.classList.add('active');
            }, { passive: true });
            
            returnButton.addEventListener('touchend', (e) => {
                returnButton.classList.remove('active');
                if (touchStarted) {
                    e.preventDefault();
                    this.showCountrySelection();
                }
                touchStarted = false;
            });
            
            returnButton.addEventListener('touchcancel', () => {
                returnButton.classList.remove('active');
                touchStarted = false;
            });
            
            // Keep click for desktop fallback
            returnButton.addEventListener('click', () => {
                this.showCountrySelection();
            });
        } else {
            returnButton.addEventListener('click', () => {
                this.showCountrySelection();
            });
        }
        
        completionContainer.appendChild(returnButton);
        
        // Add the completion container to the feedback UI
        this.feedbackUI.appendChild(completionContainer);
        
        // Hide scenario UI and show feedback UI
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'block';
        
        // On mobile, make sure completion screen is visible
        if (this.isMobile) {
            setTimeout(() => {
                this.feedbackUI.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}
