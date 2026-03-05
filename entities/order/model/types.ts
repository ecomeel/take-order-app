export type CargoType = 'documents' | 'fragile' | 'standard';

export interface Order {
  id: string;
  senderName: string;
  senderPhone: string;
  originCity: string;
  receiverName: string;
  destinationCity: string;
  cargoType: CargoType;
  weight: number;
  createdAt: string;
  status: 'new';
}