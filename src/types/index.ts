export interface Document {
  id: string;
  type: 'invoice' | 'receipt' | 'quotation';
  client_name: string;
  created_at: string;
  currency: 'KSH' | 'USD';
  total_amount: number;
  due_date?: string;
  payment_mode?: 'cash' | 'cheque' | 'mpesa' | 'bank';
  payment_reference?: string;
  balance?: number;
  received_by?: string;
}

export interface VehicleItem {
  id: string;
  vehicle_type: string;
  quantity: number;
  price: number;
  from_date: string;
  to_date: string;
  additional_info?: string;
}