// Global Business Quest - Texture Management
// This file handles loading and management of textures for the game

import * as THREE from 'three';

// TextureManager class to handle loading and caching of textures
class TextureManager {
  constructor() {
    // Texture loader
    this.loader = new THREE.TextureLoader();
    
    // Texture cache
    this.textures = {};
    
    // Standard materials
    this.materials = {
      wood: new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.7,
        metalness: 0.1
      }),
      metal: new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        roughness: 0.3,
        metalness: 0.7
      }),
      fabric: new THREE.MeshStandardMaterial({ 
        color: 0x2E4372,
        roughness: 0.9,
        metalness: 0.0
      }),
      glass: new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.0
      })
    };
  }
  
  // Load a texture and cache it
  loadTexture(name, url) {
    if (this.textures[name]) {
      return this.textures[name];
    }
    
    const texture = this.loader.load(url);
    this.textures[name] = texture;
    
    return texture;
  }
  
  // Get a texture from cache
  getTexture(name) {
    return this.textures[name];
  }
  
  // Create a material with a texture
  createMaterial(textureName) {
    const texture = this.getTexture(textureName);
    
    if (!texture) {
      console.warn(`Texture "${textureName}" not found, using default material`);
      return new THREE.MeshStandardMaterial({ color: 0xCCCCCC });
    }
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.2
    });
  }
  
  // Create a material for office furniture
  createOfficeMaterial(type) {
    switch (type) {
      case 'desk':
        return this.materials.wood.clone();
      case 'chair':
        return this.materials.fabric.clone();
      case 'computer':
        return this.materials.metal.clone();
      case 'window':
        return this.materials.glass.clone();
      default:
        return new THREE.MeshStandardMaterial({ color: 0xCCCCCC });
    }
  }
  
  // Create a material for restaurant items
  createRestaurantMaterial(type) {
    switch (type) {
      case 'table':
        return this.materials.wood.clone();
      case 'chair':
        return this.materials.fabric.clone();
      case 'plate':
        return new THREE.MeshStandardMaterial({ 
          color: 0xFFFFFF,
          roughness: 0.4,
          metalness: 0.2
        });
      case 'glass':
        return this.materials.glass.clone();
      case 'tablecloth':
        return new THREE.MeshStandardMaterial({ 
          color: 0xFFFFFF,
          roughness: 0.9,
          metalness: 0.0
        });
      default:
        return new THREE.MeshStandardMaterial({ color: 0xCCCCCC });
    }
  }
}

// Create and export a singleton instance
const textureManager = new TextureManager();
export { textureManager };
