// src/components/InventoryScreen.jsx

import React, { useState } from 'react';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';

const InventoryScreen = ({ inventoryItems, setInventoryItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');        // 'all' | 'expiring' | 'categories'
  const [selectedCategory, setSelectedCategory] = useState(null); // e.g. 'Dairy', 'Fruits', etc.

  // All available categories from your utils/data.js
  const availableCategories = Object.keys(categoryIcons);

  // Builds the final filtered list based on search + filter state
  const filteredItems = (() => {
    let items = inventoryItems;

    // 1) Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q));
    }

    // 2) Expiring filter
    if (activeFilter === 'expiring') {
      items = items.filter(item => item.expiresIn !== null && item.expiresIn <= 3);
    }

    // 3) Category filter
    if (activeFilter === 'categories' && selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  })();

  // Delete an item by ID
  const handleDelete = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        {/* Header + Search */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-lg font-bold text-gray-800">My Inventory</h1>
          <div className="relative mt-3 mb-4">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Filter Buttons */}
          <div className="flex mb-2">
            <button
              onClick={() => { setActiveFilter('all'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              } rounded-l-lg shadow-sm`}
            >
              All
            </button>
            <button
              onClick={() => { setActiveFilter('expiring'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center ${
                activeFilter === 'expiring'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              } border-x border-gray-200`}
            >
              Expiring
            </button>
            <button
              onClick={() => { setActiveFilter('categories'); setSelectedCategory(null); }}
              className={`flex-1 py-2 text-center ${
                activeFilter === 'categories'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              } rounded-r-lg`}
            >
              Categories
            </button>
          </div>

          {/* Category Pills (only when "Categories" is active) */}
          {activeFilter === 'categories' && (
            <div className="flex space-x-3 overflow-x-auto py-2">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
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
            <p className="text-gray-600">Sorted by expiration date</p>
            <button className="text-emerald-600 text-sm font-medium flex items-center">
              <span>Filter</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <span className="text-2xl">{categoryIcons[item.category]}</span>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 mr-2">
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
                  className="p-2 rounded-full bg-gray-100"
                >
                  <Trash2 size={16} className="text-gray-600" />
                </button>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No items found.</p>
            )}
          </div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default InventoryScreen;
