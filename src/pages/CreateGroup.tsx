import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ParticipantList } from '../components/ParticipantList';

export const CreateGroup: React.FC = () => {
  const [name, setName] = useState('');
  const { addParticipant, group, autoAssignAll } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addParticipant(name.trim());
      setName('');
    }
  };

  const handleShare = () => {
    navigate(`/wheel/${group.id}`);
  };

  const handleAutoAssign = () => {
    if (group.participants.length < 2) {
      alert('You need at least 2 participants to auto-assign Secret Santas!');
      return;
    }
    autoAssignAll();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Secret Santa Generator
          </h1>
          <p className="text-gray-600">
            Add names to create your Secret Santa group
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter participant name"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Add
              </button>
            </div>
          </form>

          <ParticipantList />
        </div>

        <div className="space-y-4">
          <button
            onClick={handleAutoAssign}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Auto-Assign All & Download CSV
          </button>

          <button
            onClick={handleShare}
            disabled={group.participants.length < 2}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Generate Shareable Link
          </button>
        </div>
      </div>
    </div>
  );
};