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
        }
        
        // Add candle and wine bottle
        createSimpleCandle(scene, x, y + 0.5, z);
        createSimpleWineBottle(scene, x - 0.3, y + 0.5, z);
    }
}

function createFrenchChair(scene, x, y, z, rotation) {
    // Chair seat
    const seatGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.45, z);
    scene.add(seat);
    
    // Chair back
    const backMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    for (let i = -0.15; i <= 0.15; i += 0.1) {
        const backGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.set(
            x + Math.sin(rotation) * (0.2 + Math.abs(i/2)),
            y + 0.65,
            z + Math.cos(rotation) * (0.2 + Math.abs(i/2))
        );
        back.rotation.y = rotation;
        scene.add(back);
    }
    
    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5C4033 });
    
    for (let i = 0; i < 4; i++) {
        const legAngle = rotation + (i * Math.PI / 2) + (Math.PI / 4);
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(
            x + Math.sin(legAngle) * 0.2,
            y + 0.22,
            z + Math.cos(legAngle) * 0.2
        );
        scene.add(leg);
    }
}

function createWineGlass(scene, x, y, z) {
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8);
    const glassMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5F5,
        transparent: true,
        opacity: 0.5
    });
    const stem = new THREE.Mesh(stemGeometry, glassMaterial);
    stem.position.set(x, y + 0.075, z);
    scene.add(stem);
    
    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.01, 16);
    const base = new THREE.Mesh(baseGeometry, glassMaterial);
    base.position.set(x, y, z);
    scene.add(base);
    
    // Cup
    const cupGeometry = new THREE.CylinderGeometry(0, 0.06, 0.1, 16);
    const cup = new THREE.Mesh(cupGeometry, glassMaterial);
    cup.position.set(x, y + 0.15, z);
    scene.add(cup);
    
    // Wine (randomly in some glasses)
    if (Math.random() > 0.5) {
        const wineGeometry = new THREE.CylinderGeometry(0, 0.05, 0.04, 16);
        const wineMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B0000,
            transparent: true,
            opacity: 0.7
        });
        const wine = new THREE.Mesh(wineGeometry, wineMaterial);
        wine.position.set(x, y + 0.12, z);
        scene.add(wine);
    }
}

function createSimpleCandle(scene, x, y, z) {
    // Candle base
    const baseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.01, z);
    scene.add(base);
    
    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.12, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xFFF8DC });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x, y + 0.08, z);
    scene.add(candle);
    
    // Flame
    const flameGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xFFDD00 });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x, y + 0.155, z);
    flame.name = 'flame';
    scene.add(flame);
    
    // Light
    const light = new THREE.PointLight(0xFFDD00, 0.3, 1);
    light.position.set(x, y + 0.155, z);
    scene.add(light);
}

function createSimpleWineBottle(scene, x, y, z) {
    // Bottle
    const bottleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 16);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x006400,
        transparent: true,
        opacity: 0.8
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottle.position.set(x, y + 0.1, z);
    scene.add(bottle);
    
    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.02, 0.03, 0.1, 16);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.set(x, y + 0.25, z);
    scene.add(neck);
    
    // Bottle cap
    const capGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16);
    const capMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(x, y + 0.31, z);
    scene.add(cap);
}

function createSimpleFrenchFlag(scene) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.05, 0.8, 1.2);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xD4AF37 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(-4.95, 2, 0);
    scene.add(frame);
    
    // Blue part
    const blueGeometry = new THREE.PlaneGeometry(0.3, 0.6);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0055A4 });
    const blue = new THREE.Mesh(blueGeometry, blueMaterial);
    blue.position.set(-4.9, 2, -0.3);
    blue.rotation.y = Math.PI / 2;
    scene.add(blue);
    
    // White part
    const whiteGeometry = new THREE.PlaneGeometry(0.3, 0.6);
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const white = new THREE.Mesh(whiteGeometry, whiteMaterial);
    white.position.set(-4.9, 2, 0);
    white.rotation.y = Math.PI / 2;
    scene.add(white);
    
    // Red part
    const redGeometry = new THREE.PlaneGeometry(0.3, 0.6);
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xEF4135 });
    const red = new THREE.Mesh(redGeometry, redMaterial);
    red.position.set(-4.9, 2, 0.3);
    red.rotation.y = Math.PI / 2;
    scene.add(red);
}

function createSimpleBar(scene) {
    // Bar counter
    const counterGeometry = new THREE.BoxGeometry(3, 1, 0.8);
    const counterMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(-3, 0.5, -4);
    scene.add(counter);
    
    // Bar top
    const topGeometry = new THREE.BoxGeometry(3.2, 0.1, 1);
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(-3, 1, -4);
    scene.add(top);
    
    // Bottles on shelf
    for (let i = 0; i < 5; i++) {
        const bottleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.25, 16);
        const bottleMaterial = new THREE.MeshStandardMaterial({ 
            color: Math.random() * 0xFFFFFF,
            transparent: true,
            opacity: 0.7
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.set(-4 + i * 0.5, 1.1, -4.3);
        scene.add(bottle);
    }
    
    // Bar stools
    for (let i = -1; i <= 1; i++) {
        const stoolGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
        const stoolMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
        const stool = new THREE.Mesh(stoolGeometry, stoolMaterial);
        stool.position.set(-3 + i * 1, 0.8, -3);
        scene.add(stool);
        
        const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(-3 + i * 1, 0.4, -3);
        scene.add(leg);
    }
}
