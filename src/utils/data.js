// src/utils/data.js

export const inventoryItems = [
    { id: 1, name: 'Milk', expiresIn: 2, category: 'Dairy', status: 'warning', quantity: '1 gallon' },
    { id: 2, name: 'Eggs', expiresIn: 5, category: 'Dairy', status: 'normal', quantity: '6 pcs' },
    { id: 3, name: 'Tomatoes', expiresIn: 1, category: 'Vegetables', status: 'danger', quantity: '4 pcs' },
    { id: 4, name: 'Chicken', expiresIn: 3, category: 'Meat', status: 'normal', quantity: '500g' },
    { id: 5, name: 'Yogurt', expiresIn: 7, category: 'Dairy', status: 'normal', quantity: '500g' },
    { id: 6, name: 'Apples', expiresIn: 10, category: 'Fruits', status: 'normal', quantity: '6 pcs' },
    { id: 7, name: 'Bread', expiresIn: 4, category: 'Bakery', status: 'normal', quantity: '1 loaf' },
  ];
  
  export const shoppingItems = [
    { id: 1, name: 'Bananas', category: 'Fruits', priority: 'high', checked: false },
    { id: 3, name: 'Cheese', category: 'Dairy', priority: 'medium', checked: false },
    { id: 4, name: 'Onions', category: 'Vegetables', priority: 'low', checked: false },
    { id: 5, name: 'Olive Oil', category: 'Pantry', priority: 'high', checked: false },
  ];
  
  export const notifications = [
    { id: 1, message: 'Tomatoes are expiring tomorrow!', time: '10:30 AM', type: 'expiry' },
    { id: 2, message: 'Milk is expiring in 2 days!', time: '9:15 AM', type: 'expiry' },
    { id: 3, message: "You haven't scanned any new items in 3 days", time: 'Yesterday', type: 'reminder' },
    { id: 4, message: 'Added Chicken to your shopping list', time: 'Yesterday', type: 'shopping' },
  ];
  
  export const categoryIcons = {
    Dairy: '🥛',
    Vegetables: '🥬',
    Fruits: '🍎',
    Meat: '🥩',
    Bakery: '🍞',
    Pantry: '🥫',
  };
  
  export const priorityColors = {
    high: 'bg-pink-500',
    medium: 'bg-purple-500',
    low: 'bg-blue-500',
  };
  