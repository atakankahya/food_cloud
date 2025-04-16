// src/App.jsx

import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ScanScreen from './components/ScanScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import InventoryScreen from './components/InventoryScreen';
import NotificationScreen from './components/NotificationScreen';
import ShoppingListScreen from './components/ShoppingListScreen';
import BottomNav from './components/BottomNav';
import { inventoryItems as initialInventoryItems } from './utils/data';
import { shoppingItems as initialShoppingItems } from './utils/data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems);

  return (
    <div className="relative min-h-screen">
      {currentScreen === 'home' && (
        <HomeScreen inventoryItems={inventoryItems} />
      )}
      {currentScreen === 'scan' && (
        <ScanScreen 
          inventoryItems={inventoryItems} 
          setInventoryItems={setInventoryItems} 
        />
      )}
      {currentScreen === 'product' && <ProductDetailScreen />}
      {currentScreen === 'inventory' && (
        <InventoryScreen 
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
        />
      )}
      {currentScreen === 'notifications' && <NotificationScreen />}
      {currentScreen === 'shopping' && (
        <ShoppingListScreen
          shoppingItems={shoppingItems}
          setShoppingItems={setShoppingItems}
        />
      )}

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}
