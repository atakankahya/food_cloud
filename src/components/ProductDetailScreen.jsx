// src/components/ProductDetailScreen.jsx

import React from 'react';
import { ChevronRight, Calendar, Edit2, Clock, ShoppingBag } from 'lucide-react';
import FadeInContainer from './FadeInContainer';

const ProductDetailScreen = () => {
  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
          <button className="bg-white bg-opacity-20 p-2 rounded-lg mb-4">
            <ChevronRight size={20} className="text-white transform rotate-180" />
          </button>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
              <span className="text-4xl">🥛</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Organic Milk</h2>
            <p className="text-white text-opacity-90 mb-4">Dairy Category • 1 gallon</p>
            <div className="flex w-full justify-center space-x-3 mt-2">
              <button className="bg-white bg-opacity-20 py-2 px-4 rounded-lg text-white text-sm">
                Mark Used
              </button>
              <button className="bg-white py-2 px-4 rounded-lg text-emerald-600 text-sm font-medium">
                Add to Shopping
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-4">Product Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div className="flex items-center">
                  <Calendar size={18} className="text-emerald-500 mr-2" />
                  <p className="text-gray-600">Expiry Date</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-amber-600 mr-2">April 16, 2025</p>
                  <Edit2 size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div className="flex items-center">
                  <Clock size={18} className="text-emerald-500 mr-2" />
                  <p className="text-gray-600">Days Until Expiry</p>
                </div>
                <p className="font-medium text-amber-600">2 days</p>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div className="flex items-center">
                  <ShoppingBag size={18} className="text-emerald-500 mr-2" />
                  <p className="text-gray-600">Purchase Date</p>
                </div>
                <p className="text-gray-800">April 14, 2025</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2">
                    <span className="text-xs font-bold">i</span>
                  </div>
                  <p className="text-gray-600">Nutritional Info</p>
                </div>
                <button className="text-emerald-600 text-sm">View</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Storage Tips</h3>
            <p className="text-gray-600 text-sm">
              Keep refrigerated between 33-38°F. Store on interior shelves rather than the door
              for better temperature consistency. Avoid storing near strong-smelling foods.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-medium text-gray-800 mb-3">Recipe Suggestions</h3>
            <div className="flex overflow-x-auto space-x-3 pb-2">
              <div className="flex-shrink-0 w-32 rounded-lg bg-amber-50 p-2 border border-amber-100">
                <div className="h-20 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🥣</span>
                </div>
                <p className="text-xs font-medium text-gray-800">Creamy Soup</p>
              </div>
              <div className="flex-shrink-0 w-32 rounded-lg bg-amber-50 p-2 border border-amber-100">
                <div className="h-20 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">🧁</span>
                </div>
                <p className="text-xs font-medium text-gray-800">Milk Muffins</p>
              </div>
              <div className="flex-shrink-0 w-32 rounded-lg bg-amber-50 p-2 border border-amber-100">
                <div className="h-20 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">☕</span>
                </div>
                <p className="text-xs font-medium text-gray-800">Hot Chocolate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInContainer>
  );
};

export default ProductDetailScreen;
