// Tokyo Office Environment for Global Business Quest
// Main environment file for the Japanese business meeting scenario

import * as THREE from 'three';
import { textureManager } from '../utils/textures.js';

export class TokyoOfficeEnvironment {
  constructor(scene) {
    // Store scene reference
    this.scene = scene;
    
    // Create a container for all office items
    this.officeItems = new THREE.Group();
    this.officeItems.name = "tokyoOffice";
    this.scene.add(this.officeItems);
    
    // Interactive objects for raycasting
    this.interactiveObjects = [];
    
    // Setup for business card exchange interaction
    this.businessCardExchangeSetup = {
      cardHolder: null,
      playerCard: null,
      japaneseCard: null,
      cardExchangeInProgress: false,
      cardExchangeComplete: false
    };
    
    // Character positions
    this.characterPositions = {
      player: new THREE.Vector3(0, 0, 1.5),
      executive: new THREE.Vector3(0, 0, -1),
      assistant1: new THREE.Vector3(-1.5, 0, -1),
      assistant2: new THREE.Vector3(1.5, 0, -1)
    };
    
    // Create the environment
    this.createRoom();
    this.createFurniture();
    this.createWindows();
    this.createLighting();
    this.createDecorations();
    
    // Apply textures
    textureManager.applyTokyoOfficeTextures(this);
    
    // Setup interactive elements
    this.setupInteractiveElements();
  }
  
  createRoom() {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 8);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xEFEFEF,
      roughness: 0.1,
      metalness: 0
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.officeItems.add(floor);
    
    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(10, 8);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3;
    this.officeItems.add(ceiling);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5F5,
      roughness: 0.2
    });
    
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(10, 3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 1.5, -4);
    backWall.receiveShadow = true;
    this.officeItems.add(backWall);
    
    // Front wall with door cutout
    const frontWallLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 3),
      wallMaterial
    );
    frontWallLeft.position.set(-3, 1.5, 4);
    frontWallLeft.rotation.y = Math.PI;
    this.officeItems.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 3),
      wallMaterial
    );
    frontWallRight.position.set(3, 1.5, 4);
    frontWallRight.rotation.y = Math.PI;
    this.officeItems.add(frontWallRight);
    
    // Door frame
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513
    });
    
    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.8, 0.2),
      doorFrameMaterial
    );
    doorFrame.position.set(0, 1.4, 4);
    this.officeItems.add(doorFrame);
    
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(8, 3);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-5, 1.5, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    this.officeItems.add(leftWall);
    
    // Right wall (with windows)
    const rightWallGeometry = new THREE.PlaneGeometry(8, 3);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(5, 1.5, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    this.officeItems.add(rightWall);
    
    // Floor baseboard
    const baseboardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C5C5C
    });
    
    // Add baseboards to all walls
    this.createBaseboard(5, 0.1, 0.15, 0, 0.075, -4, 0, baseboardMaterial); // Back
    this.createBaseboard(5, 0.1, 0.15, -3, 0.075, 4, Math.PI, baseboardMaterial); // Front left
    this.createBaseboard(5, 0.1, 0.15, 3, 0.075, 4, Math.PI, baseboardMaterial); // Front right
    this.createBaseboard(8, 0.1, 0.15, -5, 0.075, 0, Math.PI/2, baseboardMaterial); // Left
    this.createBaseboard(8, 0.1, 0.15, 5, 0.075, 0, -Math.PI/2, baseboardMaterial); // Right
  }
  
  createBaseboard(width, height, depth, x, y, z, rotation, material) {
    const baseboard = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    baseboard.position.set(x, y, z);
    if (rotation) {
      baseboard.rotation.y = rotation;
    }
    this.officeItems.add(baseboard);
  }
  
  createWindows() {
    // Window frames
    const windowFrameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x696969
    });
    
    // Window glass
    const windowGlassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xADD8E6,
      transparent: true,
      opacity: 0.3
    });
    
    // Create three windows on the right wall
    for (let i = -2.5; i <= 2.5; i += 2.5) {
      // Window frame
      const windowFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 1.8, 1.4),
        windowFrameMaterial
      );
      windowFrame.position.set(4.95, 1.7, i);
      this.officeItems.add(windowFrame);
      
      // Window glass
      const windowGlass = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.6),
        windowGlassMaterial
      );
      windowGlass.position.set(4.9, 1.7, i);
      windowGlass.rotation.y = -Math.PI / 2;
      this.officeItems.add(windowGlass);
      
      // Window dividers
      const horizontalDivider = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 1.2),
        windowFrameMaterial
      );
      horizontalDivider.position.set(4.9, 1.7, i);
      this.officeItems.add(horizontalDivider);
      
      const verticalDivider = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.6, 0.05),
        windowFrameMaterial
      );
      verticalDivider.position.set(4.9, 1.7, i);
      this.officeItems.add(verticalDivider);
    }
  }
  
  createFurniture() {
    // Large conference table
    const tableGeometry = new THREE.BoxGeometry(4, 0.1, 2);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21,
      roughness: 0.3
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, 0.75, 0);
    table.castShadow = true;
    table.receiveShadow = true;
    table.name = "conferenceTable";
    this.officeItems.add(table);
    
    // Table legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.75, 0.1);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3A2213
    });
    
    const legPositions = [
      [-1.9, 0.375, -0.9],
      [1.9, 0.375, -0.9],
      [-1.9, 0.375, 0.9],
      [1.9, 0.375, 0.9]
    ];
    
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      this.officeItems.add(leg);
    });
    
    // Chairs
    this.createChair(0, 0, 1.5, 0); // Your chair (facing away from the player)
    this.createChair(-1.5, 0, -1, Math.PI); // Chair opposite left
    this.createChair(0, 0, -1, Math.PI); // Chair opposite center
    this.createChair(1.5, 0, -1, Math.PI); // Chair opposite right
    
    // Credenza against back wall
    const credenzaGeometry = new THREE.BoxGeometry(3, 0.9, 0.6);
    const credenzaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21,
      roughness: 0.3
    });
    const credenza = new THREE.Mesh(credenzaGeometry, credenzaMaterial);
    credenza.position.set(0, 0.45, -3.7);
    credenza.castShadow = true;
    this.officeItems.add(credenza);
    
    // Create drawers on credenza
    const drawerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4A2E1A
    });
    for (let i = -1.25; i <= 1.25; i += 0.5) {
      const drawer = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.25, 0.05),
        drawerMaterial
      );
      drawer.position.set(i, 0.45, -3.37);
      this.officeItems.add(drawer);
      
      // Drawer handle
      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.02, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xC0C0C0 })
      );
      handle.position.set(i, 0.45, -3.34);
      this.officeItems.add(handle);
    }
    
    // Whiteboard on the left wall
    const whiteboardGeometry = new THREE.BoxGeometry(2, 1.5, 0.05);
    const whiteboardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      roughness: 0.1
    });
    const whiteboard = new THREE.Mesh(whiteboardGeometry, whiteboardMaterial);
    whiteboard.position.set(-4.97, 1.7, -2);
    whiteboard.rotation.y = Math.PI / 2;
    whiteboard.name = "whiteboard";
    this.officeItems.add(whiteboard);
    
    // Whiteboard frame
    const frameGeometry = new THREE.BoxGeometry(2.1, 1.6, 0.07);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x696969
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(-4.96, 1.7, -2);
    frame.rotation.y = Math.PI / 2;
    this.officeItems.add(frame);
    
    // Whiteboard tray for markers
    const trayGeometry = new THREE.BoxGeometry(2, 0.1, 0.15);
    const trayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xA9A9A9
    });
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.set(-4.9, 0.95, -2);
    tray.rotation.y = Math.PI / 2;
    this.officeItems.add(tray);
  }
  
  createChair(x, y, z, rotation) {
    const chairGroup = new THREE.Group();
    chairGroup.name = "chair";
    
    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.4, 0);
    seat.castShadow = true;
    chairGroup.add(seat);
    
    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
    const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
    backrest.position.set(0, 0.7, -0.25);
    backrest.castShadow = true;
    chairGroup.add(backrest);
    
    // Chair legs (simplified as a central column)
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x696969
    });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(0, 0.2, 0);
    leg.castShadow = true;
    chairGroup.add(leg);
    
    // Chair base
    const baseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x696969
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.025, 0);
    base.castShadow = true;
    chairGroup.add(base);
    
    // Set chair position and rotation
    chairGroup.position.set(x, y, z);
    if (rotation) {
      chairGroup.rotation.y = rotation;
    }
    
    this.officeItems.add(chairGroup);
    return chairGroup;
  }
  
  createLighting() {
    // Ceiling lights
    const lightGeometry = new THREE.BoxGeometry(3, 0.1, 0.6);
    const lightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFFFF
    });
    
    for (let z = -2; z <= 2; z += 2) {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(0, 2.95, z);
      this.officeItems.add(light);
      
      // Add actual light source
      const ceilingLight = new THREE.PointLight(0xFFFFFF, 0.8, 6);
      ceilingLight.position.set(0, 2.8, z);
      this.officeItems.add(ceilingLight);
    }
    
    // Ambient light for overall scene visibility
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
    this.officeItems.add(ambientLight);
    
    // Directional light for shadows (simulating sun through windows)
    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    dirLight.position.set(10, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.officeItems.add(dirLight);
  }
  
  createDecorations() {
    // Plant in the corner
    this.createPlant(-4, 0, -3.5);
    
    // Documents on the table
    this.createDocuments(0.5, 0.76, 0.3);
    this.createDocuments(-0.7, 0.76, -0.2);
    
    // Japanese scroll painting on back wall
    this.createScrollPainting(2, 1.8, -3.95);
    
    // Japanese calligraphy on the right wall
    this.createCalligraphy(4.95, 1.8, 0);
    
    // Business card holder on table
    this.createBusinessCardHolder(0, 0.76, 0);
  }
  
  createPlant(x, y, z) {
    // Pot
    const potGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.4, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513
    });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.2, z);
    pot.castShadow = true;
    this.officeItems.add(pot);
    
    // Plant stems and leaves (simplified)
    const stemsGeometry = new THREE.ConeGeometry(0.4, 1.2, 6);
    const stemsMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22
    });
    const stems = new THREE.Mesh(stemsGeometry, stemsMaterial);
    stems.position.set(x, y + 1, z);
    stems.castShadow = true;
    this.officeItems.add(stems);
  }
  
  createDocuments(x, y, z) {
    // Stack of papers
    const paperGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.4);
    const paperMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF
    });
    const papers = new THREE.Mesh(paperGeometry, paperMaterial);
    papers.position.set(x, y, z);
    papers.castShadow = true;
    papers.name = "documents";
    this.officeItems.add(papers);
    
    // Add some subtle texture/lines to the papers
    const lineGeometry = new THREE.BoxGeometry(0.25, 0.021, 0.01);
    const lineMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000
    });
    
    for (let i = -0.15; i < 0.15; i += 0.05) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(x, y + 0.01, z + i);
      this.officeItems.add(line);
    }
  }
  
  createScrollPainting(x, y, z) {
    // Scroll
    const scrollGeometry = new THREE.PlaneGeometry(1, 1.5);
    
    // This would normally load an actual texture
    // For now we'll use a colored material to represent the scroll
    const scrollMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5DC,
      roughness: 0.5
    });
    
    const scroll = new THREE.Mesh(scrollGeometry, scrollMaterial);
    scroll.position.set(x, y, z);
    scroll.castShadow = true;
    scroll.name = "scroll";
    this.officeItems.add(scroll);
    
    // Simple patterns on the scroll (simplified art)
    const artGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const artMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4682B4,
      transparent: true,
      opacity: 0.7
    });
    
    const art = new THREE.Mesh(artGeometry, artMaterial);
    art.position.set(x, y, z + 0.01);
    this.officeItems.add(art);
  }
  
  createCalligraphy(x, y, z) {
    // Calligraphy frame
    const frameGeometry = new THREE.BoxGeometry(0.05, 1.2, 0.6);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    frame.rotation.y = Math.PI / 2;
    this.officeItems.add(frame);
    
    // Calligraphy paper
    const paperGeometry = new THREE.PlaneGeometry(0.5, 1);
    const paperMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFF0
    });
    const paper = new THREE.Mesh(paperGeometry, paperMaterial);
    paper.position.set(x - 0.03, y, z);
    paper.rotation.y = Math.PI / 2;
    paper.name = "calligraphy";
    this.officeItems.add(paper);
    
    // Japanese character (simplified)
    const charGeometry = new THREE.PlaneGeometry(0.3, 0.6);
    const charMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000
    });
    const char = new THREE.Mesh(charGeometry, charMaterial);
    char.position.set(x - 0.04, y, z);
    char.rotation.y = Math.PI / 2;
    this.officeItems.add(char);
  }
  
  createBusinessCardHolder(x, y, z) {
    // Card holder base
    const holderGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.15);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.2
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y + 0.025, z);
    holder.castShadow = true;
    holder.name = "businessCardHolder";
    this.officeItems.add(holder);
    
    // Store reference for interaction
    this.businessCardExchangeSetup.cardHolder = holder;
    
    // Business cards
    const cardGeometry = new THREE.BoxGeometry(0.15, 0.01, 0.1);
    const cardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF
    });
    const cards = new THREE.Mesh(cardGeometry, cardMaterial);
    cards.position.set(x, y + 0.06, z);
    cards.castShadow = true;
    cards.name = "businessCards";
    this.officeItems.add(cards);
    
    // Make this interactive
    this.interactiveObjects.push(holder);
    this.interactiveObjects.push(cards);
  }
  
  setupInteractiveElements() {
    // Make conference table interactive for seating arrangement scenario
    const conferenceTable = this.officeItems.getObjectByName("conferenceTable");
    if (conferenceTable) {
      conferenceTable.userData.isInteractive = true;
      conferenceTable.userData.interactionType = "seating";
      this.interactiveObjects.push(conferenceTable);
    }
    
    // Make business card holder interactive
    const cardHolder = this.officeItems.getObjectByName("businessCardHolder");
    if (cardHolder) {
      cardHolder.userData.isInteractive = true;
      cardHolder.userData.interactionType = "businessCards";
    }
    
    // Make whiteboard interactive for presentation scenario
    const whiteboard = this.officeItems.getObjectByName("whiteboard");
    if (whiteboard) {
      whiteboard.userData.isInteractive = true;
      whiteboard.userData.interactionType = "presentation";
      this.interactiveObjects.push(whiteboard);
    }
  }
  
  // Method to position characters in the scene
  positionCharacters(characters) {
    if (!characters || characters.length === 0) return;
    
    characters.forEach(character => {
      if (character.id === 'player') {
        character.model.position.copy(this.characterPositions.player);
        character.model.rotation.y = Math.PI;
      } else if (character.id === 'executive') {
        character.model.position.copy(this.characterPositions.executive);
      } else if (character.id === 'assistant1') {
        character.model.position.copy(this.characterPositions.assistant1);
      } else if (character.id === 'assistant2') {
        character.model.position.copy(this.characterPositions.assistant2);
      }
    });
  }
  
  // Business card exchange interaction
  initiateBusinessCardExchange() {
    if (this.businessCardExchangeSetup.cardExchangeInProgress) return;
    
    this.businessCardExchangeSetup.cardExchangeInProgress = true;
    
    // Create player's business card
    const playerCardGeometry = new THREE.BoxGeometry(0.1, 0.005, 0.06);
    const playerCardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF
    });
    const playerCard = new THREE.Mesh(playerCardGeometry, playerCardMaterial);
    playerCard.position.set(0, 0.85, 0.3);
    playerCard.rotation.x = Math.PI / 6; // Slight tilt
    playerCard.name = "playerBusinessCard";
    this.officeItems.add(playerCard);
    
    this.businessCardExchangeSetup.playerCard = playerCard;
    
    // Create Japanese business card
    const japaneseCardGeometry = new THREE.BoxGeometry(0.1, 0.005, 0.06);
    const japaneseCardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFAF0
    });
    const japaneseCard = new THREE.Mesh(japaneseCardGeometry, japaneseCardMaterial);
    japaneseCard.position.set(0, 0.85, -0.3);
    japaneseCard.rotation.x = -Math.PI / 6; // Slight tilt opposite direction
    japaneseCard.name = "japaneseBusinessCard";
    this.officeItems.add(japaneseCard);
    
    this.businessCardExchangeSetup.japaneseCard = japaneseCard;
    
    return {
      playerCard: playerCard,
      japaneseCard: japaneseCard
    };
  }
  
  // Complete the business card exchange
  completeBusinessCardExchange() {
    if (!this.businessCardExchangeSetup.cardExchangeInProgress) return;
    
    // Move cards to the table
    if (this.businessCardExchangeSetup.playerCard) {
      this.businessCardExchangeSetup.playerCard.position.set(-0.1, 0.755, -0.15);
      this.businessCardExchangeSetup.playerCard.rotation.set(-Math.PI/2, 0, 0);
    }
    
    if (this.businessCardExchangeSetup.japaneseCard) {
      this.businessCardExchangeSetup.japaneseCard.position.set(0.1, 0.755, 0.15);
      this.businessCardExchangeSetup.japaneseCard.rotation.set(-Math.PI/2, 0, 0);
    }
    
    this.businessCardExchangeSetup.cardExchangeInProgress = false;
    this.businessCardExchangeSetup.cardExchangeComplete = true;
  }
  
  // Animate elements in the environment (subtle movements)
  animate(time) {
    // Subtle light flicker for realism
    if (this.officeItems.children) {
      this.officeItems.children.forEach(child => {
        if (child instanceof THREE.PointLight) {
          child.intensity = 0.8 + Math.sin(time * 0.005) * 0.05;
        }
      });
    }
    
    // If business card exchange is in progress, animate the cards
    if (this.businessCardExchangeSetup.cardExchangeInProgress) {
      if (this.businessCardExchangeSetup.playerCard) {
        const playerCard = this.businessCardExchangeSetup.playerCard;
        playerCard.position.y = 0.85 + Math.sin(time * 0.002) * 0.01;
      }
      
      if (this.businessCardExchangeSetup.japaneseCard) {
        const japaneseCard = this.businessCardExchangeSetup.japaneseCard;
        japaneseCard.position.y = 0.85 + Math.sin(time * 0.002 + Math.PI) * 0.01;
      }
    }
  }
