// src/components/ScanScreen.jsx

import React, { useState, useContext } from 'react';
import { Camera, Receipt, Check, X } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { categoryIcons } from '../utils/data';
import { ThemeContext } from '../App';

const DEFAULT_SHELF_LIFE = {
  Meat: 3,
  Dairy: 7,
  Fruits: 5,
  Vegetables: 7,
  Bakery: 2,
  Pantry: 180,
};

export default function ScanScreen({ inventoryItems, setInventoryItems }) {
  const { theme } = useContext(ThemeContext);
  const [mode, setMode]             = useState('choose');     // 'choose' | 'scanned' | 'manual'
  const [scanned, setScanned]       = useState(null);
  const [toast, setToast]           = useState('');
  const [manualName, setManualName] = useState('');
  const [manualCategory, setManualCategory] = useState('Dairy');
  const [manualQuantity, setManualQuantity] = useState('');
  const [manualExpiresIn, setManualExpiresIn] = useState('');

  const categories = Object.keys(categoryIcons);

  const handleScan = () => {
    // Simulate scanning “Chicken”
    const name = 'Chicken';
    const category = 'Meat';
    const quantity = '500g';
    const expiresIn = DEFAULT_SHELF_LIFE[category] || null;
    setScanned({ name, category, quantity, expiresIn });
    setMode('scanned');
  };

  const addItem = ({ name, category, quantity, expiresIn }) => {
    const newItem = {
      id: Date.now(),
      name,
      category,
      quantity,
      expiresIn,
      status: expiresIn !== null && expiresIn <= 1 ? 'warning' : 'normal',
    };
    setInventoryItems([newItem, ...inventoryItems]);
    setToast(`${name} added!`);
    setTimeout(() => setToast(''), 2000);
    setMode('choose');
    setScanned(null);
  };

  const handleManualSubmit = e => {
    e.preventDefault();
    const expiresIn =
      manualExpiresIn.trim() === ''
        ? DEFAULT_SHELF_LIFE[manualCategory] || null
        : Number(manualExpiresIn);
    addItem({
      name: manualName,
      category: manualCategory,
      quantity: manualQuantity,
      expiresIn,
    });
    setManualName('');
    setManualQuantity('');
    setManualExpiresIn('');
  };

  const handleScanReceipt = () => {
    alert('Receipt scanning requires OCR/NLP integration.');
  };

  return (
    <FadeInContainer>
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

        {/* Toast */}
        {toast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Scan & Add Items</h1>
          {mode !== 'choose' && (
            <button
              onClick={() => setMode('choose')}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </div>

        {/* Choose Mode */}
        {mode === 'choose' && (
          <div className="flex-1 flex flex-col justify-center space-y-4 px-6">
            <button
              onClick={handleScan}
              className="w-full py-3 bg-green-500 dark:bg-green-400 text-white rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-green-600 dark:hover:bg-green-500 transition"
            >
              <Camera size={24} />
              <span>Scan Product</span>
            </button>
            <button
              onClick={() => setMode('manual')}
              className="w-full py-3 bg-blue-500 dark:bg-blue-400 text-white rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-blue-600 dark:hover:bg-blue-500 transition"
            >
              <Check size={24} />
              <span>Manual Entry</span>
            </button>
            <button
              onClick={handleScanReceipt}
              className="w-full py-3 bg-purple-500 dark:bg-purple-400 text-white rounded-lg flex items-center justify-center space-x-2 shadow hover:bg-purple-600 dark:hover:bg-purple-500 transition"
            >
              <Receipt size={24} />
              <span>Scan Receipt</span>
            </button>
          </div>
        )}

        {/* Scanned Preview */}
        {mode === 'scanned' && scanned && (
          <div className="p-4 bg-white dark:bg-gray-900 flex-1 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Scanned Product</h2>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                {categoryIcons[scanned.category]}
              </div>
              <div>
                <p className="font-medium">{scanned.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {scanned.category} • {scanned.quantity}
                </p>
                <p className="mt-1 text-sm text-green-600">
                  {scanned.expiresIn === null
                    ? 'No expiry estimate'
                    : `Expires in ${scanned.expiresIn} days`}
                </p>
              </div>
            </div>
            <button
              onClick={() => addItem(scanned)}
              className="w-full py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition"
            >
              Add to Inventory
            </button>
          </div>
        )}

        {/* Manual Entry Form */}
        {mode === 'manual' && (
          <form
            onSubmit={handleManualSubmit}
            className="p-4 bg-white dark:bg-gray-900 flex-1 overflow-auto space-y-4"
          >
            <h2 className="text-lg font-semibold">Manual Entry</h2>

            <input
              type="text"
              placeholder="Item Name"
              value={manualName}
              onChange={e => setManualName(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition"
              required
            />

            {/* Category Pills */}
            <div className="flex space-x-2 overflow-x-auto py-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setManualCategory(cat)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full border transition-colors ${
                    manualCategory === cat
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <span className="text-lg">{categoryIcons[cat]}</span>
                  <span className="text-sm">{cat}</span>
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Quantity (e.g., 1 gallon, 6 pcs)"
              value={manualQuantity}
              onChange={e => setManualQuantity(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />

            <input
              type="number"
              placeholder={`Expires in days (est ${DEFAULT_SHELF_LIFE[manualCategory]}d)`}
              value={manualExpiresIn}
              onChange={e => setManualExpiresIn(e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Add Item
            </button>
          </form>
        )}
      </div>
    </FadeInContainer>
  );
}
