// Cultural Competence Tracking System
// This module tracks and manages the player's cultural competence across countries

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
    
    // Enhanced method to ensure points are properly added and events dispatched
    addCompetencePoints(countryId, points) {
        if (!this.competenceLevels.hasOwnProperty(countryId)) {
            console.error(`Country ${countryId} not found in competence system`);
            return false;
        }
        
        // Convert points to number and validate
        const pointsToAdd = parseInt(points) || 0;
        if (pointsToAdd <= 0) {
            console.warn(`Invalid points value: ${points}`);
            return false;
        }
        
        // Get previous level before adding points
        const prevLevel = this.getCompetenceLevel(countryId);
        const prevTitle = this.getCompetenceTitle(countryId);
        
        // Add points
        this.competenceLevels[countryId] += pointsToAdd;
        console.log(`Added ${pointsToAdd} competence points for ${countryId}. New level: ${this.competenceLevels[countryId]}`);
        
        // Get new level and title
        const newLevel = this.getCompetenceLevel(countryId);
        const newTitle = this.getCompetenceTitle(countryId);
        
        // Check if level title changed
        if (prevTitle !== newTitle) {
            // Dispatch level up event
            const levelUpEvent = new CustomEvent('culturalLevelUp', {
                detail: {
                    countryId: countryId,
                    prevLevel: prevLevel,
                    newLevel: newLevel,
                    prevTitle: prevTitle,
                    newTitle: newTitle
                }
            });
            document.dispatchEvent(levelUpEvent);
        }
        
        // Check for newly unlocked skills
        this.checkSkillUnlocks(countryId);
        
        // Save progress
        this.saveData();
        
        return true;
    }
    
    // Get current competence level for a country
    getCompetenceLevel(countryId) {
        if (this.competenceLevels.hasOwnProperty(countryId)) {
            return this.competenceLevels[countryId];
        }
        return 0;
    }
    
    // Get the competence title based on points
    getCompetenceTitle(countryId) {
        const points = this.getCompetenceLevel(countryId);
        
        // Find the highest threshold that is below or equal to the current points
        let levelTitle = this.levelThresholds[0].title; // Default to lowest level
        
        for (const level of this.levelThresholds) {
            if (points >= level.threshold) {
                levelTitle = level.title;
            } else {
                break;
            }
        }
        
        return levelTitle;
    }
    
    // Check for skill unlocks based on current points
    checkSkillUnlocks(countryId) {
        if (!this.culturalSkills.hasOwnProperty(countryId)) return;
        
        const points = this.competenceLevels[countryId];
        const skills = this.culturalSkills[countryId];
        
        // Unlock skills based on competence level
        // The thresholds for unlocking are arbitrary and can be adjusted
        const skillsArray = Object.keys(skills);
        
        const pointsPerSkill = Math.ceil(100 / skillsArray.length);
        
        skillsArray.forEach((skillId, index) => {
            const requiredPoints = pointsPerSkill * index; // First skill at 0, second at pointsPerSkill, etc.
            
            if (points >= requiredPoints && !skills[skillId].unlocked) {
                // Unlock the skill
                skills[skillId].unlocked = true;
                
                // Trigger any notification or UI update
                this.onSkillUnlocked(countryId, skillId);
                
                // Save immediately after unlocking a skill
                this.saveData();
            }
        });
    }
    
    // Check all countries for skill unlocks
    checkAllSkillUnlocks() {
        for (const countryId in this.competenceLevels) {
            this.checkSkillUnlocks(countryId);
        }
    }
    
    // Handler for when a skill is unlocked
    onSkillUnlocked(countryId, skillId) {
        console.log(`New cultural skill unlocked: ${this.culturalSkills[countryId][skillId].name}`);
        
        // We'll create a custom event that the UI can listen for
        const event = new CustomEvent('culturalSkillUnlocked', {
            detail: {
                countryId: countryId,
                skillId: skillId,
                skillName: this.culturalSkills[countryId][skillId].name,
                skillDescription: this.culturalSkills[countryId][skillId].description
            }
        });
        
        document.dispatchEvent(event);
    }
    
    // Handler for level up events
    onLevelUp(countryId, newTitle) {
        console.log(`Level up in ${countryId} to ${newTitle}!`);
        
        // Dispatch event for UI to handle
        const event = new CustomEvent('culturalLevelUp', {
            detail: {
                countryId: countryId,
                title: newTitle
            }
        });
        document.dispatchEvent(event);
    }
    
    // Get all unlocked skills for a country
    getUnlockedSkills(countryId) {
        if (!this.culturalSkills.hasOwnProperty(countryId)) return [];
        
        const result = [];
        const countrySkills = this.culturalSkills[countryId];
        
        for (const skillId in countrySkills) {
            if (countrySkills[skillId].unlocked) {
                result.push({
                    id: skillId,
                    name: countrySkills[skillId].name,
                    description: countrySkills[skillId].description
                });
            }
        }
        
        return result;
    }
    
    // Get the next skill to unlock for a country
    getNextSkill(countryId) {
        if (!this.culturalSkills.hasOwnProperty(countryId)) return null;
        
        const countrySkills = this.culturalSkills[countryId];
        
        for (const skillId in countrySkills) {
            if (!countrySkills[skillId].unlocked) {
                return {
                    id: skillId,
                    name: countrySkills[skillId].name,
                    description: countrySkills[skillId].description
                };
            }
        }
        
        return null; // All skills unlocked
    }
    
    // Calculate total competence across all countries
    getTotalCompetence() {
        let total = 0;
        
        for (const countryId in this.competenceLevels) {
            total += this.competenceLevels[countryId];
        }
        
        return total;
    }
    
    // Get a summary of all competence levels and unlocked skills
    getCompetenceSummary() {
        const summary = {
            total: this.getTotalCompetence(),
            countries: {}
        };
        
        for (const countryId in this.competenceLevels) {
            summary.countries[countryId] = {
                points: this.competenceLevels[countryId],
                title: this.getCompetenceTitle(countryId),
                skills: this.getUnlockedSkills(countryId),
                nextSkill: this.getNextSkill(countryId)
            };
        }
        
        return summary;
    }
    
    // Reset all progress (for testing or new game)
    resetProgress() {
        // Reset all competence levels to 0
        for (const countryId in this.competenceLevels) {
            this.competenceLevels[countryId] = 0;
        }
        
        // Reset all skills to locked
        for (const countryId in this.culturalSkills) {
            for (const skillId in this.culturalSkills[countryId]) {
                this.culturalSkills[countryId][skillId].unlocked = false;
            }
        }
        
        // Save the reset data
        this.saveData();
        
        console.log('Cultural competence progress reset');
        return true;
    }
}
