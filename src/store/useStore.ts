import { create } from 'zustand';
import { Group, Participant, SpinnerUser } from '../types';
import { assignSecretSantas, generateCSV, downloadCSV } from '../utils/secretSanta';

interface Store {
  group: Group;
  currentUser: SpinnerUser | null;
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  clearParticipants: () => void;
  authenticateUser: (name: string) => void;
  assignName: (spinnerId: string, selectedId: string) => void;
  getRemainingParticipants: (userId: string) => Participant[];
  logout: () => void;
  autoAssignAll: () => void;
}

export const useStore = create<Store>((set, get) => ({
  group: {
    id: crypto.randomUUID(),
    participants: [],
  },
  currentUser: null,
  addParticipant: (name: string) =>
    set((state) => ({
      group: {
        ...state.group,
        participants: [
          ...state.group.participants,
          { id: crypto.randomUUID(), name },
        ],
      },
    })),
  removeParticipant: (id: string) =>
    set((state) => ({
      group: {
        ...state.group,
        participants: state.group.participants.filter((p) => p.id !== id),
      },
    })),
  clearParticipants: () =>
    set((state) => ({
      group: {
        ...state.group,
        participants: [],
      },
    })),
  authenticateUser: (name: string) =>
    set((state) => {
      const participant = state.group.participants.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (participant) {
        return {
          currentUser: {
            id: participant.id,
            name: participant.name,
          },
        };
      }
      return state;
    }),
  assignName: (spinnerId: string, selectedId: string) =>
    set((state) => ({
      group: {
        ...state.group,
        participants: state.group.participants.map((p) =>
          p.id === selectedId
            ? { ...p, assignedBy: spinnerId }
            : p
        ),
      },
    })),
  getRemainingParticipants: (userId: string) => {
    const state = get();
    return state.group.participants.filter(
      (p) => !p.assignedBy && p.id !== userId
    );
  },
  logout: () => set({ currentUser: null }),
  autoAssignAll: () => {
    const state = get();
    const names = state.group.participants.map(p => p.name);
    const assignments = assignSecretSantas(names);
    
    const csv = generateCSV(assignments);
    downloadCSV(csv, 'secret-santa-assignments.csv');
    
    // Update store with assignments
    set((state) => ({
      group: {
        ...state.group,
        participants: state.group.participants.map(p => ({
          ...p,
          assignedTo: state.group.participants.find(
            recipient => recipient.name === assignments.get(p.name)
          )?.id,
          assignedBy: state.group.participants.find(
            santa => assignments.get(santa.name) === p.name
          )?.id,
        })),
      },
    }));
  },
}));