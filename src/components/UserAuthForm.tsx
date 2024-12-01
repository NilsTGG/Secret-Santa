import React, { useState } from 'react';
import { useStore } from '../store/useStore';

interface UserAuthFormProps {
  onAuthenticated: () => void;
}

export const UserAuthForm: React.FC<UserAuthFormProps> = ({ onAuthenticated }) => {
  const [name, setName] = useState('');
  const { authenticateUser, group } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Check if user is already in participants list
      const isParticipant = group.participants.some(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      
      if (!isParticipant) {
        alert('You must be a participant to spin the wheel!');
        return;
      }
      
      authenticateUser(name.trim());
      onAuthenticated();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Enter Your Name</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Continue to Wheel
        </button>
      </form>
    </div>
  );
};