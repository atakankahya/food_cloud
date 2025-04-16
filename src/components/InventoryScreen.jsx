// src/components/InventoryScreen.jsx

import React, { useState } from 'react';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';

const InventoryScreen = ({ inventoryItems, setInventoryItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use filtered inventory based on the search query.
  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to delete an item by id.
  const handleDelete = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-lg font-bold text-gray-800">My Inventory</h1>
          <div className="relative mt-3 mb-4">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500" />
          </div>
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
                        ? ' '
                        : item.expiresIn <= 0
                        ? 'Expired today!'
                        : item.expiresIn === 1
                        ? 'Expires tomorrow'
                        : `Expires in ${item.expiresIn} days`}
                    </p>
                  </div>
                </div>
                {/* Only Delete Button Now */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full bg-gray-100"
                  >
                    <Trash2 size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default InventoryScreen;
