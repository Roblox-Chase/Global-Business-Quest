// Cultural Competence Tracking System
// This module tracks and manages the player's cultural competence across countries

// Cultural Competence Tracking System
// This module tracks and manages the player's cultural competence across countries

export class CulturalCompetenceSystem {
    constructor() {
        // Initialize country-specific competence levels
        this.competenceLevels = {
            japan: 0,
            france: 0
            // Add more countries as they are implemented
        };
        
        // Define competence level thresholds and titles
        this.levelThresholds = [
            { threshold: 0, title: "Novice" },
            { threshold: 10, title: "Traveler" },
            { threshold: 20, title: "Cultural Student" },
            { threshold: 30, title: "Cultural Enthusiast" },
            { threshold: 40, title: "Cultural Professional" },
            { threshold: 60, title: "Cultural Expert" },
            { threshold: 80, title: "Cultural Ambassador" },
            { threshold: 100, title: "Cultural Master" }
        ];
        
        // Cultural skills and their descriptions
        this.culturalSkills = {
            japan: {
                bowing: { 
                    name: "Proper Bowing", 
                    description: "Understanding the importance and etiquette of bowing in Japanese culture.",
                    unlocked: false
                },
                meishi: { 
                    name: "Business Card Exchange (Meishi)", 
                    description: "Mastery of the formal ritual of exchanging business cards in Japan.",
                    unlocked: false
                },
                honorifics: { 
                    name: "Japanese Honorifics", 
                    description: "Correctly using titles and honorifics in Japanese business settings.",
                    unlocked: false
                }
            },
            france: {
                greeting: { 
                    name: "French Business Greeting", 
                    description: "Properly greeting French business partners with appropriate formality.",
                    unlocked: false
                },
                wine: { 
                    name: "Wine Etiquette", 
                    description: "Understanding the cultural significance of wine in French business meals.",
                    unlocked: false
                },
                conversation: { 
                    name: "French Conversation Art", 
                    description: "Mastering the art of French business conversation topics and pacing.",
                    unlocked: false
                }
            }
        };
        
        // Try to load saved data from localStorage
        this.loadSavedData();
    }
    
    // Enhanced saveData method to ensure data persistence
    saveData() {
        try {
            const saveData = {
                competenceLevels: this.competenceLevels,
                culturalSkills: this.culturalSkills,
                lastSaved: new Date().toISOString()
            };
            
            // Stringify with pretty formatting for debugging
            const dataToSave = JSON.stringify(saveData, null, 2);
            
            // Log save attempt
            console.log("Saving cultural competence data...");
            
            // Save to localStorage
            localStorage.setItem('globalBusinessQuest_competence', dataToSave);
            
            // Verify save was successful by reading it back
            const savedData = localStorage.getItem('globalBusinessQuest_competence');
            if (savedData) {
                console.log("Cultural competence data saved successfully:", JSON.parse(savedData).lastSaved);
                
                // Dispatch event for UI to update
                const event = new CustomEvent('competenceDataUpdated', {
                    detail: {
                        totalCompetence: this.getTotalCompetence(),
                        timestamp: new Date().toISOString()
                    }
                });
                document.dispatchEvent(event);
                
                return true;
            } else {
                console.error("Failed to verify saved data");
                return false;
            }
        } catch (error) {
            console.error('Error saving cultural competence data:', error);
            return false;
        }
    }
    
    // Enhanced loadSavedData method with better logging
    loadSavedData() {
        try {
            console.log("Attempting to load saved competence data...");
            const savedData = localStorage.getItem('globalBusinessQuest_competence');
            
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    console.log("Found saved competence data from:", parsedData.lastSaved || "unknown time");
                    
                    // Restore competence levels
                    if (parsedData.competenceLevels) {
                        this.competenceLevels = parsedData.competenceLevels;
                        console.log("Loaded competence levels:", this.competenceLevels);
                    }
                    
                    // Restore unlocked skills
                    if (parsedData.culturalSkills) {
                        for (const countryId in parsedData.culturalSkills) {
                            if (this.culturalSkills.hasOwnProperty(countryId)) {
                                for (const skillId in parsedData.culturalSkills[countryId]) {
                                    if (this.culturalSkills[countryId].hasOwnProperty(skillId)) {
                                        this.culturalSkills[countryId][skillId].unlocked = 
                                            parsedData.culturalSkills[countryId][skillId].unlocked;
                                    }
                                }
                            }
                        }
                        console.log("Loaded cultural skills");
                    }
                    
                    // Force save to ensure format is consistent
                    this.saveData();
                    return true;
                } catch (error) {
                    console.error('Error parsing saved competence data:', error);
                    return false;
                }
            } else {
                console.log("No saved competence data found. Starting fresh.");
                return false;
            }
        } catch (error) {
            console.error('Error loading cultural competence data:', error);
            return false;
        }
    }
