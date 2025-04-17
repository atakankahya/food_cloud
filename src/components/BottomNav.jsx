// src/components/BottomNav.jsx

import React from 'react';
import { Home, List, Camera, Bell, ShoppingCart } from 'lucide-react';

const BottomNav = ({ currentScreen, setCurrentScreen }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-t px-4 py-3 flex justify-around">
      <button
        onClick={() => setCurrentScreen('home')}
        className={`flex flex-col items-center ${
          currentScreen === 'home' ? 'text-emerald-600' : 'text-gray-600'
        }`}
      >
        <Home size={24} />
        <span className="text-xs">Home</span>
      </button>
      <button
        onClick={() => setCurrentScreen('inventory')}
        className={`flex flex-col items-center ${
          currentScreen === 'inventory' ? 'text-emerald-600' : 'text-gray-600'
        }`}
      >
        <List size={24} />
        <span className="text-xs">Inventory</span>
      </button>
      <button
        onClick={() => setCurrentScreen('scan')}
        className="flex flex-col items-center justify-center bg-emerald-600 text-white rounded-full h-16 w-16 -mt-8 shadow-lg"
      >
        <Camera size={28} />
        <span className="text-xs mt-1">Scan</span>
      </button>
      <button
        onClick={() => setCurrentScreen('notifications')}
        className={`flex flex-col items-center ${
          currentScreen === 'notifications' ? 'text-emerald-600' : 'text-gray-600'
        }`}
      >
        <Bell size={24} />
        <span className="text-xs">Alerts</span>
      </button>
      <button
        onClick={() => setCurrentScreen('shopping')}
        className={`flex flex-col items-center ${
          currentScreen === 'shopping' ? 'text-emerald-600' : 'text-gray-600'
        }`}
      >
        <ShoppingCart size={24} />
        <span className="text-xs">Shop</span>
      </button>
    </div>
  );
};

export default BottomNav;
