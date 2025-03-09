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
              resultDescription: 'You arrive just as your French colleagues are entering the restaurant, making a positive first impression.'
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
              resultDescription: 'You find yourself waiting awkwardly at the restaurant as the staff explains they cannot seat you until your full party arrives.'
            }
          ]
        },
        {
          id: 'greeting_style',
          type: 'decision',
          situation: 'Your French colleagues arrive and approach your table.',
          prompt: 'How do you greet them?',
          options: [
            { 
              id: 'formal_handshake',
              text: 'Stand up, make eye contact, and offer a light handshake with "Bonjour Monsieur/Madame"', 
              correct: true,
              culturalCompetence: 10,
              feedback: 'Perfect! A formal greeting with the appropriate title shows respect and understanding of French business etiquette. Using basic French phrases is also appreciated.',
              resultDescription: 'Your French colleagues respond warmly to your proper greeting, and the meeting starts on a positive note.'
            },
            { 
              id: 'cheek_kisses',
              text: 'Greet them with cheek kisses (la bise)', 
              correct: false,
              culturalCompetence: -5,
              feedback: 'While "la bise" (cheek kisses) is common in French social settings, it\'s generally not appropriate for initial business meetings. This greeting is too familiar for a first professional encounter.',
              resultDescription: 'Your French colleagues look slightly uncomfortable with this familiar greeting, creating an awkward moment.'
            },
            { 
              id: 'casual_greeting',
              text: 'Wave and say "Hey, nice to meet you guys!"', 
              correct: false,
              culturalCompetence: -10,
              feedback: 'This greeting is far too casual for French business culture, which values formality and proper address. The use of "guys" is particularly inappropriate in a professional setting.',
              resultDescription: 'Your French colleagues exchange a quick glance that suggests your approach lacks the expected formality.'
            }
          ]
        },
        {
          id: 'ordering_wine',
          type: 'decision',
          situation: 'The server asks if you would like to order wine with your meal.',
          prompt: 'How do you respond?',
          options: [
            { 
              id: 'follow_host',
              text: 'Look to your hosts and follow their lead on whether to order wine', 
              correct: true,
              culturalCompetence: 12,
              feedback: 'Excellent choice! In French business culture, it\'s best to follow the lead of your hosts regarding alcohol. Wine is common at business lunches, but letting your host set the tone shows cultural awareness and respect.',
              resultDescription: 'Mr. Dubois appreciates your deference and proceeds to recommend a regional wine that pairs well with the meal.'
            },
            { 
              id: 'refuse_alcohol',
              text: 'Politely decline stating you never drink alcohol during business meetings', 
              correct: false,
              culturalCompetence: 0,
              feedback: 'While it\'s perfectly acceptable to abstain from alcohol for personal reasons, making a point about "never" drinking during business meetings might come across as judgmental in French culture, where moderate wine consumption with meals is normal and not considered unprofessional.',
              resultDescription: 'Your hosts respect your decision but seem slightly put off by the implied criticism of their own customs.'
            },
            { 
              id: 'order_cocktail',
              text: 'Order a strong cocktail to start the lunch', 
              correct: false,
              culturalCompetence: -8,
              feedback: 'In French business dining, wine is the appropriate alcoholic beverage if any is consumed. Ordering hard liquor or cocktails at lunch would be seen as inappropriate and possibly suggesting a lack of refinement or professionalism.',
              resultDescription: 'The server seems surprised by your order, and your French colleagues appear uncomfortable with your choice.'
            }
          ]
        },
        {
          id: 'conversation_topic',
          type: 'decision',
          situation: 'As you wait for your food to arrive, the conversation begins.',
          prompt: 'Which topic would be most appropriate to discuss initially?',
          options: [
            { 
              id: 'culture_arts',
              text: 'Ask about French culture or a recent art exhibition in Paris', 
              correct: true,
              culturalCompetence: 10,
              feedback: 'Excellent choice! French business culture values intellectual and cultural conversation. Showing interest in French culture demonstrates respect and helps build rapport before diving into business matters.',
              resultDescription: 'Your French colleagues enthusiastically engage in a stimulating conversation about a new exhibition at the Louvre, clearly appreciating your interest in their culture.'
            },
            { 
              id: 'business_immediately',
              text: 'Begin discussing the business proposal right away', 
              correct: false,
              culturalCompetence: -5,
              feedback: 'In French business culture, rushing into business topics without social conversation first can be perceived as too direct and transactional. Relationship building through general conversation is an important preliminary step.',
              resultDescription: 'Your French colleagues seem slightly taken aback by your direct approach but politely shift to business discussions.'
            },
            { 
              id: 'personal_questions',
              text: 'Ask detailed questions about their family life', 
              correct: false,
              culturalCompetence: -8,
              feedback: 'While building personal connections is important, French business culture maintains a clear separation between professional and private life. Asking too personal questions too soon can be seen as intrusive.',
              resultDescription: 'Your questions create a noticeable discomfort as your French colleagues provide only brief, vague responses before changing the subject.'
            }
          ]
        },
        {
          id: 'business_discussion',
          type: 'decision',
          situation: 'The main course arrives, and the conversation naturally shifts toward business matters.',
          prompt: 'How do you approach disagreements during the business discussion?',
          options: [
            { 
              id: 'intellectual_debate',
              text: 'Engage in a thoughtful intellectual debate, clearly articulating your position with logical arguments', 
              correct: true,
              culturalCompetence: 15,
              feedback: 'Perfect! French business culture values intellectual debate and appreciates well-constructed logical arguments. Being able to defend your position articulately is seen as a sign of competence and engagement.',
              resultDescription: 'Your French colleagues respond positively to your thoughtful arguments, and the discussion becomes a stimulating exchange of ideas.'
            },
            { 
              id: 'avoid_disagreement',
              text: 'Avoid any potential disagreements and simply agree with their points', 
              correct: false,
              culturalCompetence: -10,
              feedback: 'In French business culture, intellectual engagement and the ability to defend your position are valued. Simply agreeing to avoid conflict may be interpreted as a lack of conviction or competence.',
              resultDescription: 'Your French colleagues seem increasingly disengaged as they notice your reluctance to meaningfully engage with challenging points.'
            },
            { 
              id: 'aggressive_stance',
              text: 'Push your position firmly and dismiss their concerns', 
              correct: false,
              culturalCompetence: -15,
              feedback: 'While debate is valued in French business culture, dismissing others\' concerns without proper consideration is seen as disrespectful. The goal should be thoughtful exchange, not aggressive domination of the conversation.',
              resultDescription: 'The atmosphere becomes tense as your approach creates friction rather than productive discussion.'
            }
          ]
        }
      ],
      
      // Completion rewards
      completion: {
        rewards: {
          minScore: 25, // Minimum score to consider the scenario completed
          unlocks: ['paris_negotiation'],
          culturalInsights: [
            'Intellectual Debate: French business culture values articulate discussion and logical argument.',
            'Mealtime Protocol: Business lunches in France follow specific etiquette regarding timing of business discussions.',
            'Formality and Respect: Maintaining appropriate formality shows respect in French business settings.'
          ]
        }
      }
    },
    
    // Additional scenario (locked initially)
    {
      id: 'paris_negotiation',
      title: 'French Contract Discussion',
      description: 'Negotiate a complex business agreement with your French partners.',
      prerequisite: 'paris_lunch',
      locked: true,
      // Content would go here, similar structure to the previous scenario
    }
  ]
};

// Helper functions specific to France scenarios
export function getFrenchGreeting(time) {
  // Returns appropriate French greeting based on time of day
  const hour = time.getHours();
  
  if (hour < 12) {
    return 'Bonjour (Good morning)';
  } else if (hour < 18) {
    return 'Bonjour (Good afternoon)';
  } else {
    return 'Bonsoir (Good evening)';
  }
}

export function getFrenchBusinessEtiquette() {
  return [
    'Address people with appropriate titles (Monsieur, Madame) until invited to use first names',
    'Business cards should be presented and received with both hands',
    'Punctuality is expected for business meetings',
    'Allow hosts to initiate business discussions during meals',
    'Maintain a moderate tone of voice in restaurants and public settings'
  ];
}
