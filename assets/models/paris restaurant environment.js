createTableSettings() {
    // This method focuses on the player's table (set at position [0, 0, 3])
    if (!this.playerTable) return;
    
    // Tablecloth
    const clothGeometry = new THREE.CircleGeometry(0.85, 32);
    const clothMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      roughness: 0.3
    });
    const tablecloth = new THREE.Mesh(clothGeometry, clothMaterial);
    tablecloth.rotation.x = -Math.PI / 2;
    tablecloth.position.set(0, 0.755, 0);
    this.playerTable.add(tablecloth);
    
    // Place settings for three people
    this.createPlaceSetting(this.playerTable, 0, 0.751, 0.5);     // Player's setting
    this.createPlaceSetting(this.playerTable, -0.5, 0.751, -0.3); // French businessman
    this.createPlaceSetting(this.playerTable, 0.5, 0.751, -0.3);  // French businesswoman
    
    // Center items
    this.createCenterpieces(this.playerTable);
  }
  
  createPlaceSetting(parent, x, y, z) {
    // Group for the place setting
    const settingGroup = new THREE.Group();
    
    // Dinner plate
    const plateGeometry = new THREE.CircleGeometry(0.15, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      roughness: 0.1
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.rotation.x = -Math.PI / 2;
    plate.position.set(0, 0, 0);
    settingGroup.add(plate);
    
    // Silverware
    
    // Fork (left side)
    const forkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC0C0C0,
      metalness: 0.7,
      roughness: 0.3
    });
    
    const forkBaseGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.12);
    const forkBase = new THREE.Mesh(forkBaseGeometry, forkMaterial);
    forkBase.position.set(-0.18, 0, 0);
    settingGroup.add(forkBase);
    
    for (let tine = -1; tine <= 1; tine++) {
      const tineGeometry = new THREE.BoxGeometry(0.005, 0.01, 0.07);
      const tineObj = new THREE.Mesh(tineGeometry, forkMaterial);
      tineObj.position.set(-0.18 + tine * 0.01, 0, -0.09);
      settingGroup.add(tineObj);
    }
    
    // Knife (right side)
    const knifeBaseGeometry = new THREE.BoxGeometry(0.03, 0.01, 0.15);
    const knifeBase = new THREE.Mesh(knifeBaseGeometry, forkMaterial);
    knifeBase.position.set(0.18, 0, 0);
    settingGroup.add(knifeBase);
    
    // Knife blade
    const bladeGeometry = new THREE.BoxGeometry(0.025, 0.008, 0.1);
    const blade = new THREE.Mesh(bladeGeometry, forkMaterial);
    blade.position.set(0.18, 0, -0.075);
    settingGroup.add(blade);
    
    // Bread plate (top left)
    const breadPlateGeometry = new THREE.CircleGeometry(0.07, 32);
    const breadPlate = new THREE.Mesh(breadPlateGeometry, plateMaterial);
    breadPlate.rotation.x = -Math.PI / 2;
    breadPlate.position.set(-0.2, 0, -0.2);
    settingGroup.add(breadPlate);
    
    // Water glass (top right)
    const waterGlassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE6F3FF,
      transparent: true,
      opacity: 0.5
    });
    
    const waterGlassGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16);
    const waterGlass = new THREE.Mesh(waterGlassGeometry, waterGlassMaterial);
    waterGlass.position.set(0.2, 0.04, -0.2);
    settingGroup.add(waterGlass);
    
    // Wine glass
    const wineGlassBaseGeometry = new THREE.CylinderGeometry(0.02, 0.03, 0.01, 16);
    const wineGlassBase = new THREE.Mesh(wineGlassBaseGeometry, waterGlassMaterial);
    wineGlassBase.position.set(0.25, 0.005, -0.15);
    settingGroup.add(wineGlassBase);
    
    const wineGlassStemGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.06, 8);
    const wineGlassStem = new THREE.Mesh(wineGlassStemGeometry, waterGlassMaterial);
    wineGlassStem.position.set(0.25, 0.04, -0.15);
    settingGroup.add(wineGlassStem);
    
    const wineGlassBowlGeometry = new THREE.SphereGeometry(0.03, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const wineGlassBowl = new THREE.Mesh(wineGlassBowlGeometry, waterGlassMaterial);
    wineGlassBowl.rotation.x = Math.PI / 2;
    wineGlassBowl.position.set(0.25, 0.07, -0.15);
    settingGroup.add(wineGlassBowl);
    
    // Red wine in some glasses
    if (Math.random() > 0.5) {
      const wineGeometry = new THREE.SphereGeometry(0.025, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3);
      const wineMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000,
        transparent: true,
        opacity: 0.8
      });
      const wine = new THREE.Mesh(wineGeometry, wineMaterial);
      wine.rotation.x = Math.PI / 2;
      wine.position.set(0.25, 0.065, -0.15);
      settingGroup.add(wine);
    }
    
    // Napkin
    const napkinGeometry = new THREE.BoxGeometry(0.1, 0.01, 0.1);
    const napkinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      roughness: 0.7
    });
    const napkin = new THREE.Mesh(napkinGeometry, napkinMaterial);
    napkin.position.set(0, 0.005, 0);
    settingGroup.add(napkin);
    
    // Position and add the setting to the parent
    settingGroup.position.set(x, y, z);
    parent.add(settingGroup);
  }
  
  createCenterpieces(parent) {
    // Candle
    const candleGroup = new THREE.Group();
    
    // Candle holder
    const holderGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.02, 16);
    const holderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC0C0C0,
      metalness: 0.8,
      roughness: 0.2
    });
    const holder = new THREE.Mesh(holderGeometry, holderMaterial);
    holder.position.set(0, 0.01, 0);
    candleGroup.add(holder);
    
    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16);
    const candleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFA
    });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.set(0, 0.07, 0);
    candleGroup.add(candle);
    
    // Candle flame
    const flameGeometry = new THREE.SphereGeometry(0.01, 8, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFF00
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.set(0, 0.13, 0);
    flame.scale.y = 1.5;
    candleGroup.add(flame);
    
    // Add light from candle
    const candleLight = new THREE.PointLight(0xFFD700, 0.5, 2);
    candleLight.position.set(0, 0.13, 0);
    candleGroup.add(candleLight);
    
    // Position and add the candle to the parent
    candleGroup.position.set(0, 0.76, 0);
    parent.add(candleGroup);
    
    // Small flower vase
    const vaseGroup = new THREE.Group();
    
    // Vase
    const vaseGeometry = new THREE.CylinderGeometry(0.03, 0.02, 0.08, 16);
    const vaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4682B4,
      transparent: true,
      opacity: 0.7
    });
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vase.position.set(0, 0.04, 0);
    vaseGroup.add(vase);
    
    // Water in vase
    const waterGeometry = new THREE.CylinderGeometry(0.025, 0.015, 0.02, 16);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xADD8E6,
      transparent: true,
      opacity: 0.6
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.set(0, 0.02, 0);
    vaseGroup.add(water);
    
    // Flowers (simplified)
    const stemGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.15, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22
    });
    
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const offsetX = Math.cos(angle) * 0.01;
      const offsetZ = Math.sin(angle) * 0.01;
      
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.set(offsetX, 0.11, offsetZ);
      vaseGroup.add(stem);
      
      // Flower bud
      const flowerColors = [0xFF69B4, 0xFFFF00, 0xFF6347];
      const flowerMaterial = new THREE.MeshStandardMaterial({ 
        color: flowerColors[i % flowerColors.length]
      });
      const flowerGeometry = new THREE.SphereGeometry(0.015, 8, 8);
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
      flower.position.set(offsetX, 0.19, offsetZ);
      vaseGroup.add(flower);
    }
    
    // Position and add the vase to the parent
    vaseGroup.position.set(0.15, 0.76, 0);
    parent.add(vaseGroup);
    
    // Salt and pepper shakers
    this.createSaltAndPepper(parent, -0.15, 0.76, 0);
    
    // Bread basket
    this.createBreadBasket(parent, 0, 0.76, -0.25);
  }
  
  createSaltAndPepper(parent, x, y, z) {
    // Shaker group
    const shakerGroup = new THREE.Group();
    
    // Create salt shaker
    const saltGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 12);
    const saltMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8
    });
    const salt = new THREE.Mesh(saltGeometry, saltMaterial);
    salt.position.set(-0.03, 0.03, 0);
    shakerGroup.add(salt);
    
    // Salt shaker top
    const saltTopGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12);
    const saltTopMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC0C0C0
    });
    const saltTop = new THREE.Mesh(saltTopGeometry, saltTopMaterial);
    saltTop.position.set(-0.03, 0.065, 0);
    shakerGroup.add(saltTop);
    
    // Create pepper shaker
    const pepperGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 12);
    const pepperMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      transparent: true,
      opacity: 0.8
    });
    const pepper = new THREE.Mesh(pepperGeometry, pepperMaterial);
    pepper.position.set(0.03, 0.03, 0);
    shakerGroup.add(pepper);
    
    // Pepper shaker top
    const pepperTopGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 12);
    const pepperTop = new THREE.Mesh(pepperTopGeometry, saltTopMaterial);
    pepperTop.position.set(0.03, 0.065, 0);
    shakerGroup.add(pepperTop);
    
    // Position and add the shakers to the parent
    shakerGroup.position.set(x, y, z);
    parent.add(shakerGroup);
  }
  
  createBreadBasket(parent, x, y, z) {
    // Basket group
    const basketGroup = new THREE.Group();
    
    // Basket
    const basketGeometry = new THREE.CylinderGeometry(0.1, 0.06, 0.05, 16, 1, true);
    const basketMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xCD853F,
      roughness: 0.8
    });
    const basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.set(0, 0.025, 0);
    basketGroup.add(basket);
    
    // Basket bottom
    const bottomGeometry = new THREE.CircleGeometry(0.06, 16);
    const bottom = new THREE.Mesh(bottomGeometry, basketMaterial);
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.set(0, 0, 0);
    basketGroup.add(bottom);
    
    // Napkin lining
    const napkinGeometry = new THREE.CylinderGeometry(0.095, 0.055, 0.051, 16, 1, true);
    const napkinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      roughness: 0.7
    });
    const napkin = new THREE.Mesh(napkinGeometry, napkinMaterial);
    napkin.position.set(0, 0.025, 0);
    basketGroup.add(napkin);
    
    // Bread rolls
    const breadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xDEB887,
      roughness: 0.6
    });
    
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 0.04;
      
      const breadGeometry = new THREE.SphereGeometry(0.025, 8, 8);
      const bread = new THREE.Mesh(breadGeometry, breadMaterial);
      
      bread.position.set(
        Math.cos(angle) * radius,
        0.05,
        Math.sin(angle) * radius
      );
      
      bread.scale.y = 0.7;
      basketGroup.add(bread);
    }
    
    // Position and add the bread basket to the parent
    basketGroup.position.set(x, y, z);
    parent.add(basketGroup);
  }
  
  // Animate elements in the environment
  animate(time) {
    // Animate candles and lights
    if (this.playerTable) {
      this.playerTable.traverse(child => {
        // Animate candle flames
        if (child.geometry && child.geometry.type === 'SphereGeometry' && 
            child.material && child.material.color && 
            child.material.color.getHexString() === 'ffff00') {
          
          child.scale.y = 1.5 + Math.sin(time * 0.01) * 0.2;
          child.position.y = 0.13 + Math.sin(time * 0.01) * 0.005;
        }
        
        // Animate candle lights
        if (child instanceof THREE.PointLight && child.intensity === 0.5) {
          child.intensity = 0.5 + Math.sin(time * 0.01) * 0.1;
        }
      });
    }
    
    // Animate wall sconces
    this.restaurantItems.traverse(child => {
      if (child instanceof THREE.PointLight && child.intensity === 0.3) {
        child.intensity = 0.3 + Math.sin(time * 0.003 + Math.random()) * 0.05;
      }
    });
  }
  
  // Method to position characters in the scene
  positionCharacters(characters) {
    if (!this.playerTable) return;
    
    // Position the player and business associates at the dining table
    if (characters && characters.length > 0) {
      characters.forEach(character => {
        if (character.id === 'player') {
          character.model.position.set(0, 0, 3.5);
          character.model.rotation.y = Math.PI;
        } else if (character.id === 'dubois') {
          character.model.position.set(-0.5, 0, 2.7);
        } else if (character.id === 'laurent') {
          character.model.position.set(0.5, 0, 2.7);
        }
      });
    }
  }
}  createFurniture() {
    // Create multiple dining tables throughout the restaurant
    this.createDiningTable(-2.5, 0, -3, 0); // Back left
    this.createDiningTable(2.5, 0, -3, 0);  // Back right
    this.createDiningTable(-2.5, 0, 0, 0);  // Middle left
    this.createDiningTable(2.5, 0, 0, 0);   // Middle right
    this.createDiningTable(0, 0, 3, 0);     // Front center (player's table)
    
    // Bar area
    this.createBar(-3.5, 0, -5);
    
    // Host station
    this.createHostStation(0, 0, 5);
    
    // Decorative divider
    this.createRoomDivider(0, 0, -1.5);
  }
  
  createDiningTable(x, y, z, rotation) {
    // Group for the table and chairs
    const tableGroup = new THREE.Group();
    
    // Table top - round French bistro style
    const tableRadius = 0.8;
    const tableGeometry = new THREE.CylinderGeometry(tableRadius, tableRadius, 0.05, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF, // White tablecloth
      roughness: 0.3
    });
    const tableTop = new THREE.Mesh(tableGeometry, tableMaterial);
    tableTop.position.set(0, 0.75, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);
    
    // Table base
    const baseGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.74, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x696969, // Dark gray
      roughness: 0.4
    });
    const tableBase = new THREE.Mesh(baseGeometry, baseMaterial);
    tableBase.position.set(0, 0.37, 0);
    tableBase.castShadow = true;
    tableGroup.add(tableBase);
    
    // Table foot
    const footGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const tableFoot = new THREE.Mesh(footGeometry, baseMaterial);
    tableFoot.position.set(0, 0.025, 0);
    tableFoot.castShadow = true;
    tableGroup.add(tableFoot);
    
    // Add chairs around the table
    const chairPositions = [
      [0, 0, tableRadius + 0.3, 0],               // Front (player position)
      [0, 0, -(tableRadius + 0.3), Math.PI],      // Back
      [tableRadius + 0.3, 0, 0, Math.PI / 2],     // Right
      [-(tableRadius + 0.3), 0, 0, -Math.PI / 2]  // Left
    ];
    
    chairPositions.forEach(pos => {
      this.createChair(tableGroup, pos[0], pos[1], pos[2], pos[3]);
    });
    
    // Position and add the table group to the scene
    tableGroup.position.set(x, y, z);
    if (rotation) {
      tableGroup.rotation.y = rotation;
    }
    this.restaurantItems.add(tableGroup);
    
    // If this is the player's table (front center), add more detailed table settings
    if (x === 0 && z === 3) {
      this.playerTable = tableGroup;
    }
  }
  
  createChair(parent, x, y, z, rotation) {
    // Chair group
    const chairGroup = new THREE.Group();
    
    // Seat
    const seatGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05, 16);
    const seatMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Wood
      roughness: 0.5
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.45, 0);
    seat.castShadow = true;
    chairGroup.add(seat);
    
    // Backrest (curved for French bistro style)
    const backrestMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.5
    });
    
    // Create a curved backrest using a toroidal segment
    const backRadius = 0.25;
    const tubeRadius = 0.03;
    const backrestGeometry = new THREE.TorusGeometry(backRadius, tubeRadius, 8, 16, Math.PI);
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(0, 0.7, -0.25);
    backrest.rotation.x = Math.PI / 2;
    backrest.castShadow = true;
    chairGroup.add(backrest);
    
    // Backrest vertical supports
    const supportGeometry = new THREE.CylinderGeometry(tubeRadius, tubeRadius, 0.5, 8);
    
    for (let i = -1; i <= 1; i += 2) {
      const support = new THREE.Mesh(supportGeometry, backrestMaterial);
      support.position.set(i * backRadius, 0.7, -0.25);
      support.castShadow = true;
      chairGroup.add(support);
    }
    
    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.45, 8);
    
    const legPositions = [
      [0.15, 0.225, 0.15],
      [-0.15, 0.225, 0.15],
      [0.15, 0.225, -0.15],
      [-0.15, 0.225, -0.15]
    ];
    
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, backrestMaterial);
      leg.position.set(...pos);
      leg.castShadow = true;
      chairGroup.add(leg);
    });
    
    // Position and add the chair to the parent group
    chairGroup.position.set(x, y, z);
    if (rotation) {
      chairGroup.rotation.y = rotation;
    }
    parent.add(chairGroup);
  }
  
  createBar(x, y, z) {
    // Bar group
    const barGroup = new THREE.Group();
    
    // Bar counter
    const counterGeometry = new THREE.BoxGeometry(3, 0.1, 1);
    const counterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3C280D, // Dark wood
      roughness: 0.3
    });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(0, 1, 0);
    counter.castShadow = true;
    barGroup.add(counter);
    
    // Bar front panel
    const frontGeometry = new THREE.BoxGeometry(3, 1, 0.1);
    const frontMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21, // Medium wood
      roughness: 0.4
    });
    const front = new THREE.Mesh(frontGeometry, frontMaterial);
    front.position.set(0, 0.5, 0.45);
    front.castShadow = true;
    barGroup.add(front);
    
    // Bar shelves with bottles
    const shelfGeometry = new THREE.BoxGeometry(2.8, 0.05, 0.3);
    const shelfMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21
    });
    
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
      shelf.position.set(0, 1.3 + i * 0.5, -0.35);
      shelf.castShadow = true;
      barGroup.add(shelf);
      
      // Add bottles to the shelf
      for (let j = -1.2; j <= 1.2; j += 0.3) {
        if (Math.random() > 0.3) { // Random gaps on the shelves
          this.createBottle(barGroup, j, 1.3 + i * 0.5 + 0.15, -0.35);
        }
      }
    }
    
    // Position and add the bar to the scene
    barGroup.position.set(x, y, z);
    this.restaurantItems.add(barGroup);
  }
  
  createBottle(parent, x, y, z) {
    // Random bottle color
    const colors = [0x008000, 0x8B4513, 0xFFD700, 0xFF0000];
    const bottleColor = colors[Math.floor(Math.random() * colors.length)];
    
    const bottleMaterial = new THREE.MeshStandardMaterial({ 
      color: bottleColor,
      transparent: true,
      opacity: 0.8
    });
    
    // Bottle body
    const bodyGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.25, 8);
    const body = new THREE.Mesh(bodyGeometry, bottleMaterial);
    body.position.set(x, y, z);
    body.castShadow = true;
    parent.add(body);
    
    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(0.015, 0.025, 0.1, 8);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.set(x, y + 0.175, z);
    neck.castShadow = true;
    parent.add(neck);
  }
  
  createHostStation(x, y, z) {
    // Host station group
    const stationGroup = new THREE.Group();
    
    // Podium
    const podiumGeometry = new THREE.BoxGeometry(1, 1.1, 0.5);
    const podiumMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21, // Medium wood
      roughness: 0.4
    });
    const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
    podium.position.set(0, 0.55, 0);
    podium.castShadow = true;
    stationGroup.add(podium);
    
    // Decorative panel on podium
    const panelGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const panelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B0000, // Dark red
      roughness: 0.3
    });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(0, 0.6, 0.251);
    stationGroup.add(panel);
    
    // Menu stand
    const standBaseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.2);
    const standBase = new THREE.Mesh(standBaseGeometry, podiumMaterial);
    standBase.position.set(0, 1.1, 0);
    stationGroup.add(standBase);
    
    const menuGeometry = new THREE.BoxGeometry(0.28, 0.4, 0.01);
    const menuMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFF8DC
    });
    const menu = new THREE.Mesh(menuGeometry, menuMaterial);
    menu.position.set(0, 1.3, 0);
    menu.rotation.x = Math.PI * 0.1; // Slight tilt
    stationGroup.add(menu);
    
    // Position and add the host station to the scene
    stationGroup.position.set(x, y, z);
    this.restaurantItems.add(stationGroup);
  }
  
  createRoomDivider(x, y, z) {
    // Room divider group
    const dividerGroup = new THREE.Group();
    
    // Frame
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5C3A21, // Medium wood
      roughness: 0.4
    });
    
    // Horizontal base
    const baseGeometry = new THREE.BoxGeometry(4, 0.1, 0.4);
    const base = new THREE.Mesh(baseGeometry, frameMaterial);
    base.position.set(0, 0.05, 0);
    dividerGroup.add(base);
    
    // Vertical posts
    for (let i = -1.8; i <= 1.8; i += 1.2) {
      const postGeometry = new THREE.BoxGeometry(0.1, 1.8, 0.1);
      const post = new THREE.Mesh(postGeometry, frameMaterial);
      post.position.set(i, 0.9, 0);
      dividerGroup.add(post);
    }
    
    // Horizontal top beam
    const topGeometry = new THREE.BoxGeometry(4, 0.1, 0.1);
    const top = new THREE.Mesh(topGeometry, frameMaterial);
    top.position.set(0, 1.75, 0);
    dividerGroup.add(top);
    
    // Glass panels
    const glassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xDCDCDC,
      transparent: true,
      opacity: 0.6
    });
    
    for (let i = -1.2; i <= 1.2; i += 1.2) {
      const glassGeometry = new THREE.PlaneGeometry(1, 1.5);
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.set(i, 0.9, 0);
      dividerGroup.add(glass);
    }
    
    // Position and add the room divider to the scene
    dividerGroup.position.set(x, y, z);
    dividerGroup.rotation.y = Math.PI / 4; // Angle the divider for visual interest
    this.restaurantItems.add(dividerGroup);
  }// Paris Restaurant Environment Model for Global Business Quest
// This file contains the 3D model creation for the French restaurant scenario

import * as THREE from 'three';

export class ParisRestaurantEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.restaurantItems = new THREE.Group();
    this.scene.add(this.restaurantItems);
    
    // Create the restaurant environment
    this.createRoom();
    this.createFurniture();
    this.createWindows();
    this.createLighting();
    this.createDecorations();
    this.createTableSettings();
  }
  
  createRoom() {
    // Floor - wooden parquet style
    const floorGeometry = new THREE.PlaneGeometry(10, 12);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.4,
      metalness: 0
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.restaurantItems.add(floor);
    
    // Create parquet pattern on floor
    this.createParquetPattern();
    
    // Ceiling with decorative molding
    const ceilingGeometry = new THREE.PlaneGeometry(10, 12);
    const ceilingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFAF0E6
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3.5;
    this.restaurantItems.add(ceiling);
    
    // Ceiling molding
    this.createCeilingMolding();
    
    // Walls with French style
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFF8DC, // Cream color
      roughness: 0.3
    });
    
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(10, 3.5);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 1.75, -6);
    backWall.receiveShadow = true;
    this.restaurantItems.add(backWall);
    
    // Front wall with entrance
    const frontWallLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      wallMaterial
    );
    frontWallLeft.position.set(-3.25, 1.75, 6);
    frontWallLeft.rotation.y = Math.PI;
    this.restaurantItems.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      wallMaterial
    );
    frontWallRight.position.set(3.25, 1.75, 6);
    frontWallRight.rotation.y = Math.PI;
    this.restaurantItems.add(frontWallRight);
    
    // Entrance archway
    this.createEntranceArchway();
    
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(12, 3.5);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-5, 1.75, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    this.restaurantItems.add(leftWall);
    
    // Right wall with windows
    const rightWallGeometry = new THREE.PlaneGeometry(12, 3.5);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(5, 1.75, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    this.restaurantItems.add(rightWall);
    
    // Wall paneling (wainscoting) - typical in French restaurants
    this.createWallPaneling();
  }
  
  createParquetPattern() {
    // Create herringbone parquet pattern
    const plankGeometry = new THREE.PlaneGeometry(0.8, 0.2);
    const plankMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x6B4226,
      roughness: 0.6
    });
    
    for (let x = -4.5; x < 4.5; x += 0.4) {
      for (let z = -5.5; z < 5.5; z += 0.8) {
        // Create first diagonal plank
        const plank1 = new THREE.Mesh(plankGeometry, plankMaterial);
        plank1.rotation.set(-Math.PI / 2, 0, Math.PI / 4);
        plank1.position.set(x, 0.01, z);
        this.restaurantItems.add(plank1);
        
        // Create perpendicular plank
        const plank2 = new THREE.Mesh(plankGeometry, plankMaterial);
        plank2.rotation.set(-Math.PI / 2, 0, -Math.PI / 4);
        plank2.position.set(x + 0.4, 0.01, z + 0.4);
        this.restaurantItems.add(plank2);
      }
    }
  }
  
  createCeilingMolding() {
    const moldingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5F5,
      roughness: 0.2
    });
    
    // Ceiling perimeter molding
    const perimeterPositions = [
      [0, 3.4, -5.9, 10, 0.2, 0.1, 0],
      [0, 3.4, 5.9, 10, 0.2, 0.1, Math.PI],
      [-4.9, 3.4, 0, 12, 0.2, 0.1, Math.PI/2],
      [4.9, 3.4, 0, 12, 0.2, 0.1, -Math.PI/2]
    ];
    
    perimeterPositions.forEach(pos => {
      const molding = new THREE.Mesh(
        new THREE.BoxGeometry(pos[3], pos[4], pos[5]),
        moldingMaterial
      );
      molding.position.set(pos[0], pos[1], pos[2]);
      if (pos[6]) molding.rotation.y = pos[6];
      this.restaurantItems.add(molding);
    });
    
    // Decorative ceiling centerpiece
    const centerGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.05, 32);
    const centerMolding = new THREE.Mesh(centerGeometry, moldingMaterial);
    centerMolding.position.set(0, 3.45, 0);
    this.restaurantItems.add(centerMolding);
    
    // Inner ring
    const innerRingGeometry = new THREE.RingGeometry(0.6, 0.8, 32);
    const innerRingMolding = new THREE.Mesh(innerRingGeometry, moldingMaterial);
    innerRingMolding.position.set(0, 3.44, 0);
    innerRingMolding.rotation.x = -Math.PI / 2;
    this.restaurantItems.add(innerRingMolding);
  }
