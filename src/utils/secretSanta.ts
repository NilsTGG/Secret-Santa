export function assignSecretSantas(participants: string[]): Map<string, string> {
  const assignments = new Map<string, string>();
  const available = [...participants];
  
  // Fisher-Yates shuffle
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  
  // Assign each person to the next person in the shuffled array
  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    const receiver = available[(i + 1) % available.length];
    
    // Prevent self-assignment
    if (giver === receiver) {
      // Swap with the next person if possible
      const nextIndex = (i + 2) % available.length;
      [available[nextIndex], available[(i + 1) % available.length]] = 
        [available[(i + 1) % available.length], available[nextIndex]];
    }
    
    assignments.set(giver, available[(i + 1) % available.length]);
  }
  
  return assignments;
}

export function generateCSV(assignments: Map<string, string>): string {
  let csv = 'Secret Santa,Buying Gift For\n';
  
  for (const [santa, recipient] of assignments) {
    csv += `${santa},${recipient}\n`;
  }
  
  return csv;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}