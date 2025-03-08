// Japan Business Module for Global Business Quest
// This module contains scenarios, interactions and cultural information for Japan

export const JapanModule = {
  // Country metadata
  metadata: {
    id: 'japan',
    name: 'Japan',
    description: 'Navigate formal business meetings in Tokyo',
    difficulty: 'Medium',
    culturalNotes: `
      Japanese business culture is based on respect, hierarchy, and group harmony (wa).
      Relationships are built slowly and thoughtfully, with an emphasis on long-term
      partnerships rather than short-term gains. Patience and attention to detail
      are highly valued in Japanese business settings.
    `
  },
  
  // 3D scene settings
  sceneSettings: {
    ambientLight: { color: 0xffffff, intensity: 0.6 },
    directionalLight: { color: 0xffffff, intensity: 0.8, position: [5, 10, 7.5] },
    background: 0xf0f5ff, // Light blue-ish sky
    environmentMap: 'japan_office.hdr'
  },
  
  // Available scenarios
  scenarios: [
    {
      id: 'tokyo_meeting',
      title: 'Tokyo Office Meeting',
      description: 'You\'re attending your first business meeting with a potential partner in Tokyo.',
      scene: 'tokyo_office',
      objectives: ['Make a good first impression', 'Show respect for Japanese business customs'],
      prerequisite: null, // No prerequisite for this scenario
      
      // Key NPC interactions in this scenario
      characters: [
        {
          id: 'tanaka',
          name: 'Mr. Tanaka',
          role: 'Senior Executive',
          company: 'Nihon Tech Corporation',
          appearance: {
            model: 'businessman_senior',
            position: [0.8, 0, 0.6]
          },
          dialogue: {
            greeting: 'Welcome to our office. I hope your journey was pleasant.',
            positive: 'I appreciate your understanding of our customs.',
            negative: 'I see you may not be familiar with our business practices.'
          }
        },
        {
          id: 'yamada',
          name: 'Ms. Yamada',
          role: 'Project Manager',
          company: 'Nihon Tech Corporation',
          appearance: {
            model: 'businesswoman',
            position: [-0.8, 0, 0.6]
          },
          dialogue: {
            greeting: 'Hello, it\'s nice to meet you.',
            positive: 'I look forward to working together on this project.',
            negative: 'Perhaps we should review the basics before proceeding.'
          }
        }
      ],
      
      // Cultural interactions the player will navigate
      interactions: [
        {
          id: 'office_entrance',
          type: 'decision',
          situation: 'You\'ve arrived at the Nihon Tech Corporation building. The receptionist has called up to announce your arrival.',
          prompt: 'How do you prepare while waiting?',
          options: [
            { 
              id: 'check_materials',
              text: 'Review your presentation materials one last time', 
              correct: true,
              culturalCompetence: 5,
              feedback: 'Good choice. Being prepared and attentive to detail is highly valued in Japanese business culture. This shows respect for your hosts\' time.',
              resultDescription: 'You ensure that all your materials are perfectly organized, demonstrating professionalism and preparedness.'
            },
            { 
              id: 'phone_call',
              text: 'Make a quick phone call to check in with your office', 
              correct: false,
              culturalCompetence: 0,
              feedback: 'Making phone calls in public spaces can be seen as disruptive in Japan, especially in a business setting. It\'s better to be fully present and prepared.',
              resultDescription: 'Your phone conversation attracts some disapproving glances from the staff.'
            },
            { 
              id: 'casual_wait',
              text: 'Relax and browse news on your phone', 
              correct: false,
              culturalCompetence: -2,
              feedback: 'This appears too casual and might suggest you\'re not taking the meeting seriously. Japanese business culture values preparation and attentiveness.',
              resultDescription: 'When your hosts arrive, you seem slightly unprepared, creating an awkward first impression.'
            }
          ]
        },
        {
          id: 'greeting',
          type: 'decision',
          situation: 'Mr. Tanaka and Ms. Yamada arrive to escort you to the meeting room.',
          prompt: 'How do you greet your Japanese business partners?',
          options: [
            { 
              id: 'bow',
              text: 'Bow slightly at about a 15-degree angle', 
              correct: true,
              culturalCompetence: 10,
              feedback: 'Excellent! A respectful bow is the appropriate greeting in Japanese business culture. The depth and duration of your bow shows respect while maintaining your status as an equal business partner.',
              resultDescription: 'Your bow is received with appreciation, and your hosts respond with similar bows, creating a positive first impression.' 
            },
            { 
              id: 'handshake',
              text: 'Offer a firm handshake while maintaining good eye contact', 
              correct: false,
              culturalCompetence: 3,
              feedback: 'While handshakes are becoming more common in international business in Japan, starting with a bow shows greater respect for local customs. Additionally, a very firm handshake and direct eye contact can make some Japanese business people uncomfortable.',
              resultDescription: 'Your hosts adapt to your greeting, but seem slightly reserved afterward.'
            },
            { 
              id: 'informal',
              text: 'Give a friendly wave and say "Hey there!"', 
              correct: false,
              culturalCompetence: -5,
              feedback: 'This greeting is far too casual for a first meeting in Japanese business culture, which highly values formality and respect, especially for initial encounters.',
              resultDescription: 'Your hosts appear momentarily taken aback by your casual approach, creating an awkward atmosphere.'
            }
          ]
        },
        {
          id: 'business_cards',
          type: 'decision',
          situation: 'After entering the meeting room, Mr. Tanaka presents his business card to you with both hands.',
          prompt: 'How do you receive and respond to the business card exchange?',
          options: [
            { 
              id: 'respectful_exchange',
              text: 'Accept with both hands, examine it respectfully, then place it carefully on the table in front of you and offer your own card with both hands', 
              correct: true,
              culturalCompetence: 15,
              feedback: 'Perfect! Business cards (meishi) are treated with great respect in Japan. They are an extension of the person and should be handled carefully with both hands. Examining it shows respect, and placing it on the table for reference during the meeting is appropriate. Presenting your own card with both hands completes this important ritual correctly.',
              resultDescription: 'Mr. Tanaka nods appreciatively at your careful handling of his card and receives yours with similar respect.'
            },
            { 
              id: 'casual_acceptance',
              text: 'Take it with one hand, glance at it quickly, put it in your pocket, and hand over your card', 
              correct: false,
              culturalCompetence: -10,
              feedback: 'In Japanese business culture, this handling would be considered disrespectful. Business cards represent the person and should be accepted with both hands, examined carefully, and kept visible during the meeting - not put away in a pocket.',
              resultDescription: 'Mr. Tanaka\'s expression becomes noticeably more reserved, and the atmosphere in the room cools considerably.'
            },
            { 
              id: 'write_notes',
              text: 'Accept the card, write some notes on it about Mr. Tanaka to help you remember, and offer your card in return', 
              correct: false,
              culturalCompetence: -15,
              feedback: 'Writing on someone\'s business card is considered extremely disrespectful in Japanese business culture. It suggests you don\'t value the card or the person it represents.',
              resultDescription: 'Mr. Tanaka appears visibly uncomfortable, and Ms. Yamada exchanges a concerned glance with him. The meeting is off to a very poor start.'
            }
          ]
        },
        {
          id: 'seating_arrangement',
          type: 'decision',
          situation: 'You\'re now ready to be seated for the meeting.',
          prompt: 'Where do you sit at the conference table?',
          options: [
            { 
              id: 'wait_direction',
              text: 'Wait to be directed to your seat', 
              correct: true,
              culturalCompetence: 8,
              feedback: 'Correct! In Japanese business meetings, there is often a protocol for seating arrangements based on hierarchy. Waiting to be directed shows respect for this hierarchy and prevents any unintended faux pas.',
              resultDescription: 'Your hosts appreciate your patience and direct you to a suitable seat. Everyone seems comfortable with the arrangement.'
            },
            { 
              id: 'head_table',
              text: 'Take a seat at the head of the table', 
              correct: false,
              culturalCompetence: -8,
              feedback: 'This could be seen as presumptuous in Japanese business culture. The head of the table is typically reserved for the highest-ranking person from the host company.',
              resultDescription: 'There\'s an awkward moment as Mr. Tanaka politely suggests a different seating arrangement.'
            },
            { 
              id: 'any_seat',
              text: 'Tell everyone to sit wherever they\'d like as you don\'t care about formalities', 
              correct: false,
              culturalCompetence: -12,
              feedback: 'This approach disregards important aspects of Japanese business etiquette where seating arrangements often reflect company hierarchy and status. Dismissing these "formalities" could be interpreted as disrespectful.',
              resultDescription: 'Your comment creates visible discomfort among your hosts, who proceed with the traditional seating arrangement despite your remark.'
            }
          ]
        },
        {
          id: 'initial_conversation',
          type: 'decision',
          situation: 'The meeting is about to begin. Ms. Yamada offers you some green tea.',
          prompt: 'How do you approach the start of the conversation?',
          options: [
            { 
              id: 'small_talk',
              text: 'Accept the tea gratefully and engage in light small talk about your trip to Japan before discussing business', 
              correct: true,
              culturalCompetence: 10,
              feedback: 'Excellent choice! In Japanese business culture, relationships are important, and jumping straight into business can seem abrupt. Some polite small talk about non-controversial topics like your travel or positive impressions of Japan helps establish rapport before getting down to business.',
              resultDescription: 'Your hosts appear pleased with the pleasant conversation, and a comfortable atmosphere develops before the business discussion begins.'
            },
            { 
              id: 'immediate_business',
              text: 'Thank them for the tea and immediately propose getting down to business since everyone\'s time is valuable', 
              correct: false,
              culturalCompetence: 0,
              feedback: 'While efficiency is appreciated in many cultures, in Japan, building relationship foundations is considered an essential part of business, not a waste of time. Rushing into business matters can be perceived as too direct and transactional.',
              resultDescription: 'Your hosts follow your lead, but the atmosphere feels slightly formal and less comfortable than it could be.'
            },
            { 
              id: 'decline_tea',
              text: 'Politely decline the tea and suggest starting with your presentation right away', 
              correct: false,
              culturalCompetence: -5,
              feedback: 'Declining the offered hospitality without a specific reason (like dietary restrictions) can seem impolite in Japanese culture. Additionally, rushing to your presentation skips the important relationship-building phase of the meeting.',
              resultDescription: 'There\'s a subtle but noticeable shift in the room\'s atmosphere, becoming more formal and less open.'
            }
          ]
        }
      ],
      
      // Completion rewards
      completion: {
        rewards: {
          minScore: 20, // Minimum score to consider the scenario completed
          unlocks: ['tokyo_negotiation'],
          culturalInsights: [
            'Business Card Exchange (Meishi): In Japan, business cards are exchanged with great ceremony and respect.',
            'Relationship Building: Japanese business culture prioritizes building trust and relationships before conducting actual business.',
            'Hierarchical Respect: Understanding and respecting organizational hierarchy is crucial in Japanese business settings.'
          ]
        }
      }
    },
    
    // Additional scenario (locked initially)
    {
      id: 'tokyo_negotiation',
      title: 'Negotiation Strategy',
      description: 'Navigate a complex negotiation with your Japanese partners.',
      prerequisite: 'tokyo_meeting',
      locked: true,
      // Content would go here, similar structure to the previous scenario
    }
  ]
};

// Helper functions specific to Japan scenarios
export function getJapaneseGreeting(time) {
  // Returns appropriate Japanese greeting based on time of day
  const hour = time.getHours();
  
  if (hour < 12) {
    return 'Ohayō gozaimasu (Good morning)';
  } else if (hour < 18) {
    return 'Kon\'nichiwa (Good afternoon)';
  } else {
    return 'Konbanwa (Good evening)';
  }
}

export function calculateJapaneseBowDepth(respectLevel) {
  // Calculate appropriate bow depth based on respect level
  // 0-3: Casual nod (5 degrees)
  // 4-7: Respectful acknowledgment (15 degrees)
  // 8-10: Formal bow (30 degrees or more)
  
  if (respectLevel <= 3) {
    return 5;
  } else if (respectLevel <= 7) {
    return 15;
  } else {
    return 30;
  }
}
