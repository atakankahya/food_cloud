// src/utils/helpers.js

// Returns Tailwind classes based on item status
export const getStatusColor = (status) => {
  switch (status) {
    case 'danger':
      return 'bg-red-100 text-red-600 border-red-200';
    case 'warning':
      return 'bg-amber-100 text-amber-600 border-amber-200';
    default:
      return 'bg-emerald-100 text-emerald-600 border-emerald-200';
  }
};

// Returns text color based on days until expiry
export const getExpiryColor = (days) => {
  if (days <= 1) return 'text-red-600';
  if (days <= 3) return 'text-amber-600';
  return 'text-emerald-600';
};
