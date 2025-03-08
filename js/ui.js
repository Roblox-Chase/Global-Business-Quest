// UI Components Module for Global Business Quest
// This module manages the game's user interface elements

// Main UI Manager Class
export class UIManager {
  constructor(game) {
    this.game = game;
    this.activeElements = [];
    this.animationQueue = [];
    
    // Initialize main UI containers
    this.initializeContainers();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  initializeContainers() {
    // Create main UI container
    this.mainContainer = document.createElement('div');
    this.mainContainer.id = 'ui-container';
    this.mainContainer.className = 'ui-container';
    document.body.appendChild(this.mainContainer);
    
    // Create various UI panels
    this.createPanel('countrySelection', 'country-selection-panel');
    this.createPanel('scenario', 'scenario-panel');
    this.createPanel('interaction', 'interaction-panel');
    this.createPanel('feedback', 'feedback-panel');
    this.createPanel('score', 'score-panel');
    this.createPanel('help', 'help-panel');
    
    // Initially hide all panels except score
    this.hideAllPanels();
    this.showPanel('score');
  }
  
  createPanel(name, id) {
    const panel = document.createElement('div');
    panel.id = id;
    panel.className = 'ui-panel';
    this.mainContainer.appendChild(panel);
    this[`${name}Panel`] = panel;
  }
  
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Handle key presses
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }
  
  onWindowResize() {
    // Adjust UI elements based on window size
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile-view', isMobile);
    
    // Reposition panels
    this.repositionPanels();
  }
  
  repositionPanels() {
    // Adjust panel positions and sizes based on current window
    // This allows responsive design for different screen sizes
  }
  
  handleKeyPress(e) {
    // Handle key shortcuts
    if (e.key === 'Escape') {
      this.toggleHelpPanel();
    }
  }
  
  // Panel visibility management
  showPanel(panelName) {
    const panel = this[`${panelName}Panel`];
    if (panel) {
      panel.style.display = 'block';
      panel.classList.add('fade-in');
      this.activeElements.push(panelName);
    }
  }
  
  hidePanel(panelName) {
    const panel = this[`${panelName}Panel`];
    if (panel) {
      panel.style.display = 'none';
      const index = this.activeElements.indexOf(panelName);
      if (index > -1) {
        this.activeElements.splice(index, 1);
      }
    }
  }
  
  hideAllPanels() {
    ['countrySelection', 'scenario', 'interaction', 'feedback', 'help'].forEach(panel => {
      this.hidePanel(panel);
    });
    this.activeElements = [];
  }
  
  toggleHelpPanel() {
    const panel = this.helpPanel;
    if (panel.style.display === 'none') {
      this.showPanel('help');
    } else {
      this.hidePanel('help');
    }
  }
  
  // Country Selection screen
  showCountrySelection(countries, unlockedCountries) {
    // Clear previous content
    this.countrySelectionPanel.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'panel-header';
    header.innerHTML = `
      <h2>Global Business Quest</h2>
      <p>Select a country to begin your business adventure:</p>
    `;
    this.countrySelectionPanel.appendChild(header);
    
    // Create countries container
    const countriesContainer = document.createElement('div');
    countriesContainer.className = 'countries-container';
    
    // Add each country
    Object.keys(countries).forEach(countryId => {
      const country = countries[countryId];
      const isUnlocked = unlockedCountries.includes(countryId);
      
      const countryCard = document.createElement('div');
      countryCard.className = `country-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      
      countryCard.innerHTML = `
        <div class="country-image" style="background-image: url('assets/images/countries/${countryId}.jpg')">
          ${!isUnlocked ? '<div class="locked-overlay"><i class="lock-icon"></i></div>' : ''}
        </div>
        <div class="country-info">
          <h3>${country.name}</h3>
          <p>${country.description}</p>
          ${!isUnlocked ? '<p class="locked-text">Complete other scenarios to unlock</p>' : ''}
        </div>
      `;
      
      if (isUnlocked) {
        countryCard.addEventListener('click', () => {
          this.game.selectCountry(countryId);
        });
      }
      
      countriesContainer.appendChild(countryCard);
    });
    
    this.countrySelectionPanel.appendChild(countriesContainer);
    
    // Show the panel
    this.hideAllPanels();
    this.showPanel('countrySelection');
  }
  
  // Scenario screen
  showScenario(scenario) {
    // Clear previous content
    this.scenarioPanel.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'scenario-header';
    header.innerHTML = `
      <h2>${scenario.title}</h2>
      <p>${scenario.description}</p>
    `;
    this.scenarioPanel.appendChild(header);
    
    // Create start button
    const startButton = document.createElement('button');
    startButton.className = 'primary-button';
    startButton.textContent = 'Begin Scenario';
    startButton.addEventListener('click', () => {
      this.hidePanel('scenario');
      if (scenario.interactions && scenario.interactions.length > 0) {
        this.showInteraction(scenario.interactions[0]);
      }
    });
    
    this.scenarioPanel.appendChild(startButton);
    
    // Show the panel
    this.hidePanel('countrySelection');
    this.showPanel('scenario');
  }
  
  // Interaction screen
  showInteraction(interaction) {
    // Clear previous content
    this.interactionPanel.innerHTML = '';
    
    // Create situation description
    const situationDiv = document.createElement('div');
    situationDiv.className = 'situation-description';
    situationDiv.textContent = interaction.situation;
    this.interactionPanel.appendChild(situationDiv);
    
    // Create prompt
    const promptDiv = document.createElement('div');
    promptDiv.className = 'interaction-prompt';
    promptDiv.textContent = interaction.prompt;
    this.interactionPanel.appendChild(promptDiv);
    
    // Create options
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    interaction.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.className = 'option-button';
      optionButton.textContent = option.text;
      
      optionButton.addEventListener('click', () => {
        this.game.selectOption(interaction, option);
      });
      
      optionsContainer.appendChild(optionButton);
    });
    
    this.interactionPanel.appendChild(optionsContainer);
    
    // Show the panel with animation
    this.showPanel('interaction');
    this.animateElement(this.interactionPanel, 'slide-up');
  }
  
  // Feedback screen
  showFeedback(option) {
    // Clear previous content
    this.feedbackPanel.innerHTML = '';
    
    // Create result header
    const resultHeader = document.createElement('h3');
    resultHeader.className = option.correct ? 'correct-result' : 'incorrect-result';
    resultHeader.textContent = option.correct ? 'Correct Choice!' : 'Not Quite Right';
    this.feedbackPanel.appendChild(resultHeader);
    
    // Create result description
    const resultDesc = document.createElement('p');
    resultDesc.className = 'result-description';
    resultDesc.textContent = option.resultDescription;
    this.feedbackPanel.appendChild(resultDesc);
    
    // Create feedback explanation
    const feedbackExplanation = document.createElement('div');
    feedbackExplanation.className = 'feedback-explanation';
    feedbackExplanation.textContent = option.feedback;
    this.feedbackPanel.appendChild(feedbackExplanation);
    
    // Create continue button
    const continueButton = document.createElement('button');
    continueButton.className = 'primary-button';
    continueButton.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
      this.game.continueFeedback();
    });
    this.feedbackPanel.appendChild(continueButton);
    
    // Hide interaction panel and show feedback
    this.hidePanel('interaction');
    this.showPanel('feedback');
    this.animateElement(this.feedbackPanel, 'fade-in');
    
    // Update score display
    this.updateScore(this.game.playerScore, option.culturalCompetence);
  }
  
  // Score display
  updateScore(totalScore, pointChange = 0) {
    this.scorePanel.innerHTML = '';
    
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    const scoreLabel = document.createElement('span');
    scoreLabel.className = 'score-label';
    scoreLabel.textContent = 'Cultural Competence:';
    
    const scoreValue = document.createElement('span');
    scoreValue.className = 'score-value';
    scoreValue.textContent = totalScore;
    
    scoreContainer.appendChild(scoreLabel);
    scoreContainer.appendChild(scoreValue);
    
    // Show point change if any
    if (pointChange !== 0) {
      const pointChangeElem = document.createElement('span');
      pointChangeElem.className = pointChange > 0 ? 'point-increase' : 'point-decrease';
      pointChangeElem.textContent = pointChange > 0 ? `+${pointChange}` : pointChange;
      scoreContainer.appendChild(pointChangeElem);
      
      // Animate point change
      this.animateElement(pointChangeElem, 'score-pulse');
    }
    
    this.scorePanel.appendChild(scoreContainer);
  }
  
  // Show end of scenario summary
  showScenarioSummary(scenario, earnedScore, insights) {
    // Clear previous content
    this.feedbackPanel.innerHTML = '';
    
    // Create header
    const header = document.createElement('h2');
    header.textContent = 'Scenario Complete!';
    this.feedbackPanel.appendChild(header);
    
    // Create score summary
    const scoreSummary = document.createElement('div');
    scoreSummary.className = 'score-summary';
    scoreSummary.innerHTML = `
      <p>You earned <span class="highlight">${earnedScore} Cultural Competence points</span> in this scenario.</p>
    `;
    this.feedbackPanel.appendChild(scoreSummary);
    
    // Create cultural insights section
    if (insights && insights.length) {
      const insightsContainer = document.createElement('div');
      insightsContainer.className = 'cultural-insights';
      
      const insightsHeader = document.createElement('h3');
      insightsHeader.textContent = 'Cultural Insights Gained:';
      insightsContainer.appendChild(insightsHeader);
      
      const insightsList = document.createElement('ul');
      insights.forEach(insight => {
        const li = document.createElement('li');
        li.textContent = insight;
        insightsList.appendChild(li);
      });
      
      insightsContainer.appendChild(insightsList);
      this.feedbackPanel.appendChild(insightsContainer);
    }
    
    // Create continue button
    const continueButton = document.createElement('button');
    continueButton.className = 'primary-button';
    continueButton.textContent = 'Return to Country Selection';
    continueButton.addEventListener('click', () => {
      this.hideAllPanels();
      this.game.showCountrySelection();
    });
    this.feedbackPanel.appendChild(continueButton);
    
    // Show the panel
    this.showPanel('feedback');
  }
  
  // Help panel
  showHelpScreen() {
    // Clear previous content
    this.helpPanel.innerHTML = '';
    
    // Create header
    const header = document.createElement('h2');
    header.textContent = 'Game Help & Instructions';
    this.helpPanel.appendChild(header);
    
    // Create instructions
    const instructions = document.createElement('div');
    instructions.className = 'help-instructions';
    instructions.innerHTML = `
      <h3>How to Play:</h3>
      <ol>
        <li>Select a country to begin a business scenario</li>
        <li>Read each situation carefully</li>
        <li>Choose the most culturally appropriate response</li>
        <li>Learn from feedback to improve your cultural competence</li>
        <li>Unlock new scenarios by completing available ones</li>
      </ol>
      
      <h3>Controls:</h3>
      <ul>
        <li><strong>ESC</strong>: Toggle this help screen</li>
        <li><strong>Click/Tap</strong>: Select options</li>
      </ul>
      
      <h3>Scoring:</h3>
      <p>Cultural Competence points are earned when you make appropriate choices in business scenarios. Higher scores unlock additional content.</p>
    `;
    this.helpPanel.appendChild(instructions);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'secondary-button';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      this.hidePanel('help');
    });
    this.helpPanel.appendChild(closeButton);
    
    // Show the panel
    this.showPanel('help');
  }
  
  // Animation utilities
  animateElement(element, animationClass) {
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, 1000);
  }
}

// Helper function to create HTML elements with attributes and event listeners
export function createElement(tag, attributes = {}, eventListeners = {}) {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Add event listeners
  Object.entries(eventListeners).forEach(([event, callback]) => {
    element.addEventListener(event, callback);
  });
  
  return element;
}

// Export prebuilt UI components
export const UIComponents = {
  // Button components
  buttons: {
    primary: (text, onClick) => createElement('button', 
      { className: 'primary-button', textContent: text },
      { click: onClick }
    ),
    secondary: (text, onClick) => createElement('button', 
      { className: 'secondary-button', textContent: text },
      { click: onClick }
    ),
    option: (text, onClick) => createElement('button', 
      { className: 'option-button', textContent: text },
      { click: onClick }
    )
  },
  
  // Modal dialog component
  modal: (title, content, buttons = []) => {
    const modalContainer = createElement('div', { className: 'modal-container' });
    const modalContent = createElement('div', { className: 'modal-content' });
    
    modalContent.appendChild(createElement('h3', { textContent: title }));
    
    if (typeof content === 'string') {
      modalContent.appendChild(createElement('p', { textContent: content }));
    } else {
      modalContent.appendChild(content);
    }
    
    const buttonContainer = createElement('div', { className: 'modal-buttons' });
    buttons.forEach(button => buttonContainer.appendChild(button));
    modalContent.appendChild(buttonContainer);
    
    modalContainer.appendChild(modalContent);
    return modalContainer;
  },
  
  // Tooltip component
  tooltip: (text) => {
    return createElement('div', { 
      className: 'tooltip',
      textContent: text 
    });
  }
};
