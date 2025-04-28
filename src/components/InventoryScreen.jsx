import React, { useState, useContext } from 'react';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';
import { ThemeContext } from '../App';

export default function InventoryScreen({ inventoryItems, setInventoryItems }) {
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');        // 'all' | 'expiring' | 'categories'
  const [selectedCategory, setSelectedCategory] = useState(null); // e.g. 'Dairy', 'Fruits', etc.

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
      <div className="h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header + Search */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
          <h1 className="text-lg font-bold">My Inventory</h1>
          <div className="relative mt-3 mb-4">
            <input
              type="text"
              aria-label="Search inventory"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Filter Buttons */}
          <div className="flex mb-2">
            <button
              onClick={() => { setActiveFilter('all'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center rounded-l-lg shadow-sm transition ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setActiveFilter('expiring'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center border-x border-gray-200 dark:border-gray-600 transition ${
                activeFilter === 'expiring'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Expiring
            </button>
            <button
              onClick={() => { setActiveFilter('categories'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center rounded-r-lg shadow-sm transition ${
                activeFilter === 'categories'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Categories
            </button>
          </div>

          {/* Category Pills */}
          {activeFilter === 'categories' && (
            <div className="flex space-x-3 overflow-x-auto py-2">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <span className="text-lg">{categoryIcons[cat]}</span>
                  <span className="text-sm font-medium">{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Inventory List */}
        <div className="p-4 pb-20">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 dark:text-gray-400">Sorted by expiration date</p>
            <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center">
              <span>Filter</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center transition hover:shadow-md"
              >
                <div className={`${getStatusColor(item.status)} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl">{categoryIcons[item.category]}</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-2">
                      {item.category}
                    </div>
                    <p className={`text-xs ${getExpiryColor(item.expiresIn)}`}>
                      {item.expiresIn === null
                        ? 'No expiry'
                        : item.expiresIn <= 0
                        ? 'Expired today!'
                        : item.expiresIn === 1
                        ? 'Expires tomorrow'
                        : `Expires in ${item.expiresIn} days`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
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
