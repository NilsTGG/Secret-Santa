export interface Participant {
  id: string;
  name: string;
  assignedTo?: string; // ID of the person they need to buy a gift for
  assignedBy?: string; // ID of the person who spun the wheel
}

export interface Group {
  id: string;
  participants: Participant[];
}

export interface SpinnerUser {
  id: string;
  name: string;
}