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
    
    // Helper method to check if competence system is initialized
    hasCompetenceSystem() {
        return this.game && this.game.competenceSystem;
    }
    
    // Helper method to show error message
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
        
        // Auto-hide after 7 seconds
        setTimeout(() => {
            errorDisplay.style.opacity = '0';
            errorDisplay.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                errorDisplay.style.display = 'none';
                errorDisplay.style.opacity = '1';
            }, 500);
        }, 7000);
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
            countryButton.dataset.countryId = countryId; // Add country ID as data attribute
            
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
        
        // Add competence information to country buttons if competence system exists
        if (this.hasCompetenceSystem()) {
            this.updateCountrySelectionWithCompetence();
        }
        
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
    
    // CULTURAL COMPETENCE SYSTEM METHODS
    
    // Show a competence profile screen with all skills and levels
    showCompetenceProfile() {
        // Check if competence system is initialized
        if (!this.hasCompetenceSystem()) {
            console.log("Competence system not yet initialized");
            this.showErrorMessage("The competence system is still loading. Please try again.");
            return;
        }
        
        // Clear previous content
        this.countrySelectionUI.innerHTML = '';
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Cultural Competence Profile';
        this.countrySelectionUI.appendChild(title);
        
        // Add description
        const description = document.createElement('p');
        description.textContent = 'Track your cultural business knowledge across different countries.';
        this.countrySelectionUI.appendChild(description);
        
        // Add total score
        const totalScore = document.createElement('div');
        totalScore.className = 'total-competence-score';
        totalScore.innerHTML = `<h3>Total Competence: ${this.game.competenceSystem.getTotalCompetence()} points</h3>`;
        this.countrySelectionUI.appendChild(totalScore);
        
        // Create country tabs for each country
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'country-tabs';
        
        const countriesContainer = document.createElement('div');
        countriesContainer.className = 'countries-container';
        
        // For each country, create a tab and content section
        Object.keys(this.game.competenceSystem.competenceLevels).forEach((countryId, index) => {
            const country = this.game.countries[countryId];
            
            // Create tab
            const tab = document.createElement('button');
            tab.className = 'country-tab' + (index === 0 ? ' active' : '');
            tab.textContent = country.name;
            tab.dataset.countryId = countryId;
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                document.querySelectorAll('.country-tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                // Hide all content panels
                document.querySelectorAll('.country-competence-panel').forEach(p => p.style.display = 'none');
                // Show the selected panel
                document.getElementById(`competence-panel-${countryId}`).style.display = 'block';
            });
            tabsContainer.appendChild(tab);
            
            // Create content panel
            const panel = document.createElement('div');
            panel.id = `competence-panel-${countryId}`;
            panel.className = 'country-competence-panel';
            panel.style.display = index === 0 ? 'block' : 'none';
            
            // Country competence info
            const countryInfo = this.game.competenceSystem.getCompetenceSummary().countries[countryId];
            
            // Add competence level and title
            const levelInfo = document.createElement('div');
            levelInfo.className = 'competence-level-info';
            levelInfo.innerHTML = `
                <h3>${country.name} - ${countryInfo.title}</h3>
                <div class="competence-progress">
                    <div class="competence-bar">
                        <div class="competence-fill" style="width: ${Math.min(100, countryInfo.points)}%"></div>
                    </div>
                    <span>${countryInfo.points} points</span>
                </div>
            `;
            panel.appendChild(levelInfo);
            
            // Add skills section
            const skillsSection = document.createElement('div');
            skillsSection.className = 'skills-section';
            
            const skillsTitle = document.createElement('h4');
            skillsTitle.textContent = 'Cultural Skills';
            skillsSection.appendChild(skillsTitle);
            
            if (countryInfo.skills.length > 0) {
                const skillsList = document.createElement('div');
                skillsList.className = 'skills-list';
                
                countryInfo.skills.forEach(skill => {
                    const skillItem = document.createElement('div');
                    skillItem.className = 'skill-item';
                    skillItem.innerHTML = `
                        <div class="skill-icon ${countryId}-${skill.id}"></div>
                        <div class="skill-details">
                            <h5>${skill.name}</h5>
                            <p>${skill.description}</p>
                        </div>
                    `;
                    skillsList.appendChild(skillItem);
                });
                
                skillsSection.appendChild(skillsList);
            } else {
                const noSkills = document.createElement('p');
                noSkills.className = 'no-skills';
                noSkills.textContent = 'No cultural skills unlocked yet. Complete scenarios to earn skills!';
                skillsSection.appendChild(noSkills);
            }
            
            // Add next skill to unlock (if any)
            if (countryInfo.nextSkill) {
                const nextSkillSection = document.createElement('div');
                nextSkillSection.className = 'next-skill-section';
                
                const nextSkillTitle = document.createElement('h4');
                nextSkillTitle.textContent = 'Next Skill to Unlock';
                nextSkillSection.appendChild(nextSkillTitle);
                
                const nextSkillItem = document.createElement('div');
                nextSkillItem.className = 'skill-item locked';
                nextSkillItem.innerHTML = `
                    <div class="skill-icon locked ${countryId}-${countryInfo.nextSkill.id}"></div>
                    <div class="skill-details">
                        <h5>${countryInfo.nextSkill.name}</h5>
                        <p>${countryInfo.nextSkill.description}</p>
                    </div>
                `;
                nextSkillSection.appendChild(nextSkillItem);
                
                skillsSection.appendChild(nextSkillSection);
            }
            
            panel.appendChild(skillsSection);
            countriesContainer.appendChild(panel);
        });
        
        // Add tabs and panels to container
        this.countrySelectionUI.appendChild(tabsContainer);
        this.countrySelectionUI.appendChild(countriesContainer);
        
        // Add return button
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return to Country Selection';
        returnButton.className = 'return-button';
        returnButton.addEventListener('click', () => {
            this.showCountrySelection();
        });
        this.countrySelectionUI.appendChild(returnButton);
        
        // Show the main container and hide others
        this.countrySelectionUI.style.display = 'block';
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'none';
    }
    
    // Update the country selection UI to show competence levels
    updateCountrySelectionWithCompetence() {
        // Check if competence system exists
        if (!this.hasCompetenceSystem()) {
            console.log("Competence system not yet initialized");
            return;
        }
        
        // Find all country buttons
        const countryButtons = this.countrySelectionUI.querySelectorAll('.country-button');
        
        countryButtons.forEach(button => {
            // Get the country ID from the button
            const countryId = button.dataset.countryId;
            if (!countryId) return;
            
            // Remove any existing competence badge
            const existingBadge = button.querySelector('.competence-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Get competence level and title
            const points = this.game.competenceSystem.getCompetenceLevel(countryId);
            const title = this.game.competenceSystem.getCompetenceTitle(countryId);
            
            if (points > 0) {
                // Create competence badge
                const competenceBadge = document.createElement('div');
                competenceBadge.className = 'competence-badge';
                competenceBadge.innerHTML = `${title}: ${points} points`;
                button.appendChild(competenceBadge);
            }
        });
        
        // Add profile button if competence system exists and button not already present
        if (this.hasCompetenceSystem() && !document.getElementById('profile-button')) {
            const profileButton = document.createElement('button');
            profileButton.id = 'profile-button';
            profileButton.className = 'profile-button';
            profileButton.textContent = 'View Competence Profile';
            profileButton.addEventListener('click', () => {
                this.showCompetenceProfile();
            });
            this.countrySelectionUI.appendChild(profileButton);
        }
    }
    
    // Show a skill unlock notification
    showSkillUnlockNotification(countryId, skillId, skillName, skillDescription) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'skill-unlock-notification';
        
        notification.innerHTML = `
            <h3>New Cultural Skill Unlocked!</h3>
            <div class="skill-icon ${countryId}-${skillId}"></div>
            <div class="skill-details">
                <h4>${skillName}</h4>
                <p>${skillDescription}</p>
            </div>
            <button class="notification-close">Continue</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto close after 8 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 8000);
    }
    
    // Updated showScenarioComplete to include competence information
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
        
        // Add competence update if system is initialized
        if (this.hasCompetenceSystem()) {
            const competenceUpdate = document.createElement('div');
            competenceUpdate.className = 'competence-update';
            
            // Get previous and new competence level
            const prevLevel = this.game.competenceSystem.getCompetenceLevel(countryId);
            
            // Award competence points equal to scenario score
            this.game.competenceSystem.addCompetencePoints(countryId, score);
            
            // Get new level and title
            const newLevel = this.game.competenceSystem.getCompetenceLevel(countryId);
            const title = this.game.competenceSystem.getCompetenceTitle(countryId);
            
            competenceUpdate.innerHTML = `
                <h4>Cultural Competence Updated</h4>
                <p>${this.game.countries[countryId].name} Competence: ${prevLevel} → ${newLevel} points</p>
                <p>Current Title: ${title}</p>
            `;
            
            completionContainer.appendChild(competenceUpdate);
        }
        
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
        
        // Add button container for multiple buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
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
        
        buttonContainer.appendChild(returnButton);
        
        // Add view profile button if competence system exists
        if (this.hasCompetenceSystem()) {
            const profileButton = document.createElement('button');
            profileButton.textContent = 'View Competence Profile';
            profileButton.className = 'profile-button';
            
            // Adjust button size for mobile devices
            this.adjustButtonSizeForDevice(profileButton);
            
            // Use touchend for faster response on mobile
            if (this.isMobile) {
                let touchStarted = false;
                
                profileButton.addEventListener('touchstart', () => {
                    touchStarted = true;
                    profileButton.classList.add('active');
                }, { passive: true });
                
                profileButton.addEventListener('touchend', (e) => {
                    profileButton.classList.remove('active');
                    if (touchStarted) {
                        e.preventDefault();
                        this.showCompetenceProfile();
                    }
                    touchStarted = false;
                });
                
                profileButton.addEventListener('touchcancel', () => {
                    profileButton.classList.remove('active');
                    touchStarted = false;
                });
                
                // Keep click for desktop fallback
                profileButton.addEventListener('click', () => {
                    this.showCompetenceProfile();
                });
            } else {
                profileButton.addEventListener('click', () => {
                    this.showCompetenceProfile();
                });
            }
            
            buttonContainer.appendChild(profileButton);
        }
        
        completionContainer.appendChild(buttonContainer);
        this.feedbackUI.appendChild(completionContainer);
        
        // Hide scenario UI and show feedback UI with animation
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'block';
        this.feedbackUI.classList.add('fade-in');
        
        // On mobile, make sure feedback is visible
        if (this.isMobile) {
            setTimeout(() => {
                this.feedbackUI.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        setTimeout(() => {
            this.feedbackUI.classList.remove('fade-in');
        }, 500);
        
        // Update score display
        if (this.hasCompetenceSystem()) {
            this.updateScoreDisplay(this.game.competenceSystem.getTotalCompetence());
        }
    }
    
    // Show a level up notification
    showLevelUpNotification(countryId, newTitle) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        
        notification.innerHTML = `
            <h3>Cultural Level Up!</h3>
            <p>Your understanding of ${this.game.countries[countryId].name} business culture has improved!</p>
            <p>New Title: <strong>${newTitle}</strong></p>
            <button class="notification-close">Continue</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto close after 8 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 8000);
    }
    
    // Show game complete screen
    showGameComplete() {
        // Clear existing content
        this.feedbackUI.innerHTML = '';
        
        // Create a container for the completion content with animation
        const completionContainer = document.createElement('div');
        completionContainer.className = 'game-complete';
        
        // Add congratulations header
        const congratsHeader = document.createElement('h2');
        congratsHeader.textContent = 'Congratulations!';
        congratsHeader.style.color = '#28a745';
        completionContainer.appendChild(congratsHeader);
        
        // Add completion message
        const completionMsg = document.createElement('p');
        completionMsg.textContent = 'You have completed Global Business Quest!';
        completionContainer.appendChild(completionMsg);
        
        // Add total score if competence system exists
        if (this.hasCompetenceSystem()) {
            const totalScore = this.game.competenceSystem.getTotalCompetence();
            const scoreElement = document.createElement('div');
            scoreElement.className = 'final-score';
            scoreElement.innerHTML = `
                <h3>Total Cultural Competence: ${totalScore} points</h3>
            `;
            completionContainer.appendChild(scoreElement);
            
            // Add country breakdown
            const countryBreakdown = document.createElement('div');
            countryBreakdown.className = 'country-breakdown';
            
            const breakdownTitle = document.createElement('h4');
            breakdownTitle.textContent = 'Country Competence Breakdown:';
            countryBreakdown.appendChild(breakdownTitle);
            
            const countryList = document.createElement('ul');
            
            Object.keys(this.game.countries).forEach(countryId => {
                const country = this.game.countries[countryId];
                const points = this.game.competenceSystem.getCompetenceLevel(countryId);
                const title = this.game.competenceSystem.getCompetenceTitle(countryId);
                
                const countryItem = document.createElement('li');
                countryItem.innerHTML = `<strong>${country.name}:</strong> ${points} points (${title})`;
                countryList.appendChild(countryItem);
            });
            
            countryBreakdown.appendChild(countryList);
            completionContainer.appendChild(countryBreakdown);
        }
        
        // Add achievement message based on competence
        if (this.hasCompetenceSystem()) {
            const totalScore = this.game.competenceSystem.getTotalCompetence();
            const achievementMsg = document.createElement('p');
            achievementMsg.className = 'achievement-message';
            
            if (totalScore >= 100) {
                achievementMsg.textContent = 'You have demonstrated exceptional cultural business competence! You are ready for an international business career.';
            } else if (totalScore >= 75) {
                achievementMsg.textContent = 'You have shown strong cultural business awareness! With a little more practice, you\'ll be an international business expert.';
            } else if (totalScore >= 50) {
                achievementMsg.textContent = 'You have developed good cultural business understanding. Keep learning to improve your global business skills!';
            } else {
                achievementMsg.textContent = 'You\'ve taken your first steps into global business awareness. Keep exploring cultural differences to build your competence!';
            }
            
            completionContainer.appendChild(achievementMsg);
        }
        
        // Add tips for improvement
        const tipsSection = document.createElement('div');
        tipsSection.className = 'tips-section';
        
        const tipsTitle = document.createElement('h4');
        tipsTitle.textContent = 'Tips for Global Business Success:';
        tipsSection.appendChild(tipsTitle);
        
        const tipsList = document.createElement('ul');
        tipsList.innerHTML = `
            <li>Research cultural norms before visiting a new country</li>
            <li>Show respect for local customs and traditions</li>
            <li>Learn basic greetings in the local language</li>
            <li>Understand business etiquette differences</li>
            <li>Be patient and flexible in cross-cultural situations</li>
        `;
        
        tipsSection.appendChild(tipsList);
        completionContainer.appendChild(tipsSection);
        
        // Add restart button
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.className = 'restart-button';
        
        // Adjust button size for mobile devices
        this.adjustButtonSizeForDevice(restartButton);
        
        // Use touchend for faster response on mobile
        if (this.isMobile) {
            let touchStarted = false;
            
            restartButton.addEventListener('touchstart', () => {
                touchStarted = true;
                restartButton.classList.add('active');
            }, { passive: true });
            
            restartButton.addEventListener('touchend', (e) => {
                restartButton.classList.remove('active');
                if (touchStarted) {
                    e.preventDefault();
                    this.game.reset();
                    this.showCountrySelection();
                }
                touchStarted = false;
            });
            
            restartButton.addEventListener('touchcancel', () => {
                restartButton.classList.remove('active');
                touchStarted = false;
            });
            
            // Keep click for desktop fallback
            restartButton.addEventListener('click', () => {
                this.game.reset();
                this.showCountrySelection();
            });
        } else {
            restartButton.addEventListener('click', () => {
                this.game.reset();
                this.showCountrySelection();
            });
        }
        
        completionContainer.appendChild(restartButton);
        this.feedbackUI.appendChild(completionContainer);
        
        // Hide scenario UI and show feedback UI with animation
        this.scenarioUI.style.display = 'none';
        this.feedbackUI.style.display = 'block';
        this.feedbackUI.classList.add('fade-in');
        
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
}
