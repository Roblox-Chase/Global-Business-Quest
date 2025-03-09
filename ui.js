// Global Business Quest - UI Management
// This file handles the user interface components and interactions

class UIManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    
    // UI elements
    this.countrySelectionUI = document.getElementById('country-selection');
    this.scenarioUI = document.getElementById('scenario-ui');
    this.feedbackUI = document.getElementById('feedback-ui');
    this.scoreDisplay = document.getElementById('score-display');
    
    // Initialize event listeners
    this.initEventListeners();
  }
  
  // Initialize event listeners for UI components
  initEventListeners() {
    // Global event delegation for UI clicks
    document.addEventListener('click', (event) => {
      // Handle continue button clicks
      if (event.target.classList.contains('continue-button')) {
        this.hideFeedback();
        this.game.nextInteraction();
      }
    });
  }
  
  // Show country selection screen
  showCountrySelection() {
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
    
    // Create country buttons with images
    Object.keys(this.game.countries).forEach(countryId => {
      if (this.game.unlockedCountries.includes(countryId)) {
        const country = this.game.countries[countryId];
        
        const countryButton = document.createElement('div');
        countryButton.classList.add('country-button');
        
        // Add country image if available
        if (this.game.countryImages && this.game.countryImages[countryId]) {
          const countryImageWrapper = document.createElement('div');
          countryImageWrapper.classList.add('country-image');
          
          const countryImage = document.createElement('img');
          countryImage.src = this.game.countryImages[countryId];
          countryImage.alt = country.name;
          
          countryImageWrapper.appendChild(countryImage);
          countryButton.appendChild(countryImageWrapper);
        }
        
        // Add country info
        const countryInfo = document.createElement('div');
        countryInfo.classList.add('country-info');
        
        countryInfo.innerHTML = `
          <h3>${country.name}</h3>
          <p>${country.description}</p>
        `;
        
        countryButton.appendChild(countryInfo);
        
        // Add cultural competence level if player has previous experience
        if (this.game.culturalCompetence[countryId]) {
          const competenceLevel = this.game.getCulturalCompetenceLevel(countryId);
          if (competenceLevel > 0) {
            const competenceBadge = document.createElement('div');
            competenceBadge.classList.add('competence-badge');
            competenceBadge.textContent = `Level ${competenceLevel}`;
            countryButton.appendChild(competenceBadge);
          }
        }
        
        countryButton.addEventListener('click', () => {
          this.game.selectCountry(countryId);
        });
        
        this.countrySelectionUI.appendChild(countryButton);
      }
    });
    
    // Display the country selection UI
    this.countrySelectionUI.style.display = 'block';
    this.scenarioUI.style.display = 'none';
    this.feedbackUI.style.display = 'none';
    
    // Update score display
    this.updateScoreDisplay();
  }
  
  // Show scenario UI with interaction
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
    
    // Add objectives if available
    if (scenario.objectives && scenario.objectives.length > 0) {
      const objectivesContainer = document.createElement('div');
      objectivesContainer.className = 'objectives-container';
      
      const objectivesTitle = document.createElement('h4');
      objectivesTitle.textContent = 'Objectives:';
      objectivesContainer.appendChild(objectivesTitle);
      
      const objectivesList = document.createElement('ul');
      scenario.objectives.forEach(objective => {
        const objectiveItem = document.createElement('li');
        objectiveItem.textContent = objective;
        objectivesList.appendChild(objectiveItem);
      });
      
      objectivesContainer.appendChild(objectivesList);
      this.scenarioUI.appendChild(objectivesContainer);
    }
    
    // Display the scenario UI
    this.scenarioUI.style.display = 'block';
    this.countrySelectionUI.style.display = 'none';
  }
  
  // Show interaction within a scenario
  showInteraction(interaction) {
    // Add situation context if available
    if (interaction.situation) {
      const situationElement = document.createElement('p');
      situationElement.className = 'situation';
      situationElement.textContent = interaction.situation;
      this.scenarioUI.appendChild(situationElement);
    }
    
    // Add interaction prompt
    const promptElement = document.createElement('p');
    promptElement.className = 'prompt';
    promptElement.textContent = interaction.prompt;
    this.scenarioUI.appendChild(promptElement);
    
    // Add options
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    interaction.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option.text;
      optionButton.classList.add('option-button');
      
      optionButton.addEventListener('click', () => {
        this.game.selectOption(interaction, option);
      });
      
      optionsContainer.appendChild(optionButton);
    });
    
    this.scenarioUI.appendChild(optionsContainer);
  }
  
  // Show feedback for selected option
  showFeedback(option) {
    // Clear existing content
    this.feedbackUI.innerHTML = '';
    
    // Create feedback content
    const result = document.createElement('h3');
    result.textContent = option.correct ? 'Correct!' : 'Not quite right';
    result.style.color = option.correct ? '#28a745' : '#dc3545';
    this.feedbackUI.appendChild(result);
    
    // Add result description if available
    if (option.resultDescription) {
      const resultDescription = document.createElement('p');
      resultDescription.className = 'result-description';
      resultDescription.textContent = option.resultDescription;
      this.feedbackUI.appendChild(resultDescription);
    }
    
    const feedback = document.createElement('p');
    feedback.textContent = option.feedback;
    this.feedbackUI.appendChild(feedback);
    
    // Add cultural competence update if available
    if (option.culturalCompetence) {
      const competenceUpdate = document.createElement('div');
      competenceUpdate.className = 'competence-update';
      
      const competenceValue = option.culturalCompetence > 0 ? `+${option.culturalCompetence}` : option.culturalCompetence;
      competenceUpdate.innerHTML = `<span>Cultural Competence: <strong>${competenceValue}</strong></span>`;
      competenceUpdate.style.color = option.culturalCompetence >= 0 ? '#28a745' : '#dc3545';
      
      this.feedbackUI.appendChild(competenceUpdate);
    }
    
    // Add continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Continue';
    continueButton.className = 'continue-button';
    this.feedbackUI.appendChild(continueButton);
    
    // Hide scenario UI and show feedback UI
    this.scenarioUI.style.display = 'none';
    this.feedbackUI.style.display = 'block';
  }
  
  // Hide feedback UI
  hideFeedback() {
    this.feedbackUI.style.display = 'none';
  }
  
  // Show scenario completion screen
  showScenarioComplete(scenario, score) {
    // Clear existing content
    this.feedbackUI.innerHTML = '';
    
    // Add completion message
    const completionTitle = document.createElement('h3');
    completionTitle.textContent = 'Scenario Complete!';
    this.feedbackUI.appendChild(completionTitle);
    
    const completionMessage = document.createElement('p');
    completionMessage.textContent = `You've completed "${scenario.title}" with a score of ${score} points.`;
    this.feedbackUI.appendChild(completionMessage);
    
    // Add unlocked content if available
    if (scenario.completion && scenario.completion.rewards) {
      const rewards = scenario.completion.rewards;
      
      // Check if player met the minimum score requirement
      if (score >= rewards.minScore) {
        // Show unlocked scenarios
        if (rewards.unlocks && rewards.unlocks.length > 0) {
          const unlocksContainer = document.createElement('div');
          unlocksContainer.className = 'unlocks-container';
          
          const unlocksTitle = document.createElement('h4');
          unlocksTitle.textContent = 'Unlocked:';
          unlocksContainer.appendChild(unlocksTitle);
          
          const unlocksList = document.createElement('ul');
          rewards.unlocks.forEach(scenarioId => {
            // Find the scenario details
            let scenarioDetails = null;
            for (const countryId in this.game.countries) {
              const country = this.game.countries[countryId];
              const foundScenario = country.scenarios.find(s => s.id === scenarioId);
              if (foundScenario) {
                scenarioDetails = foundScenario;
                break;
              }
            }
            
            if (scenarioDetails) {
              const unlockItem = document.createElement('li');
              unlockItem.textContent = `New Scenario: ${scenarioDetails.title}`;
              unlocksList.appendChild(unlockItem);
            }
          });
          
          unlocksContainer.appendChild(unlocksList);
          this.feedbackUI.appendChild(unlocksContainer);
        }
        
        // Show cultural insights
        if (rewards.culturalInsights && rewards.culturalInsights.length > 0) {
          const insightsContainer = document.createElement('div');
          insightsContainer.className = 'insights-container';
          
          const insightsTitle = document.createElement('h4');
          insightsTitle.textContent = 'Cultural Insights Gained:';
          insightsContainer.appendChild(insightsTitle);
          
          const insightsList = document.createElement('ul');
          rewards.culturalInsights.forEach(insight => {
            const insightItem = document.createElement('li');
            insightItem.textContent = insight;
            insightsList.appendChild(insightItem);
          });
          
          insightsContainer.appendChild(insightsList);
          this.feedbackUI.appendChild(insightsContainer);
        }
      }
    }
    
    // Add continue button
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Return to Country Selection';
    continueButton.className = 'continue-button';
    
    continueButton.addEventListener('click', () => {
      this.hideFeedback();
      this.showCountrySelection();
    });
    
    this.feedbackUI.appendChild(continueButton);
    
    // Show feedback UI
    this.feedbackUI.style.display = 'block';
    
    // Update score display
    this.updateScoreDisplay();
  }
  
  // Update player score display
  updateScoreDisplay() {
    if (!this.scoreDisplay) return;
    
    // Calculate total cultural competence across all countries
    let totalCompetence = 0;
    for (const country in this.game.culturalCompetence) {
      if (this.game.culturalCompetence[country].score) {
        totalCompetence += this.game.culturalCompetence[country].score;
      }
    }
    
    this.scoreDisplay.innerHTML = `<h3>Cultural Competence: ${totalCompetence}</h3>`;
    
    // Add detailed breakdown if player has experience in multiple countries
    const countryCount = Object.keys(this.game.culturalCompetence).length;
    if (countryCount > 1) {
      const breakdown = document.createElement('div');
      breakdown.className = 'score-breakdown';
      
      for (const country in this.game.culturalCompetence) {
        if (this.game.culturalCompetence[country].score) {
          const countryScore = document.createElement('div');
          countryScore.className = 'country-score';
          countryScore.textContent = `${this.game.countries[country].name}: ${this.game.culturalCompetence[country].score}`;
          breakdown.appendChild(countryScore);
        }
      }
      
      this.scoreDisplay.appendChild(breakdown);
    }
  }
}

// Export the UIManager
export { UIManager };
