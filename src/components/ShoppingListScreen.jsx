import React, { useState, useContext } from 'react';
import { ShoppingCart, PlusCircle, Search, Trash2 } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { ThemeContext } from '../App';

export default function ShoppingListScreen({ shoppingItems, setShoppingItems }) {
  const { theme } = useContext(ThemeContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Dairy');
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
      <div className="h-full bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center rounded-b-2xl shadow">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={32} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Shopping List</h1>
              <p className="text-sm text-white opacity-80">Create shopping list</p>
            </div>
            
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)}
            aria-label="Add new item"
            className="bg-white p-2 rounded-full text-purple-600 hover:bg-gray-200 transition">
            <PlusCircle size={30} />
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg m-4">
            <input
              type="text"
              aria-label="New item name"
              placeholder="Enter item name"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              className="w-full p-2 mb-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <label className="block text-sm mb-1">Category:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.keys(categoryIcons).map(cat => (
                <button
                  key={cat}
                  onClick={() => setNewItemCategory(cat)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border transition ${
                    newItemCategory === cat
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <span className="text-lg">{categoryIcons[cat]}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
            <button onClick={handleAddItem}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Add Item
            </button>
          </div>
        )}

        {/* Search & List */}
        <div className="p-4 pb-20 flex-1 overflow-y-auto">
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
              <div key={item.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-xl">{categoryIcons[item.category] || '🛒'}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>
                <button onClick={() => setShoppingItems(shoppingItems.filter(i => i.id !== item.id))}
                  aria-label={`Delete ${item.name}`}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
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
