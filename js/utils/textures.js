// Global Business Quest - Texture Management
// This file handles texture loading and application for the different game environments

import * as THREE from 'three';

export class TextureManager {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textures = {};
    this.materials = {};
    
    // Initialize textures
    this.initTextures();
  }
  
  // Initialize all textures used in the game
  initTextures() {
    // Common textures
    this.loadTexture('wood', 'assets/textures/wood.jpg');
    this.loadTexture('fabric', 'assets/textures/fabric.jpg');
    this.loadTexture('metal', 'assets/textures/metal.jpg');
    this.loadTexture('paper', 'assets/textures/paper.jpg');
    
    // Japan-specific textures
    this.loadTexture('tatami', 'assets/textures/japan/tatami.jpg');
    this.loadTexture('shoji', 'assets/textures/japan/shoji.jpg');
    this.loadTexture('kanji', 'assets/textures/japan/kanji.jpg');
    
    // France-specific textures
    this.loadTexture('parquet', 'assets/textures/france/parquet.jpg');
    this.loadTexture('marble', 'assets/textures/france/marble.jpg');
    this.loadTexture('tablecloth', 'assets/textures/france/tablecloth.jpg');
    
    // Create standard materials
    this.createStandardMaterials();
  }
  
  // Load a texture and store it in the textures object
  loadTexture(name, path) {
    try {
      const texture = this.textureLoader.load(path);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      this.textures[name] = texture;
      return texture;
    } catch (error) {
      console.error(`Failed to load texture: ${name} from ${path}`, error);
      // Create a fallback colored texture
      return this.createFallbackTexture(name);
    }
  }
  
  // Create a fallback texture with a color based on the name
  createFallbackTexture(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    // Use a consistent color based on the name
    let color;
    switch (name) {
      case 'wood':
      case 'parquet':
        color = '#8B4513';
        break;
      case 'fabric':
      case 'tablecloth':
        color = '#FFFFFF';
        break;
      case 'metal':
        color = '#C0C0C0';
        break;
      case 'paper':
      case 'shoji':
        color = '#FFF8DC';
        break;
      case 'tatami':
        color = '#A09470';
        break;
      case 'kanji':
        color = '#000000';
        break;
      case 'marble':
        color = '#F5F5F5';
        break;
      default:
        color = '#AAAAAA';
    }
    
    // Fill the canvas with the selected color
    context.fillStyle = color;
    context.fillRect(0, 0, 128, 128);
    
    // Add a simple pattern to differentiate textures
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    context.beginPath();
    
    // Different patterns for different texture types
    if (['wood', 'parquet'].includes(name)) {
      // Wood grain pattern
      for (let i = 0; i < 128; i += 8) {
        context.moveTo(0, i);
        context.bezierCurveTo(32, i + 4, 96, i - 4, 128, i);
      }
    } else if (['fabric', 'tablecloth'].includes(name)) {
      // Fabric weave pattern
      for (let i = 0; i < 128; i += 8) {
        context.moveTo(0, i);
        context.lineTo(128, i);
        context.moveTo(i, 0);
        context.lineTo(i, 128);
      }
    } else if (name === 'metal') {
      // Brushed metal pattern
      for (let i = 0; i < 128; i += 2) {
        context.moveTo(0, i);
        context.lineTo(128, i);
      }
    } else if (['paper', 'shoji'].includes(name)) {
      // Paper texture with subtle grid
      for (let i = 0; i < 128; i += 32) {
        context.moveTo(0, i);
        context.lineTo(128, i);
        context.moveTo(i, 0);
        context.lineTo(i, 128);
      }
    } else if (name === 'tatami') {
      // Tatami mat pattern
      for (let i = 0; i < 128; i += 16) {
        context.moveTo(0, i);
        context.lineTo(128, i);
      }
      context.moveTo(64, 0);
      context.lineTo(64, 128);
    } else if (name === 'kanji') {
      // Abstract character-like marks
      context.strokeStyle = '#000000';
      context.moveTo(32, 32);
      context.lineTo(96, 32);
      context.moveTo(64, 32);
      context.lineTo(64, 96);
      context.moveTo(32, 64);
      context.lineTo(96, 64);
    } else if (name === 'marble') {
      // Marble-like veins
      for (let i = 0; i < 5; i++) {
        context.moveTo(Math.random() * 128, 0);
        context.bezierCurveTo(
          Math.random() * 128, Math.random() * 128,
          Math.random() * 128, Math.random() * 128,
          Math.random() * 128, 128
        );
      }
    }
    
    context.stroke();
    
    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.textures[name] = texture;
    
    return texture;
  }
  
  // Create standard materials used throughout the game
  createStandardMaterials() {
    // Wood materials
    this.materials.wood = new THREE.MeshStandardMaterial({
      map: this.textures.wood,
      roughness: 0.7,
      metalness: 0.1
    });
    
    this.materials.darkWood = new THREE.MeshStandardMaterial({
      map: this.textures.wood,
      color: 0x5C3A21,
      roughness: 0.5,
      metalness: 0.1
    });
    
    this.materials.lightWood = new THREE.MeshStandardMaterial({
      map: this.textures.wood,
      color: 0xAA8866,
      roughness: 0.6,
      metalness: 0.1
    });
    
    // Metal materials
    this.materials.metal = new THREE.MeshStandardMaterial({
      map: this.textures.metal,
      roughness: 0.2,
      metalness: 0.8
    });
    
    this.materials.chrome = new THREE.MeshStandardMaterial({
      map: this.textures.metal,
      color: 0xCCCCCC,
      roughness: 0.1,
      metalness: 0.9
    });
    
    // Fabric materials
    this.materials.fabric = new THREE.MeshStandardMaterial({
      map: this.textures.fabric,
      roughness: 0.8,
      metalness: 0
    });
    
    this.materials.tablecloth = new THREE.MeshStandardMaterial({
      map: this.textures.tablecloth,
      color: 0xFFFFFF,
      roughness: 0.6,
      metalness: 0
    });
    
    // Glass material
    this.materials.glass = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      transmission: 0.9,
      ior: 1.5
    });
    
    // Paper materials
    this.materials.paper = new THREE.MeshStandardMaterial({
      map: this.textures.paper,
      color: 0xFFFCF0,
      roughness: 0.9,
      metalness: 0
    });
    
    // Japan-specific materials
    this.materials.tatami = new THREE.MeshStandardMaterial({
      map: this.textures.tatami,
      roughness: 0.8,
      metalness: 0
    });
    
    this.materials.shoji = new THREE.MeshStandardMaterial({
      map: this.textures.shoji,
      color: 0xFFFFFA,
      transparent: true,
      opacity: 0.7,
      roughness: 0.5,
      metalness: 0
    });
    
    // France-specific materials
    this.materials.parquet = new THREE.MeshStandardMaterial({
      map: this.textures.parquet,
      roughness: 0.6,
      metalness: 0.1
    });
    
    this.materials.marble = new THREE.MeshStandardMaterial({
      map: this.textures.marble,
      roughness: 0.2,
      metalness: 0.1
    });
  }
  
  // Apply textures to a Tokyo office environment
  applyTokyoOfficeTextures(environment) {
    if (!environment || !environment.officeItems) return;
    
    // Find and texture the floor
    environment.officeItems.traverse(child => {
      if (child instanceof THREE.Mesh) {
        // Floor
        if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
            child.rotation.x === -Math.PI / 2 && child.position.y === 0) {
          child.material = this.materials.tatami.clone();
          child.material.map.repeat.set(5, 4);
        }
        
        // Walls
        else if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
                child.position.y === 1.5) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xF5F5F5,
            roughness: 0.2,
            map: this.textures.paper
          });
          child.material.map.repeat.set(3, 1.5);
        }
        
        // Ceiling
        else if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
                child.rotation.x === Math.PI / 2) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.1,
            map: this.textures.paper
          });
          child.material.map.repeat.set(5, 4);
        }
        
        // Conference table
        else if (child.geometry && child.geometry.type === 'BoxGeometry' && 
                child.geometry.parameters.width === 4 && 
                child.geometry.parameters.height === 0.1) {
          child.material = this.materials.darkWood.clone();
          child.material.map.repeat.set(2, 1);
        }
        
        // Chairs
        else if (child.geometry && 
                (child.geometry.type === 'BoxGeometry' || child.geometry.type === 'CylinderGeometry') && 
                child.position.y >= 0.025 && child.position.y <= 0.7) {
          if (child.geometry.parameters.radius === 0.3) {
            // Chair base
            child.material = this.materials.metal.clone();
          } else if (child.geometry.parameters.height === 0.1) {
            // Seat
            child.material = new THREE.MeshStandardMaterial({
              color: 0x000000,
              roughness: 0.5,
              map: this.textures.fabric
            });
            child.material.map.repeat.set(0.3, 0.3);
          }
        }
        
        // Whiteboard
        else if (child.geometry && child.geometry.type === 'BoxGeometry' && 
                child.position.y === 1.7 && child.position.x === -4.97) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.1,
            map: this.textures.paper
          });
        }
        
        // Business cards
        else if (child.geometry && child.geometry.type === 'BoxGeometry' && 
                child.position.y === 0.76 + 0.06 && child.position.z === 0) {
          child.material = this.materials.paper.clone();
          child.material.map.repeat.set(0.15, 0.1);
        }
        
        // Calligraphy
        else if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
                child.position.x < -1 && child.position.y === 1.8) {
          child.material = new THREE.MeshStandardMaterial({
            map: this.textures.kanji,
            color: 0x000000,
            roughness: 0.5
          });
        }
      }
    });
  }
  
  // Apply textures to a Paris restaurant environment
  applyParisRestaurantTextures(environment) {
    if (!environment || !environment.restaurantItems) return;
    
    // Find and texture various elements
    environment.restaurantItems.traverse(child => {
      if (child instanceof THREE.Mesh) {
        // Floor
        if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
            child.rotation.x === -Math.PI / 2 && child.position.y === 0) {
          child.material = this.materials.parquet.clone();
          child.material.map.repeat.set(5, 6);
        }
        
        // Walls
        else if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
                child.position.y === 1.75) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xFFF8DC,
            roughness: 0.3,
            map: this.textures.paper
          });
          child.material.map.repeat.set(5, 1.75);
        }
        
        // Ceiling
        else if (child.geometry && child.geometry.type === 'PlaneGeometry' && 
                child.rotation.x === Math.PI / 2) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xFAF0E6,
            roughness: 0.1,
            map: this.textures.paper
          });
          child.material.map.repeat.set(5, 6);
        }
        
        // Table tops
        else if (child.geometry && child.geometry.type === 'CylinderGeometry' && 
                child.geometry.parameters.height === 0.05 && 
                child.position.y === 0.75) {
          child.material = this.materials.tablecloth.clone();
          child.material.map.repeat.set(1, 1);
        }
        
        // Chairs
        else if (child.geometry && child.geometry.type === 'CylinderGeometry' && 
                child.position.y === 0.45 && child.geometry.parameters.height === 0.05) {
          child.material = this.materials.lightWood.clone();
          child.material.map.repeat.set(0.5, 0.5);
        }
        
        // Chair backrest
        else if (child.geometry && child.geometry.type === 'TorusGeometry') {
          child.material = this.materials.lightWood.clone();
        }
        
        // Wine glasses
        else if (child.geometry && 
                (child.geometry.type === 'CylinderGeometry' || child.geometry.type === 'SphereGeometry') && 
                child.material && child.material.transparent) {
          child.material = this.materials.glass.clone();
        }
        
        // Plates
        else if (child.geometry && child.geometry.type === 'CircleGeometry') {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.1,
            map: this.textures.marble
          });
          child.material.map.repeat.set(0.3, 0.3);
        }
        
        // Bar counter
        else if (child.geometry && child.geometry.type === 'BoxGeometry' && 
                child.position.y === 1 && 
                child.geometry.parameters.width === 3) {
          child.material = this.materials.darkWood.clone();
          child.material.map.repeat.set(3, 1);
        }
        
        // Wine bottles
        else if (child.geometry && child.geometry.type === 'CylinderGeometry' && 
                child.geometry.parameters.height === 0.25) {
          // Keep the existing colored material, just add glass-like properties
          const originalColor = child.material.color.clone();
          child.material = new THREE.MeshPhysicalMaterial({
            color: originalColor,
            transparent: true,
            opacity: 0.8,
            roughness: 0.2,
            transmission: 0.1
          });
        }
      }
    });
    
    // Apply textures to table settings if they exist
    if (environment.playerTable) {
      environment.playerTable.traverse(child => {
        if (child instanceof THREE.Mesh) {
          // Tablecloth
          if (child.geometry && child.geometry.type === 'CircleGeometry' && 
              child.position.y === 0.755) {
            child.material = this.materials.tablecloth.clone();
            child.material.map.repeat.set(0.85, 0.85);
          }
          
          // Silverware
          else if (child.geometry && 
                  (child.geometry.type === 'BoxGeometry') && 
                  child.position.y === 0 && 
                  (Math.abs(child.position.x) === 0.18 || 
                  child.position.x === -0.18 + -1 * 0.01 || 
                  child.position.x === -0.18 + 0 * 0.01 || 
                  child.position.x === -0.18 + 1 * 0.01)) {
            child.material = this.materials.chrome.clone();
          }
          
          // Wine in glasses
          else if (child.geometry && child.geometry.type === 'SphereGeometry' && 
                  child.material && child.material.color && 
                  child.material.color.getHexString() === '8b0000') {
            // Keep wine color but make it glass-like
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x8B0000,
              transparent: true,
              opacity: 0.8,
              roughness: 0.2,
              transmission: 0.1
            });
          }
          
          // Candle flame
          else if (child.geometry && child.geometry.type === 'SphereGeometry' && 
                  child.material && child.material.color && 
                  child.material.color.getHexString() === 'ffff00') {
            // Keep the existing emissive material
          }
          
          // Bread
          else if (child.geometry && child.geometry.type === 'SphereGeometry' && 
                  child.scale.y === 0.7) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xDEB887,
              roughness: 0.9,
              map: this.textures.fabric
            });
            child.material.map.repeat.set(0.1, 0.1);
          }
        }
      });
    }
  }
  
  // Get a material by name
  getMaterial(name) {
    return this.materials[name] || new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
  }
  
  // Get a texture by name
  getTexture(name) {
    return this.textures[name] || this.createFallbackTexture(name);
  }
  
  // Create a custom material with specified properties
  createCustomMaterial(options = {}) {
    const material = new THREE.MeshStandardMaterial({
      color: options.color || 0xFFFFFF,
      roughness: options.roughness !== undefined ? options.roughness : 0.5,
      metalness: options.metalness !== undefined ? options.metalness : 0.1,
      transparent: options.transparent || false,
      opacity: options.opacity !== undefined ? options.opacity : 1.0,
      map: options.texture ? this.getTexture(options.texture) : null
    });
    
    if (options.textureRepeat && material.map) {
      material.map.repeat.set(
        options.textureRepeat.x || 1, 
        options.textureRepeat.y || 1
      );
    }
    
    return material;
  }
}

// Export a singleton instance
export const textureManager = new TextureManager();
