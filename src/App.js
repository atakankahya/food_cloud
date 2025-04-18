// src/App.jsx

import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ScanScreen from './components/ScanScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import InventoryScreen from './components/InventoryScreen';
import NotificationScreen from './components/NotificationScreen';
import ShoppingListScreen from './components/ShoppingListScreen';
import BottomNav from './components/BottomNav';
<<<<<<< HEAD

import {
  inventoryItems as initialInventoryItems,
  shoppingItems as initialShoppingItems,
  notifications as initialNotifications
} from './utils/data';
=======
import { inventoryItems as initialInventoryItems } from './utils/data';
import { shoppingItems as initialShoppingItems } from './utils/data';
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems);

<<<<<<< HEAD
  // Lifted state for inventory, shopping, and notifications:
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [shoppingItems, setShoppingItems]     = useState(initialShoppingItems);
  const [notifications, setNotifications]     = useState(initialNotifications);

=======
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317
  return (
    <div className="relative min-h-screen">
      {currentScreen === 'home' && (
        <HomeScreen inventoryItems={inventoryItems} />
      )}
<<<<<<< HEAD

      {currentScreen === 'scan' && (
        <ScanScreen
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
        />
      )}

      {currentScreen === 'product' && <ProductDetailScreen />}

      {currentScreen === 'inventory' && (
        <InventoryScreen
=======
      {currentScreen === 'scan' && (
        <ScanScreen 
          inventoryItems={inventoryItems} 
          setInventoryItems={setInventoryItems} 
        />
      )}
      {currentScreen === 'product' && <ProductDetailScreen />}
      {currentScreen === 'inventory' && (
        <InventoryScreen 
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
        />
      )}
<<<<<<< HEAD

      {currentScreen === 'notifications' && (
        <NotificationScreen
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
          shoppingItems={shoppingItems}
          setShoppingItems={setShoppingItems}
          notifications={notifications}
          setNotifications={setNotifications}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}

=======
      {currentScreen === 'notifications' && <NotificationScreen />}
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317
      {currentScreen === 'shopping' && (
        <ShoppingListScreen
          shoppingItems={shoppingItems}
          setShoppingItems={setShoppingItems}
        />
      )}

<<<<<<< HEAD
      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
=======
      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317
    </div>
  );
}
