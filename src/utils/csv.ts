
import { Participant } from '../types';

export function generateCSV(assignments: { [key: string]: string }, participants: Participant[]): string {
  const header = 'Secret Santa,Buying Gift For\n';
  const rows = participants.map((participant) => {
    const receiverId = assignments[participant.id];
    const receiver = participants.find((p) => p.id === receiverId);
    return `${participant.name},${receiver?.name}\n`;
  });
  return header + rows.join('');
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}