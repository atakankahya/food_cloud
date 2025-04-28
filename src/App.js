// src/App.js

import React, { useState, useEffect, createContext } from 'react';
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

// Create a ThemeContext so any component can toggle between light/dark
export const ThemeContext = createContext();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Lifted state for inventory, shopping list, and notifications
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [shoppingItems, setShoppingItems]   = useState(initialShoppingItems);
  const [notifications, setNotifications]   = useState(initialNotifications);

  // Theme state
  const [theme, setTheme] = useState('light');

  // Whenever theme changes, add or remove "dark" on the html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* 
        The outer div now supports dark mode via Tailwind's dark: variants.
        Dark background for dark theme, light for light theme.
      */}
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
        {currentScreen === 'home' && (
          <HomeScreen
            inventoryItems={inventoryItems}
            shoppingItems={shoppingItems}
            setShoppingItems={setShoppingItems}
          />
        )}

        {currentScreen === 'scan' && (
          <ScanScreen
            inventoryItems={inventoryItems}
            setInventoryItems={setInventoryItems}
          />
        )}

        {currentScreen === 'product' && (
          <ProductDetailScreen />
        )}

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
    </ThemeContext.Provider>
  );
}
