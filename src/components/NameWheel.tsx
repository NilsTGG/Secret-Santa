import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { Participant } from '../types';
import { useStore } from '../store/useStore';

interface NameWheelProps {
  participants: Participant[];
}

export const NameWheel: React.FC<NameWheelProps> = ({ participants }) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinComplete, setIsSpinComplete] = useState(false);
  const { currentUser, assignName } = useStore();

  const spinWheel = () => {
    if (isSpinning || !currentUser) return;
    
    setIsSpinning(true);
    setSelectedName(null);

    // Simulate wheel spinning
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      const selectedParticipant = participants[randomIndex];
      setSelectedName(selectedParticipant.name);
      setIsSpinning(false);
      setIsSpinComplete(true);
      assignName(currentUser.id, selectedParticipant.id);
    }, 2000);
  };

  if (isSpinComplete) {
    return (
      <div className="text-center">
        <div className="w-64 h-64 mx-auto mb-8 rounded-full border-8 border-green-500 flex items-center justify-center bg-white shadow-lg">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 mb-2">
              You got {selectedName}!
            </p>
            <p className="text-sm text-gray-600">
              Remember to keep it a secret! 🤫
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div
        className={`w-64 h-64 mx-auto mb-8 rounded-full border-8 border-red-500 flex items-center justify-center bg-white shadow-lg transition-transform duration-1000 ${
          isSpinning ? 'animate-spin' : ''
        }`}
      >
        {selectedName ? (
          <span className="text-2xl font-bold text-gray-800">{selectedName}</span>
        ) : (
          <Gift size={48} className="text-red-500" />
        )}
      </div>
      <button
        onClick={spinWheel}
        disabled={isSpinning || participants.length === 0}
        className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSpinning ? 'Spinning...' : participants.length === 0 ? 'No names left!' : 'Spin the Wheel!'}
      </button>
    </div>
  );
};