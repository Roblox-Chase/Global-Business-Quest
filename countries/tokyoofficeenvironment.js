// Global Business Quest - Tokyo Office Environment
// This file defines the 3D environment for the Tokyo business meeting scenario

import * as THREE from 'three';
import { textureManager } from '../utils/textures.js';

// Tokyo Office Environment class
class TokyoOfficeEnvironment {
  constructor(scene, loader) {
    this.scene = scene;
    this.loader = loader;
    
    // Create groups for organizing scene objects
    this.officeItems = new THREE.Group();
    this.businessItems = new THREE.Group();
    
    // Initialize the environment
    this.init();
  }
  
  // Initialize the environment
  init() {
    console.log("Creating Tokyo office environment...");
    
    // Add office to the scene
    this.createOfficeRoom();
    this.createFurniture();
    this.createBusinessItems();
    
    // Add groups to the scene
    this.scene.add(this.officeItems);
    this.scene.add(this.businessItems);
  }
  
  // Create the office room
  createOfficeRoom() {
    // Room dimensions
    const width = 10;
    const height = 3.5;
    const depth = 8;
    
    // Create a box with BackSide material to create a room
    const roomGeometry = new THREE.BoxGeometry(width, height, depth);
    const roomMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF0F0F0, 
      side: THREE.BackSide 
    });
    
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    room.position.set(0, height/2, 0);
    room.name = "officeRoom";
    this.officeItems.add(room);
    
    // Add floor with a different material
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B8B8B });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01; // Slightly above the ground to avoid z-fighting
    floor.name = "officeFloor";
    this.officeItems.add(floor);
    
    // Add ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = height - 0.01;
    ceiling.name = "officeCeiling";
    this.officeItems.add(ceiling);
    
    // Add window
    const windowGeometry = new THREE.PlaneGeometry(4, 2);
    const windowMaterial = textureManager.createOfficeMaterial('window');
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(0, 1.5, -depth/2 + 0.01); // Back wall
    window1.name = "officeWindow";
    this.officeItems.add(window1);
  }
  
  // Create office furniture
  createFurniture() {
    // Conference table
    this.createConferenceTable(0, 0.75, 0);
    
    // Chairs around the table
    this.createChairs();
    
    // Add a plant in the corner
    this.createPlant(-4, 0, -3);
    
    // Add a whiteboard on the wall
    this.createWhiteboard(4, 1.75, -3.9);
  }
  
  // Create conference table
  createConferenceTable(x, y, z) {
    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(5, 0.1, 2.5);
    const tableTopMaterial = textureManager.createOfficeMaterial('desk');
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(x, y, z);
    tableTop.receiveShadow = true;
    tableTop.name = "conferenceTable";
    this.officeItems.add(tableTop);
    
    // Table legs
    const legGeometry = new THREE.BoxGeometry(0.1, y, 0.1);
    const legMaterial = textureManager.createOfficeMaterial('desk');
    
    // Positions for the four legs
    const legPositions = [
      [x - 2.4, y/2, z - 1.2],
      [x + 2.4, y/2, z - 1.2],
      [x - 2.4, y/2, z + 1.2],
      [x + 2.4, y/2, z + 1.2]
    ];
    
    legPositions.forEach((pos, index) => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      leg.name = `tableleg_${index}`;
      this.officeItems.add(leg);
    });
  }
  
  // Create chairs around the table
  createChairs() {
    // Chair positions around the table
    const chairPositions = [
      [-2, 0.5, 1.5],  // Chair 1 - Japanese executive
      [0, 0.5, 1.5],   // Chair 2 - Japanese manager
      [2, 0.5, 1.5],   // Chair 3 - Japanese team member
      [-2, 0.5, -1.5], // Chair 4 - Player
      [0, 0.5, -1.5],  // Chair 5 - Player colleague 1
      [2, 0.5, -1.5]   // Chair 6 - Player colleague 2
    ];
    
    chairPositions.forEach((pos, index) => {
      this.createChair(...pos, index);
    });
  }
  
  // Create a chair
  createChair(x, y, z, index) {
    // Chair materials
    const chairMaterial = textureManager.createOfficeMaterial('chair');
    
    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
    const seat = new THREE.Mesh(seatGeometry, chairMaterial);
    seat.position.set(x, y, z);
    seat.castShadow = true;
    
    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
    const backrest = new THREE.Mesh(backrestGeometry, chairMaterial);
    
    // Position the backrest based on which side of the table the chair is on
    if (z > 0) {
      // Chairs on the far side of the table (Japanese side)
      backrest.position.set(x, y + 0.45, z + 0.45);
    } else {
      // Chairs on the near side of the table (Player side)
      backrest.position.set(x, y + 0.45, z - 0.45);
    }
    
    backrest.castShadow = true;
    
    // Create a group for the chair
    const chair = new THREE.Group();
    chair.add(seat);
    chair.add(backrest);
    chair.name = `chair_${index}`;
    
    this.officeItems.add(chair);
  }
  
  // Create a plant
  createPlant(x, y, z) {
    // Plant pot
    const potGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.6, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x, y + 0.3, z);
    pot.castShadow = true;
    pot.receiveShadow = true;
    
    // Plant leaves (simplified as a cone)
    const leavesGeometry = new THREE.ConeGeometry(0.5, 1.2, 8);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, y + 1.2, z);
    leaves.castShadow = true;
    
    // Create a group for the plant
    const plant = new THREE.Group();
    plant.add(pot);
    plant.add(leaves);
    plant.name = "officePlant";
    
    this.officeItems.add(plant);
  }
  
  // Create a whiteboard
  createWhiteboard(x, y, z) {
    // Whiteboard
    const boardGeometry = new THREE.BoxGeometry(2.5, 1.5, 0.05);
    const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(x, y, z);
    board.receiveShadow = true;
    
    // Frame
    const frameGeometry = new THREE.BoxGeometry(2.6, 1.6, 0.07);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x696969 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z - 0.01);
    
    // Create a group for the whiteboard
    const whiteboard = new THREE.Group();
    whiteboard.add(frame);
    whiteboard.add(board);
    whiteboard.name = "whiteboard";
    
    this.officeItems.add(whiteboard);
  }
  
  // Create business items specific to Japanese business culture
  createBusinessItems() {
    // Business card holder
    this.createBusinessCardHolder(0, 0.81, 0);
    
    // Tea set
    this.createTeaSet(1.5, 0.81, 0.5);
    
    // Documents and folders
    this.createDocuments(-1.5, 0.81, 0);
  }
  
  // Create business card holder
  createBusinessCardHolder(x, y, z) {
    // Card holder
    const holderGeometry = new THREE.BoxGeometry(0.12, 0.03, 0.08);
    const holderMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(x, y, z);
    holder.receiveShadow = true;
    
    // Business cards (white rectangles)
    const cardGeometry = new THREE.BoxGeometry(0.09, 0.01, 0.05);
    const cardMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const cards = new THREE.Mesh(cardGeometry, cardMaterial);
    cards.position.set(x, y + 0.02, z);
    
    // Create a group for the business card holder
    const businessCardHolder = new THREE.Group();
    businessCardHolder.add(holder);
    businessCardHolder.add(cards);
    businessCardHolder.name = "businessCardHolder";
    
    this.businessItems.add(businessCardHolder);
  }
  
  // Create tea set
  createTeaSet(x, y, z) {
    // Tray
    const trayGeometry = new THREE.BoxGeometry(0.8, 0.03, 0.5);
    const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const tray = new THREE.Mesh(trayGeometry, trayMaterial);
    tray.position.set(x, y, z);
    tray.receiveShadow = true;
    
    // Teapot
    const potGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(x - 0.2, y + 0.1, z);
    pot.scale.set(1, 0.8, 1);
    pot.castShadow = true;
    
    // Teacups
    const cupPositions = [
      [x + 0.1, y + 0.05, z - 0.1],
      [x + 0.1, y + 0.05, z + 0.1],
      [x + 0.3, y + 0.05, z - 0.1],
      [x + 0.3, y + 0.05, z + 0.1]
    ];
    
    const cups = new THREE.Group();
    
    cupPositions.forEach((pos, index) => {
      const cupGeometry = new THREE.CylinderGeometry(0.04, 0.03, 0.05, 16);
      const cupMaterial = new THREE.MeshStandardMaterial({ color: 0xF5F5F5 });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.position.set(...pos);
      cup.castShadow = true;
      cup.name = `teacup_${index}`;
      cups.add(cup);
    });
    
    // Create a group for the tea set
    const teaSet = new THREE.Group();
    teaSet.add(tray);
    teaSet.add(pot);
    teaSet.add(cups);
    teaSet.name = "teaSet";
    
    this.businessItems.add(teaSet);
  }
  
  // Create documents and folders
  createDocuments(x, y, z) {
    // Folder
    const folderGeometry = new THREE.BoxGeometry(0.4, 0.03, 0.3);
    const folderMaterial = new THREE.MeshStandardMaterial({ color: 0x2E4372 });
    const folder = new THREE.Mesh(folderGeometry, folderMaterial);
    folder.position.set(x, y, z);
    folder.receiveShadow = true;
    
    // Papers (slightly smaller white rectangles)
    const paperGeometry = new THREE.BoxGeometry(0.38, 0.02, 0.28);
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const papers = new THREE.Mesh(paperGeometry, paperMaterial);
    papers.position.set(x, y + 0.025, z);
    
    // Create a group for the documents
    const documents = new THREE.Group();
    documents.add(folder);
    documents.add(papers);
    documents.name = "documents";
    
    this.businessItems.add(documents);
  }
  
  // Update method called on each frame
  update(time) {
    // Animate subtle movements or effects here if needed
  }
}

export { TokyoOfficeEnvironment };
