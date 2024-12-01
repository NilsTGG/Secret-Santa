import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ParticipantList: React.FC = () => {
  const { group, removeParticipant } = useStore();

  if (group.participants.length === 0) {
    return (
      <p className="text-gray-500 italic text-center">No participants added yet</p>
    );
  }

  return (
    <ul className="space-y-2">
      {group.participants.map((participant) => (
        <li
          key={participant.id}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <span className="font-medium">{participant.name}</span>
          <button
            onClick={() => removeParticipant(participant.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};