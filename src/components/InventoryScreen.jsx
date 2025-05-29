import React, { useState, useContext } from 'react';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';
import { ThemeContext } from '../App';

export default function InventoryScreen({ inventoryItems, setInventoryItems }) {
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const availableCategories = Object.keys(categoryIcons);

  const filteredItems = (() => {
    let items = inventoryItems;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q));
    }
    if (activeFilter === 'expiring') {
      items = items.filter(item => item.expiresIn !== null && item.expiresIn <= 3);
    }
    if (activeFilter === 'categories' && selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }
    return items;
  })();

  const handleDelete = id => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 shadow-md flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📦</span>
            <div>
              <h1 className="text-2xl font-bold text-white">Inventory</h1>
              <p className="text-sm text-white opacity-80">Manage your kitchen</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              aria-label="Search inventory"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
          </div>

          <div className="flex space-x-2 mb-4">
            {['all', 'expiring', 'categories'].map(type => (
              <button
                key={type}
                onClick={() => { setActiveFilter(type); setSelectedCategory(null); }}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeFilter === type
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 dark:bg-gray-700 text-green-700 dark:text-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          {activeFilter === 'categories' && (
            <div className="flex space-x-2 overflow-x-auto py-2">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <span className="text-lg">{categoryIcons[cat]}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Inventory List */}
        <div className="px-4 pb-24 flex-1 overflow-y-auto">
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center transition hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <span className="text-2xl">{categoryIcons[item.category]}</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity}</p>
                  </div>
                  <p className={`text-xs ${getExpiryColor(item.expiresIn)}`}>
                    {item.expiresIn === null
                      ? 'No expiry'
                      : item.expiresIn <= 0
                      ? 'Expired today'
                      : item.expiresIn === 1
                      ? 'Expires tomorrow'
                      : `Expires in ${item.expiresIn} days`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No items found.</p>
            )}
          </div>
        </div>
      </div>
    </FadeInContainer>
  );
}
