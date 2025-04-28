// src/components/BottomNav.jsx

import React, { useContext } from 'react';
import { Home, List, Camera, Bell, ShoppingCart } from 'lucide-react';
import { ThemeContext } from '../App';

export default function BottomNav({ currentScreen, setCurrentScreen }) {
  const { theme } = useContext(ThemeContext);

  // Common classes for each tab
  const baseBtn = 'flex flex-col items-center py-2 flex-1';
  const activeText = 'text-emerald-600 dark:text-emerald-400';
  const inactiveText = 'text-gray-600 dark:text-gray-400';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex">
        <button
          onClick={() => setCurrentScreen('home')}
          aria-label="Home"
          className={`${baseBtn} ${currentScreen === 'home' ? activeText : inactiveText}`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => setCurrentScreen('inventory')}
          aria-label="Inventory"
          className={`${baseBtn} ${currentScreen === 'inventory' ? activeText : inactiveText}`}
        >
          <List size={24} />
          <span className="text-xs">Inventory</span>
        </button>

        <button
          onClick={() => setCurrentScreen('scan')}
          aria-label="Scan"
          className="relative -mt-4 flex-none"
        >
          <div
            className="w-16 h-16 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center shadow-lg"
          >
            <Camera size={28} className="text-white" />
          </div>
          <span className={`block text-center mt-1 text-xs ${currentScreen === 'scan' ? activeText : inactiveText}`}>
            Scan
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen('notifications')}
          aria-label="Alerts"
          className={`${baseBtn} ${currentScreen === 'notifications' ? activeText : inactiveText}`}
        >
          <Bell size={24} />
          <span className="text-xs">Alerts</span>
        </button>

        <button
          onClick={() => setCurrentScreen('shopping')}
          aria-label="Shop"
          className={`${baseBtn} ${currentScreen === 'shopping' ? activeText : inactiveText}`}
        >
          <ShoppingCart size={24} />
          <span className="text-xs">Shop</span>
        </button>
      </div>
    </nav>
  );
}
