// src/components/BackButton.jsx
import React, { useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { ThemeContext } from '../App';

export default function BackButton({ onClick }) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <ChevronRight
        size={20}
        className={`transform rotate-180 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
      />
    </button>
  );
}
