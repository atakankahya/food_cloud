// src/components/HomeScreen.jsx
import React, { useState, useContext } from 'react';
import { Bell, User, Search, ShoppingBag, ChevronRight, PlusCircle, Sun, Moon } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import BackButton from './BackButton';
import { ThemeContext } from '../App';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';

export default function HomeScreen({ inventoryItems, shoppingItems, setShoppingItems }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllExpiring, setShowAllExpiring] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [toast, setToast] = useState('');

  const filtered = inventoryItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const expiring = filtered.filter(i => i.expiresIn !== null && i.expiresIn <= 3);
  const recent   = filtered.slice(0, 8);

  const addToShop = (item) => {
    if (!shoppingItems.some(s => s.name === item.name)) {
      setShoppingItems([...shoppingItems, { id:Date.now(), name:item.name, category:item.category, checked:false }]);
      setToast(`${item.name} added!`);
      setTimeout(()=>setToast(''), 2000);
    }
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-md flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={32} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Food Cloud</h1>
              <p className="text-sm text-white opacity-90">Smart Kitchen Inventory</p>
            </div>
          </div>
          <div className="space-x-4 flex items-center">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
            >
              {theme === 'light' ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-white" />}
            </button>
            <button aria-label="Notifications" className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
              <Bell size={22} className="text-white" />
            </button>
            <button aria-label="User profile" className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
              <User size={22} className="text-white" />
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow transition-opacity duration-300">
            {toast}
          </div>
        )}

        {/* Search & Stats */}
        <div className="px-6 py-4 space-y-4 flex-1 overflow-auto">
          <div className="relative">
            <input
              aria-label="Search inventory"
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <Search size={20} className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Expiring Soon */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Expiring Soon</h2>
              <button
                onClick={()=>setShowAllExpiring(!showAllExpiring)}
                className="text-emerald-600 hover:underline text-sm font-medium"
              >
                {showAllExpiring? 'Collapse':'View All'}
              </button>
            </div>
            <div className="space-y-3">
              {(showAllExpiring? expiring: expiring.slice(0,3)).map(item=>(
                <div key={item.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition flex items-center relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(item.status)}`}>
                    <span className="text-2xl">{categoryIcons[item.category]}</span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                      {item.expiresIn <=0?'Expired': item.expiresIn===1?'Tomorrow':`In ${item.expiresIn}d`}
                    </p>
                  </div>
                  <button
                    onClick={()=>addToShop(item)}
                    aria-label={`Add ${item.name} to shopping list`}
                    className="absolute right-3 bottom-3 p-2 bg-emerald-100 dark:bg-emerald-200 text-emerald-700 rounded-full hover:bg-emerald-200 transition"
                  >
                    <PlusCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Recently Added</h2>
              <button
                onClick={()=>setShowAllRecent(!showAllRecent)}
                className="text-emerald-600 hover:underline text-sm font-medium"
              >
                {showAllRecent? 'Collapse':'View All'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(showAllRecent? filtered: filtered.slice(0,4)).map(item=>(
                <div key={item.id} className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition relative">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{categoryIcons[item.category]}</span>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 dark:text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </FadeInContainer>
  );
}
