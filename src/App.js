import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ScanScreen from './components/ScanScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import InventoryScreen from './components/InventoryScreen';
import NotificationScreen from './components/NotificationScreen';
import ShoppingListScreen from './components/ShoppingListScreen';
import BottomNav from './components/BottomNav';

import {
  inventoryItems as initialInventoryItems,
  shoppingItems as initialShoppingItems,
  notifications as initialNotifications
} from './utils/data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Lifted state for inventory, shopping, and notifications:
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [shoppingItems, setShoppingItems]     = useState(initialShoppingItems);
  const [notifications, setNotifications]     = useState(initialNotifications);

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

      {currentScreen === 'shopping' && (
        <ShoppingListScreen
          shoppingItems={shoppingItems}
          setShoppingItems={setShoppingItems}
        />
      )}

      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  );
}
