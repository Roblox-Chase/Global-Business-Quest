// France Business Module for Global Business Quest
// This module contains scenarios, interactions and cultural information for France

export const FranceModule = {
  // Country metadata
  metadata: {
    id: 'france',
    name: 'France',
    description: 'Learn the art of business lunches in Paris',
    difficulty: 'Medium',
    culturalNotes: `
      French business culture values intellectual debate, quality of life, and maintaining
      a clear separation between professional and personal spheres. Business relationships
      often develop through social settings like meals, where conversation should be cultured
      and thoughtful. Formality and proper etiquette are highly valued in French business interactions.
    `
  },
  
  // 3D scene settings
  sceneSettings: {
    ambientLight: { color: 0xffffff, intensity: 0.7 },
    directionalLight: { color: 0xfff4e0, intensity: 0.9, position: [6, 9, 6] },
    background: 0xf4f9ff, // Soft blue Parisian sky
    environmentMap: 'paris_restaurant.hdr'
  },
  
  // Available scenarios
  scenarios: [
    {
      id: 'paris_lunch',
      title: 'Parisian Business Lunch',
      description: 'You\'ve been invited to a business lunch with potential French partners at a restaurant in Paris.',
      scene: 'paris_restaurant',
      objectives: ['Build rapport with French colleagues', 'Demonstrate knowledge of French business dining etiquette'],
      prerequisite: null, // No prerequisite for this scenario
      
      // Key NPC interactions in this scenario
      characters: [
        {
          id: 'dubois',
          name: 'Mr. Dubois',
          role: 'Marketing Director',
          company: 'Lyon Innovations',
          appearance: {
            model: 'french_businessman',
            position: [0.8, 0, 0.6]
          },
          dialogue: {
            greeting: 'Bonjour! Welcome to Paris. I hope you are enjoying your stay.',
            positive: 'I appreciate your understanding of our customs.',
            negative: 'Perhaps we have different approaches to business in our countries.'
          }
        },
        {
          id: 'laurent',
          name: 'Ms. Laurent',
          role: 'Head of International Relations',
          company: 'Lyon Innovations',
          appearance: {
            model: 'french_businesswoman',
            position: [-0.8, 0, 0.6]
          },
          dialogue: {
            greeting: 'It\'s a pleasure to finally meet you in person.',
            positive: 'I think we will work together very well.',
            negative: 'We should clarify our expectations moving forward.'
          }
        }
      ],
      
      // Cultural interactions the player will navigate
      interactions: [
        {
          id: 'restaurant_arrival',
          type: 'decision',
          situation: 'You arrive at the restaurant where you\'re meeting your French colleagues for a business lunch.',
          prompt: 'What is the appropriate time to arrive?',
          options: [
            { 
              id: 'punctual',
              text: 'Arrive exactly on time or 5 minutes early', 
              correct: true,
              culturalCompetence: 10,
              feedback: 'Excellent! While social gatherings in France might have flexible timing, business meetings and lunches require punctuality. Arriving on time demonstrates professionalism and respect for your colleagues\' schedules.',
              resultDescription: 'You find yourself waiting awkwardly at the restaurant as the staff explains they cannot seat you until your full party arrives.' arrive just as your French colleagues are entering the restaurant, making a positive first impression.'
            },
            { 
              id: 'fashionably_late',
              text: 'Arrive 15 minutes late to be "fashionably late"', 
              correct: false,
              culturalCompetence: -5,
              feedback: 'While social dinners in France might have more flexible timing, business lunches follow stricter punctuality rules. Being "fashionably late" is not appropriate for professional encounters.',
              resultDescription: 'Your French colleagues have already been seated and waiting, creating a slightly awkward start to your meeting.'
            },
            { 
              id: 'very_early',
              text: 'Arrive 30 minutes early to get settled', 
              correct: false,
              culturalCompetence: 0,
              feedback: 'Arriving too early can be as problematic as arriving late in French business culture. Your colleagues might not be ready, and the restaurant may not appreciate early guests taking up a table before the full party arrives.',
              resultDescription: 'You
