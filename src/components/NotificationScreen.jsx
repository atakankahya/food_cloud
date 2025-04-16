// src/components/NotificationScreen.jsx

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
