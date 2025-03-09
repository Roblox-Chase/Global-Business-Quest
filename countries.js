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
                    // Additional interactions for Tokyo scenario
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
                    // Additional interactions for Paris scenario
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
        if (child.type === 'Mesh' && !(child.geometry.type === 'PlaneGeometry')) {
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
    // Table
    const tableGeometry = new BoxGeometry(3, 0.2, 1.5);
    const tableMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    const table = new Mesh(tableGeometry, tableMaterial);
    table.position.y = 0.5;
    scene.add(table);
    
    // Create some simple chairs
    for (let i = -1; i <= 1; i++) {
        const chairGeometry = new BoxGeometry(0.5, 0.5, 0.5);
        const chairMaterial = new MeshStandardMaterial({ color: 0x000000 });
        const chair = new Mesh(chairGeometry, chairMaterial);
        chair.position.set(i, 0.25, 1);
        scene.add(chair);
    }
    
    // Improved chair for the user
    createBetterChair(scene, 0, 0, -1, 0);
    
    // Add a simple whiteboard
    const boardGeometry = new PlaneGeometry(2, 1);
    const boardMaterial = new MeshBasicMaterial({ color: 0xFFFFFF });
    const board = new Mesh(boardGeometry, boardMaterial);
    board.position.set(0, 1.5, -2);
    scene.add(board);
    
    // Add some "writing" on the whiteboard
    for (let i = 0; i < 3; i++) {
        const lineGeometry = new PlaneGeometry(1.5, 0.05);
        const lineMaterial = new MeshBasicMaterial({ color: 0x000000 });
        const line = new Mesh(lineGeometry, lineMaterial);
        line.position.set(0, 1.6 - i * 0.3, -1.99);
        scene.add(line);
    }
    
    // Add business card holder to the table
    const holderGeometry = new BoxGeometry(0.15, 0.02, 0.1);
    const holderMaterial = new MeshStandardMaterial({ color: 0x000000 });
    const holder = new Mesh(holderGeometry, holderMaterial);
    holder.position.set(0, 0.61, 0.5);
    scene.add(holder);
    
    // Cards
    const cardGeometry = new BoxGeometry(0.1, 0.01, 0.07);
    const cardMaterial = new MeshStandardMaterial({ color: 0xFFFFFF });
    
    for (let i = 0; i < 3; i++) {
        const card = new Mesh(cardGeometry, cardMaterial);
        card.position.set(0, 0.625 + i * 0.003, 0.5);
        scene.add(card);
    }
    
    // Add a potted plant in the corner
    const potGeometry = new CylinderGeometry(0.3, 0.2, 0.4, 16);
    const potMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    const pot = new Mesh(potGeometry, potMaterial);
    pot.position.set(-2, 0.2, -2);
    scene.add(pot);
    
    const plantGeometry = new SphereGeometry(0.5, 8, 8);
    const plantMaterial = new MeshStandardMaterial({ color: 0x228B22 });
    const plant = new Mesh(plantGeometry, plantMaterial);
    plant.position.set(-2, 0.6, -2);
    scene.add(plant);
    
    // Add a laptop on the table
    const laptopBaseGeometry = new BoxGeometry(0.4, 0.02, 0.3);
    const laptopMaterial = new MeshStandardMaterial({ color: 0x333333 });
    const laptopBase = new Mesh(laptopBaseGeometry, laptopMaterial);
    laptopBase.position.set(0, 0.61, 0);
    scene.add(laptopBase);
    
    const laptopScreenGeometry = new BoxGeometry(0.4, 0.3, 0.01);
    const laptopScreen = new Mesh(laptopScreenGeometry, laptopMaterial);
    laptopScreen.position.set(0, 0.76, -0.15);
    laptopScreen.rotation.x = Math.PI / 6;
    scene.add(laptopScreen);
    
    const screenGeometry = new PlaneGeometry(0.38, 0.28);
    const screenMaterial = new MeshBasicMaterial({ 
        color: 0x444444,
        transparent: true,
        opacity: 0.8
    });
    const screen = new Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.76, -0.145);
    screen.rotation.x = Math.PI / 6;
    screen.name = 'screen';
    scene.add(screen);
    
    return {
        animate: (time) => {
            // Simple animation for the screen
            const screen = scene.getObjectByName('screen');
            if (screen) {
                screen.material.opacity = 0.7 + Math.sin(time * 0.003) * 0.1;
            }
        }
    };
}

function createBetterChair(scene, x, y, z, rotation) {
    // Chair seat
    const seatGeometry = new BoxGeometry(0.5, 0.08, 0.5);
    const seatMaterial = new MeshStandardMaterial({ color: 0x000000 });
    const seat = new Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.5, z);
    seat.rotation.y = rotation;
    scene.add(seat);
    
    // Chair back
    const backGeometry = new BoxGeometry(0.5, 0.5, 0.08);
    const back = new Mesh(backGeometry, seatMaterial);
    back.position.set(x, y + 0.75, z + 0.25);
    back.rotation.y = rotation;
    scene.add(back);
    
    // Chair legs
    const legGeometry = new BoxGeometry(0.05, 0.5, 0.05);
    const legMaterial = new MeshStandardMaterial({ color: 0x333333 });
    
    // Front legs
    const frontLeftLeg = new Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(x - 0.2, y + 0.25, z - 0.2);
    scene.add(frontLeftLeg);
    
    const frontRightLeg = new Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(x + 0.2, y + 0.25, z - 0.2);
    scene.add(frontRightLeg);
    
    // Back legs
    const backLeftLeg = new Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(x - 0.2, y + 0.25, z + 0.2);
    scene.add(backLeftLeg);
    
    const backRightLeg = new Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(x + 0.2, y + 0.25, z + 0.2);
    scene.add(backRightLeg);
}

// Create France restaurant environment
function createFranceEnvironment(scene) {
    // Main table
    const tableGeometry = new CylinderGeometry(1, 1, 0.1, 32);
    const tableMaterial = new MeshStandardMaterial({ color: 0xFFFFFF });
    const table = new Mesh(tableGeometry, tableMaterial);
    table.position.y = 0.5;
    scene.add(table);
    
    // Table base
    const baseGeometry = new CylinderGeometry(0.1, 0.2, 0.4, 16);
    const baseMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    const base = new Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.25;
    scene.add(base);
    
    // Create chairs around the table
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        createFrenchChair(
            scene, 
            Math.sin(angle) * 1.5, 
            0, 
            Math.cos(angle) * 1.5, 
            angle + Math.PI
        );
    }
    
    // Add place settings
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.sin(angle) * 0.7;
        const z = Math.cos(angle) * 0.7;
        
        // Plate
        const plateGeometry = new CylinderGeometry(0.15, 0.15, 0.02, 32);
        const plateMaterial = new MeshStandardMaterial({ color: 0xFFFFFF });
        const plate = new Mesh(plateGeometry, plateMaterial);
        plate.position.set(x, 0.56, z);
        scene.add(plate);
        
        // Wine glass
        const stemGeometry = new CylinderGeometry(0.01, 0.01, 0.15, 8);
        const glassMaterial = new MeshStandardMaterial({ 
            color: 0xF5F5F5,
            transparent: true,
            opacity: 0.5
        });
        const stem = new Mesh(stemGeometry, glassMaterial);
        stem.position.set(x + 0.2, 0.575, z);
        scene.add(stem);
        
        const cupGeometry = new CylinderGeometry(0, 0.06, 0.1, 16);
        const cup = new Mesh(cupGeometry, glassMaterial);
        cup.position.set(x + 0.2, 0.65, z);
        scene.add(cup);
        
        // Wine in glass (for some glasses)
        if (i % 2 === 0) {
            const wineGeometry = new CylinderGeometry(0, 0.05, 0.05, 16);
            const wineMaterial = new MeshStandardMaterial({ 
                color: 0x8B0000,
                transparent: true,
                opacity: 0.7
            });
            const wine = new Mesh(wineGeometry, wineMaterial);
            wine.position.set(x + 0.2, 0.635, z);
            scene.add(wine);
        }
    }
    
    // Add a candle to the center
    const candleGeometry = new CylinderGeometry(0.05, 0.05, 0.2, 16);
    const candleMaterial = new MeshStandardMaterial({ color: 0xFFFFF0 });
    const candle = new Mesh(candleGeometry, candleMaterial);
    candle.position.set(0, 0.6, 0);
    scene.add(candle);
    
    // Candle flame
    const flameGeometry = new ConeGeometry(0.02, 0.05, 8);
    const flameMaterial = new MeshBasicMaterial({ color: 0xFFDF00 });
    const flame = new Mesh(flameGeometry, flameMaterial);
    flame.position.set(0, 0.725, 0);
    flame.name = 'flame';
    scene.add(flame);
    
    // Add a wine bottle
    const bottleGeometry = new CylinderGeometry(0.05, 0.05, 0.25, 16);
    const bottleMaterial = new MeshStandardMaterial({ 
        color: 0x006400,
        transparent: true,
        opacity: 0.8
    });
    const bottle = new Mesh(bottleGeometry, bottleMaterial);
    bottle.position.set(-0.3, 0.625, 0);
    scene.add(bottle);
    
    // Bottle neck
    const neckGeometry = new CylinderGeometry(0.02, 0.03, 0.1, 8);
    const neck = new Mesh(neckGeometry, bottleMaterial);
    neck.position.set(-0.3, 0.8, 0);
    scene.add(neck);
    
    return {
        animate: (time) => {
            // Simple animation for the candle flame
            const flame = scene.getObjectByName('flame');
            if (flame) {
                flame.scale.y = 1 + Math.sin(time * 0.005) * 0.2;
                flame.position.y = 0.725 + Math.sin(time * 0.005) * 0.01;
            }
        }
    };
}

function createFrenchChair(scene, x, y, z, rotation) {
    // Chair seat
    const seatGeometry = new CylinderGeometry(0.25, 0.25, 0.05, 16);
    const seatMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    const seat = new Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.45, z);
    scene.add(seat);
    
    // Chair back
    const backGeometry = new CylinderGeometry(0.02, 0.02, 0.5, 8);
    const backMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    
    for (let i = -0.15; i <= 0.15; i += 0.075) {
        const back = new Mesh(backGeometry, backMaterial);
        back.position.set(
            x + Math.sin(rotation) * (0.2 + Math.abs(i)),
            y + 0.7,
            z + Math.cos(rotation) * (0.2 + Math.abs(i))
        );
        back.rotation.y = rotation;
        scene.add(back);
    }
    
    // Chair legs
    const legGeometry = new CylinderGeometry(0.02, 0.02, 0.45, 8);
    const legMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    
    for (let i = 0; i < 4; i++) {
        const legAngle = rotation + (i * Math.PI / 2) + (Math.PI / 4);
        const leg = new Mesh(legGeometry, legMaterial);
        leg.position.set(
            x + Math.sin(legAngle) * 0.2,
            y + 0.225,
            z + Math.cos(legAngle) * 0.2
        );
        scene.add(leg);
    }
}
