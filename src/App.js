import React, { useState } from 'react';
import { Home, Camera, List, Bell, User, Clock, Check, X, Edit2, ShoppingBag, ChevronRight, Plus, BarChart } from 'lucide-react';

export default function FoodCloudApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // Sample data
  const inventoryItems = [
    { id: 1, name: 'Milk', expiresIn: 2, category: 'Dairy', status: 'warning' },
    { id: 2, name: 'Eggs', expiresIn: 5, category: 'Dairy', status: 'normal' },
    { id: 3, name: 'Tomatoes', expiresIn: 1, category: 'Vegetables', status: 'danger' },
    { id: 4, name: 'Chicken', expiresIn: 3, category: 'Meat', status: 'normal' },
    { id: 5, name: 'Yogurt', expiresIn: 7, category: 'Dairy', status: 'normal' },
    { id: 6, name: 'Apples', expiresIn: 10, category: 'Fruits', status: 'normal' },
    { id: 7, name: 'Bread', expiresIn: 4, category: 'Bakery', status: 'normal' },
  ];
  
  const notifications = [
    { id: 1, message: 'Tomatoes are expiring tomorrow!', time: '10:30 AM' },
    { id: 2, message: 'Milk is expiring in 2 days!', time: '9:15 AM' },
    { id: 3, message: 'You haven\'t scanned any new items in 3 days', time: 'Yesterday' },
  ];

  // Status color mappings
  const getStatusColor = (status) => {
    switch(status) {
      case 'danger': return 'bg-red-100 text-red-600 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-green-100 text-green-600 border-green-200';
    }
  };
  
  const getExpiryColor = (days) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Screen Components
  const HomeScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Food Cloud</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100">
              <User size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <div className="flex-1 p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-gray-500">Tracked Items</p>
            <p className="text-lg font-bold text-gray-800">24</p>
          </div>
          <div className="flex-1 p-3 bg-red-50 rounded-lg border border-red-100">
            <p className="text-xs text-gray-500">Expiring Soon</p>
            <p className="text-lg font-bold text-red-600">3</p>
          </div>
          <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-gray-500">Saved Items</p>
            <p className="text-lg font-bold text-gray-800">8</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Expiring Soon</h2>
        <div className="space-y-3">
          {inventoryItems.filter(item => item.expiresIn <= 3).map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                <span className="text-lg font-bold">{item.expiresIn}</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                  {item.expiresIn <= 0 
                    ? 'Expired today!' 
                    : item.expiresIn === 1 
                      ? 'Expires tomorrow' 
                      : `Expires in ${item.expiresIn} days`}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>
        
        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Recently Added</h2>
        <div className="grid grid-cols-2 gap-3">
          {inventoryItems.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <p className="font-medium text-gray-800">{item.name}</p>
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                  {item.category}
                </div>
              </div>
              <p className={`text-sm mt-2 ${getExpiryColor(item.expiresIn)}`}>
                {item.expiresIn <= 0 
                  ? 'Expired today!' 
                  : item.expiresIn === 1 
                    ? 'Expires tomorrow' 
                    : `Expires in ${item.expiresIn} days`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const ScanScreen = () => (
    <div className="h-full bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        {/* Camera Preview */}
        <div className="absolute inset-0 bg-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/5 border-2 border-green-400 rounded-lg flex items-center justify-center">
              <div className="text-green-400 text-xs text-center px-4">
                Position barcode in the frame<br />or tap to take a photo
              </div>
            </div>
          </div>
        </div>
        
        {/* Camera Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button className="bg-white h-16 w-16 rounded-full flex items-center justify-center">
            <Camera size={28} className="text-gray-800" />
          </button>
        </div>
      </div>
      
      <div className="bg-white py-6 px-4 rounded-t-xl">
        <h3 className="text-gray-800 font-semibold text-center mb-4">Scan Product</h3>
        
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-1">Product detected:</p>
          <p className="font-medium">Organic Milk</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 py-3 bg-gray-200 rounded-lg text-gray-800 font-medium">
            Manual Entry
          </button>
          <button className="flex-1 py-3 bg-green-600 rounded-lg text-white font-medium">
            Confirm & Add
          </button>
        </div>
      </div>
    </div>
  );
  
  const ProductDetailScreen = () => (
    <div className="h-full bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center">
            <ShoppingBag size={36} className="text-green-600" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">Organic Milk</h2>
        <p className="text-gray-500 text-center mb-4">Dairy Category</p>
        
        <div className="border-t border-b border-gray-100 py-4 my-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-600">Estimated Expiry Date</p>
            <div className="flex items-center">
              <p className="font-medium text-gray-800 mr-2">April 16, 2025</p>
              <Edit2 size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-600">Purchase Date</p>
            <p className="text-gray-800">April 14, 2025</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Days Until Expiry</p>
            <p className="font-medium text-yellow-600">2 days</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 py-3 bg-green-600 rounded-lg text-white font-medium flex items-center justify-center">
            <Check size={18} className="mr-1" />
            <span>Add to Inventory</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-gray-800 mb-3">Storage Tips</h3>
        <p className="text-gray-600 text-sm">
          Keep refrigerated between 33-38°F. Store on interior shelves rather than the door for better temperature consistency.
        </p>
      </div>
    </div>
  );
  
  const InventoryScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-gray-800">My Inventory</h1>
        <div className="flex mt-4 mb-2">
          <button className="flex-1 py-2 text-center bg-green-600 text-white rounded-l-lg">All</button>
          <button className="flex-1 py-2 text-center bg-gray-100 text-gray-600 border-r border-gray-200">Expiring</button>
          <button className="flex-1 py-2 text-center bg-gray-100 text-gray-600 rounded-r-lg">Categories</button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Sorted by expiration date</p>
          <button className="text-green-600 text-sm font-medium">Filter</button>
        </div>
        
        <div className="space-y-4">
          {inventoryItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                <span className="text-lg font-bold">{item.expiresIn}</span>
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <div className="flex items-center">
                  <div className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 mr-2">
                    {item.category}
                  </div>
                  <p className={`text-xs ${getExpiryColor(item.expiresIn)}`}>
                    {item.expiresIn <= 0 
                      ? 'Expired today!' 
                      : item.expiresIn === 1 
                        ? 'Expires tomorrow' 
                        : `Expires in ${item.expiresIn} days`}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 rounded-full bg-gray-100">
                  <Edit2 size={16} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100">
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const NotificationScreen = () => (
    <div className="h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-gray-800">Notifications</h1>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-red-600">Expiring Today!</h3>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
          <p className="text-gray-800 mb-3">Tomatoes are expiring today. Don't let them go to waste!</p>
          <div className="flex space-x-2">
            <button className="flex-1 py-2 bg-green-600 rounded-lg text-white text-sm font-medium">
              Find Recipes
            </button>
            <button className="flex-1 py-2 bg-gray-100 rounded-lg text-gray-800 text-sm font-medium">
              Mark Used
            </button>
          </div>
        </div>
        
        <h3 className="text-gray-600 text-sm font-medium mb-2">Recent</h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              <button className="text-green-600 text-sm font-medium mt-2">Take Action</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Navigation component
  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 flex justify-around py-3">
      <button 
        className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-green-600' : 'text-gray-500'}`}
        onClick={() => setCurrentScreen('home')}
      >
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button 
        className={`flex flex-col items-center ${currentScreen === 'inventory' ? 'text-green-600' : 'text-gray-500'}`}
        onClick={() => setCurrentScreen('inventory')}
      >
        <List size={22} />
        <span className="text-xs mt-1">Inventory</span>
      </button>
      <button 
        className="flex flex-col items-center justify-center bg-green-600 text-white rounded-full h-14 w-14 -mt-5 shadow-lg"
        onClick={() => setCurrentScreen('scan')}
      >
        <Camera size={24} />
        <span className="text-xs mt-1">Scan</span>
      </button>
      <button 
        className={`flex flex-col items-center ${currentScreen === 'notifications' ? 'text-green-600' : 'text-gray-500'}`}
        onClick={() => setCurrentScreen('notifications')}
      >
        <Bell size={22} />
        <span className="text-xs mt-1">Alerts</span>
      </button>
      <button 
        className={`flex flex-col items-center ${currentScreen === 'product' ? 'text-green-600' : 'text-gray-500'}`}
        onClick={() => setCurrentScreen('product')}
      >
        <BarChart size={22} />
        <span className="text-xs mt-1">Stats</span>
      </button>
    </div>
  );
  
  // Main app layout
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'scan' && <ScanScreen />}
        {currentScreen === 'product' && <ProductDetailScreen />}
        {currentScreen === 'inventory' && <InventoryScreen />}
        {currentScreen === 'notifications' && <NotificationScreen />}
      </div>
      <BottomNav />
    </div>
  );
}