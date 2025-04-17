// src/components/ShoppingListScreen.jsx

import React, { useState } from 'react';
import { ShoppingCart, PlusCircle, Search, Trash2 } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';

const ShoppingListScreen = ({ shoppingItems, setShoppingItems }) => {
  // Local state for the add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Fruits'); // default

  // NEW: State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handler for adding a new shopping item
  const handleAddItem = () => {
    if (newItemName.trim() === '') return;

    const newItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      checked: false,
    };

    setShoppingItems([...shoppingItems, newItem]);
    setNewItemName('');
    setShowAddForm(false);
  };

  // Filter shopping items by search query
  const filteredItems = shoppingItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingCart size={24} className="text-white mr-2" />
            <h1 className="text-xl font-bold text-white">Shopping List</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white p-2 rounded-full text-purple-600"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Add New Shopping Item Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-100">
            <input
              type="text"
              placeholder="Enter item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="mb-2">
              <label className="block text-sm mb-1">Category:</label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {Object.keys(categoryIcons).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddItem}
              className="w-full py-2 bg-purple-600 text-white rounded"
            >
              Add Item
            </button>
          </div>
        )}

        {/* Shopping List Content */}
        <div className="p-4 pb-20">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search shopping list..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500" />
          </div>
          {/* Render Filtered Items */}
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                    <span className="text-xl">{categoryIcons[item.category] || '🛒'}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setShoppingItems(shoppingItems.filter(i => i.id !== item.id))
                    }
                    className="p-2 bg-gray-100 rounded-full"
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

export default ShoppingListScreen;
