// Global Business Quest - Countries Data
// This module contains the country data and scenarios

import * as THREE from 'three';

function createDecorativeElements(scene) {
    // Decorative art and posters on walls
    
    // Menu board near reception
    createMenuBoard(scene, -5, 2, 5.5);
    
    // Wine rack
    createWineRack(scene, -6, 0, -5.5);
    
    // French flag decoration
    createFrenchFlag(scene, 0, 3, -5.9);
    
    // Decorative ceiling moldings
    createDecorative3DMoldings(scene);
}

function createMenuBoard(scene, x, y, z) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.05, 1.2, 0.8);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    scene.add(frame);
    
    // Board
    const boardGeometry = new THREE.PlaneGeometry(0.7, 1.1);
    const boardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        roughness: 0.9
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(x - 0.03, y, z);
    board.rotation.y = Math.PI / 2;
    scene.add(board);
    
    // Menu text (simplified as white rectangles)
    for (let i = 0; i < 6; i++) {
        const textGeometry = new THREE.PlaneGeometry(0.6, 0.05);
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.set(x - 0.025, y + 0.4 - i * 0.15, z);
        text.rotation.y = Math.PI / 2;
        scene.add(text);
    }
    
    // Small shelf at bottom with chalk
    const shelfGeometry = new THREE.BoxGeometry(0.1, 0.03, 0.2);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(x - 0.05, y - 0.6, z);
    scene.add(shelf);
    
    // Chalk
    const chalkGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8);
    const chalkMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const chalk = new THREE.Mesh(chalkGeometry, chalkMaterial);
    chalk.position.set(x - 0.05, y - 0.58, z);
    chalk.rotation.x = Math.PI / 2;
    scene.add(chalk);
}

function createWineRack(scene, x, y, z) {
    // Rack structure
    const rackGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.3);
    const rackMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.7
    });
    const rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.position.set(x, y + 0.75, z);
    scene.add(rack);
    
    // Wine bottle slots (horizontal)
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            const slotGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 16);
            const slotMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const slot = new THREE.Mesh(slotGeometry, slotMaterial);
            
            slot.position.set(x, y + 0.3 + j * 0.3, z);
            slot.rotation.z = Math.PI / 2;
            
            scene.add(slot);
            
            // Add wine bottles in some slots (random)
            if (Math.random() > 0.3) {
                createWineBottleInRack(scene, x, y + 0.3 + j * 0.3, z);
            }
        }
    }
}

function createWineBottleInRack(scene, x, y, z) {
    // Random bottle color
    const colors = [0x00BFFF, 0xFFD700, 0xFF6347, 0x9370DB, 0x006400];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Bottle
    const bottleGeometry = new THREE.CylinderGeometry(0.035, 0.035, 0.6, 16);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7,
        roughness: 0.2
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    
    // Position bottle in rack slot
    bottle.position.set(x, y, z);
    bottle.rotation.z = Math.PI / 2;
    scene.add(bottle);
}

function createFrenchFlag(scene, x, y, z) {
    // Flag mount
    const mountGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
    const mountMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    const mount = new THREE.Mesh(mountGeometry, mountMaterial);
    mount.position.set(x, y, z);
    mount.rotation.x = Math.PI / 2;
    scene.add(mount);
    
    // Flag material - French tricolor
    const flagGeometry = new THREE.PlaneGeometry(0.6, 0.4);
    const flagMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x0055A4 }), // Blue
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), // White
        new THREE.MeshBasicMaterial({ color: 0xEF4135 })  // Red
    ];
    
    // Create each segment of the flag
    for (let i = 0; i < 3; i++) {
        const segment = new THREE.Mesh(
            new THREE.PlaneGeometry(0.2, 0.4),
            flagMaterials[i]
        );
        segment.position.set(x + 0.2 + i * 0.2, y, z + 0.05);
        segment.rotation.y = Math.PI / 2;
        scene.add(segment);
    }
    
    // Flag holder
    const holderGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37, 
        metalness: 0.7 
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y, z - 0.02);
    scene.add(holder);
}

function createDecorative3DMoldings(scene) {
    // Add decorative architectural elements

    // Ceiling roses around light fixtures
    for (let x = -4; x <= 4; x += 8) {
        for (let z = -4; z <= 4; z += 8) {
            if (!(x === 0 && z === 0)) { // Skip center where chandelier is
                createCeilingRose(scene, x, 4, z);
            }
        }
    }
    
    // Decorative wall panels
    for (let z = -3; z <= 3; z += 3) {
        createDecorativePanel(scene, -6.95, 2, z);
        createDecorativePanel(scene, 6.95, 2, z);
    }
}
function createWallSconce(scene, x, y, z) {
    // Wall mount
    const mountGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.1);
    const mountMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        metalness: 0.6,
        roughness: 0.4
    });
    const mount = new THREE.Mesh(mountGeometry, mountMaterial);
    mount.position.set(x + 0.03 * Math.sign(x), y, z);
    scene.add(mount);
    
    // Decorative arm
    const armGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const arm = new THREE.Mesh(armGeometry, mountMaterial);
    arm.position.set(x, y, z);
    arm.rotation.z = Math.PI / 2;
    scene.add(arm);
    
    // Candle holder
    const holderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 16);
    const holder = new THREE.Mesh(holderGeometry, mountMaterial);
    holder.position.set(x - 0.15 * Math.sign(x), y, z);
    scene.add(holder);
    
    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.1, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFF0,
        roughness: 0.7
    });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x - 0.15 * Math.sign(x), y + 0.075, z);
    scene.add(candle);
    
    // Flame
    const flameGeometry = new THREE.ConeGeometry(0.015, 0.04, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x - 0.15 * Math.sign(x), y + 0.145, z);
    flame.name = 'candleFlame';
    scene.add(flame);
    
    // Light
    const light = new THREE.PointLight(0xFFD700, 0.3, 3);
    light.position.set(x - 0.15 * Math.sign(x), y + 0.145, z);
    light.name = 'candleLight';
    scene.add(light);
    
    // Decorative backplate
    const backplateGeometry = new THREE.CircleGeometry(0.15, 16);
    const backplateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        metalness: 0.5,
        roughness: 0.5,
        side: THREE.DoubleSide
    });
    const backplate = new THREE.Mesh(backplateGeometry, backplateMaterial);
    backplate.position.set(x + 0.02 * Math.sign(x), y, z);
    backplate.rotation.y = Math.PI / 2;
    scene.add(backplate);
}

function createFloorPlant(scene, x, y, z) {
    // Planter
    const planterGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.5, 16);
    const planterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.7
    });
    const planter = new THREE.Mesh(planterGeometry, planterMaterial);
    planter.position.set(x, y + 0.25, z);
    scene.add(planter);
    
    // Soil
    const soilGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16);
    const soilMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3B2F2F,
        roughness: 0.9
    });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.position.set(x, y + 0.48, z);
    scene.add(soil);
    
    // Plant trunk/stem
    const trunkGeometry = new THREE.CylinderGeometry(0.03, 0.04, 1.2, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + 1.1, z);
    scene.add(trunk);
    
    // Foliage
    const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22,
        roughness: 0.8
    });
    
    for (let i = 0; i < 5; i++) {
        const size = 0.2 + Math.random() * 0.2;
        const foliageGeometry = new THREE.SphereGeometry(size, 16, 16);
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        
        const height = 1 + Math.random() * 0.8;
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.2 * Math.random();
        
        foliage.position.set(
            x + Math.cos(angle) * radius,
            y + height,
            z + Math.sin(angle) * radius
        );
        
        scene.add(foliage);
    }
}
function createFrenchRestaurantDecorations(scene) {
    // Chandelier
    createChandelier(scene, 0, 4, 0);
    
    // Wall sconces
    for (let i = -1; i <= 1; i++) {
        createWallSconce(scene, -7, 2.5, i * 4);
        createWallSconce(scene, 7, 2.5, i * 4);
    }
    
    // Floor plants
    createFloorPlant(scene, -6, 0, 5);
    createFloorPlant(scene, 6, 0, 5);
    createFloorPlant(scene, -6, 0, -5);
    createFloorPlant(scene, 6, 0, -5);
    
    // Decorative elements
    createDecorativeElements(scene);
}

function createChandelier(scene, x, y, z) {
    // Main ring
    const ringGeometry = new THREE.TorusGeometry(1, 0.05, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        metalness: 0.7,
        roughness: 0.3
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(x, y - 1, z);
    scene.add(ring);
    
    // Support chains
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const chainGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8);
        const chain = new THREE.Mesh(chainGeometry, ringMaterial);
        
        chain.position.set(
            x + Math.cos(angle) * 0.8,
            y - 0.5,
            z + Math.sin(angle) * 0.8
        );
        
        scene.add(chain);
        
        // Connect to ceiling
        const upperChainGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8);
        const upperChain = new THREE.Mesh(upperChainGeometry, ringMaterial);
        
        upperChain.position.set(
            x + Math.cos(angle) * 0.4,
            y - 0.5,
            z + Math.sin(angle) * 0.4
        );
        
        upperChain.rotation.x = Math.PI / 4;
        upperChain.rotation.z = angle;
        
        scene.add(upperChain);
    }
    
    // Candle holders
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.85;
        
        const holderGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.1, 16);
        const holder = new THREE.Mesh(holderGeometry, ringMaterial);
        
        holder.position.set(
            x + Math.cos(angle) * radius,
            y - 1.05,
            z + Math.sin(angle) * radius
        );
        
        scene.add(holder);
        
        // Candle
        const candleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 16);
        const candleMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFF0,
            roughness: 0.7
        });
        const candle = new THREE.Mesh(candleGeometry, candleMaterial);
        
        candle.position.set(
            x + Math.cos(angle) * radius,
            y - 0.93,
            z + Math.sin(angle) * radius
        );
        
        scene.add(candle);
        
        // Flame
        const flameGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
        const flameMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xFFFF00,
            emissive: 0xFFFF00
        });
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        
        flame.position.set(
            x + Math.cos(angle) * radius,
            y - 0.84,
            z + Math.sin(angle) * radius
        );
        
        flame.name = 'candleFlame';
        scene.add(flame);
        
        // Light
        const light = new THREE.PointLight(0xFFD700, 0.1, 3);
        light.position.set(
            x + Math.cos(angle) * radius,
            y - 0.84,
            z + Math.sin(angle) * radius
        );
        light.name = 'candleLight';
        scene.add(light);
    }
    
    // Central element
    const centerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const center = new THREE.Mesh(centerGeometry, ringMaterial);
    center.position.set(x, y - 1, z);
    scene.add(center);
    
    // Main chandelier light
    const chandLight = new THREE.PointLight(0xFFD700, 0.8, 10);
    chandLight.position.set(x, y - 1, z);
    scene.add(chandLight);
}
function createRatatouille(scene, x, y, z) {
    // Plate
    const plateGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.2
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.set(x, y + 0.01, z);
    scene.add(plate);
    
    // Ratatouille base (tomato sauce)
    const baseGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.01, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.025, z);
    scene.add(base);
    
    // Vegetable slices arranged in a spiral
    const colors = [0xEE82EE, 0x008000, 0xFFFF00]; // Eggplant, zucchini, squash
    
    for (let i = 0; i < 15; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.03 + (i / 30) * 0.15;
        
        const sliceGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 8);
        const sliceMaterial = new THREE.MeshStandardMaterial({ 
            color: colors[i % 3],
            roughness: 0.7
        });
        const slice = new THREE.Mesh(sliceGeometry, sliceMaterial);
        
        slice.position.set(
            x + Math.cos(angle) * radius,
            y + 0.03,
            z + Math.sin(angle) * radius
        );
        
        slice.rotation.x = Math.PI / 2;
        slice.rotation.z = angle;
        
        scene.add(slice);
    }
    
    // Garnish (herbs)
    const herbGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const herbMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    
    for (let i = 0; i < 3; i++) {
        const herb = new THREE.Mesh(herbGeometry, herbMaterial);
        
        herb.position.set(
            x + (Math.random() - 0.5) * 0.15,
            y + 0.04,
            z + (Math.random() - 0.5) * 0.15
        );
        
        herb.scale.set(1, 0.5, 1);
        scene.add(herb);
    }
}

function createOnionSoup(scene, x, y, z) {
    // Soup bowl
    const bowlGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.1, 32);
    const bowlMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.5
    });
    const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowl.position.set(x, y + 0.05, z);
    scene.add(bowl);
    
    // Soup liquid
    const soupGeometry = new THREE.CylinderGeometry(0.14, 0.09, 0.09, 32);
    const soupMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        transparent: true,
        opacity: 0.8,
        roughness: 0.3
    });
    const soup = new THREE.Mesh(soupGeometry, soupMaterial);
    soup.position.set(x, y + 0.05, z);
    scene.add(soup);
    
    // Cheese topping
    const cheeseGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
    const cheeseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFD700,
        roughness: 0.6
    });
    const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
    cheese.position.set(x, y + 0.1, z);
    scene.add(cheese);
    
    // Bread pieces visible in the soup
    const breadMaterial = new THREE.MeshStandardMaterial({ color: 0xF5DEB3 });
    
    for (let i = 0; i < 3; i++) {
        const breadGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.03);
        const bread = new THREE.Mesh(breadGeometry, breadMaterial);
        
        const angle = (i / 3) * Math.PI * 2;
        const radius = 0.07;
        
        bread.position.set(
            x + Math.cos(angle) * radius,
            y + 0.09,
            z + Math.sin(angle) * radius
        );
        
        bread.rotation.y = Math.random() * Math.PI;
        scene.add(bread);
    }
}
function createFrenchMeal(scene, x, y, z) {
    // Add French meal to a table - simplified representations
    
    // Pick a meal type randomly
    const mealType = Math.floor(Math.random() * 4);
    
    if (mealType === 0) {
        // Steak frites
        createSteakFrites(scene, x, y, z);
    } else if (mealType === 1) {
        // Coq au vin
        createCoqAuVin(scene, x, y, z);
    } else if (mealType === 2) {
        // Ratatouille
        createRatatouille(scene, x, y, z);
    } else {
        // French onion soup
        createOnionSoup(scene, x, y, z);
    }
}

function createSteakFrites(scene, x, y, z) {
    // Plate
    const plateGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.2
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.set(x, y + 0.01, z);
    scene.add(plate);
    
    // Steak
    const steakGeometry = new THREE.BoxGeometry(0.2, 0.04, 0.15);
    const steakMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        roughness: 0.7
    });
    const steak = new THREE.Mesh(steakGeometry, steakMaterial);
    steak.position.set(x - 0.05, y + 0.04, z);
    steak.rotation.y = Math.PI / 6;
    scene.add(steak);
    
    // Fries
    const friesMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFD700,
        roughness: 0.6
    });
    
    for (let i = 0; i < 8; i++) {
        const fryGeometry = new THREE.BoxGeometry(0.01, 0.01, 0.08);
        const fry = new THREE.Mesh(fryGeometry, friesMaterial);
        
        const angle = (i / 8) * Math.PI;
        const radius = 0.1;
        
        fry.position.set(
            x + 0.15 + Math.cos(angle) * radius * 0.3,
            y + 0.04 + Math.random() * 0.03,
            z + Math.sin(angle) * radius * 0.5
        );
        
        fry.rotation.set(
            Math.random() * 0.2,
            Math.random() * Math.PI,
            Math.random() * 0.2
        );
        
        scene.add(fry);
    }
    
    // Garnish (parsley)
    const garnishGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const garnishMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const garnish = new THREE.Mesh(garnishGeometry, garnishMaterial);
    garnish.position.set(x + 0.05, y + 0.04, z - 0.1);
    garnish.scale.set(1, 0.5, 1);
    scene.add(garnish);
}

function createCoqAuVin(scene, x, y, z) {
    // Deep plate/bowl
    const plateGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.08, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.2
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.set(x, y + 0.04, z);
    scene.add(plate);
    
    // Sauce
    const sauceGeometry = new THREE.CylinderGeometry(0.19, 0.14, 0.06, 32);
    const sauceMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x800000,
        roughness: 0.5,
        transparent: true,
        opacity: 0.9
    });
    const sauce = new THREE.Mesh(sauceGeometry, sauceMaterial);
    sauce.position.set(x, y + 0.04, z);
    scene.add(sauce);
    
    // Chicken piece
    const chickenGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const chickenMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xCD853F,
        roughness: 0.7
    });
    const chicken = new THREE.Mesh(chickenGeometry, chickenMaterial);
    chicken.position.set(x, y + 0.07, z);
    chicken.scale.set(1, 0.6, 1);
    scene.add(chicken);
    
    // Vegetables
    const vegetableMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
    
    for (let i = 0; i < 5; i++) {
        const vegGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        const vegetable = new THREE.Mesh(vegGeometry, vegetableMaterial);
        
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.1;
        
        vegetable.position.set(
            x + Math.cos(angle) * radius,
            y + 0.07,
            z + Math.sin(angle) * radius
        );
        
        scene.add(vegetable);
    }
}
function createDividers(scene) {
    // Create decorative dividers between dining sections
    
    // Planter boxes positions
    const planterPositions = [
        [-3, 0, -2],
        [3, 0, -2],
        [-2, 0, 2],
        [2, 0, 2]
    ];
    
    planterPositions.forEach(pos => {
        createPlanterDivider(scene, pos[0], pos[1], pos[2]);
    });
}

function createPlanterDivider(scene, x, y, z) {
    // Planter box
    const boxGeometry = new THREE.BoxGeometry(1.2, 1, 0.4);
    const boxMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969,
        roughness: 0.7
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(x, y + 0.5, z);
    scene.add(box);
    
    // Soil
    const soilGeometry = new THREE.BoxGeometry(1.1, 0.1, 0.3);
    const soilMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3B2F2F,
        roughness: 0.9
    });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.position.set(x, y + 0.95, z);
    scene.add(soil);
    
    // Plants
    for (let i = -1; i <= 1; i += 0.5) {
        const plantGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const plantMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x228B22,
            roughness: 0.8
        });
        const plant = new THREE.Mesh(plantGeometry, plantMaterial);
        plant.position.set(x + i * 0.3, y + 1.15, z);
        plant.scale.set(1, 1.2, 1);
        scene.add(plant);
    }
    
    // Add some flowers
    for (let i = -1; i <= 1; i += 1) {
        const flowerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const flowerColors = [0xFF1493, 0xFFD700, 0xFF6347];
        const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        const flowerMaterial = new THREE.MeshStandardMaterial({ color: color });
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        flower.position.set(x + i * 0.3, y + 1.3, z);
        scene.add(flower);
    }
}

function createFrenchDiningItems(scene) {
    // Add food items to tables
    
    // Main player table
    createFrenchMeal(scene, 0, 0.76, 3);
    
    // Other tables
    const foodPositions = [
        [-3, 0.76, 1],
        [3, 0.76, 1],
        [-3, 0.76, -1],
        [3, 0.76, -1],
        [-1.5, 0.76, -3],
        [1.5, 0.76, -3]
    ];
    
    foodPositions.forEach(pos => {
        if (Math.random() > 0.5) {
            createFrenchMeal(scene, pos[0], pos[1], pos[2]);
        }
    });
}
function createBarStool(scene, x, y, z) {
    // Stool base
    const baseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.05, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969,
        metalness: 0.5,
        roughness: 0.5
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.025, z);
    scene.add(base);
    
    // Stool pole
    const poleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16);
    const pole = new THREE.Mesh(poleGeometry, baseMaterial);
    pole.position.set(x, y + 0.45, z);
    scene.add(pole);
    
    // Stool seat
    const seatGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        roughness: 0.7
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.875, z);
    scene.add(seat);
    
    // Seat cushion
    const cushionGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16);
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xB22222,
        roughness: 0.9
    });
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.position.set(x, y + 0.91, z);
    scene.add(cushion);
    
    // Footrest ring
    const ringGeometry = new THREE.TorusGeometry(0.18, 0.01, 8, 32);
    const ring = new THREE.Mesh(ringGeometry, baseMaterial);
    ring.position.set(x, y + 0.25, z);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
}

function createReceptionArea(scene) {
    // Host stand position
    const x = 0;
    const y = 0;
    const z = 5;
    
    // Host stand
    const standGeometry = new THREE.BoxGeometry(1, 1.1, 0.5);
    const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.4
    });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(x, y + 0.55, z);
    scene.add(stand);
    
    // Stand top
    const topGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.6);
    const topMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5C4033,
        roughness: 0.3
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(x, y + 1.1, z);
    scene.add(top);
    
    // Reservation book
    const bookGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.4);
    const bookMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(x, y + 1.15, z);
    book.rotation.y = Math.PI / 6;
    scene.add(book);
    
    // Menu stack
    const menuGeometry = new THREE.BoxGeometry(0.2, 0.08, 0.3);
    const menuMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const menu = new THREE.Mesh(menuGeometry, menuMaterial);
    menu.position.set(x + 0.4, y + 1.15, z - 0.1);
    scene.add(menu);
    
    // Small vase with flower
    createSmallFlowerVase(scene, x - 0.4, y + 1.15, z - 0.1);
}

function createSmallFlowerVase(scene, x, y, z) {
    // Vase
    const vaseGeometry = new THREE.CylinderGeometry(0.04, 0.03, 0.1, 16);
    const vaseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1
    });
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vase.position.set(x, y + 0.05, z);
    scene.add(vase);
    
    // Flower stem
    const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.2, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(x, y + 0.15, z);
    scene.add(stem);
    
    // Flower
    const flowerGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0xFF1493 });
    const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
    flower.position.set(x, y + 0.25, z);
    scene.add(flower);
}
function createRestaurantBar(scene) {
    // Bar counter position
    const x = -5;
    const y = 0;
    const z = -4;
    
    // Bar counter
    const counterGeometry = new THREE.BoxGeometry(4, 1.1, 0.8);
    const counterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.3
    });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(x, y + 0.55, z);
    scene.add(counter);
    
    // Bar counter top
    const topGeometry = new THREE.BoxGeometry(4.2, 0.05, 1);
    const topMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2F4F4F,
        roughness: 0.2,
        metalness: 0.1
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(x, y + 1.1, z);
    scene.add(top);
    
    // Bar back wall/shelves
    const backWallGeometry = new THREE.BoxGeometry(4, 2.5, 0.2);
    const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(x, y + 1.25, z - 0.5);
    scene.add(backWall);
    
    // Add liquor bottles on shelves
    for (let i = 0; i < 9; i++) {
        const bottleX = x - 1.5 + (i % 3) * 1.5;
        const bottleY = y + 1.6 + Math.floor(i / 3) * 0.6;
        const bottleZ = z - 0.5;
        
        createLiquorBottle(scene, bottleX, bottleY, bottleZ);
    }
    
    // Add glasses hanging from above
    createHangingGlasses(scene, x, y, z);
    
    // Bar stools
    for (let i = -1; i <= 1; i++) {
        createBarStool(scene, x + i * 1.2, y, z + 1);
    }
}

function createLiquorBottle(scene, x, y, z) {
    // Random bottle color
    const colors = [0x00BFFF, 0xFFD700, 0xFF6347, 0x9370DB, 0x00FA9A];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Bottle
    const bottleGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 16);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7,
        roughness: 0.2
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottle.position.set(x, y, z + 0.15);
    scene.add(bottle);
    
    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.02, 0.03, 0.1, 16);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.set(x, y + 0.2, z + 0.15);
    scene.add(neck);
    
    // Bottle cap
    const capGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16);
    const capMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        metalness: 0.7
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(x, y + 0.26, z + 0.15);
    scene.add(cap);
}

function createHangingGlasses(scene, x, y, z) {
    // Glass rack
    const rackGeometry = new THREE.BoxGeometry(3, 0.05, 0.4);
    const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.position.set(x, y + 2.3, z - 0.2);
    scene.add(rack);
    
    // Hanging wine glasses
    for (let i = 0; i < 5; i++) {
        const glassX = x - 1 + i * 0.5;
        createHangingWineGlass(scene, glassX, y + 2.2, z - 0.2);
    }
}

function createHangingWineGlass(scene, x, y, z) {
    // Glass is same as normal wine glass but upside down
    
    // Base (now on top)
    const baseGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.01, 16);
    const glassMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5F5,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1
    });
    const base = new THREE.Mesh(baseGeometry, glassMaterial);
    base.position.set(x, y + 0.15, z);
    scene.add(base);
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
    const stem = new THREE.Mesh(stemGeometry, glassMaterial);
    stem.position.set(x, y + 0.07, z);
    scene.add(stem);
    
    // Cup (now on bottom, hanging)
    const cupGeometry = new THREE.CylinderGeometry(0.05, 0, 0.1, 16);
    const cup = new THREE.Mesh(cupGeometry, glassMaterial);
    cup.position.set(x, y - 0.03, z);
    cup.rotation.x = Math.PI;  // Flip upside down
    cup.scale.set(1, 1.2, 1);
    scene.add(cup);
}
function createWineBottle(scene, x, y, z) {
    // Bottle
    const bottleGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 16);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x006400, // Dark green
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottle.position.set(x, y + 0.125, z);
    scene.add(bottle);
    
    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.015, 0.02, 0.1, 16);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.set(x, y + 0.3, z);
    scene.add(neck);
    
    // Bottle cap
    const capGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 16);
    const capMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        roughness: 0.3
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(x, y + 0.36, z);
    scene.add(cap);
    
    // Label
    const labelGeometry = new THREE.PlaneGeometry(0.06, 0.08);
    const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF8DC });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(x, y + 0.125, z + 0.041);
    label.rotation.x = Math.PI / 2;
    label.rotation.y = Math.PI / 2;
    scene.add(label);
}

function createCandle(scene, x, y, z) {
    // Candle holder
    const holderGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.03, 16);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        metalness: 0.7,
        roughness: 0.3
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y + 0.015, z);
    scene.add(holder);
    
    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFF0,
        roughness: 0.7
    });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x, y + 0.09, z);
    scene.add(candle);
    
    // Candle wick
    const wickGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.02, 8);
    const wickMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const wick = new THREE.Mesh(wickGeometry, wickMaterial);
    wick.position.set(x, y + 0.17, z);
    scene.add(wick);
    
    // Candle flame
    const flameGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 1
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x, y + 0.185, z);
    flame.name = 'candleFlame';
    scene.add(flame);
    
    // Add light
    const candleLight = new THREE.PointLight(0xFFD700, 0.3, 1);
    candleLight.position.set(x, y + 0.19, z);
    candleLight.name = 'candleLight';
    scene.add(candleLight);
}
function createTableSettings(scene, x, y, z, tableRadius) {
    // Create place settings for 4 people
    const placementRadius = tableRadius * 0.6;
    
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const posX = x + Math.sin(angle) * placementRadius;
        const posZ = z + Math.cos(angle) * placementRadius;
        
        // Plate
        const plateGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 32);
        const plateMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF,
            roughness: 0.2
        });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.set(posX, y + 0.01, posZ);
        scene.add(plate);
        
        // Wine glass
        createWineGlass(scene, posX - 0.2, y, posZ);
        
        // Cutlery
        createCutlery(scene, posX, y, posZ);
        
        // Napkin
        const napkinGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.1);
        const napkinMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF,
            roughness: 0.9
        });
        const napkin = new THREE.Mesh(napkinGeometry, napkinMaterial);
        napkin.position.set(posX + 0.2, y + 0.01, posZ - 0.1);
        scene.add(napkin);
    }
    
    // Center items
    
    // Bread basket
    createBreadBasket(scene, x, y, z);
    
    // Wine bottle
    createWineBottle(scene, x - 0.2, y, z);
    
    // Candle
    createCandle(scene, x + 0.2, y, z);
}

function createWineGlass(scene, x, y, z) {
    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.01, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5F5,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.005, z);
    scene.add(base);
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
    const stem = new THREE.Mesh(stemGeometry, baseMaterial);
    stem.position.set(x, y + 0.08, z);
    scene.add(stem);
    
    // Cup
    const cupGeometry = new THREE.CylinderGeometry(0, 0.05, 0.1, 16);
    const cup = new THREE.Mesh(cupGeometry, baseMaterial);
    cup.position.set(x, y + 0.18, z);
    cup.scale.set(1, 1.2, 1);
    scene.add(cup);
    
    // Wine (optional)
    const wineGeometry = new THREE.CylinderGeometry(0, 0.04, 0.04, 16);
    const wineMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        transparent: true,
        opacity: 0.8
    });
    const wine = new THREE.Mesh(wineGeometry, wineMaterial);
    wine.position.set(x, y + 0.16, z);
    scene.add(wine);
}

function createCutlery(scene, x, y, z) {
    // Fork
    const forkGeometry = new THREE.BoxGeometry(0.02, 0.01, 0.12);
    const cutleryMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        metalness: 0.7,
        roughness: 0.2
    });
    const fork = new THREE.Mesh(forkGeometry, cutleryMaterial);
    fork.position.set(x - 0.15, y + 0.005, z);
    fork.rotation.y = Math.PI / 12;
    scene.add(fork);
    
    // Knife
    const knifeGeometry = new THREE.BoxGeometry(0.02, 0.01, 0.15);
    const knife = new THREE.Mesh(knifeGeometry, cutleryMaterial);
    knife.position.set(x + 0.15, y + 0.005, z);
    knife.rotation.y = -Math.PI / 12;
    scene.add(knife);
    
    // Spoon
    const spoonGeometry = new THREE.BoxGeometry(0.02, 0.01, 0.12);
    const spoon = new THREE.Mesh(spoonGeometry, cutleryMaterial);
    spoon.position.set(x + 0.18, y + 0.005, z);
    spoon.rotation.y = -Math.PI / 8;
    scene.add(spoon);
}

function createBreadBasket(scene, x, y, z) {
    // Basket
    const basketGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.08, 16);
    const basketMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.9
    });
    const basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.set(x, y + 0.04, z);
    scene.add(basket);
    
    // Bread pieces
    const breadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5DEB3,
        roughness: 0.8
    });
    
    for (let i = 0; i < 3; i++) {
        const breadGeometry = new THREE.SphereGeometry(0.04, 8, 6);
        const bread = new THREE.Mesh(breadGeometry, breadMaterial);
        
        const angle = (i / 3) * Math.PI * 2;
        const radius = 0.06;
        
        bread.position.set(
            x + Math.sin(angle) * radius,
            y + 0.08,
            z + Math.cos(angle) * radius
        );
        bread.scale.set(1, 0.7, 1);
        bread.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        scene.add(bread);
    }
    
    // Cloth napkin under bread
    const clothGeometry = new THREE.CircleGeometry(0.2, 16);
    const clothMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.7,
        side: THREE.DoubleSide
    });
    const cloth = new THREE.Mesh(clothGeometry, clothMaterial);
    cloth.position.set(x, y + 0.01, z);
    cloth.rotation.x = -Math.PI / 2;
    scene.add(cloth);
}
function createChair(parent, x, y, z, rotation) {
    // Chair group
    const chairGroup = new THREE.Group();
    chairGroup.position.set(x, y, z);
    chairGroup.rotation.y = rotation;
    
    // Chair seat
    const seatGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.6
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.45, 0);
    chairGroup.add(seat);
    
    // Chair back
    const backGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const backMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    for (let i = -0.15; i <= 0.15; i += 0.1) {
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.set(i, 0.7, -0.18);
        back.rotation.x = Math.PI / 12;
        chairGroup.add(back);
    }
    
    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5C4033 });
    
    // Front legs
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(0.15, 0.225, 0.15);
    chairGroup.add(frontLeftLeg);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(-0.15, 0.225, 0.15);
    chairGroup.add(frontRightLeg);
    
    // Back legs (slightly taller for the inclined back)
    const backLeftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8),
        legMaterial
    );
    backLeftLeg.position.set(0.15, 0.35, -0.15);
    chairGroup.add(backLeftLeg);
    
    const backRightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8),
        legMaterial
    );
    backRightLeg.position.set(-0.15, 0.35, -0.15);
    chairGroup.add(backRightLeg);
    
    // Add chair to parent
    parent.add(chairGroup);
    
    return chairGroup;
}
function createFrenchRestaurantFurniture(scene) {
    // Create dining tables throughout the restaurant
    createDiningTables(scene);
    
    // Create bar
    createRestaurantBar(scene);
    
    // Create host/reception area
    createReceptionArea(scene);
    
    // Create dividers between sections
    createDividers(scene);
}

function createDiningTables(scene) {
    // Table positions - grid layout with main table in center-front
    const tablePositions = [
        // Main table (player's table)
        [0, 0, 3],
        
        // Side tables
        [-3, 0, 1],
        [3, 0, 1],
        [-3, 0, -1],
        [3, 0, -1],
        
        // Back tables
        [-1.5, 0, -3],
        [1.5, 0, -3]
    ];
    
    tablePositions.forEach((pos, index) => {
        const isPlayerTable = index === 0;
        createDiningTable(scene, pos[0], pos[1], pos[2], isPlayerTable);
    });
}

function createDiningTable(scene, x, y, z, isPlayerTable) {
    // Table group
    const tableGroup = new THREE.Group();
    tableGroup.position.set(x, y, z);
    
    // Table dimensions
    const tableRadius = 0.8;
    
    // Table top - round French bistro style
    const tableTopGeometry = new THREE.CylinderGeometry(tableRadius, tableRadius, 0.05, 32);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ 
        color: isPlayerTable ? 0xFFFFFF : 0xFAF0E6, // White tablecloth for player table
        roughness: 0.3
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(0, 0.75, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);
    
    // Table base
    const baseGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.7, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x696969,
        roughness: 0.4
    });
    const tableBase = new THREE.Mesh(baseGeometry, baseMaterial);
    tableBase.position.set(0, 0.35, 0);
    tableBase.castShadow = true;
    tableGroup.add(tableBase);
    
    // Table foot
    const footGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const tableFoot = new THREE.Mesh(footGeometry, baseMaterial);
    tableFoot.position.set(0, 0.025, 0);
    tableFoot.castShadow = true;
    tableGroup.add(tableFoot);
    
    // Add chairs around the table
    const chairCount = 4;
    for (let i = 0; i < chairCount; i++) {
        const angle = (i / chairCount) * Math.PI * 2;
        const chairX = Math.sin(angle) * (tableRadius + 0.3);
        const chairZ = Math.cos(angle) * (tableRadius + 0.3);
        createChair(tableGroup, chairX, 0, chairZ, -angle);
    }
    
    scene.add(tableGroup);
    
    // If this is the player's table, add detailed place settings
    if (isPlayerTable) {
        createTableSettings(scene, x, y + 0.75, z, tableRadius);
    }
}
function createPainting(scene, x, y, z, width, height) {
    // Canvas material - create a different style for each painting
    const style = Math.floor(Math.random() * 3);
    
    let canvasMaterial;
    
    if (style === 0) {
        // Impressionist landscape
        const canvasColor = new THREE.Color(0x87CEFA); // Sky blue base
        canvasMaterial = new THREE.MeshStandardMaterial({ 
            color: canvasColor,
            roughness: 0.8
        });
    } else if (style === 1) {
        // Still life
        const canvasColor = new THREE.Color(0x8B4513); // Brown base
        canvasMaterial = new THREE.MeshStandardMaterial({ 
            color: canvasColor,
            roughness: 0.8
        });
    } else {
        // Abstract
        const canvasColor = new THREE.Color(0xDC143C); // Crimson base
        canvasMaterial = new THREE.MeshStandardMaterial({ 
            color: canvasColor,
            roughness: 0.8
        });
    }
    
    // Canvas
    const canvas = new THREE.Mesh(
        new THREE.PlaneGeometry(width - 0.1, height - 0.1),
        canvasMaterial
    );
    canvas.position.set(x - 0.04 * Math.sign(x), y, z);
    canvas.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(canvas);
    
    // Add simplified painting elements based on style
    if (style === 0) {
        // Impressionist landscape elements
        // Ground
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(width - 0.15, height / 2 - 0.1),
            new THREE.MeshBasicMaterial({ color: 0x228B22 })
        );
        ground.position.set(x - 0.03 * Math.sign(x), y - height / 4, z);
        ground.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
        ground.scale.set(0.95, 0.95, 1);
        scene.add(ground);
        
        // Sun/light source
        const sun = new THREE.Mesh(
            new THREE.CircleGeometry(0.15, 16),
            new THREE.MeshBasicMaterial({ color: 0xFFD700 })
        );
        sun.position.set(x - 0.02 * Math.sign(x), y + height / 4, z + width / 4);
        sun.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(sun);
    } else if (style === 1) {
        // Still life elements
        // Table
        const table = new THREE.Mesh(
            new THREE.PlaneGeometry(width - 0.2, height / 3),
            new THREE.MeshBasicMaterial({ color: 0x8B4513 })
        );
        table.position.set(x - 0.03 * Math.sign(x), y - height / 4, z);
        table.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(table);
        
        // Fruit bowl
        const bowl = new THREE.Mesh(
            new THREE.CircleGeometry(0.2, 16),
            new THREE.MeshBasicMaterial({ color: 0xDDA0DD })
        );
        bowl.position.set(x - 0.02 * Math.sign(x), y, z);
        bowl.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
        bowl.scale.set(1, 0.4, 1);
        scene.add(bowl);
    } else {
        // Abstract elements
        for (let i = 0; i < 5; i++) {
            const shape = Math.random() > 0.5 ? 
                new THREE.CircleGeometry(0.1 + Math.random() * 0.15, 16) :
                new THREE.PlaneGeometry(0.2 + Math.random() * 0.2, 0.2 + Math.random() * 0.2);
            
            const element = new THREE.Mesh(
                shape,
                new THREE.MeshBasicMaterial({ 
                    color: new THREE.Color(Math.random(), Math.random(), Math.random()) 
                })
            );
            
            element.position.set(
                x - 0.02 * Math.sign(x),
                y - height / 3 + Math.random() * (height / 1.5),
                z - width / 3 + Math.random() * (width / 1.5)
            );
            element.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
            scene.add(element);
        }
    }
    
    // Add picture light above painting
    const lightFixture = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, width / 2, 8),
        new THREE.MeshStandardMaterial({ color: 0xD4AF37 })
    );
    lightFixture.position.set(x - 0.1 * Math.sign(x), y + height / 2 + 0.15, z);
    lightFixture.rotation.z = Math.PI / 2;
    lightFixture.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(lightFixture);
    
    // Light source
    const pictureLight = new THREE.PointLight(0xFFFACD, 0.5, 2);
    pictureLight.position.set(x - 0.15 * Math.sign(x), y + height / 2, z);
    scene.add(pictureLight);
}
function createFrenchArtwork(scene, x, y, z) {
    // Artwork frame
    const frameWidth = 1.2;
    const frameHeight = 1.6;
    
    // Gold frame material
    const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37,
        metalness: 0.6,
        roughness: 0.3
    });
    
    // Frame
    const frameThickness = 0.1;
    const frameDepth = 0.05;
    
    // Outer frame
    const outerFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameDepth, frameHeight + frameThickness * 2, frameWidth + frameThickness * 2),
        frameMaterial
    );
    outerFrame.position.set(x, y, z);
    outerFrame.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(outerFrame);
    
    // Inner frame cutout
    const innerFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameDepth + 0.02, frameHeight, frameWidth),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    innerFrame.position.set(x - 0.01 * Math.sign(x), y, z);
    innerFrame.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(innerFrame);
    
    // Canvas/painting
    createPainting(scene, x, y, z, frameWidth, frameHeight);
}
function createStreetView(scene, x, y, z, windowWidth, windowHeight) {
    // Background for street view
    const backgroundMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x87CEEB,
        side: THREE.DoubleSide
    });
    
    const background = new THREE.Mesh(
        new THREE.PlaneGeometry(windowWidth - 0.1, windowHeight - 0.1),
        backgroundMaterial
    );
    background.position.set(x - 0.15 * Math.sign(x), y, z);
    background.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(background);
    
    // Simplified Paris street buildings
    const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xDDDDDD });
    
    for (let i = -2; i <= 2; i++) {
        const buildingHeight = 0.5 + Math.random() * 1.5;
        const buildingWidth = 0.3 + Math.random() * 0.2;
        
        const building = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, buildingHeight, buildingWidth),
            buildingMaterial
        );
        
        building.position.set(
            x - 0.3 * Math.sign(x),
            y - windowHeight / 2 + buildingHeight / 2 + 0.1,
            z + i * 0.4
        );
        building.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
        scene.add(building);
        
        // Building windows
        const windowMaterial = new THREE.MeshBasicMaterial({ color: 0xFAF0E6 });
        
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 2; k++) {
                const buildingWindow = new THREE.Mesh(
                    new THREE.PlaneGeometry(0.05, 0.1),
                    windowMaterial
                );
                
                buildingWindow.position.set(
                    x - 0.35 * Math.sign(x),
                    y - windowHeight / 2 + 0.3 + j * 0.4,
                    z + i * 0.4 - 0.1 + k * 0.2
                );
                buildingWindow.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
                scene.add(buildingWindow);
            }
        }
    }
}
function createWindowCurtains(scene, x, y, z, windowWidth, windowHeight) {
    // Curtain material
    const curtainMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xBB6666,
        roughness: 0.8,
        side: THREE.DoubleSide
    });
    
    // Curtain rod
    const rodMaterial = new THREE.MeshStandardMaterial({ color: 0x4B3621 });
    const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, windowWidth + 0.6, 8),
        rodMaterial
    );
    rod.position.set(x, y + windowHeight / 2 + 0.15, z);
    rod.rotation.x = Math.PI / 2;
    scene.add(rod);
    
    // Rod finials (decorative ends)
    const finialGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    
    const leftFinial = new THREE.Mesh(finialGeometry, rodMaterial);
    leftFinial.position.set(x, y + windowHeight / 2 + 0.15, z - windowWidth / 2 - 0.3);
    scene.add(leftFinial);
    
    const rightFinial = new THREE.Mesh(finialGeometry, rodMaterial);
    rightFinial.position.set(x, y + windowHeight / 2 + 0.15, z + windowWidth / 2 + 0.3);
    scene.add(rightFinial);
    
    // Curtains (left and right panels)
    const curtainWidth = windowWidth / 2 + 0.2;
    const curtainHeight = windowHeight + 0.3;
    
    // Modified curtain geometry for draped look
    const curtainGeometry = new THREE.PlaneGeometry(curtainWidth, curtainHeight, 8, 1);
    
    // Apply wave deformation to curtain vertices
    const curtainVertices = curtainGeometry.getAttribute('position');
    for (let i = 0; i < curtainVertices.count; i++) {
        const x = curtainVertices.getX(i);
        const waveAmount = 0.1 * Math.sin(x * 5);
        curtainVertices.setZ(i, waveAmount);
    }
    curtainGeometry.computeVertexNormals();
    
    // Left curtain
    const leftCurtain = new THREE.Mesh(curtainGeometry, curtainMaterial);
    leftCurtain.position.set(x - 0.05 * Math.sign(x), y - 0.05, z - windowWidth / 2 + curtainWidth / 2 - 0.2);
    leftCurtain.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(leftCurtain);
    
    // Right curtain
    const rightCurtain = new THREE.Mesh(curtainGeometry, curtainMaterial);
    rightCurtain.position.set(x - 0.05 * Math.sign(x), y - 0.05, z + windowWidth / 2 - curtainWidth / 2 + 0.2);
    rightCurtain.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(rightCurtain);
}
function createFrenchWindow(scene, x, y, z) {
    // Window dimensions
    const windowWidth = 1.2;
    const windowHeight = 2.2;
    
    // Window frame
    const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.5
    });
    
    // Window glass
    const glassMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xADD8E6,
        transparent: true,
        opacity: 0.5
    });
    
    // Window frame
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, windowHeight + 0.2, windowWidth + 0.2),
        frameMaterial
    );
    frame.position.set(x, y, z);
    frame.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(frame);
    
    // Window glass
    const glass = new THREE.Mesh(
        new THREE.PlaneGeometry(windowWidth, windowHeight),
        glassMaterial
    );
    glass.position.set(x - 0.06 * Math.sign(x), y, z);
    glass.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(glass);
    
    // Window dividers
    const dividerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    // Horizontal divider
    const horizontalDivider = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, windowWidth),
        dividerMaterial
    );
    horizontalDivider.position.set(x, y, z);
    horizontalDivider.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(horizontalDivider);
    
    // Vertical divider
    const verticalDivider = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, windowHeight, 0.05),
        dividerMaterial
    );
    verticalDivider.position.set(x, y, z);
    verticalDivider.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(verticalDivider);
    
    // Window sill
    const sill = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.05, windowWidth + 0.4),
        frameMaterial
    );
    sill.position.set(x, y - windowHeight / 2 - 0.05, z);
    sill.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(sill);
    
    // Curtains
    createWindowCurtains(scene, x, y, z, windowWidth, windowHeight);
    
    // Street view outside window
    createStreetView(scene, x, y, z, windowWidth, windowHeight);
}
function createEntranceArch(scene, width, height, depth) {
    // Arch frame material
    const archMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xD2B48C,
        roughness: 0.4
    });
    
    // Door opening dimensions
    const doorWidth = 3;
    const doorHeight = 3;
    
    // Arch top curve
    const archCurveSegments = 12;
    const archRadius = doorWidth / 2;
    
    // Create left doorpost
    const leftPost = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, doorHeight, 0.3),
        archMaterial
    );
    leftPost.position.set(-doorWidth / 2 - 0.15, doorHeight / 2, depth / 2);
    scene.add(leftPost);
    
    // Create right doorpost
    const rightPost = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, doorHeight, 0.3),
        archMaterial
    );
    rightPost.position.set(doorWidth / 2 + 0.15, doorHeight / 2, depth / 2);
    scene.add(rightPost);
    
    // Create arch top using curve segments
    for (let i = 0; i < archCurveSegments; i++) {
        const angle = (i / (archCurveSegments - 1)) * Math.PI;
        const x = Math.cos(angle) * archRadius;
        const y = Math.sin(angle) * archRadius + doorHeight;
        
        const archSegment = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            archMaterial
        );
        archSegment.position.set(x, y, depth / 2);
        scene.add(archSegment);
    }
}

function createWindowWall(scene, x, y, z, height, depth, hasWindows) {
    // Basic wall
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFF8DC,
        roughness: 0.3
    });
    
    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(depth, height),
        wallMaterial
    );
    wall.position.set(x, y, z);
    wall.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(wall);
    
    if (hasWindows) {
        // Create windows on left wall
        for (let i = -depth / 3; i <= depth / 3; i += depth / 3) {
            createFrenchWindow(scene, x, height / 2 + 0.3, z + i);
        }
    } else {
        // Create artwork on right wall
        for (let i = -depth / 3; i <= depth / 3; i += depth / 3) {
            createFrenchArtwork(scene, x, height / 2, z + i);
        }
    }
}
function createParquetFloor(scene, width, depth) {
    // Overall floor plane
    const floorBaseGeometry = new THREE.PlaneGeometry(width, depth);
    const floorBaseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.8
    });
    const floorBase = new THREE.Mesh(floorBaseGeometry, floorBaseMaterial);
    floorBase.rotation.x = -Math.PI / 2;
    floorBase.position.y = 0.01;
    floorBase.receiveShadow = true;
    scene.add(floorBase);
    
    // Parquet pattern
    const boardWidth = 0.3;
    const boardLength = 1.2;
    const boardGeometry = new THREE.PlaneGeometry(boardWidth, boardLength);
    const darkBoardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5C3A21,
        roughness: 0.7
    });
    const lightBoardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B5A2B,
        roughness: 0.7
    });
    
    // Create herringbone pattern
    for (let x = -width / 2 + boardWidth / 2; x < width / 2; x += boardWidth) {
        for (let z = -depth / 2 + boardLength / 2; z < depth / 2; z += boardLength) {
            // Alternate direction
            const isOffset = Math.floor(x / boardWidth) % 2 === 0;
            const zOffset = isOffset ? boardLength / 2 : 0;
            
            // Alternate materials
            const isLightBoard = (Math.floor(x / boardWidth) + Math.floor((z + zOffset) / boardLength)) % 2 === 0;
            const boardMaterial = isLightBoard ? lightBoardMaterial : darkBoardMaterial;
            
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            board.rotation.x = -Math.PI / 2;
            
            // Rotate every other row for herringbone pattern
            if (isOffset) {
                board.rotation.z = Math.PI / 2;
                board.position.set(x, 0.015, z + zOffset);
            } else {
                board.rotation.z = 0;
                board.position.set(x, 0.015, z + zOffset);
            }
            
            board.receiveShadow = true;
            scene.add(board);
        }
    }
}

function createCeilingMoldings(scene, width, depth, height) {
    // Crown molding material
    const moldingMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    
    // Perimeter crown molding
    const moldingSize = 0.2;
    
    // Back wall molding
    const backMolding = new THREE.Mesh(
        new THREE.BoxGeometry(width, moldingSize, moldingSize),
        moldingMaterial
    );
    backMolding.position.set(0, height - moldingSize / 2, -depth / 2 + moldingSize / 2);
    scene.add(backMolding);
    
    // Front wall molding (left)
    const frontMoldingLeft = new THREE.Mesh(
        new THREE.BoxGeometry((width / 2) - 1.5, moldingSize, moldingSize),
        moldingMaterial
    );
    frontMoldingLeft.position.set(-width / 4 - 0.5, height - moldingSize / 2, depth / 2 - moldingSize / 2);
    scene.add(frontMoldingLeft);
    
    // Front wall molding (right)
    const frontMoldingRight = new THREE.Mesh(
        new THREE.BoxGeometry((width / 2) - 1.5, moldingSize, moldingSize),
        moldingMaterial
    );
    frontMoldingRight.position.set(width / 4 + 0.5, height - moldingSize / 2, depth / 2 - moldingSize / 2);
    scene.add(frontMoldingRight);
    
    // Left wall molding
    const leftMolding = new THREE.Mesh(
        new THREE.BoxGeometry(moldingSize, moldingSize, depth),
        moldingMaterial
    );
    leftMolding.position.set(-width / 2 + moldingSize / 2, height - moldingSize / 2, 0);
    scene.add(leftMolding);
    
    // Right wall molding
    const rightMolding = new THREE.Mesh(
        new THREE.BoxGeometry(moldingSize, moldingSize, depth),
        moldingMaterial
    );
    rightMolding.position.set(width / 2 - moldingSize / 2, height - moldingSize / 2, 0);
    scene.add(rightMolding);
    
    // Ceiling medallion for chandelier
    const medallionGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const medallion = new THREE.Mesh(medallionGeometry, moldingMaterial);
    medallion.position.set(0, height - 0.05, 0);
    scene.add(medallion);
    
    // Inner medallion ring
    const innerRingGeometry = new THREE.RingGeometry(0.6, 0.8, 32);
    const innerRing = new THREE.Mesh(innerRingGeometry, moldingMaterial);
    innerRing.position.set(0, height - 0.01, 0);
    innerRing.rotation.x = -Math.PI / 2;
    scene.add(innerRing);
}
// Helper for creating textures
function createTexture(color, roughness, metalness) {
    return {
        color: color,
        roughness: roughness || 0.5,
        metalness: metalness || 0.1
    };
}

// Create France restaurant environment
function createFranceEnvironment(scene) {
    // Create restaurant room
    createFrenchRestaurantRoom(scene);
    
    // Add furniture and details
    createFrenchRestaurantFurniture(scene);
    
    // Add dining items
    createFrenchDiningItems(scene);
    
    // Add decorations
    createFrenchRestaurantDecorations(scene);
    
    // Add ambient audio if needed
    // createAmbientAudio(scene, 'france_restaurant');
    
    return {
        animate: (time) => {
            // Animate candle flames
            scene.children.forEach(child => {
                if (child.name === 'candleFlame') {
                    child.scale.y = 1.5 + Math.sin(time * 0.002) * 0.1;
                    child.position.y += Math.sin(time * 0.002) * 0.0003;
                }
                
                // Animate candle lights
                if (child instanceof THREE.PointLight && child.name === 'candleLight') {
                    child.intensity = 0.3 + Math.sin(time * 0.002) * 0.05;
                }
            });
        }
    };
}

function createFrenchRestaurantRoom(scene) {
    // Room dimensions
    const width = 14;
    const height = 4;
    const depth = 12;
    
    // Floor - parquet style
    createParquetFloor(scene, width, depth);
    
    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xEEEEEE,
        roughness: 0.5
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = height;
    scene.add(ceiling);
    
    // Ceiling moldings
    createCeilingMoldings(scene, width, depth, height);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFF8DC, // Cream color
        roughness: 0.3
    });
    
    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        wallMaterial
    );
    backWall.position.set(0, height / 2, -depth / 2);
    scene.add(backWall);
    
    // Front wall with entrance
    const frontWallLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(width / 2 - 1.5, height),
        wallMaterial
    );
    frontWallLeft.position.set(-width / 4 - 0.5, height / 2, depth / 2);
    frontWallLeft.rotation.y = Math.PI;
    scene.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
        new THREE.PlaneGeometry(width / 2 - 1.5, height),
        wallMaterial
    );
    frontWallRight.position.set(width / 4 + 0.5, height / 2, depth / 2);
    frontWallRight.rotation.y = Math.PI;
    scene.add(frontWallRight);
    
    // Entrance arch
    createEntranceArch(scene, width, height, depth);
    
    // Left wall with windows
    createWindowWall(scene, -width / 2, height / 2, 0, height, depth, true);
    
    // Right wall with artwork
    createWindowWall(scene, width / 2, height / 2, 0, height, depth, false);
}
function createTraditionalItems(scene) {
    // Small tokonoma (alcove) with traditional items
    createTokonoma(scene, -4.9, 0, -3);
}

function createTokonoma(scene, x, y, z) {
    // Alcove
    const alcoveGeometry = new THREE.BoxGeometry(0.5, 1.5, 2);
    const alcoveMaterial = new THREE.MeshStandardMaterial({ color: 0xF0E68C });
    const alcove = new THREE.Mesh(alcoveGeometry, alcoveMaterial);
    alcove.position.set(x + 0.25, y + 0.75, z);
    scene.add(alcove);
    
    // Alcove interior
    const interiorGeometry = new THREE.BoxGeometry(0.4, 1.4, 1.9);
    const interiorMaterial = new THREE.MeshStandardMaterial({ color: 0xFFF8DC });
    const interior = new THREE.Mesh(interiorGeometry, interiorMaterial);
    interior.position.set(x + 0.2, y + 0.75, z);
    scene.add(interior);
    
    // Shelf
    const shelfGeometry = new THREE.BoxGeometry(0.4, 0.05, 1.9);
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.set(x + 0.2, y + 0.3, z);
    scene.add(shelf);
    
    // Traditional items on shelf
    
    // Ikebana (flower arrangement)
    const vaseGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.2, 16);
    const vaseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x708090,
        roughness: 0.2
    });
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vase.position.set(x + 0.2, y + 0.4, z - 0.5);
    scene.add(vase);
    
    // Simplified ikebana stems
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    
    for (let i = 0; i < 3; i++) {
        const height = 0.3 + Math.random() * 0.3;
        const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, height, 8);
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        
        const angle = (i / 3) * Math.PI * 2;
        const radius = 0.03;
        stem.position.set(
            x + 0.2 + Math.cos(angle) * radius,
            y + 0.4 + height / 2,
            z - 0.5 + Math.sin(angle) * radius
        );
        
        // Random slight tilt
        stem.rotation.x = (Math.random() - 0.5) * 0.2;
        stem.rotation.z = (Math.random() - 0.5) * 0.2;
        
        scene.add(stem);
    }
    
    // Scroll or calligraphy
    const scrollGeometry = new THREE.PlaneGeometry(0.3, 0.5);
    const scrollMaterial = new THREE.MeshStandardMaterial({ color: 0xF8F8FF });
    const scroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    scroll.position.set(x + 0.05, y + 1.2, z);
    scroll.rotation.y = Math.PI / 2;
    scene.add(scroll);
    
    // Calligraphy on scroll
    const calligraphyGeometry = new THREE.PlaneGeometry(0.2, 0.4);
    const calligraphyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const calligraphy = new THREE.Mesh(calligraphyGeometry, calligraphyMaterial);
    calligraphy.position.set(x + 0.04, y + 1.2, z);
    calligraphy.rotation.y = Math.PI / 2;
    calligraphy.scale.set(0.5, 0.5, 1);
    scene.add(calligraphy);
    
    // Small stone or figurine
    const stoneGeometry = new THREE.DodecahedronGeometry(0.1, 0);
    const stoneMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x808080,
        roughness: 0.7
    });
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.set(x + 0.2, y + 0.4, z + 0.5);
    stone.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    stone.scale.set(0.8, 0.5, 0.7);
    scene.add(stone);
}
function createJapaneseOfficeDecorations(scene) {
    // Japanese wall art
    createJapaneseWallArt(scene, 4.95, 1.7, -3);
    
    // Wall clock
    createWallClock(scene, 4.95, 2.5, 3);
    
    // Office plants
    createPlant(scene, -3, 0, 4);
    
    // Japanese traditional items
    createTraditionalItems(scene);
}

function createJapaneseWallArt(scene, x, y, z) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.05, 1, 1.5);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x4B3621 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    scene.add(frame);
    
    // Art canvas
    const artGeometry = new THREE.PlaneGeometry(1.4, 0.9);
    const artMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xEEDFCC,
        roughness: 0.7
    });
    const art = new THREE.Mesh(artGeometry, artMaterial);
    art.position.set(x - 0.03, y, z);
    art.rotation.y = Math.PI / 2;
    scene.add(art);
    
    // Simple art design (e.g., ink painting style)
    const designGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const designMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const design = new THREE.Mesh(designGeometry, designMaterial);
    design.position.set(x - 0.04, y, z);
    design.rotation.y = Math.PI / 2;
    design.scale.set(0.3, 0.3, 1);
    scene.add(design);
}

function createWallClock(scene, x, y, z) {
    // Clock face
    const faceGeometry = new THREE.CircleGeometry(0.3, 32);
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.position.set(x - 0.01, y, z);
    face.rotation.y = Math.PI / 2;
    scene.add(face);
    
    // Clock rim
    const rimGeometry = new THREE.RingGeometry(0.3, 0.32, 32);
    const rimMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.position.set(x - 0.005, y, z);
    rim.rotation.y = Math.PI / 2;
    scene.add(rim);
    
    // Clock hands
    const hourHandGeometry = new THREE.PlaneGeometry(0.15, 0.02);
    const hourHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
    hourHand.position.set(x - 0.02, y, z);
    hourHand.rotation.set(0, Math.PI / 2, Math.PI / 3);
    scene.add(hourHand);
    
    const minuteHandGeometry = new THREE.PlaneGeometry(0.25, 0.01);
    const minuteHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
    minuteHand.position.set(x - 0.02, y, z);
    minuteHand.rotation.set(0, Math.PI / 2, Math.PI / 6);
    scene.add(minuteHand);
    
    // Clock center dot
    const dotGeometry = new THREE.CircleGeometry(0.01, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(x - 0.004, y, z);
    dot.rotation.y = Math.PI / 2;
    scene.add(dot);
    
    // Clock hour markers
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const markerGeometry = new THREE.PlaneGeometry(0.05, 0.02);
        const marker = new THREE.Mesh(markerGeometry, dotMaterial);
        
        const radius = 0.25;
        marker.position.set(
            x - 0.003, 
            y + Math.sin(angle) * radius, 
            z + Math.cos(angle) * radius
        );
        marker.rotation.set(0, Math.PI / 2, -angle + Math.PI / 2);
        scene.add(marker);
    }
}
function createWhiteboardContent(scene, x, y, z) {
    // Create a simple diagram on the whiteboard
    
    // Title
    const titleGeometry = new THREE.PlaneGeometry(1.2, 0.2);
    const titleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const title = new THREE.Mesh(titleGeometry, titleMaterial);
    title.position.set(x + 0.001, y + 0.6, z);
    title.rotation.y = Math.PI / 2;
    title.scale.set(0.5, 0.1, 1);
    scene.add(title);
    
    // Diagram lines
    const lineGeometry = new THREE.PlaneGeometry(1, 0.02);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
    
    for (let i = 0; i < 3; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(x + 0.001, y + 0.2 - i * 0.3, z);
        line.rotation.y = Math.PI / 2;
        line.scale.set(0.8, 1, 1);
        scene.add(line);
    }
    
    // Diagram circles
    const circleGeometry = new THREE.CircleGeometry(0.1, 16);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    
    for (let i = 0; i < 2; i++) {
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        circle.position.set(x + 0.001, y - 0.3, z - 0.5 + i);
        circle.rotation.y = Math.PI / 2;
        circle.scale.set(0.5, 0.5, 1);
        scene.add(circle);
    }
}
function createDigitalClock(scene, x, y, z) {
    // Clock base
    const baseGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.1);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.025, z);
    base.name = 'digitalClock';
    scene.add(base);
    
    // Display
    const displayGeometry = new THREE.PlaneGeometry(0.18, 0.04);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00FF00,
        emissive: 0x00FF00,
        emissiveIntensity: 0.5
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(x, y + 0.05, z + 0.051);
    display.name = 'clockDisplay';
    scene.add(display);
    
    // Set the time on the clock
    updateDigitalClock(scene);
}

function updateDigitalClock(scene) {
    const display = scene.getObjectByName('clockDisplay');
    if (display) {
        // Create time texture
        const canvas = document.createElement('canvas');
        canvas.width = 180;
        canvas.height = 40;
        const context = canvas.getContext('2d');
        
        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Green text
        context.fillStyle = '#00FF00';
        context.font = '30px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Get current time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        context.fillText(`${hours}:${minutes}:${seconds}`, canvas.width / 2, canvas.height / 2);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        display.material.map = texture;
        display.material.needsUpdate = true;
    }
}

function createWhiteboard(scene, x, y, z) {
    // Board frame
    const frameGeometry = new THREE.BoxGeometry(0.05, 1.5, 2.5);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    scene.add(frame);
    
    // Whiteboard surface
    const boardGeometry = new THREE.PlaneGeometry(2.4, 1.4);
    const boardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.1
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(x + 0.03, y, z);
    board.rotation.y = Math.PI / 2;
    scene.add(board);
    
    // Marker tray
    const trayGeometry = new THREE.BoxGeometry(0.05, 0.05, 1);
    const trayMaterial = new THREE.MeshStandardMaterial({ color: 0xA9A9A9 });
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.set(x + 0.025, y - 0.75, z);
    scene.add(tray);
    
    // Add markers
    const markerColors = [0xFF0000, 0x0000FF, 0x000000, 0x008000];
    
    markerColors.forEach((color, index) => {
        const markerGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.12, 8);
        const markerMaterial = new THREE.MeshStandardMaterial({ color: color });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x + 0.025, y - 0.72, z - 0.4 + index * 0.25);
        marker.rotation.x = Math.PI / 2;
        scene.add(marker);
    });
    
    // Add some writing/diagrams to the whiteboard
    createWhiteboardContent(scene, x + 0.03, y, z);
}
function createJapaneseBusinessItems(scene) {
    // Business card holder in the center of the table
    createBusinessCardHolder(scene, 0, 0.76, 0);
    
    // Tea set
    createTeaSet(scene, 2, 0.76, 0);
    
    // Documents
    createDocuments(scene, -2, 0.76, 0);
    
    // Digital clock
    createDigitalClock(scene, 0, 0.76, -1.5);
    
    // Whiteboard on left wall
    createWhiteboard(scene, -4.95, 1.8, 0);
}

function createBusinessCardHolder(scene, x, y, z) {
    // Holder base
    const holderGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.1);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000,
        roughness: 0.2
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y, z);
    scene.add(holder);
    
    // Business cards
    const cardGeometry = new THREE.BoxGeometry(0.09, 0.005, 0.06);
    const cardMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.1
    });
    
    for (let i = 0; i < 5; i++) {
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.position.set(x, y + 0.01 + i * 0.002, z);
        scene.add(card);
    }
}

function createTeaSet(scene, x, y, z) {
    // Tray
    const trayGeometry = new THREE.BoxGeometry(0.8, 0.02, 0.4);
    const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.set(x, y, z);
    scene.add(tray);
    
    // Teapot
    const potGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x555555,
        roughness: 0.3
    });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x - 0.25, y + 0.1, z);
    pot.scale.set(1, 0.7, 1);
    scene.add(pot);
    
    // Pot handle
    const handleGeometry = new THREE.TorusGeometry(0.08, 0.01, 8, 16, Math.PI / 2);
    const handle = new THREE.Mesh(handleGeometry, potMaterial);
    handle.position.set(x - 0.15, y + 0.1, z);
    handle.rotation.y = Math.PI / 2;
    scene.add(handle);
    
    // Pot spout
    const spoutGeometry = new THREE.CylinderGeometry(0.01, 0.02, 0.12, 8);
    const spout = new THREE.Mesh(spoutGeometry, potMaterial);
    spout.position.set(x - 0.35, y + 0.1, z);
    spout.rotation.z = Math.PI / 4;
    scene.add(spout);
    
    // Teacups
    const cupGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.04, 16);
    const cupMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5F5,
        roughness: 0.1
    });
    
    const cupPositions = [
        [x + 0.1, y + 0.02, z - 0.1],
        [x + 0.1, y + 0.02, z + 0.1],
        [x + 0.3, y + 0.02, z - 0.1],
        [x + 0.3, y + 0.02, z + 0.1]
    ];
    
    cupPositions.forEach(pos => {
        const cup = new THREE.Mesh(cupGeometry, cupMaterial);
        cup.position.set(...pos);
        scene.add(cup);
        
        // Tea in cup
        const teaGeometry = new THREE.CylinderGeometry(0.028, 0.028, 0.01, 16);
        const teaMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd4a76a,
            transparent: true,
            opacity: 0.8
        });
        const tea = new THREE.Mesh(teaGeometry, teaMaterial);
        tea.position.set(pos[0], pos[1] + 0.015, pos[2]);
        scene.add(tea);
    });
}

function createDocuments(scene, x, y, z) {
    // Document folder
    const folderGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.3);
    const folderMaterial = new THREE.MeshStandardMaterial({ color: 0x2E4372 });
    const folder = new THREE.Mesh(folderGeometry, folderMaterial);
    folder.position.set(x, y, z);
    scene.add(folder);
    
    // Papers
    const paperGeometry = new THREE.BoxGeometry(0.38, 0.01, 0.28);
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const papers = new THREE.Mesh(paperGeometry, paperMaterial);
    papers.position.set(x, y + 0.015, z);
    scene.add(papers);
    
    // Pen
    const penGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
    const penMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.position.set(x + 0.15, y + 0.02, z - 0.1);
    pen.rotation.z = Math.PI / 12;
    scene.add(pen);
}// Global Business Quest - Countries Data
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
    // Create office room
    createJapaneseOfficeRoom(scene);
    
    // Add furniture and details
    createJapaneseOfficeFurniture(scene);
    
    // Add business items
    createJapaneseBusinessItems(scene);
    
    // Add decorations
    createJapaneseOfficeDecorations(scene);
    
    // Add ambient audio if needed
    // createAmbientAudio(scene, 'japan_office');
    
    return {
        animate: (time) => {
            // Animate computer screens slightly
            scene.children.forEach(child => {
                if (child.name === 'computerScreen') {
                    child.material.emissiveIntensity = 0.5 + Math.sin(time * 0.001) * 0.1;
                }
            });
            
            // Animate digital clock display
            if (scene.getObjectByName('digitalClock')) {
                // Update every second
                if (Math.floor(time / 1000) !== Math.floor((time - 16) / 1000)) {
                    updateDigitalClock(scene);
                }
            }
        }
    };
}

function createJapaneseOfficeRoom(scene) {
    // Room dimensions
    const width = 12;
    const height = 3.5;
    const depth = 10;
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const floorTexture = createTexture(0xEEEEEE, 0.2, 0.3);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xEEEEEE,
        roughness: 0.1,
        metalness: 0.1,
        ...floorTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = height;
    scene.add(ceiling);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xF5F5F5 });
    
    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        wallMaterial
    );
    backWall.position.set(0, height / 2, -depth / 2);
    scene.add(backWall);
    
    // Front wall with entrance
    const frontWallLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(width / 2 - 1, height),
        wallMaterial
    );
    frontWallLeft.position.set(-width / 4 - 0.5, height / 2, depth / 2);
    frontWallLeft.rotation.y = Math.PI;
    scene.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
        new THREE.PlaneGeometry(width / 2 - 1, height),
        wallMaterial
    );
    frontWallRight.position.set(width / 4 + 0.5, height / 2, depth / 2);
    frontWallRight.rotation.y = Math.PI;
    scene.add(frontWallRight);
    
    // Door frame
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    const doorFrame = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 2.8, 0.2),
        doorFrameMaterial
    );
    doorFrame.position.set(0, 1.4, depth / 2);
    scene.add(doorFrame);
    
    // Left wall
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(depth, height),
        wallMaterial
    );
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);
    
    // Right wall (with windows)
    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(depth, height),
        wallMaterial
    );
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);
    
    // Windows on right wall
    createJapaneseOfficeWindows(scene, width, height, depth);
    
    // Ceiling lights
    createJapaneseOfficeLights(scene, width, height, depth);
}

function createJapaneseOfficeWindows(scene, width, height, depth) {
    // Window frames
    const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    
    // Window glass
    const windowGlassMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xADD8E6,
        transparent: true,
        opacity: 0.5
    });
    
    // Create windows on right wall
    for (let i = -1; i <= 1; i++) {
        const windowFrame = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 1.8, 1.4),
            windowFrameMaterial
        );
        windowFrame.position.set(width / 2, 1.8, i * 3);
        scene.add(windowFrame);
        
        const windowGlass = new THREE.Mesh(
            new THREE.PlaneGeometry(1.2, 1.6),
            windowGlassMaterial
        );
        windowGlass.position.set(width / 2 - 0.06, 1.8, i * 3);
        windowGlass.rotation.y = -Math.PI / 2;
        scene.add(windowGlass);
        
        // Window dividers
        const horizontalDivider = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.05, 1.2),
            windowFrameMaterial
        );
        horizontalDivider.position.set(width / 2 - 0.03, 1.8, i * 3);
        scene.add(horizontalDivider);
        
        const verticalDivider = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 1.6, 0.05),
            windowFrameMaterial
        );
        verticalDivider.position.set(width / 2 - 0.03, 1.8, i * 3);
        scene.add(verticalDivider);
        
        // City skyline behind windows
        const skylineGeometry = new THREE.PlaneGeometry(3, 1.6);
        const skylineMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xCCCCFF,
            transparent: true,
            opacity: 0.5
        });
        const skyline = new THREE.Mesh(skylineGeometry, skylineMaterial);
        skyline.position.set(width / 2 + 0.5, 1.8, i * 3);
        skyline.rotation.y = -Math.PI / 2;
        scene.add(skyline);
        
        // Simplified buildings in the distance
        for (let j = 0; j < 5; j++) {
            const buildingHeight = 0.4 + Math.random() * 0.8;
            const buildingWidth = 0.1 + Math.random() * 0.2;
            const buildingGeometry = new THREE.BoxGeometry(0.1, buildingHeight, buildingWidth);
            const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0x6E7B8B });
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.set(
                width / 2 + 1,
                1.8 - 0.8 + buildingHeight / 2,
                i * 3 - 0.5 + j * 0.25
            );
            scene.add(building);
        }
    }
}

function createJapaneseOfficeLights(scene, width, height, depth) {
    // Ceiling lights
    for (let z = -3; z <= 3; z += 3) {
        // Light fixture
        const fixtureGeometry = new THREE.BoxGeometry(3, 0.1, 0.6);
        const fixtureMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
        fixture.position.set(0, height - 0.05, z);
        scene.add(fixture);
        
        // Add actual light source
        const light = new THREE.PointLight(0xFFFFFF, 0.8, 8);
        light.position.set(0, height - 0.2, z);
        scene.add(light);
    }
}

function createJapaneseOfficeFurniture(scene) {
    // Conference table
    createConferenceTable(scene);
    
    // Chairs
    createOfficeChairs(scene);
    
    // Credenza against back wall
    createCredenza(scene);
    
    // Filing cabinet
    createFilingCabinet(scene);
    
    // Add computers on the conference table
    createComputers(scene);
}

function createConferenceTable(scene) {
    // Table dimensions
    const width = 4;
    const height = 0.1;
    const depth = 2;
    
    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(width, height, depth);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5C3A21,
        roughness: 0.3,
        metalness: 0.1
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(0, 0.75, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    scene.add(tableTop);
    
    // Table legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.75, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3A2213
    });
    
    const legPositions = [
        [-width / 2 + 0.1, 0.375, -depth / 2 + 0.1],
        [width / 2 - 0.1, 0.375, -depth / 2 + 0.1],
        [-width / 2 + 0.1, 0.375, depth / 2 - 0.1],
        [width / 2 - 0.1, 0.375, depth / 2 - 0.1]
    ];
    
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        scene.add(leg);
    });
    
    // Add cable hole in the middle of the table
    const holeGeometry = new THREE.CircleGeometry(0.1, 16);
    const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.position.set(0, 0.76, 0);
    hole.rotation.x = -Math.PI / 2;
    scene.add(hole);
    
    // Table mat/pad
    const matGeometry = new THREE.PlaneGeometry(1, 0.6);
    const matMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    
    // Add place setting mats for each seat
    const matPositions = [
        [0, 0.76, 1],      // Your position
        [-1.5, 0.76, -0.5], // Left Japanese executive
        [0, 0.76, -1],      // Middle Japanese executive
        [1.5, 0.76, -0.5]   // Right Japanese executive
    ];
    
    matPositions.forEach(pos => {
        const mat = new THREE.Mesh(matGeometry, matMaterial);
        mat.position.set(...pos);
        mat.rotation.x = -Math.PI / 2;
        scene.add(mat);
    });
}

function createOfficeChairs(scene) {
    // Chair positions
    const chairPositions = [
        [0, 0, 1.5, 0],          // Your chair (facing toward the Japanese side)
        [-1.5, 0, -1, Math.PI],  // Chair opposite left
        [0, 0, -1.5, Math.PI],   // Chair opposite center
        [1.5, 0, -1, Math.PI]    // Chair opposite right
    ];
    
    chairPositions.forEach(pos => {
        createOfficeChair(scene, pos[0], pos[1], pos[2], pos[3]);
    });
}

function createOfficeChair(scene, x, y, z, rotation) {
    // Create office chair group
    const chairGroup = new THREE.Group();
    chairGroup.position.set(x, y, z);
    chairGroup.rotation.y = rotation;
    
    // Chair base (5-star base)
    const baseRadius = 0.3;
    const baseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 5);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.025, 0);
    chairGroup.add(base);
    
    // Chair legs
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const legGeometry = new THREE.BoxGeometry(0.05, 0.02, baseRadius);
        const leg = new THREE.Mesh(legGeometry, baseMaterial);
        leg.position.set(
            Math.sin(angle) * baseRadius / 2,
            0.01,
            Math.cos(angle) * baseRadius / 2
        );
        leg.rotation.y = angle;
        chairGroup.add(leg);
        
        // Wheel
        const wheelGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const wheel = new THREE.Mesh(wheelGeometry, baseMaterial);
        wheel.position.set(
            Math.sin(angle) * baseRadius,
            0.03,
            Math.cos(angle) * baseRadius
        );
        chairGroup.add(wheel);
    }
    
    // Chair cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 16);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 0.2, 0);
    chairGroup.add(cylinder);
    
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.425, 0);
    chairGroup.add(seat);
    
    // Chair backrest
    const backrestGeometry = new THREE.BoxGeometry(0.48, 0.5, 0.05);
    const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
    backrest.position.set(0, 0.7, -0.25);
    chairGroup.add(backrest);
    
    // Chair armrests
    const armrestGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.25);
    const armrestMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const leftArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
    leftArmrest.position.set(0.25, 0.53, -0.1);
    chairGroup.add(leftArmrest);
    
    const rightArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
    rightArmrest.position.set(-0.25, 0.53, -0.1);
    chairGroup.add(rightArmrest);
    
    scene.add(chairGroup);
}

function createCredenza(scene) {
    // Credenza dimensions
    const width = 3;
    const height = 0.9;
    const depth = 0.6;
    
    // Credenza body
    const credenzaGeometry = new THREE.BoxGeometry(width, height, depth);
    const credenzaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5C3A21,
        roughness: 0.3
    });
    const credenza = new THREE.Mesh(credenzaGeometry, credenzaMaterial);
    credenza.position.set(0, height / 2, -4.7);
    credenza.castShadow = true;
    scene.add(credenza);
    
    // Drawers
    const drawerMaterial = new THREE.MeshStandardMaterial({ color: 0x4A2E1A });
    
    for (let i = -1; i <= 1; i += 0.5) {
        const drawer = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.25, 0.05),
            drawerMaterial
        );
        drawer.position.set(i, height / 2, -4.4);
        scene.add(drawer);
        
        // Drawer handle
        const handle = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.02, 0.04),
            new THREE.MeshStandardMaterial({ color: 0xC0C0C0 })
        );
        handle.position.set(i, height / 2, -4.37);
        scene.add(handle);
    }
    
    // Add items on top of the credenza
    
    // Plant
    createPlant(scene, -1, height, -4.4);
    
    // Document tray
    const trayGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.3);
    const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.set(0, height + 0.05, -4.5);
    scene.add(tray);
    
    // Documents in tray
    const docGeometry = new THREE.BoxGeometry(0.35, 0.02, 0.25);
    const docMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const docs = new THREE.Mesh(docGeometry, docMaterial);
    docs.position.set(0, height + 0.11, -4.5);
    scene.add(docs);
    
    // Traditional Japanese item (e.g., small bonsai)
    createBonsai(scene, 1, height, -4.5);
}

function createFilingCabinet(scene) {
    // Cabinet dimensions
    const width = 0.8;
    const height = 1.5;
    const depth = 0.6;
    
    // Cabinet body
    const cabinetGeometry = new THREE.BoxGeometry(width, height, depth);
    const cabinetMaterial = new THREE.MeshStandardMaterial({ color: 0x7B7B7B });
    const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
    cabinet.position.set(-4.5, height / 2, 2.5);
    cabinet.castShadow = true;
    scene.add(cabinet);
    
    // Cabinet drawers
    const drawerMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    
    for (let i = 0; i < 4; i++) {
        const drawer = new THREE.Mesh(
            new THREE.BoxGeometry(width - 0.05, 0.35, 0.05),
            drawerMaterial
        );
        drawer.position.set(-4.5, 0.2 + i * 0.37, 2.8);
        scene.add(drawer);
        
        // Drawer handle
        const handle = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.03, 0.03),
            new THREE.MeshStandardMaterial({ color: 0xC0C0C0 })
        );
        handle.position.set(-4.5, 0.2 + i * 0.37, 2.83);
        scene.add(handle);
        
        // Drawer label
        const labelGeometry = new THREE.PlaneGeometry(0.3, 0.1);
        const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(-4.5, 0.2 + i * 0.37, 2.83);
        scene.add(label);
    }
}

function createComputers(scene) {
    // Computer positions
    const computerPositions = [
        [-1.5, 0.75, -0.5], // Left
        [0, 0.75, -1],      // Middle
        [1.5, 0.75, -0.5]   // Right
    ];
    
    computerPositions.forEach(pos => {
        createLaptop(scene, pos[0], pos[1], pos[2]);
    });
    
    // Add a projector screen on the back wall
    createProjectorScreen(scene);
}

function createLaptop(scene, x, y, z) {
    // Laptop base
    const baseGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.3);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y + 0.01, z);
    scene.add(base);
    
    // Laptop screen
    const screenBaseGeometry = new THREE.BoxGeometry(0.4, 0.25, 0.01);
    const screenBase = new THREE.Mesh(screenBaseGeometry, baseMaterial);
    screenBase.position.set(x, y + 0.14, z - 0.15);
    screenBase.rotation.x = Math.PI / 6;
    scene.add(screenBase);
    
    // Screen display
    const screenGeometry = new THREE.PlaneGeometry(0.38, 0.22);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x333333,
        emissive: 0x333333,
        emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(x, y + 0.14, z - 0.15 + 0.005);
    screen.rotation.x = Math.PI / 6;
    screen.name = 'computerScreen';
    scene.add(screen);
}

function createProjectorScreen(scene) {
    // Screen frame
    const frameGeometry = new THREE.BoxGeometry(3, 2, 0.05);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 2, -4.95);
    scene.add(frame);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(2.9, 1.9);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0xF5F5F5 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 2, -4.92);
    scene.add(screen);
    
    // Projector
    const projectorGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.4);
    const projectorMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const projector = new THREE.Mesh(projectorGeometry, projectorMaterial);
    projector.position.set(0, 2.8, 0);
    scene.add(projector);
    
    // Projector lens
    const lensGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 16);
    const lensMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x87CEFA,
        transparent: true,
        opacity: 0.8
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 2.8, 0.2);
    scene.add(lens);
}
