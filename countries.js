// Global Business Quest - Countries Data
// This module contains the country data and scenarios

import * as THREE from 'three';

function createSimpleCandle(scene, x, y, z) {
    // Candle holder
    const holderGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.03, 16);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        metalness: 0.7
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y + 0.015, z);
    scene.add(holder);
    
    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFF0 });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x, y + 0.09, z);
    scene.add(candle);
    
    // Flame
    const flameGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x, y + 0.17, z);
    flame.name = 'candleFlame';
    scene.add(flame);
    
    // Light
    const candleLight = new THREE.PointLight(0xFFD700, 0.3, 2);
    candleLight.position.set(x, y + 0.17, z);
    scene.add(candleLight);
}

function createSimpleWineBottle(scene, x, y, z) {
    // Bottle
    const bottleGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 16);
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x006400,
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
    const capMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(x, y + 0.36, z);
    scene.add(cap);
}

function createSimpleWallDecoration(scene) {
    // Art frame on wall
    const frameGeometry = new THREE.BoxGeometry(0.05, 1, 1.5);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xD4AF37 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 2, -5.95);
    scene.add(frame);
    
    // Canvas
    const canvasGeometry = new THREE.PlaneGeometry(1.4, 0.9);
    const canvasMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEFA });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.set(0, 2, -5.92);
    scene.add(canvas);
    
    // French flag on the wall
    // Blue part
    const blueGeometry = new THREE.PlaneGeometry(0.3, 0.5);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0055A4 });
    const blue = new THREE.Mesh(blueGeometry, blueMaterial);
    blue.position.set(-5.95, 2, 0);
    blue.rotation.y = Math.PI / 2;
    scene.add(blue);
    
    // White part
    const whiteGeometry = new THREE.PlaneGeometry(0.3, 0.5);
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const white = new THREE.Mesh(whiteGeometry, whiteMaterial);
    white.position.set(-5.95, 2, -0.3);
    white.rotation.y = Math.PI / 2;
    scene.add(white);
    
    // Red part
    const redGeometry = new THREE.PlaneGeometry(0.3, 0.5);
    const redMaterial = new THREE.MeshBasicMaterial({ color: 0xEF4135 });
    const red = new THREE.Mesh(redGeometry, redMaterial);
    red.position.set(-5.95, 2, -0.6);
    red.rotation.y = Math.PI / 2;
    scene.add(red);
}

function createSimpleBar(scene) {
    // Bar counter
    const counterGeometry = new THREE.BoxGeometry(4, 1.1, 0.8);
    const counterMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(-4, 0.55, -4);
    scene.add(counter);
    
    // Bar counter top
    const topGeometry = new THREE.BoxGeometry(4.2, 0.05, 1);
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0x2F4F4F });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(-4, 1.1, -4);
    scene.add(top);
    
    // Bar back wall/shelves
    const backWallGeometry = new THREE.BoxGeometry(4, 2, 0.2);
    const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(-4, 1, -4.5);
    scene.add(backWall);
    
    // Add some bottle shapes on the shelves
    for (let i = 0; i < 5; i++) {
        const bottleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 16);
        const bottleMaterial = new THREE.MeshStandardMaterial({ 
            color: Math.random() * 0xFFFFFF,
            transparent: true,
            opacity: 0.7
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.set(-4 - 1 + i * 0.5, 1.6, -4.4);
        scene.add(bottle);
    }
    
    // Bar stools
    for (let i = -1; i <= 1; i++) {
        const stoolBaseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
        const stoolMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
        const stoolBase = new THREE.Mesh(stoolBaseGeometry, stoolMaterial);
        stoolBase.position.set(-4 + i * 1.2, 0.8, -3);
        scene.add(stoolBase);
        
        const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(-4 + i * 1.2, 0.4, -3);
        scene.add(leg);
    }
}

// Export the necessary functions
export {
    countries,
    createCountryEnvironment
};

function createFrenchTable(scene, x, y, z, isMainTable) {
    // Table
    const tableGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
        color: isMainTable ? 0xFFFFFF : 0xFAF0E6,
        roughness: 0.3
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(x, 0.75, z);
    scene.add(table);
    
    // Table base
    const baseGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.7, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, 0.35, z);
    scene.add(base);
    
    // Add chairs
    const chairCount = 4;
    for (let i = 0; i < chairCount; i++) {
        const angle = (i / chairCount) * Math.PI * 2;
        const chairX = x + Math.sin(angle) * 1.1;
        const chairZ = z + Math.cos(angle) * 1.1;
        createSimpleChair(scene, chairX, y, chairZ, -angle);
    }
    
    // If main table, add table setting
    if (isMainTable) {
        createTableSettings(scene, x, 0.76, z);
    }
}

function createSimpleChair(scene, x, y, z, rotation) {
    // Chair seat
    const seatGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y + 0.45, z);
    seat.rotation.y = rotation;
    scene.add(seat);
    
    // Chair back
    const backGeometry = new THREE.BoxGeometry(0.35, 0.4, 0.05);
    const backMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.set(
        x - Math.sin(rotation) * 0.2,
        y + 0.7,
        z - Math.cos(rotation) * 0.2
    );
    back.rotation.y = rotation;
    scene.add(back);
    
    // Chair legs
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5C4033 });
    
    for (let i = 0; i < 4; i++) {
        const legAngle = (i / 4) * Math.PI * 2 + rotation;
        const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(
            x + Math.sin(legAngle) * 0.15,
            y + 0.225,
            z + Math.cos(legAngle) * 0.15
        );
        scene.add(leg);
    }
}

function createTableSettings(scene, x, y, z) {
    // Add plates
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const plateX = x + Math.sin(angle) * 0.5;
        const plateZ = z + Math.cos(angle) * 0.5;
        
        const plateGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 32);
        const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.set(plateX, y, plateZ);
        scene.add(plate);
        
        // Wine glass
        const glassBaseGeometry = new THREE.CylinderGeometry(0.03, 0.05, 0.01, 16);
        const glassMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xF5F5F5,
            transparent: true,
            opacity: 0.7
        });
        const glassBase = new THREE.Mesh(glassBaseGeometry, glassMaterial);
        glassBase.position.set(plateX - 0.2, y, plateZ);
        scene.add(glassBase);
        
        const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 8);
        const stem = new THREE.Mesh(stemGeometry, glassMaterial);
        stem.position.set(plateX - 0.2, y + 0.055, plateZ);
        scene.add(stem);
        
        const cupGeometry = new THREE.CylinderGeometry(0, 0.05, 0.07, 16);
        const cup = new THREE.Mesh(cupGeometry, glassMaterial);
        cup.position.set(plateX - 0.2, y + 0.14, plateZ);
        scene.add(cup);
    }
    
    // Add a candle in the center
    createSimpleCandle(scene, x, y, z);
    
    // Add a wine bottle
    createSimpleWineBottle(scene, x + 0.3, y, z);
}
function createJapaneseOfficeDecorations(scene) {
    // Japanese wall art
    createSimpleJapaneseWallArt(scene, 4.95, 1.7, -3);
    
    // Wall clock
    createSimpleWallClock(scene, 4.95, 2.5, 3);
    
    // Add a few plants
    createPlant(scene, -3, 0, 4);
}

function createSimpleJapaneseWallArt(scene, x, y, z) {
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
    
    // Simple design
    const designGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const designMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const design = new THREE.Mesh(designGeometry, designMaterial);
    design.position.set(x - 0.04, y, z);
    design.rotation.y = Math.PI / 2;
    design.scale.set(0.3, 0.3, 1);
    scene.add(design);
}

function createSimpleWallClock(scene, x, y, z) {
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
    
    // Hour hand
    const hourHandGeometry = new THREE.PlaneGeometry(0.15, 0.02);
    const hourHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
    hourHand.position.set(x - 0.02, y, z);
    hourHand.rotation.set(0, Math.PI / 2, Math.PI / 3);
    scene.add(hourHand);
    
    // Minute hand
    const minuteHandGeometry = new THREE.PlaneGeometry(0.25, 0.01);
    const minuteHandMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
    minuteHand.position.set(x - 0.02, y, z);
    minuteHand.rotation.set(0, Math.PI / 2, Math.PI / 6);
    scene.add(minuteHand);
}

// Create France restaurant environment
function createFranceEnvironment(scene) {
    // Create a simplified French restaurant environment

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(14, 12);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01;
    scene.add(floor);

    // Main table (player's table)
    createFrenchTable(scene, 0, 0, 3, true);
    
    // Side tables
    createFrenchTable(scene, -3, 0, 0, false);
    createFrenchTable(scene, 3, 0, 0, false);
    createFrenchTable(scene, -2, 0, -3, false);
    createFrenchTable(scene, 2, 0, -3, false);
    
    // Add some wall decoration
    createSimpleWallDecoration(scene);
    
    // Add a bar area
    createSimpleBar(scene);
    
    return {
        animate: (time) => {
            // Simple candle flame animation
            scene.children.forEach(child => {
                if (child.name === 'candleFlame') {
                    child.scale.y = 1 + Math.sin(time * 0.005) * 0.2;
                }
            });
        }
    };
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
}

function updateDigitalClock(scene) {
    const display = scene.getObjectByName('clockDisplay');
    if (display) {
        // In a real implementation, you'd update the texture
        // For simplicity, we'll just change the emission intensity
        display.material.emissiveIntensity = 0.3 + Math.random() * 0.4;
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
    
    // Add simple whiteboard content
    createSimpleWhiteboardContent(scene, x, y, z);
}

function createSimpleWhiteboardContent(scene, x, y, z) {
    // Simple line representing writing
    const lineGeometry = new THREE.PlaneGeometry(1.8, 0.05);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    for (let i = 0; i < 3; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(x + 0.02, y + 0.3 - i * 0.3, z);
        line.rotation.y = Math.PI / 2;
        scene.add(line);
    }
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
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xEEEEEE,
        roughness: 0.1,
        metalness: 0.1
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

function createPlant(scene, x, y, z) {
    // Pot
    const potGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.2, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.1, z);
    pot.castShadow = true;
    scene.add(pot);
    
    // Plant stems and leaves
    const stemGeometry = new THREE.ConeGeometry(0.2, 0.4, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(x, y + 0.3, z);
    stem.castShadow = true;
    scene.add(stem);
    
    const leafGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x32CD32 });
    
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(
            x + Math.sin(angle) * 0.15,
            y + 0.35,
            z + Math.cos(angle) * 0.15
        );
        leaf.scale.set(0.6, 0.6, 0.6);
        leaf.castShadow = true;
        scene.add(leaf);
    }
}

function createBonsai(scene, x, y, z) {
    // Bonsai pot
    const potGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.2);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.05, z);
    scene.add(pot);
    
    // Bonsai trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.02, 0.03, 0.2, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x4E3B31 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + 0.15, z);
    scene.add(trunk);
    
    // Bonsai branches
    const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x3B2F2F });
    
    // Create a few branches
    const branch1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.02, 0.15, 8),
        branchMaterial
    );
    branch1.position.set(x + 0.05, y + 0.2, z);
    branch1.rotation.z = Math.PI / 4;
    scene.add(branch1);
    
    const branch2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.02, 0.12, 8),
        branchMaterial
    );
    branch2.position.set(x - 0.04, y + 0.22, z);
    branch2.rotation.z = -Math.PI / 6;
    scene.add(branch2);
    
    // Bonsai foliage
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    
    const foliage1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        foliageMaterial
    );
    foliage1.position.set(x + 0.1, y + 0.25, z);
    foliage1.scale.set(1, 0.8, 1);
    scene.add(foliage1);
    
    const foliage2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        foliageMaterial
    );
    foliage2.position.set(x, y + 0.3, z);
    foliage2.scale.set(1, 0.7, 1);
    scene.add(foliage2);
    
    const foliage3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 8),
        foliageMaterial
    );
    foliage3.position.set(x - 0.08, y + 0.27, z);
    foliage3.scale.set(1, 0.8, 1);
    scene.add(foliage3);
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
