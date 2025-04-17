// src/components/ScanScreen.jsx

import React, { useState } from 'react';
import { Camera, Check, Edit2 } from 'lucide-react';
import FadeInContainer from './FadeInContainer';

const ScanScreen = ({ inventoryItems, setInventoryItems }) => {
  // State to simulate a scanned product preview.
  const [scannedProduct, setScannedProduct] = useState(null);
  // State to control display of the manual entry form.
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Dummy product data for "Scan and Add".
  const dummyProduct = {
    name: 'Organic Milk',
    category: 'Dairy',
    quantity: '1 gallon',
    expiresIn: 2,
    expiryInfo: 'Expires in 2 days',
    icon: '🥛',
    status: 'normal'
  };

  // Toast message state (for confirming addition).
  const [message, setMessage] = useState('');

  // Handlers for buttons.
  const handleScanAndAdd = () => {
    setScannedProduct(dummyProduct);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    // Optionally clear any scanned product.
    setScannedProduct(null);
  };

  // State for manual entry form fields.
  const [manualName, setManualName] = useState('');
  const [manualCategory, setManualCategory] = useState('Dairy'); // default
  const [manualQuantity, setManualQuantity] = useState('');
  const [manualExpiresIn, setManualExpiresIn] = useState(''); // left blank for non-expiring items

  const handleManualEntrySubmit = (e) => {
    e.preventDefault();

    // If the expiration field is blank, set expiresIn to null.
    const expiresIn = manualExpiresIn.trim() === '' ? null : Number(manualExpiresIn);

    // Build the new item.
    const newItem = {
      id: Date.now(),
      name: manualName || 'Unnamed Item',
      category: manualCategory || 'Unknown',
      quantity: manualQuantity || '',
      expiresIn, // may be null if user didn't specify an expiration
      status: 'normal'
    };

    // Add the new item to the shared inventory state.
    setInventoryItems([...inventoryItems, newItem]);

    // Show confirmation message.
    setMessage('Item added!');
    // Clear form fields.
    setManualName('');
    setManualCategory('Dairy');
    setManualQuantity('');
    setManualExpiresIn('');
    setShowManualEntry(false);

    // Remove the confirmation message after 2 seconds.
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50 flex flex-col">
        {/* Header Area */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 shadow-md text-center">
          <h1 className="text-2xl font-bold text-white">Scan & Add Items</h1>
          <p className="text-sm text-white opacity-90 mt-1">
            Quickly scan your food or manually add an item.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <button
            onClick={handleScanAndAdd}
            className="w-full py-4 bg-green-600 text-white rounded-lg shadow-lg mb-4 flex items-center justify-center space-x-2"
          >
            <Camera size={24} />
            <span className="text-lg font-medium">Scan and Add</span>
          </button>

          <button
            onClick={handleManualEntry}
            className="w-full py-4 bg-gray-200 text-gray-800 rounded-lg shadow-lg flex items-center justify-center space-x-2"
          >
            <Edit2 size={24} />
            <span className="text-lg font-medium">Manual Entry</span>
          </button>
        </div>

        {/* Show confirmation message if applicable */}
        {message && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition duration-300">
            {message}
            
          </div>
        )}

        {/* Manual Entry Form */}
        {showManualEntry && (
          <div className="p-4 bg-white shadow-sm border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Manual Entry</h2>
            <form onSubmit={handleManualEntrySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <div>
                <label className="block text-sm mb-1">Category:</label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Dairy">Dairy</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Meat">Meat</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Pantry">Pantry</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Quantity (e.g., 1 gallon, 6 pcs)"
                value={manualQuantity}
                onChange={(e) => setManualQuantity(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Expires in (days) [leave blank if not applicable]"
                value={manualExpiresIn}
                onChange={(e) => setManualExpiresIn(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded"
              >
                Add Item
              </button>
            </form>
          </div>
        )}

        {/* Simulated Scanned Product Preview */}
        {scannedProduct && (
          <div className="p-4 bg-white shadow-sm border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Scanned Product</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                {scannedProduct.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{scannedProduct.name}</p>
                <p className="text-sm text-gray-600">
                  {scannedProduct.category} • {scannedProduct.quantity}
                </p>
                <p className="text-sm text-green-600 mt-1">{scannedProduct.expiryInfo}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center shadow">
                <Check size={20} className="mr-2" />
                <span>Add to Inventory</span>
              </button>
              <button
                onClick={() => setScannedProduct(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center shadow"
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </FadeInContainer>
  );
};

export default ScanScreen;
