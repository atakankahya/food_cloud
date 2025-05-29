import React, { useState, useContext } from 'react';
import { Bell, User, Search, ShoppingBag, ChevronRight, PlusCircle, Moon, Sun, XCircle } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { ThemeContext } from '../App';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';

export default function HomeScreen({ inventoryItems, shoppingItems, setShoppingItems }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState('');

  const filtered = inventoryItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const expiring = filtered.filter(i => i.expiresIn !== null && i.expiresIn <= 3);
  const recent = filtered.slice(0, 8);

  const addToShop = (item) => {
    if (!shoppingItems.some(s => s.name === item.name)) {
      setShoppingItems([...shoppingItems, { id: Date.now(), name: item.name, category: item.category, checked: false }]);
      setToast(`${item.name} added to shopping list`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

        {/* Toast */}
        {toast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 shadow-md flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={32} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Food Cloud</h1>
              <p className="text-sm text-white opacity-80">Smart Kitchen Inventory</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme"
              className="p-2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition">
              {theme === 'light' ? <Moon size={20} className="text-white" /> : <Sun size={20} className="text-white" />}
            </button>
            <button className="p-2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition">
              <Bell size={20} className="text-white" />
            </button>
            <button className="p-2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-50 transition">
              <User size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <input
              aria-label="Search inventory"
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pr-10 rounded-lg bg-white dark:bg-gray-700 shadow focus:ring-2 focus:ring-cyan-500 transition"
            />
            <Search size={20} className="absolute right-4 top-3 text-gray-400 dark:text-gray-300" />
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="px-4">
          <h2 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Expiring Soon</h2>
          <div className="space-y-3">
            {expiring.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center relative hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedItem(item)}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <span className="text-2xl">{categoryIcons[item.category]}</span>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                    {item.expiresIn <= 0 ? 'Expired' : item.expiresIn === 1 ? 'Tomorrow' : `In ${item.expiresIn}d`}
                  </p>
                </div>
                <PlusCircle size={18} className="absolute right-3 bottom-3 text-cyan-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="mt-6 px-4 pb-24">
          <h2 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Recently Added</h2>
          <div className="grid grid-cols-2 gap-3">
            {recent.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center relative hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedItem(item)}>
                <span className="text-2xl mr-2">{categoryIcons[item.category]}</span>
                <p className="font-medium">{item.name}</p>
                <ChevronRight size={20} className="text-gray-400 dark:text-gray-300 absolute right-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Modal Popup */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 shadow-lg relative">
              <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                <XCircle size={24} />
              </button>
              <div className="text-center">
                <div className="text-4xl mb-2">{categoryIcons[selectedItem.category]}</div>
                <h3 className="text-lg font-bold">{selectedItem.name}</h3>
                <p className="text-sm text-gray-500">{selectedItem.category}</p>
                <p className="text-sm mt-1">{selectedItem.quantity || 'No quantity info'}</p>
                <p className={`text-sm ${getExpiryColor(selectedItem.expiresIn)} mt-1`}>
                  {selectedItem.expiresIn === null ? 'No expiry info' :
                    selectedItem.expiresIn <= 0 ? 'Expired' :
                      selectedItem.expiresIn === 1 ? 'Tomorrow' : `In ${selectedItem.expiresIn} days`}
                </p>
                <button onClick={() => { addToShop(selectedItem); setSelectedItem(null); }}
                  className="w-full mt-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition">
                  Add to Shopping List
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </FadeInContainer>
  );
}
