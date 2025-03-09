// Global Business Quest - Paris Restaurant Environment
// This file defines the 3D environment for the Paris business lunch scenario

import * as THREE from 'three';
import { textureManager } from '../utils/textures.js';

// Paris Restaurant Environment class
class ParisRestaurantEnvironment {
  constructor(scene, loader) {
    this.scene = scene;
    this.loader = loader;
    
    // Create groups for organizing scene objects
    this.restaurantItems = new THREE.Group();
    this.diningItems = new THREE.Group();
    
    // Initialize the environment
    this.init();
  }
  
  // Initialize the environment
  init() {
    console.log("Creating Paris restaurant environment...");
    
    // Add restaurant to the scene
    this.createRestaurantRoom();
    this.createFurniture();
    this.createDiningItems();
    
    // Add ambient sounds and lighting effects (to be implemented)
    this.createAmbience();
    
    // Add groups to the scene
    this.scene.add(this.restaurantItems);
    this.scene.add(this.diningItems);
  }
  
  // Create the restaurant room
  createRestaurantRoom() {
    // Room dimensions
    const width = 12;
    const height = 4;
    const depth = 10;
    
    // Create a box with BackSide material to create a room
    const roomGeometry = new THREE.BoxGeometry(width, height, depth);
    const roomMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5DC, // Beige
      side: THREE.BackSide 
    });
    
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    room.position.set(0, height/2, 0);
    room.name = "restaurantRoom";
    this.restaurantItems.add(room);
    
    // Add floor with a different material (wooden floor)
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.01; // Slightly above the ground to avoid z-fighting
    floor.name = "restaurantFloor";
    this.restaurantItems.add(floor);
    
    // Add ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xFFF8E7 });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = height - 0.01;
    ceiling.name = "restaurantCeiling";
    this.restaurantItems.add(ceiling);
    
    // Add decorative elements
    this.addWallDecor();
  }
  
  // Add decorative elements to the walls
  addWallDecor() {
    // Add a window
    const windowGeometry = new THREE.PlaneGeometry(3, 2);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.7
    });
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(0, 2, -4.99); // Back wall
    window1.name = "restaurantWindow";
    this.restaurantItems.add(window1);
    
    // Window frame
    const frameGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 2, -4.95);
    this.restaurantItems.add(frame);
    
    // Add paintings to the walls
    this.addPainting(-5.99, 2, -2, 2, 1.5, 0x8B4513, "Painting 1");
    this.addPainting(5.99, 2, 2, 1.5, 2, 0x8B4513, "Painting 2");
  }
  
  // Add a painting to the wall
  addPainting(x, y, z, width, height, frameColor, name) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.1, height, width);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: frameColor });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    
    // Canvas (slightly inset from the frame)
    const canvasGeometry = new THREE.PlaneGeometry(width - 0.2, height - 0.2);
    const canvasMaterial = new THREE.MeshStandardMaterial({ 
      color: Math.random() * 0xFFFFFF // Random color for each painting
    });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    
    // Position canvas depending on which wall it's on
    if (x < 0) {
      canvas.position.set(x + 0.06, y, z);
      canvas.rotation.y = Math.PI / 2;
    } else if (x > 0) {
      canvas.position.set(x - 0.06, y, z);
      canvas.rotation.y = -Math.PI / 2;
    }
    
    // Create a group for the painting
    const painting = new THREE.Group();
    painting.add(frame);
    painting.add(canvas);
    painting.name = name;
    
    this.restaurantItems.add(painting);
  }
  
  // Create restaurant furniture
  createFurniture() {
    // Main dining tables
    this.createDiningTable(0, 0.75, 0, true); // Player's table
    this.createDiningTable(-3, 0.75, -3, false);
    this.createDiningTable(3, 0.75, 3, false);
    this.createDiningTable(-3, 0.75, 3, false);
    
    // Add a waiter's station
    this.createWaiterStation(5, 0.9, -3);
  }
  
  // Create a dining table
  createDiningTable(x, y, z, isPlayerTable) {
    // Table top
    const tableTopGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const tableTopMaterial = textureManager.createRestaurantMaterial('table');
    
    // If this is the player's table, add a tablecloth
    if (isPlayerTable) {
      tableTopMaterial.color.set(0xFFFFFF); // White tablecloth
    }
    
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(x, y, z);
    tableTop.receiveShadow = true;
    
    // Table leg
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, y, 16);
    const legMaterial = textureManager.createRestaurantMaterial('table');
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y/2, z);
    leg.castShadow = true;
    
    // Create a group for the table
    const table = new THREE.Group();
    table.add(tableTop);
    table.add(leg);
    
    if (isPlayerTable) {
      table.name = "playerTable";
    } else {
      table.name = "diningTable";
    }
    
    this.restaurantItems.add(table);
    
    // Add chairs around the table
    this.createChairsAroundTable(x, y, z, isPlayerTable);
    
    // If this is the player's table, add dining settings
    if (isPlayerTable) {
      this.createTableSettings(x, y, z);
    }
  }
  
  // Create chairs around a table
  createChairsAroundTable(tableX, tableY, tableZ, isPlayerTable) {
    // Chair positions around the table (in a circle)
    const chairCount = 4;
    const radius = 1.8; // Distance from table center
    
    for (let i = 0; i < chairCount; i++) {
      const angle = (i / chairCount) * Math.PI * 2;
      const x = tableX + radius * Math.cos(angle);
      const z = tableZ + radius * Math.sin(angle);
      
      this.createChair(x, 0.5, z, angle, isPlayerTable && i === 2); // i === 2 is the player's position
    }
  }
  
  // Create a chair
  createChair(x, y, z, rotation, isPlayerChair) {
    // Chair materials
    const chairMaterial = textureManager.createRestaurantMaterial('chair');
    
    // Seat
    const seatGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const seat = new THREE.Mesh(seatGeometry, chairMaterial);
    seat.position.set(x, y, z);
    seat.castShadow = true;
    
    // Backrest (only for chairs that are not the player's)
    if (!isPlayerChair) {
      const backrestGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.1);
      const backrest = new THREE.Mesh(backrestGeometry, chairMaterial);
      
      // Position backrest relative to the seat based on the rotation
      const backX = x - 0.4 * Math.cos(rotation);
      const backZ = z - 0.4 * Math.sin(rotation);
      backrest.position.set(backX, y + 0.4, backZ);
      
      // Rotate backrest to face the table
      backrest.rotation.y = rotation;
      backrest.castShadow = true;
      
      // Create a group for the chair
      const chair = new THREE.Group();
      chair.add(seat);
      chair.add(backrest);
      
      if (isPlayerChair) {
        chair.name = "playerChair";
      } else {
        chair.name = "diningChair";
      }
      
      this.restaurantItems.add(chair);
    } else {
      // Just add the seat for the player's chair (since we won't see the backrest)
      seat.name = "playerChair";
      this.restaurantItems.add(seat);
    }
  }
  
  // Create a waiter's station
  createWaiterStation(x, y, z) {
    // Station counter
    const counterGeometry = new THREE.BoxGeometry(2, 1.8, 1);
    const counterMaterial = textureManager.createRestaurantMaterial('table');
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(x, y, z);
    counter.receiveShadow = true;
    
    // Wine bottles on the counter
    this.createWineBottles(x, y + 0.9, z);
    
    // Create a group for the waiter's station
    const waiterStation = new THREE.Group();
    waiterStation.add(counter);
    waiterStation.name = "waiterStation";
    
    this.restaurantItems.add(waiterStation);
  }
  
  // Create wine bottles for the waiter's station
  createWineBottles(x, y, z) {
    // Wine bottle positions
    const bottlePositions = [
      [x - 0.5, y, z - 0.3],
      [x, y, z - 0.3],
      [x + 0.5, y, z - 0.3]
    ];
    
    bottlePositions.forEach((pos, index) => {
      // Bottle
      const bottleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 16);
      
      // Different colors for different wines
      const bottleColors = [0x722F37, 0x722F37, 0xF7E7CE]; // Red, Red, White
      const bottleMaterial = new THREE.MeshStandardMaterial({ 
        color: bottleColors[index],
        transparent: true,
        opacity: 0.9
      });
      
      const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
      bottle.position.set(...pos);
      bottle.castShadow = true;
      bottle.name = `wineBottle_${index}`;
      
      // Neck of the bottle
      const neckGeometry = new THREE.CylinderGeometry(0.03, 0.1, 0.2, 16);
      const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
      neck.position.set(pos[0], pos[1] + 0.45, pos[2]);
      neck.castShadow = true;
      
      // Create a group for the bottle
      const wineBottle = new THREE.Group();
      wineBottle.add(bottle);
      wineBottle.add(neck);
      
      this.restaurantItems.add(wineBottle);
    });
  }
  
  // Create dining items for the player's table
  createDiningItems() {
    // Add these items to the player's table which is at (0, 0.75, 0)
    this.createTableSettings(0, 0.75, 0);
  }
  
  // Create table settings (plates, glasses, etc.)
  createTableSettings(tableX, tableY, tableZ) {
    // Settings for 4 people
    const settingPositions = [
      [tableX - 0.6, tableY + 0.05, tableZ - 0.6], // Setting 1
      [tableX + 0.6, tableY + 0.05, tableZ - 0.6], // Setting 2
      [tableX, tableY + 0.05, tableZ + 0.6],       // Setting 3 (player)
      [tableX - 0.6, tableY + 0.05, tableZ + 0.6]  // Setting 4
    ];
    
    settingPositions.forEach((pos, index) => {
      this.createPlaceSetting(...pos, index === 2); // index 2 is player's place
    });
    
    // Add shared items in the center
    this.createCenterpieces(tableX, tableY, tableZ);
  }
  
  // Create a place setting for one person
  createPlaceSetting(x, y, z, isPlayerSetting) {
    // Plate
    const plateGeometry = new THREE.CircleGeometry(0.3, 32);
    const plateMaterial = textureManager.createRestaurantMaterial('plate');
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.set(x, y, z);
    plate.rotation.x = -Math.PI / 2; // Lay flat
    plate.receiveShadow = true;
    plate.name = isPlayerSetting ? "playerPlate" : "diningPlate";
    this.diningItems.add(plate);
    
    // Wine glass
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
    const bowlGeometry = new THREE.SphereGeometry(0.1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const baseGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16);
    
    const glassMaterial = textureManager.createRestaurantMaterial('glass');
    
    const stem = new THREE.Mesh(stemGeometry, glassMaterial);
    stem.position.set(x + 0.4, y + 0.1, z);
    stem.castShadow = true;
    
    const bowl = new THREE.Mesh(bowlGeometry, glassMaterial);
    bowl.position.set(x + 0.4, y + 0.25, z);
    bowl.scale.set(1, 0.7, 1);
    bowl.castShadow = true;
    bowl.name = "wineGlassBowl";
    
    const base = new THREE.Mesh(baseGeometry, glassMaterial);
    base.position.set(x + 0.4, y, z);
    base.castShadow = true;
    
    // Create a group for the wine glass
    const wineGlass = new THREE.Group();
    wineGlass.add(stem);
    wineGlass.add(bowl);
    wineGlass.add(base);
    wineGlass.name = isPlayerSetting ? "playerWineGlass" : "diningWineGlass";
    
    this.diningItems.add(wineGlass);
    
    // Utensils (fork and knife)
    this.createUtensils(x, y, z, isPlayerSetting);
  }
  
  // Create utensils for a place setting
  createUtensils(x, y, z, isPlayerSetting) {
    // Utensil material (silver)
    const utensilMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    
    // Fork (left side of plate)
    const forkBaseGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.2);
    const forkBase = new THREE.Mesh(forkBaseGeometry, utensilMaterial);
    forkBase.position.set(x - 0.35, y + 0.01, z);
    forkBase.castShadow = true;
    
    // Fork tines
    const tineGeometry = new THREE.BoxGeometry(0.005, 0.01, 0.07);
    const tinesGroup = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
      const tine = new THREE.Mesh(tineGeometry, utensilMaterial);
      tine.position.set(x - 0.35 - 0.02 + i * 0.015, y + 0.01, z - 0.135);
      tine.castShadow = true;
      tinesGroup.add(tine);
    }
    
    // Create fork group
    const fork = new THREE.Group();
    fork.add(forkBase);
    fork.add(tinesGroup);
    fork.name = isPlayerSetting ? "playerFork" : "diningFork";
    
    this.diningItems.add(fork);
    
    // Knife (right side of plate)
    const knifeHandleGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.15);
    const knifeHandle = new THREE.Mesh(knifeHandleGeometry, utensilMaterial);
    knifeHandle.position.set(x + 0.35, y + 0.01, z + 0.025);
    knifeHandle.castShadow = true;
    
    // Knife blade
    const knifeBladeGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.2);
    const knifeBlade = new THREE.Mesh(knifeBladeGeometry, utensilMaterial);
    knifeBlade.position.set(x + 0.35, y + 0.01, z - 0.05);
    knifeBlade.castShadow = true;
    
    // Create knife group
    const knife = new THREE.Group();
    knife.add(knifeHandle);
    knife.add(knifeBlade);
    knife.name = isPlayerSetting ? "playerKnife" : "diningKnife";
    
    this.diningItems.add(knife);
  }
  
  // Create centerpieces for the table
  createCenterpieces(x, y, z) {
    // Candle
    const candleBaseGeometry = new THREE.CylinderGeometry(0.05, 0.07, 0.05, 16);
    const candleBaseMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
    const candleBase = new THREE.Mesh(candleBaseGeometry, candleBaseMaterial);
    candleBase.position.set(x - 0.2, y + 0.025, z);
    candleBase.castShadow = true;
    
    const candleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(x - 0.2, y + 0.15, z);
    candle.castShadow = true;
    
    // Candle flame (simplified as a small cone)
    const flameGeometry = new THREE.ConeGeometry(0.01, 0.03, 8);
    const flameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFA500,
      emissive: 0xFFA500,
      emissiveIntensity: 1
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(x - 0.2, y + 0.275, z);
    flame.name = "candleFlame";
    
    // Create candle group
    const candleGroup = new THREE.Group();
    candleGroup.add(candleBase);
    candleGroup.add(candle);
    candleGroup.add(flame);
    candleGroup.name = "candle";
    
    this.diningItems.add(candleGroup);
    
    // Small flower vase
    const vaseGeometry = new THREE.CylinderGeometry(0.05, 0.07, 0.15, 16);
    const vaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x6495ED,
      transparent: true,
      opacity: 0.8
    });
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vase.position.set(x + 0.2, y + 0.075, z);
    vase.castShadow = true;
    
    // Flowers (simplified as colored spheres)
    const flowerColors = [0xFF69B4, 0xFFFFFF, 0xFFA07A];
    const flowerGroup = new THREE.Group();
    
    flowerColors.forEach((color, index) => {
      const flowerGeometry = new THREE.SphereGeometry(0.04, 8, 8);
      const flowerMaterial = new THREE.MeshStandardMaterial({ color: color });
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
      
      // Position flowers at the top of the vase, slightly offset
      const angle = (index / flowerColors.length) * Math.PI * 2;
      const radius = 0.03;
      flower.position.set(
        x + 0.2 + radius * Math.cos(angle),
        y + 0.18 + Math.random() * 0.05,
        z + radius * Math.sin(angle)
      );
      flower.castShadow = true;
      flowerGroup.add(flower);
    });
    
    // Add green stems
    const stemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    
    for (let i = 0; i < 3; i++) {
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      const angle = (i / 3) * Math.PI * 2;
      const radius = 0.02;
      stem.position.set(
        x + 0.2 + radius * Math.cos(angle),
        y + 0.13,
        z + radius * Math.sin(angle)
      );
      stem.castShadow = true;
      flowerGroup.add(stem);
    }
    
    // Create vase group
    const vaseGroup = new THREE.Group();
    vaseGroup.add(vase);
    vaseGroup.add(flowerGroup);
    vaseGroup.name = "flowerVase";
    
    this.diningItems.add(vaseGroup);
    
    // Bread basket
    this.createBreadBasket(x, y, z - 0.3);
  }
  
  // Create a bread basket
  createBreadBasket(x, y, z) {
    // Basket
    const basketGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.1, 16, 1, false);
    const basketMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.set(x, y + 0.05, z);
    basket.castShadow = true;
    basket.receiveShadow = true;
    
    // Bread (simplified as brown spheres)
    const breadGroup = new THREE.Group();
    const breadPositions = [
      [x - 0.05, y + 0.12, z - 0.05],
      [x + 0.05, y + 0.12, z + 0.05],
      [x, y + 0.15, z]
    ];
    
    breadPositions.forEach((pos, index) => {
      const breadGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const breadMaterial = new THREE.MeshStandardMaterial({ color: 0xDEB887 });
      const bread = new THREE.Mesh(breadGeometry, breadMaterial);
      bread.position.set(...pos);
      bread.scale.set(1, 0.6, 1); // Flatten slightly
      bread.castShadow = true;
      breadGroup.add(bread);
    });
    
    // Create bread basket group
    const breadBasket = new THREE.Group();
    breadBasket.add(basket);
    breadBasket.add(breadGroup);
    breadBasket.name = "breadBasket";
    
    this.diningItems.add(breadBasket);
  }
  
  // Create ambient effects for the restaurant
  createAmbience() {
    // This would include ambient lighting, particles, etc.
    // For the base implementation, we'll just set up a point light for candlelight
    
    // Candle light
    const candleLight = new THREE.PointLight(0xFFA500, 0.5, 5);
    candleLight.position.set(0, 1.2, 0);
    candleLight.castShadow = true;
    candleLight.name = "candleLight";
    
    this.restaurantItems.add(candleLight);
  }
  
  // Update method called on each frame
  update(time) {
    // Animate candle flame
    const flame = this.diningItems.getObjectByName("candleFlame");
    if (flame) {
      // Subtle flickering effect
      const flickerIntensity = 0.1;
      flame.scale.x = 1 + Math.sin(time * 0.01) * flickerIntensity;
      flame.scale.z = 1 + Math.cos(time * 0.01) * flickerIntensity;
      
      // Update candle light if present
      const candleLight = this.restaurantItems.getObjectByName("candleLight");
      if (candleLight) {
        candleLight.intensity = 0.5 + Math.sin(time * 0.01) * 0.1;
      }
    }
  }
}
