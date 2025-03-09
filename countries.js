// Global Business Quest - Countries Data
// This module contains the country data and scenarios

// Import specific THREE components as needed, which won't conflict with the parent import
import { 
    BoxGeometry, 
    CylinderGeometry, 
    PlaneGeometry, 
    SphereGeometry, 
    ConeGeometry,
    MeshStandardMaterial, 
    MeshBasicMaterial, 
    Mesh
} from 'three';

import * as THREE from 'three';
export const countries = {
    japan: {
        name: 'Japan',
        description: 'Navigate formal business meetings in Tokyo',
        color: 0xf0f5ff, // Light blue
        scenarios: [
            {
                id: 'tokyo_meeting',
                title: 'Tokyo Office Meeting',
                description: 'You\'re attending your first business meeting in Tokyo',
                interactions: [
                    {
                        id: 'greeting',
                        situation: 'You arrive at the office and meet your Japanese business partners.',
                        prompt: 'How do you greet your Japanese business partners?',
                        options: [
                            { 
                                text: 'Bow slightly', 
                                correct: true,
                                feedback: 'Correct! A respectful bow is the appropriate greeting in Japanese business culture.' 
                            },
                            { 
                                text: 'Offer a firm handshake', 
                                correct: false,
                                feedback: 'While handshakes are becoming more common in international business in Japan, starting with a bow shows respect for local customs.' 
                            },
                            { 
                                text: 'Give a friendly hug', 
                                correct: false,
                                feedback: 'Physical contact like hugging is considered too familiar and inappropriate in Japanese business settings.' 
                            }
                        ]
                    },
                    {
                        id: 'business_cards',
                        situation: 'Your Japanese counterpart presents you with their business card (meishi).',
                        prompt: 'How do you receive their business card?',
                        options: [
                            { 
                                text: 'Accept with both hands, examine it carefully, then place it respectfully on the table', 
                                correct: true,
                                feedback: 'Correct! In Japan, business cards are treated with great respect as they represent the person. Receiving with both hands, examining it, and placing it carefully on the table shows proper respect.' 
                            },
                            { 
                                text: 'Take it with one hand and put it in your pocket', 
                                correct: false,
                                feedback: 'This is considered disrespectful in Japanese business culture. Business cards should be treated with care and respect.' 
                            },
                            { 
                                text: 'Take it, write notes on it, and fold it in half', 
                                correct: false,
                                feedback: 'Writing on someone\'s business card or folding/bending it is seen as extremely disrespectful in Japanese business culture.' 
                            }
                        ]
                    },
                    {
                        id: 'seating',
                        situation: 'Everyone is about to sit down for the meeting. The most senior executive from the Japanese company is present.',
                        prompt: 'Where should you sit?',
                        options: [
                            { 
                                text: 'Wait to be directed to your seat by your Japanese host', 
                                correct: true,
                                feedback: 'Correct! In Japan, seating arrangements often follow hierarchical order. It\'s best to wait for guidance rather than choosing a seat yourself, as some positions may be reserved for senior executives.' 
                            },
                            { 
                                text: 'Take the seat at the head of the table to show confidence', 
                                correct: false,
                                feedback: 'This could be seen as presumptuous. The seat at the head of the table is typically reserved for the most senior person, and taking it without invitation might appear disrespectful.' 
                            },
                            { 
                                text: 'Sit anywhere you like, as it doesn\'t matter in modern Japanese business', 
                                correct: false,
                                feedback: 'While Japanese business is modernizing, traditional protocols around seating still matter. Hierarchy is important, and seating often reflects this hierarchy.' 
                            }
                        ]
                    },
                    {
                        id: 'small_talk',
                        situation: 'As the meeting begins, there\'s a moment for introductory conversation.',
                        prompt: 'What topic would be most appropriate to discuss initially?',
                        options: [
                            { 
                                text: 'Express appreciation for Japanese culture and perhaps mention a positive observation about their office', 
                                correct: true,
                                feedback: 'Correct! Showing genuine interest in and respect for Japanese culture helps build rapport. Keeping the conversation positive and impersonal is appropriate for initial meetings.' 
                            },
                            { 
                                text: 'Immediately discuss business objectives and financials to show you\'re serious', 
                                correct: false,
                                feedback: 'In Japan, building relationship comes before business transactions. Jumping straight into business matters could be perceived as too abrupt and may hamper relationship-building.' 
                            },
                            { 
                                text: 'Share a humorous anecdote about cultural differences you\'ve experienced in Japan', 
                                correct: false,
                                feedback: 'Humor about cultural differences can easily be misinterpreted and might accidentally cause offense. It\'s safer to keep initial conversations respectful and somewhat formal.' 
                            }
                        ]
                    },
                    {
                        id: 'disagreement',
                        situation: 'During the presentation, you notice an error in the figures presented by your Japanese counterpart.',
                        prompt: 'How should you address this mistake?',
                        options: [
                            { 
                                text: 'Discreetly suggest discussing the figures in more detail later, or phrase it as a question', 
                                correct: true,
                                feedback: 'Correct! In Japanese business culture, preserving harmony (wa) and saving face are important. Pointing out errors directly can cause embarrassment. A subtle approach or framing your concern as a question is more appropriate.' 
                            },
                            { 
                                text: 'Immediately point out the error to demonstrate your attention to detail', 
                                correct: false,
                                feedback: 'Directly pointing out someone\'s mistake, especially in front of others, can cause them to lose face, which is to be avoided in Japanese culture. This approach could damage your business relationship.' 
                            },
                            { 
                                text: 'Ignore the error since it\'s not significant enough to mention', 
                                correct: false,
                                feedback: 'While preserving harmony is important, ignoring substantive errors entirely isn\'t productive. Finding a tactful way to address the issue shows you\'re engaged while still respecting cultural norms.' 
                            }
                        ]
                    },
                    {
                        id: 'gift_giving',
                        situation: 'You\'ve brought a gift for your Japanese business partners.',
                        prompt: 'When and how should you present it?',
                        options: [
                            { 
                                text: 'At the end of the meeting, present it modestly with both hands and a slight bow', 
                                correct: true,
                                feedback: 'Correct! Gift-giving is common in Japanese business culture, but timing and presentation matter. Presenting it at the end of the meeting with both hands shows respect. Being modest about the gift\'s value is also culturally appropriate.' 
                            },
                            { 
                                text: 'As soon as you arrive, prominently display and explain why you chose something expensive', 
                                correct: false,
                                feedback: 'Beginning with gift-giving could create an awkward obligation before the meeting starts. Additionally, emphasizing the gift\'s expense could cause discomfort, as modesty is valued in Japanese culture.' 
                            },
                            { 
                                text: 'Ask your counterpart when they would like to receive the gift you brought', 
                                correct: false,
                                feedback: 'While this might seem considerate, it puts your Japanese counterpart in an awkward position. In Japan, gift-giving follows implicit protocols, and asking directly could create unnecessary discomfort.' 
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    france: {
        name: 'France',
        description: 'Learn the art of business lunches in Paris',
        color: 0xf4f9ff, // Soft blue
        scenarios: [
            {
                id: 'paris_lunch',
                title: 'Parisian Business Lunch',
                description: 'You\'re invited to a business lunch at a restaurant in Paris',
                interactions: [
                    {
                        id: 'greeting',
                        situation: 'You arrive at the restaurant and meet your French business associates.',
                        prompt: 'How do you greet your French business associates?',
                        options: [
                            { 
                                text: 'A light handshake and "Bonjour"', 
                                correct: true,
                                feedback: 'Correct! A handshake with "Bonjour" (or "Bonjour Madame/Monsieur") is the appropriate formal greeting in French business culture.' 
                            },
                            { 
                                text: 'Kiss on both cheeks', 
                                correct: false,
                                feedback: 'While "la bise" (cheek kisses) is common in social settings in France, it\'s typically not appropriate for initial business meetings unless you know the person well.' 
                            },
                            { 
                                text: 'Just say "Hey" with a wave', 
                                correct: false,
                                feedback: 'This greeting is too casual for French business culture, which values formality and politeness in professional settings.' 
                            }
                        ]
                    },
                    {
                        id: 'wine_selection',
                        situation: 'The waiter asks if you would like to select the wine for the table.',
                        prompt: 'How do you respond?',
                        options: [
                            { 
                                text: 'Politely defer to your French host, saying "I would be interested in your recommendation"', 
                                correct: true,
                                feedback: 'Correct! Deferring to your host shows respect while expressing interest in local customs and expertise.' 
                            },
                            { 
                                text: 'Confidently order a California wine you know well', 
                                correct: false,
                                feedback: 'In France, it\'s generally better to select French wines, especially when dining with French associates. Ordering foreign wine could be perceived as not appreciating local culture.' 
                            },
                            { 
                                text: 'Decline wine altogether, stating you don\'t drink during business meetings', 
                                correct: false,
                                feedback: 'In French business culture, sharing wine during a business lunch is normal and refusing could seem rigid. It\'s perfectly acceptable to have a small amount or sip slowly if you prefer not to drink much.' 
                            }
                        ]
                    },
                    {
                        id: 'conversation_topic',
                        situation: 'The conversation begins as you wait for your appetizers to arrive.',
                        prompt: 'What topic would be most appropriate to discuss?',
                        options: [
                            { 
                                text: 'French cuisine, culture, or current events in France', 
                                correct: true,
                                feedback: 'Correct! French business lunches typically begin with cultural conversation. Showing interest in French culture, cuisine, or current events demonstrates respect and helps build rapport before diving into business matters.' 
                            },
                            { 
                                text: 'Immediately discuss business objectives to make efficient use of time', 
                                correct: false,
                                feedback: 'In France, business lunches are as much about relationship-building as they are about business. Jumping straight into business talk might be perceived as too direct or lacking social grace.' 
                            },
                            { 
                                text: 'Bring up your company\'s successful market performance and growth', 
                                correct: false,
                                feedback: 'Starting with talk about your own company\'s success could come across as boastful. French business culture appreciates modesty and intellectual conversation before business discussions.' 
                            }
                        ]
                    },
                    {
                        id: 'meal_pace',
                        situation: 'Your main course has arrived, but you notice your French colleagues are taking their time with their food while the conversation continues.',
                        prompt: 'How should you approach eating your meal?',
                        options: [
                            { 
                                text: 'Follow their lead, eating slowly and continuing to engage in conversation', 
                                correct: true,
                                feedback: 'Correct! In France, business lunches are usually leisurely affairs where the meal and conversation are equally important. Rushing through your food could be seen as uncultured or impatient.' 
                            },
                            { 
                                text: 'Eat quickly so you can focus entirely on the business discussion afterward', 
                                correct: false,
                                feedback: 'Eating quickly during a French business lunch might appear rude or suggest you don\'t appreciate the dining experience. In France, appreciating food is important, and meals are meant to be savored.' 
                            },
                            { 
                                text: 'Focus on finishing your meal before continuing significant conversation', 
                                correct: false,
                                feedback: 'Separating eating from conversation isn\'t typical in French business lunches. The ability to dine and discuss simultaneously is appreciated, and conversation should flow throughout the meal.' 
                            }
                        ]
                    },
                    {
                        id: 'business_timing',
                        situation: 'You\'re halfway through the lunch and still discussing cultural topics.',
                        prompt: 'When is it appropriate to transition to business topics?',
                        options: [
                            { 
                                text: 'Wait for your French counterparts to initiate business talk, typically around dessert or coffee', 
                                correct: true,
                                feedback: 'Correct! In French business culture, it\'s customary for serious business discussion to begin later in the meal, often around dessert or coffee. Following your host\'s lead shows respect for local customs.' 
                            },
                            { 
                                text: 'Politely but firmly redirect the conversation to business matters now', 
                                correct: false,
                                feedback: 'Forcing the conversation toward business before your French counterparts are ready could be perceived as pushy or showing a lack of appreciation for relationship-building, which is fundamental in French business culture.' 
                            },
                            { 
                                text: 'Suggest that you schedule a separate meeting for business discussions', 
                                correct: false,
                                feedback: 'This suggests you don\'t understand the purpose of a French business lunch, which is to combine relationship-building with business discussion. Business matters are expected to be discussed, just at the appropriate time.' 
                            }
                        ]
                    },
                    {
                        id: 'bill_payment',
                        situation: 'The meal is concluding, and the waiter brings the check.',
                        prompt: 'What should you do about the bill?',
                        options: [
                            { 
                                text: 'If you were invited, graciously thank your host; if you invited them, discreetly pay the bill', 
                                correct: true,
                                feedback: 'Correct! In France, typically the person who extended the invitation pays the bill. If you were invited, attempting to pay could even be seen as slightly insulting to your host. If you invited them, paying discreetly without drawing attention to the cost is most appropriate.' 
                            },
                            { 
                                text: 'Offer to split the bill evenly between all attendees', 
                                correct: false,
                                feedback: 'Suggesting to split the bill in a French business context could appear unsophisticated or even stingy. Business meals in France typically follow the "inviter pays" principle rather than splitting costs.' 
                            },
                            { 
                                text: 'Insist on paying the entire bill regardless of who invited whom', 
                                correct: false,
                                feedback: 'Insisting on paying when you were invited could cause discomfort and might even offend your French host, as it could imply they cannot afford to host you properly. Follow the established etiquette of "inviter pays."' 
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// Helper function to create country environment
export function createCountryEnvironment(scene, countryId) {
    // Clear existing objects (except lights and ground)
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && !(child.geometry.type === 'PlaneGeometry')) {
            scene.remove(child);
        }
    });
    
    if (countryId === 'japan') {
        return createJapanEnvironment(scene);
    } else if (countryId === 'france') {
        return createFranceEnvironment(scene);
    }
    
    return null;
}

// Create Japan office environment
function createJapanEnvironment(scene) {
    // Create a simple representation of a Japanese office
    // Table
    const tableGeometry = new THREE.BoxGeometry(3, 0.2, 1.5);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = 0.5;
    scene.add(table);
    
    // Create some simple chairs
    for (let i = -1; i <= 1; i++) {
        const chairGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(i, 0.25, 1);
        scene.add(chair);
    }

    // Add user's chair
    createBetterChair(scene, 0, 0, -1, 0);
    
    // Add a simple whiteboard
    const boardGeometry = new THREE.PlaneGeometry(2, 1);
    const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(0, 1.5, -2);
    scene.add(board);
    
    // Add some "writing" on whiteboard
    for (let i = 0; i < 3; i++) {
        const lineGeometry = new THREE.PlaneGeometry(1.8, 0.05);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, 1.5 + 0.2 - i * 0.3, -1.99);
        scene.add(line);
    }
    
    // Add business card holder 
    const holderGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.1);
    const holderMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(0, 0.61, 0.5);
    scene.add(holder);
    
    // Business cards in holder
    const cardGeometry = new THREE.BoxGeometry(0.1, 0.01, 0.07);
    const cardMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    for (let i = 0; i < 5; i++) {
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.position.set(0, 0.625 + i * 0.002, 0.5);
        scene.add(card);
    }
    
    // Add potted plant
    createSimplePlant(scene, -2, 0, -2);
    
    // Add laptop
    createSimpleLaptop(scene, 0, 0.61, 0);
    
    // Add gift box representing omiyage (gift-giving is part of business culture)
    createGiftBox(scene, -0.8, 0.61, 0.4);
    
    return {
        animate: (time) => {
            // Simple animation for laptop screen
            scene.children.forEach(child => {
                if (child.name === 'screen') {
                    child.material.opacity = 0.7 + Math.sin(time * 0.003) * 0.1;
                }
            });
        }
    };
}

function createBetterChair(scene, x, y, z, rotation) {
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(0.5, 0.08, 0.5);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.5, z);
    seat.rotation.y = rotation;
    scene.add(seat);
    
    // Chair back
    const backGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.08);
    const back = new THREE.Mesh(backGeometry, seatMaterial);
    back.position.set(x, y + 0.75, z + 0.25);
    back.rotation.y = rotation;
    scene.add(back);
    
    // Chair legs
    const legGeometry = new THREE.BoxGeometry(0.05, 0.5, 0.05);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    // Front legs
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(x - 0.2, y + 0.25, z - 0.2);
    scene.add(frontLeftLeg);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(x + 0.2, y + 0.25, z - 0.2);
    scene.add(frontRightLeg);
    
    // Back legs
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(x - 0.2, y + 0.25, z + 0.2);
    scene.add(backLeftLeg);
    
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(x + 0.2, y + 0.25, z + 0.2);
    scene.add(backRightLeg);
}

function createSimplePlant(scene, x, y, z) {
    // Pot
    const potGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.4, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.2, z);
    scene.add(pot);
    
    // Plant
    const plantGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const plant = new THREE.Mesh(plantGeometry, plantMaterial);
    plant.position.set(x, y + 0.7, z);
    scene.add(plant);
}

function createSimpleLaptop(scene, x, y, z) {
    // Base
    const baseGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.3);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y, z);
    scene.add(base);
    
    // Screen
    const screenBaseGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.02);
    const screenBase = new THREE.Mesh(screenBaseGeometry, baseMaterial);
    screenBase.position.set(x, y + 0.15, z - 0.15);
    screenBase.rotation.x = Math.PI / 6;
    scene.add(screenBase);
    
    // Display
    const screenGeometry = new THREE.PlaneGeometry(0.38, 0.28);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444444,
        transparent: true,
        opacity: 0.8
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(x, y + 0.15, z - 0.14);
    screen.rotation.x = Math.PI / 6;
    screen.name = 'screen';
    scene.add(screen);
}

function createGiftBox(scene, x, y, z) {
    // Gift box - representing omiyage (gift exchange is important in Japanese business)
    const boxGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.15);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xE60026 }); // Red is an auspicious color
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(x, y, z);
    scene.add(box);
    
    // Ribbon
    const ribbonMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
    
    // Horizontal ribbon
    const hRibbonGeometry = new THREE.BoxGeometry(0.22, 0.02, 0.03);
    const hRibbon = new THREE.Mesh(hRibbonGeometry, ribbonMaterial);
    hRibbon.position.set(x, y + 0.06, z);
    scene.add(hRibbon);
    
    // Vertical ribbon
    const vRibbonGeometry = new THREE.BoxGeometry(0.03, 0.02, 0.17);
    const vRibbon = new THREE.Mesh(vRibbonGeometry, ribbonMaterial);
    vRibbon.position.set(x, y + 0.06, z);
    scene.add(vRibbon);
    
    // Bow
    const bowGeometry = new THREE.TorusGeometry(0.03, 0.01, 16, 16);
    const leftBow = new THREE.Mesh(bowGeometry, ribbonMaterial);
    leftBow.position.set(x - 0.03, y + 0.07, z);
    leftBow.rotation.y = Math.PI / 2;
    scene.add(leftBow);
    
    const rightBow = new THREE.Mesh(bowGeometry, ribbonMaterial);
    rightBow.position.set(x + 0.03, y + 0.07, z);
    rightBow.rotation.y = Math.PI / 2;
    scene.add(rightBow);
}

// Create France restaurant environment
function createFranceEnvironment(scene) {
    // Create enhanced French restaurant environment
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01;
    scene.add(floor);
    
    // Main table
    createFrenchTable(scene, 0, 0, 0, true);
    
    // Side tables
    createFrenchTable(scene, -3, 0, 2, false);
    createFrenchTable(scene, 3, 0, 2, false);
    createFrenchTable(scene, -3, 0, -2, false);
    createFrenchTable(scene, 3, 0, -2, false);
    
    // Wall decoration - French flag
    createSimpleFrenchFlag(scene);
    
    // Add a simple bar counter
    createSimpleBar(scene);
    
    // Add bread basket (important in French dining)
    createBreadBasket(scene, 0.4, 0.5, 0);
    
    // Add menu card
    createMenuCard(scene, -0.4, 0.5, 0.2);
    
    return {
        animate: (time) => {
            // Animate candles
            scene.children.forEach(child => {
                if (child.name === 'flame') {
                    child.scale.y = 1 + Math.sin(time * 0.005) * 0.2;
                    child.position.y = 0.65 + Math.sin(time * 0.005) * 0.01;
                }
            });
        }
    };
}

function createFrenchTable(scene, x, y, z, isMain) {
    // Table
    const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
        color: isMain ? 0xFFFFFF : 0xFAF0E6
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(x, y + 0.5, z);
    scene.add(table);
    
    // Table base
    const baseGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.5, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x5C4033 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.25, z);
    scene.add(base);
    
    // Create chairs around the table
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        createFrenchChair(scene, 
            x + Math.sin(angle) * 1.5, 
            y, 
            z + Math.cos(angle) * 1.5, 
            -angle);
    }
    
    // Add place settings if it's the main table
    if (isMain) {
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const plateX = x + Math.sin(angle) * 0.7;
            const plateZ = z + Math.cos(angle) * 0.7;
            
            // Plate
            const plateGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 32);
            const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
            const plate = new THREE.Mesh(plateGeometry, plateMaterial);
            plate.position.set(plateX, y + 0.56, plateZ);
            scene.add(plate);
            
            // Wine glass
            createWineGlass(scene, plateX + 0.2, y + 0.5, plateZ);
            
            // Add silverware
            createSilverware(scene, plateX, y + 0.56, plateZ);
        }
        
        // Ad
