import React, { useState, useContext } from 'react';
import { ShoppingCart, PlusCircle, Search, Trash2 } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { ThemeContext } from '../App';

export default function ShoppingListScreen({ shoppingItems, setShoppingItems }) {
  const { theme } = useContext(ThemeContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Fruits');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = shoppingItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    setShoppingItems([
      ...shoppingItems,
      { id: Date.now(), name: newItemName, category: newItemCategory, checked: false }
    ]);
    setNewItemName('');
    setShowAddForm(false);
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 shadow-md flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={24} className="text-white" />
            <h1 className="text-xl font-bold text-white">Shopping List</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            aria-label="Add new item"
            className="bg-white p-2 rounded-full text-purple-600 hover:bg-gray-200 transition"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              aria-label="New item name"
              placeholder="Enter item name"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              className="w-full p-2 mb-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition"
            />
            <div className="mb-2">
              <label className="block text-sm mb-1">Category:</label>
              <select
                value={newItemCategory}
                onChange={e => setNewItemCategory(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none transition"
              >
                {Object.keys(categoryIcons).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddItem}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Add Item
            </button>
          </div>
        )}

        {/* List */}
        <div className="p-4 pb-20">
          <div className="relative mb-4">
            <input
              type="text"
              aria-label="Search shopping list"
              placeholder="Search shopping list..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-xl">{categoryIcons[item.category] || '🛒'}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShoppingItems(shoppingItems.filter(i => i.id !== item.id))}
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
