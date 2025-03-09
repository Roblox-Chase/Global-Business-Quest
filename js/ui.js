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
    
    // Create country buttons
    Object.keys(this.game.countries).forEach(countryId => {
      if (this.game.unlockedCountries.includes(countryId)) {
        const country = this.game.countries[countryId];
        
        const countryButton = document.createElement('div');
        countryButton.classList.add('country-button');
        
        countryButton.innerHTML = `
          <h3>${country.name}</h3>
          <p>${country.description}</p>
        `;
        
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
    
    // Display the scenario UI
    this.scenarioUI.style.display = 'block';
    this.countrySelectionUI.style.display = 'none';
  }
  
  // Show interaction within a scenario
  showInteraction(interaction) {
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
    
    const feedback = document.createElement('p');
    feedback.textContent = option.feedback;
    this.feedbackUI.appendChild(feedback);
    
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
    
    this.scoreDisplay.innerHTML = `<h3>Cultural Competence: ${this.game.playerScore}</h3>`;
  }
}

// Export the UIManager
export { UIManager };
