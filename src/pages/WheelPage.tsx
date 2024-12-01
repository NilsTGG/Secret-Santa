import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useStore } from '../store/useStore';
import { NameWheel } from '../components/NameWheel';
import { UserAuthForm } from '../components/UserAuthForm';

export const WheelPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { group, currentUser, getRemainingParticipants } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (groupId !== group.id) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Gift className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Group Not Found
          </h1>
          <p className="text-gray-600">
            This Secret Santa group doesn't exist or has expired
          </p>
        </div>
      </div>
    );
  }

  const remainingParticipants = currentUser 
    ? getRemainingParticipants(currentUser.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Secret Santa Wheel
          </h1>
          <p className="text-gray-600">
            {!isAuthenticated
              ? 'Enter your name to spin the wheel'
              : 'Spin the wheel to get your Secret Santa assignment!'}
          </p>
        </div>

        {!isAuthenticated ? (
          <UserAuthForm onAuthenticated={() => setIsAuthenticated(true)} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">Spinning as</p>
              <p className="font-semibold text-gray-800">{currentUser?.name}</p>
            </div>
            <NameWheel participants={remainingParticipants} />
          </div>
        )}
      </div>
    </div>
  );
};