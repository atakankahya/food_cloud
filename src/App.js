import React, { useState } from 'react';
import {
  Home,
  Camera,
  List,
  Bell,
  User,
  Clock,
  Check,
  X,
  Edit2,
  ShoppingBag,
  ChevronRight,
  Plus,
  BarChart,
  Calendar,
  Trash2,
  ShoppingCart,
  Save,
  PlusCircle,
  Search,
} from 'lucide-react';

/* ----------------- Reusable Fade-In Container ----------------- */
const FadeInContainer = ({ children }) => (
  <div className="animate-fadeIn">
    {children}
  </div>
);

/* ----------------- Main App Component ----------------- */
export default function FoodCloudApp() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // ------- Sample Data -------
  const inventoryItems = [
    { id: 1, name: 'Milk', expiresIn: 2, category: 'Dairy', status: 'warning', quantity: '1 gallon' },
    { id: 2, name: 'Eggs', expiresIn: 5, category: 'Dairy', status: 'normal', quantity: '6 pcs' },
    { id: 3, name: 'Tomatoes', expiresIn: 1, category: 'Vegetables', status: 'danger', quantity: '4 pcs' },
    { id: 4, name: 'Chicken', expiresIn: 3, category: 'Meat', status: 'normal', quantity: '500g' },
    { id: 5, name: 'Yogurt', expiresIn: 7, category: 'Dairy', status: 'normal', quantity: '500g' },
    { id: 6, name: 'Apples', expiresIn: 10, category: 'Fruits', status: 'normal', quantity: '6 pcs' },
    { id: 7, name: 'Bread', expiresIn: 4, category: 'Bakery', status: 'normal', quantity: '1 loaf' },
  ];

  const shoppingItems = [
    { id: 1, name: 'Bananas', category: 'Fruits', priority: 'high', checked: false },
    { id: 2, name: 'Pasta', category: 'Pantry', priority: 'medium', checked: true },
    { id: 3, name: 'Cheese', category: 'Dairy', priority: 'medium', checked: false },
    { id: 4, name: 'Onions', category: 'Vegetables', priority: 'low', checked: false },
    { id: 5, name: 'Olive Oil', category: 'Pantry', priority: 'high', checked: false },
  ];

  const notifications = [
    { id: 1, message: 'Tomatoes are expiring tomorrow!', time: '10:30 AM', type: 'expiry' },
    { id: 2, message: 'Milk is expiring in 2 days!', time: '9:15 AM', type: 'expiry' },
    { id: 3, message: "You haven't scanned any new items in 3 days", time: 'Yesterday', type: 'reminder' },
    { id: 4, message: 'Added Chicken to your shopping list', time: 'Yesterday', type: 'shopping' },
  ];

  // ------- Category Icons & Color Mappings -------
  const categoryIcons = {
    Dairy: '🥛',
    Vegetables: '🥬',
    Fruits: '🍎',
    Meat: '🥩',
    Bakery: '🍞',
    Pantry: '🥫',
  };

  const priorityColors = {
    high: 'bg-pink-500',
    medium: 'bg-purple-500',
    low: 'bg-blue-500',
  };

  // Returns Tailwind classes based on item status
  const getStatusColor = (status) => {
    switch (status) {
      case 'danger': return 'bg-red-100 text-red-600 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-600 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-600 border-emerald-200';
    }
  };

  // Returns text color based on days until expiry
  const getExpiryColor = (days) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-amber-600';
    return 'text-emerald-600';
  };

  /* ----------------- Screen Components ----------------- */
  
  // ---- Home Screen ----
  const HomeScreen = () => (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <ShoppingBag size={28} className="text-white mr-2" />
              <h1 className="text-xl font-bold text-white">Food Cloud</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                <Bell size={20} className="text-white" />
              </button>
              <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                <User size={20} className="text-white" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-3 mb-6">
            {['Tracked Items', 'Expiring Soon', 'Saved Items'].map((label, index) => (
              <div key={index} className="flex-1 p-3 bg-white bg-opacity-15 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                <p className="text-xs text-white text-opacity-90">{label}</p>
                <p className="text-lg font-bold text-white">
                  {index === 1 ? 3 : index === 0 ? 24 : 8}
                </p>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-full py-3 px-4 pr-10 rounded-lg bg-white bg-opacity-15 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
            />
            <Search size={18} className="absolute right-3 top-3.5 text-white text-opacity-70" />
          </div>
        </div>
        
        <div className="px-4 pt-6 pb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Expiring Soon</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-3 mb-8">
            {inventoryItems.filter(item => item.expiresIn <= 3).map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
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
                      {item.expiresIn <= 0 
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
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recently Added</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {inventoryItems.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{categoryIcons[item.category]}</span>
                    <p className="font-medium text-gray-800">{item.name}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <p className={`text-sm ${getExpiryColor(item.expiresIn)}`}>
                    {item.expiresIn <= 0 
                      ? 'Expired today!' 
                      : item.expiresIn === 1 
                        ? 'Expires tomorrow' 
                        : `Expires in ${item.expiresIn} days`}
                  </p>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{item.quantity}</span>
                </div>
                <div className={`absolute w-1 h-full top-0 left-0 ${
                  item.expiresIn <= 1 ? 'bg-red-500' : 
                  item.expiresIn <= 3 ? 'bg-amber-500' : 
                  'bg-emerald-500'
                }`}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Food Waste Prevention</h2>
              <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full">This Week</span>
            </div>
            <div className="h-12 flex rounded-xl overflow-hidden mb-2">
              <div className="h-full bg-emerald-500 w-3/5"></div>
              <div className="h-full bg-amber-400 w-1/5"></div>
              <div className="h-full bg-red-500 w-1/5"></div>
            </div>
            <div className="flex text-xs text-gray-600 justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                <span>Used (60%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div>
                <span>Expiring (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Wasted (20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInContainer>
  );

  // ---- Scan Screen ----
  const ScanScreen = () => (
    <FadeInContainer>
      <div className="h-full bg-gray-900 flex flex-col">
        <div className="flex-1 relative">
          {/* Camera Preview */}
          <div className="absolute inset-0 bg-gray-800">
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <button className="bg-black bg-opacity-50 p-2 rounded-lg">
                <X size={20} className="text-white" />
              </button>
              <div className="flex space-x-2">
                <button className="bg-black bg-opacity-50 p-2 rounded-lg">
                  <Search size={20} className="text-white" />
                </button>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-2/3 border-2 border-emerald-400 rounded-lg flex items-center justify-center relative">
                {/* Camera frame corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-lg"></div>
                <div className="text-emerald-400 text-sm text-center px-4 bg-black bg-opacity-30 py-2 rounded-lg">
                  Position barcode in the frame<br />or tap to take a photo
                </div>
              </div>
            </div>
          </div>
          {/* Scanning Animation */}
          <div className="absolute inset-x-0 top-1/3 h-1 bg-emerald-500 opacity-70 animate-pulse"></div>
          {/* Camera Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <button className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg border-4 border-emerald-500">
              <Camera size={28} className="text-emerald-600" />
            </button>
          </div>
        </div>
        <div className="bg-white py-6 px-4 rounded-t-2xl shadow-lg">
          <h3 className="text-gray-800 font-semibold text-center mb-4">Scan Product</h3>
          <div className="bg-emerald-50 p-4 rounded-xl mb-4 border border-emerald-100">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🥛</span>
              <div>
                <p className="font-medium text-gray-800">Organic Milk</p>
                <p className="text-sm text-gray-500">Dairy • 1 gallon</p>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <Calendar size={16} className="text-emerald-500 mr-1" />
              <p className="text-sm text-gray-600">
                Estimated expiry: April 16, 2025 (2 days)
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex-1 py-3 px-4 bg-gray-200 rounded-xl text-gray-800 font-medium flex items-center justify-center">
              <Edit2 size={18} className="mr-2" />
              <span>Manual Entry</span>
            </button>
            <button className="flex-1 py-3 px-4 bg-emerald-600 rounded-xl text-white font-medium flex items-center justify-center shadow-md">
              <Check size={18} className="mr-2" />
              <span>Add to Inventory</span>
            </button>
          </div>
        </div>
      </div>
    </FadeInContainer>
  );

  // ---- Product Detail Screen ----
  const ProductDetailScreen = () => (
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
              Keep refrigerated between 33-38°F. Store on interior shelves rather than the door for better temperature consistency. Avoid storing near strong-smelling foods.
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

  // ---- Inventory Screen ----
  const InventoryScreen = () => (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-lg font-bold text-gray-800">My Inventory</h1>
          <div className="relative mt-3 mb-4">
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500" />
          </div>
          <div className="flex mt-4 mb-2">
            <button className="flex-1 py-2 text-center bg-emerald-600 text-white rounded-l-lg shadow-sm">All</button>
            <button className="flex-1 py-2 text-center bg-gray-100 text-gray-600 border-r border-gray-200">Expiring</button>
            <button className="flex-1 py-2 text-center bg-gray-100 text-gray-600 rounded-r-lg">Categories</button>
          </div>
        </div>
        <div className="p-4 pb-20">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Sorted by expiration date</p>
            <button className="text-emerald-600 text-sm font-medium flex items-center">
              <span>Filter</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {inventoryItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
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

  // ---- Notification Screen ----
  const NotificationScreen = () => (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-4 shadow-sm">
          <h1 className="text-lg font-bold text-white mb-3">Notifications</h1>
          <div className="flex space-x-2 mb-2">
            <button className="py-1.5 px-3 bg-white text-purple-600 rounded-full text-sm font-medium">All</button>
            <button className="py-1.5 px-3 bg-white bg-opacity-20 text-white rounded-full text-sm">Expiring</button>
            <button className="py-1.5 px-3 bg-white bg-opacity-20 text-white rounded-full text-sm">Shopping</button>
          </div>
        </div>
        <div className="p-4 pb-20">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-red-500 px-4 py-3">
              <h3 className="font-medium text-white text-lg">Action Required!</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">🍅</span>
                <div>
                  <p className="text-gray-800 font-medium">Tomatoes are expiring today</p>
                  <p className="text-xs text-gray-500">Don't let them go to waste!</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 py-2 bg-emerald-600 rounded-lg text-white text-sm font-medium shadow-sm">
                  Find Recipes
                </button>
                <button className="flex-1 py-2 bg-gray-100 rounded-lg text-gray-800 text-sm font-medium">
                  Mark Used
                </button>
                <button className="py-2 px-3 bg-purple-100 rounded-lg text-purple-600">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Recent</h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-start">
                    <div className={`mt-0.5 mr-3 p-1.5 rounded-full ${
                      notification.type === 'expiry' ? 'bg-amber-100 text-amber-600' : 
                      notification.type === 'shopping' ? 'bg-purple-100 text-purple-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.type === 'expiry' ? <Clock size={16} /> : 
                        notification.type === 'shopping' ? <ShoppingCart size={16} /> : 
                        <Bell size={16} />}
                    </div>
                    <div>
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-10 mt-2">
                  <button className="text-emerald-600 text-sm font-medium">Take Action</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInContainer>
  );

  // ---- Shopping List Screen ----
  const ShoppingListScreen = () => (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <ShoppingCart size={24} className="text-white mr-2" />
              <h1 className="text-xl font-bold text-white">Shopping List</h1>
            </div>
            <button className="bg-white p-2 rounded-full text-purple-600">
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
        <div className="p-4 pb-20">
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Search shopping list..."
              className="w-full py-2.5 px-4 pr-10 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search size={18} className="absolute right-3 top-3 text-gray-500" />
          </div>
          <div className="space-y-3">
            {shoppingItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${priorityColors[item.priority]}`}>
                    <span className="text-white">{categoryIcons[item.category] || '🛒'}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-100 rounded-full">
                    <Save size={16} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full">
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

  /* ----------------- Bottom Navigation ----------------- */
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-t px-4 py-3 flex justify-around">
      <button 
        onClick={() => setCurrentScreen('home')}
        className={`flex flex-col items-center ${currentScreen === 'home' ? 'text-emerald-600' : 'text-gray-600'}`}>
        <Home size={24} />
        <span className="text-xs">Home</span>
      </button>
      <button 
        onClick={() => setCurrentScreen('inventory')}
        className={`flex flex-col items-center ${currentScreen === 'inventory' ? 'text-emerald-600' : 'text-gray-600'}`}>
        <List size={24} />
        <span className="text-xs">Inventory</span>
      </button>
      <button 
        onClick={() => setCurrentScreen('scan')}
        className="flex flex-col items-center justify-center bg-emerald-600 text-white rounded-full h-16 w-16 -mt-8 shadow-lg">
        <Camera size={28} />
        <span className="text-xs mt-1">Scan</span>
      </button>
      <button 
        onClick={() => setCurrentScreen('notifications')}
        className={`flex flex-col items-center ${currentScreen === 'notifications' ? 'text-emerald-600' : 'text-gray-600'}`}>
        <Bell size={24} />
        <span className="text-xs">Alerts</span>
      </button>
      <button 
        onClick={() => setCurrentScreen('shopping')}
        className={`flex flex-col items-center ${currentScreen === 'shopping' ? 'text-emerald-600' : 'text-gray-600'}`}>
        <ShoppingCart size={24} />
        <span className="text-xs">Shop</span>
      </button>
    </div>
  );

  /* ----------------- Main Render ----------------- */
  return (
    <div className="relative min-h-screen">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'scan' && <ScanScreen />}
      {currentScreen === 'product' && <ProductDetailScreen />}
      {currentScreen === 'inventory' && <InventoryScreen />}
      {currentScreen === 'notifications' && <NotificationScreen />}
      {currentScreen === 'shopping' && <ShoppingListScreen />}
      <BottomNav />
    </div>
  );
}
