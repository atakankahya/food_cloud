// src/components/HomeScreen.jsx

import React, { useState } from 'react';
import { Bell, User, Search, ShoppingBag, ChevronRight } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { getExpiryColor, getStatusColor } from '../utils/helpers';

const HomeScreen = ({ inventoryItems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the shared inventory items based on search query.
  const filteredInventoryItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        {/* Improved Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <ShoppingBag size={32} className="text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Food Cloud</h1>
                <p className="text-sm text-white opacity-90">Smart Kitchen Inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                <Bell size={22} className="text-white" />
              </button>
              <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                <User size={22} className="text-white" />
              </button>
            </div>
          </div>

          {/* Statistic Cards */}
          <div className="flex space-x-3 mb-5">
            {['Tracked Items', 'Expiring Soon', 'Saved Items'].map((label, index) => (
              <div
                key={index}
                className="flex-1 p-4 bg-white bg-opacity-15 backdrop-blur-sm rounded-lg border border-white border-opacity-20"
              >
                <p className="text-xs text-white text-opacity-90">{label}</p>
                <p className="text-xl font-bold text-white">
                  {label === 'Expiring Soon'
                    ?  filteredInventoryItems.filter(item => item.expiresIn <= 3).length
                    : label === 'Tracked Items'
                    ? inventoryItems.length
                    : 8 /* example number for Saved Items */}
                </p>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pr-10 rounded-lg bg-white bg-opacity-15 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
            />
            <Search size={20} className="absolute right-3 top-3.5 text-white text-opacity-70" />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pt-6 pb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Expiring Soon</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3 mb-8">
            {filteredInventoryItems.filter(item => item.expiresIn <= 3).map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(item.status)}`}>
                  <span className="text-2xl">{categoryIcons[item.category]}</span>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 mr-2">
                      {item.quantity}
                    </div>
                    <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                      {item.expiresIn === null
                        ? ''
                        : item.expiresIn <= 0
                        ? 'Expired today!'
                        : item.expiresIn === 1
                        ? 'Expires tomorrow'
                        : `Expires in ${item.expiresIn} days`}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
          {/* Recently Added Section remains unchanged */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recently Added</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredInventoryItems.slice(0, 4).map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{categoryIcons[item.category]}</span>
                    <p className="font-medium text-gray-800">{item.name}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                    {item.expiresIn === null
                      ? ''
                      : item.expiresIn <= 0
                      ? 'Expired today!'
                      : item.expiresIn === 1
                      ? 'Expires tomorrow'
                      : `Expires in ${item.expiresIn} days`}
                  </p>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{item.quantity}</span>
                </div>
                <div
                  className={`absolute w-1 h-full top-0 left-0 ${
                    item.expiresIn <= 1
                      ? 'bg-red-500'
                      : item.expiresIn <= 3
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default HomeScreen;
