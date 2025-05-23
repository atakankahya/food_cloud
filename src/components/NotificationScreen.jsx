// src/components/NotificationScreen.jsx

<<<<<<< HEAD
import React, { useState } from 'react';
import { Bell, Clock, ShoppingCart } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import BottomNav from './BottomNav';
import { recipes, categoryIcons } from '../utils/data';

export default function NotificationScreen({
  inventoryItems,
  setInventoryItems,
  shoppingItems,
  setShoppingItems,
  notifications,
  setNotifications,
  currentScreen,
  setCurrentScreen,
}) {
  const [filterType, setFilterType]   = useState('all');    // 'all' | 'expiry' | 'shopping'
  const [suggestions, setSuggestions] = useState({});       // { [notifId]: Recipe[] }
  const [toast, setToast]             = useState('');       // brief message

  // 1) Next expiring alert → Action Required
  const expiryNotifs = notifications.filter(n => n.type === 'expiry');
  const actionNotif  = expiryNotifs[0] || null;

  // 2) Everything else → Recent
  const recentNotifs = notifications.filter(n => n.id !== actionNotif?.id);

  // 3) Apply filter pill to Recent
  const filteredRecent = recentNotifs.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  // Icon by notification type
  const iconForType = (type) => {
    if (type === 'expiry')   return <Clock size={20} className="text-amber-500" />;
    if (type === 'shopping') return <ShoppingCart size={20} className="text-purple-500" />;
    return <Bell size={20} className="text-blue-500" />;
  };

  // Emoji by itemName (via categoryIcons)
  const iconForItem = (itemName) => {
    const inv = inventoryItems.find(i => i.name === itemName);
    return inv ? categoryIcons[inv.category] : '🛒';
  };

  // Find recipes matching your inventory
  const handleFindRecipes = (notif) => {
    const have = new Set(inventoryItems.map(i => i.name.toLowerCase()));
    const matches = recipes.filter(r =>
      r.ingredients.every(ing => have.has(ing.toLowerCase()))
    );
    setSuggestions(s => ({ ...s, [notif.id]: matches }));
  };

  // Mark as used → remove from inventory + dismiss notif
  const handleMarkUsed = (notif) => {
    if (notif.itemName) {
      setInventoryItems(inv =>
        inv.filter(i => i.name.toLowerCase() !== notif.itemName.toLowerCase())
      );
    }
    setNotifications(nots => nots.filter(n => n.id !== notif.id));
    setSuggestions(s => {
      const copy = { ...s }; delete copy[notif.id]; return copy;
    });
  };

  // Add to shopping → append to shoppingItems + push a new notification
  const handleAddToShopping = (notif) => {
    if (!notif.itemName) return;
    const exists = shoppingItems.some(
      s => s.name.toLowerCase() === notif.itemName.toLowerCase()
    );
    if (!exists) {
      // 1) Update shopping list
      const invItem = inventoryItems.find(
        i => i.name.toLowerCase() === notif.itemName.toLowerCase()
      );
      setShoppingItems([
        ...shoppingItems,
        { id: Date.now(), name: notif.itemName, category: invItem?.category || 'Pantry', checked: false }
      ]);

      // 2) Push a new “added to shopping list” notification
      const newNotif = {
        id: Date.now() + 1,
        message: `${notif.itemName} added to shopping list`,
        time: 'Now',
        type: 'shopping',
        itemName: notif.itemName
      };
      setNotifications(nots => [...nots, newNotif]);

      // 3) Show a quick toast
      setToast('Added to shopping list!');
      setTimeout(() => setToast(''), 2000);
    }
  };

  return (
    <FadeInContainer>
      <div className="flex flex-col h-full">

        {/* Toast */}
        {toast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {toast}
          </div>
        )}

        {/* Header & Filter Pills */}
        <div className="bg-purple-600 p-4">
          <h1 className="text-white text-xl font-bold mb-2">Notifications</h1>
          <div className="flex space-x-2">
            {[
              ['all', 'All'],
              ['expiry', 'Expiring'],
              ['shopping', 'Shopping']
            ].map(([type, label]) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition
                  ${filterType === type
                    ? 'bg-white text-purple-600'
                    : 'bg-white bg-opacity-40 text-white'}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Required Card */}
        {actionNotif && (
          <div className="bg-red-500 rounded-xl m-4 p-4 text-white">
            <h2 className="font-bold text-lg mb-2">Action Required!</h2>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">{iconForItem(actionNotif.itemName)}</div>
              <div>
                <p className="font-medium">{actionNotif.message}</p>
                <p className="text-sm opacity-90">Don't let it go to waste!</p>
              </div>
            </div>
            <div className="flex space-x-2 mb-3">
              <button
                onClick={() => handleFindRecipes(actionNotif)}
                className="flex-1 bg-green-600 py-2 rounded-lg text-center font-medium"
              >
                Find Recipes
              </button>
              <button
                onClick={() => handleMarkUsed(actionNotif)}
                className="flex-1 bg-white text-red-500 py-2 rounded-lg font-medium"
              >
                Mark Used
              </button>
              <button
                onClick={() => handleAddToShopping(actionNotif)}
                className="flex-1 bg-yellow-400 text-white py-2 rounded-lg font-medium"
              >
                Add to Shopping
              </button>
            </div>

            {/* Recipe Suggestions */}
            {suggestions[actionNotif.id] !== undefined && (
              <div className="mt-2">
                {suggestions[actionNotif.id].length > 0 ? (
                  <div className="flex space-x-3 overflow-x-auto">
                    {suggestions[actionNotif.id].map(r => (
                      <div
                        key={r.id}
                        className="flex-shrink-0 bg-white text-gray-800 rounded-lg p-2 border"
                      >
                        <div className="text-2xl mb-1">{r.icon}</div>
                        <p className="text-xs font-semibold">{r.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm opacity-90">No matching recipes.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Recent Notifications */}
        <div className="flex-1 overflow-y-auto px-4">
          <h3 className="text-gray-600 font-medium mb-2">Recent</h3>
          <div className="space-y-3 pb-20">
            {filteredRecent.map(notif => (
              <div
                key={notif.id}
                className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow"
              >
                {iconForType(notif.type)}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
                <button
                  onClick={() => {
                    if (notif.type === 'expiry') handleFindRecipes(notif);
                    else if (notif.type === 'shopping') handleAddToShopping(notif);
                    else if (notif.itemName) handleMarkUsed(notif);
                  }}
                  className="text-purple-600 text-sm font-medium"
                >
                  {notif.type === 'expiry'
                    ? 'Find Recipes'
                    : notif.type === 'shopping'
                    ? 'Add to Shop'
                    : notif.itemName
                    ? 'Mark Used'
                    : 'Take Action'}
                </button>
              </div>
            ))}

            {filteredRecent.length === 0 && (
              <p className="text-center text-gray-400 mt-6">No notifications.</p>
            )}
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      </div>
    </FadeInContainer>
  );
}
=======
import React from 'react';
import { Bell, Clock, ShoppingCart } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import { notifications } from '../utils/data';

const NotificationScreen = () => {
  return (
    <FadeInContainer>
      <div className="h-full bg-gray-50">
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-4 shadow-sm">
          <h1 className="text-lg font-bold text-white mb-3">Notifications</h1>
          <div className="flex space-x-2 mb-2">
            <button className="py-1.5 px-3 bg-white text-purple-600 rounded-full text-sm font-medium">
              All
            </button>
            <button className="py-1.5 px-3 bg-white bg-opacity-20 text-white rounded-full text-sm">
              Expiring
            </button>
            <button className="py-1.5 px-3 bg-white bg-opacity-20 text-white rounded-full text-sm">
              Shopping
            </button>
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
            {notifications.map(notification => (
              <div
                key={notification.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-start">
                    <div
                      className={`mt-0.5 mr-3 p-1.5 rounded-full ${
                        notification.type === 'expiry'
                          ? 'bg-amber-100 text-amber-600'
                          : notification.type === 'shopping'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {notification.type === 'expiry' ? (
                        <Clock size={16} />
                      ) : notification.type === 'shopping' ? (
                        <ShoppingCart size={16} />
                      ) : (
                        <Bell size={16} />
                      )}
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
};

export default NotificationScreen;
>>>>>>> 5b3d97fb1552080f03e3aa03eacb7896a1217317
