export type Printer = 'hp-laserjet' | 'canon-mf' | 'epson-l3150' | 'xerox-versalink';

export type RequestStatus = 'new' | 'accepted' | 'done';

export interface Request {
  id: string;
  description: string;
  urgent: boolean;
  printer: Printer | null;
  imageName: string | null;
  status: RequestStatus;
  createdAt: string;
}

export const PRINTERS: { value: Printer; label: string }[] = [
  { value: 'hp-laserjet', label: 'HP LaserJet Pro' },
  { value: 'canon-mf', label: 'Canon i-SENSYS MF' },
  { value: 'epson-l3150', label: 'Epson L3150' },
  { value: 'xerox-versalink', label: 'Xerox VersaLink' },
];