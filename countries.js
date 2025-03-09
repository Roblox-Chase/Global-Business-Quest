// Global Business Quest - Countries Data
// This module contains the country data and scenarios

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
    
    // Add a simple whiteboard
    const boardGeometry = new THREE.PlaneGeometry(2, 1);
    const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(0, 1.5, -2);
    scene.add(board);
    
    return {
        animate: (time) => {
            // Simple animation if needed
        }
    };
}

// Create France restaurant environment
function createFranceEnvironment(scene) {
    // Create a simple representation of a French restaurant
    // Round table
    const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = 0.5;
    scene.add(table);
    
    // Wine glasses
    for (let i = -0.5; i <= 0.5; i += 0.5) {
        const glassGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16);
        const glassMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xF5F5F5,
            transparent: true,
            opacity: 0.5
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(i, 0.65, i);
        scene.add(glass);
    }
    
    // Add plates
    for (let i = -0.5; i <= 0.5; i += 0.5) {
        const plateGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
        const plateMaterial = new THREE.MeshBasicMaterial({ color: 0xF0F0F0 });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.set(i, 0.6, -i);
        scene.add(plate);
    }
    
    return {
        animate: (time) => {
            // Simple animation if needed
        }
    };
}
