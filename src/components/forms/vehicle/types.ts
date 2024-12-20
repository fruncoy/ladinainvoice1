export interface VehicleFormData {
  vehicle_type: string;
  quantity: number;
  price: number;
  from_date: string;
  to_date: string;
  additional_info?: string;
}