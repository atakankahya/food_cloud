import React, { useState } from 'react';
import { Bell, Clock, ShoppingCart, RefreshCw } from 'lucide-react';
import FadeInContainer from './FadeInContainer';
import BottomNav from './BottomNav';
import { categoryIcons } from '../utils/data';

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
  const [filterType, setFilterType] = useState('all');
  const [suggestions, setSuggestions] = useState({});
  const [loading, setLoading] = useState({});
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const expiryNotifs = notifications.filter(n => n.type === 'expiry');
  const actionNotif = expiryNotifs[0] || null;
  const filteredRecent = notifications.filter(n =>
    filterType === 'all' ? true : n.type === filterType
  );

  const spoonacularApiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const fetchRecipes = async (notif) => {
    if (inventoryItems.length === 0) {
      setToast('Your inventory is empty!');
      setTimeout(() => setToast(''), 2000);
      return;
    }
    const ingredientList = inventoryItems.map(item => item.name).join(',');
    setLoading((prev) => ({ ...prev, [notif.id]: true }));
    setError('');
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=10&apiKey=${spoonacularApiKey}`
      );
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setSuggestions((prev) => ({
          ...prev,
          [notif.id]: data.map((r) => ({
            id: r.id,
            name: r.title,
            image: r.image,
            missedCount: r.missedIngredientCount,
          })),
        }));
      } else {
        setError('No recipes found.');
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes. Try again later.');
    } finally {
      setLoading((prev) => ({ ...prev, [notif.id]: false }));
    }
  };

  const handleMarkUsed = (notif) => {
    if (notif.itemName) {
      setInventoryItems((inv) =>
        inv.filter((i) => i.name.toLowerCase() !== notif.itemName.toLowerCase())
      );
    }
    setNotifications((nots) => nots.filter((n) => n.id !== notif.id));
    setSuggestions((s) => {
      const c = { ...s };
      delete c[notif.id];
      return c;
    });
  };

  const handleAddToShopping = (notif) => {
    if (!notif.itemName) return;
    if (!shoppingItems.some((s) => s.name === notif.itemName)) {
      const invItem = inventoryItems.find((i) => i.name === notif.itemName);
      setShoppingItems([
        ...shoppingItems,
        {
          id: Date.now(),
          name: notif.itemName,
          category: invItem?.category || 'Pantry',
          checked: false,
        },
      ]);
      setNotifications((n) => [
        ...n,
        {
          id: Date.now() + 1,
          message: `${notif.itemName} added to shopping list`,
          time: 'Now',
          type: 'shopping',
          itemName: notif.itemName,
        },
      ]);
      setToast(`${notif.itemName} added to shopping list!`);
      setTimeout(() => setToast(''), 2000);
    }
  };

  const handleTakeAction = (notif) => {
    if (notif.type === 'expiry') return setCurrentScreen('scan');
    if (notif.type === 'shopping') return setCurrentScreen('shopping');
    return setCurrentScreen('inventory');
  };

  const iconForType = (type) => {
    if (type === 'expiry') return <Clock size={20} className="text-amber-500" />;
    if (type === 'shopping') return <ShoppingCart size={20} className="text-purple-500" />;
    return <Bell size={20} className="text-blue-500" />;
  };

  const iconForItem = (itemName) => {
    const inv = inventoryItems.find((i) => i.name === itemName);
    return inv ? categoryIcons[inv.category] : '🛒';
  };

  return (
    <FadeInContainer>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {toast && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {toast}
          </div>
        )}

        {/* 🌟 Modern Gradient Header */}
        <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 p-4 shadow-md flex items-center justify-between rounded-b-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <div className="flex space-x-2 mt-2">
              {['all', 'expiry', 'shopping'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    filterType === t ? 'bg-white text-purple-600' : 'bg-white bg-opacity-30 text-white'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Keep everything else unchanged */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 text-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            10% discount in Esse!
          </span>
        </div>

        {actionNotif && (
          <div className="bg-red-500 rounded-xl m-4 p-4 text-white">
            {/* Action Notification Card */}
            <h2 className="font-bold text-lg mb-2">Action Required!</h2>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">{iconForItem(actionNotif.itemName)}</div>
              <div>
                <p className="font-medium">{actionNotif.message}</p>
                <p className="text-sm opacity-90">Don't let it go to waste!</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => fetchRecipes(actionNotif)} className="flex-1 bg-green-600 py-2 rounded-lg">
                {loading[actionNotif.id] ? 'Loading...' : 'Find Recipes'}
              </button>
              <button onClick={() => handleMarkUsed(actionNotif)} className="flex-1 bg-white text-red-500 py-2 rounded-lg">
                Mark Used
              </button>
              <button onClick={() => handleAddToShopping(actionNotif)} className="flex-1 bg-yellow-400 text-white py-2 rounded-lg">
                Add to Shopping
              </button>
              <button onClick={() => fetchRecipes(actionNotif)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                <RefreshCw size={16} className="inline mr-1" /> Refresh
              </button>
            </div>
            {loading[actionNotif.id] && <p className="mt-2 text-sm">Fetching recipes...</p>}
            {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
            {suggestions[actionNotif.id] && (
              <div className="mt-3 flex space-x-3 overflow-x-auto">
                {suggestions[actionNotif.id].length > 0 ? (
                  suggestions[actionNotif.id]
                    .slice(0, 5)
                    .map((r) => (
                      <div key={r.id} className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-lg border w-40">
                        <img src={r.image || 'https://via.placeholder.com/150'} alt={r.title || r.name || 'Recipe'} className="w-full h-24 object-cover rounded" />
                        <p className="text-sm font-bold text-center mt-1 text-gray-800 dark:text-gray-100">{r.title || r.name || 'Recipe Name'}</p>
                        {r.missedCount === 0 ? (
                          <span className="block text-green-500 text-xs text-center">Perfect Match</span>
                        ) : (
                          <span className="block text-yellow-400 text-xs text-center">More ingredients needed</span>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-sm">No recipes with your ingredients.</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 pb-20">
          <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-2">Recent</h3>
          <div className="space-y-3">
            {filteredRecent.map((n) => (
              <div key={n.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {iconForType(n.type)}
                  <div>
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{n.time}</p>
                  </div>
                </div>
                <button onClick={() => handleTakeAction(n)} className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
                  {n.type === 'expiry' ? 'Find Recipes' : n.type === 'shopping' ? 'Add to Shop' : 'Take Action'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    </FadeInContainer>
  );
}
