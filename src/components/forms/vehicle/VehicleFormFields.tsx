import { Input } from '../../ui/Input';
import type { VehicleFormData } from './types';

interface VehicleFormFieldsProps {
  formData: VehicleFormData;
  setFormData: (data: VehicleFormData) => void;
}

export function VehicleFormFields({ formData, setFormData }: VehicleFormFieldsProps) {
  const updateField = (field: keyof VehicleFormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <Input
        label="Vehicle Type"
        value={formData.vehicle_type}
        onChange={e => updateField('vehicle_type', e.target.value)}
        required
        className="input-groove"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="Quantity"
          value={formData.quantity}
          onChange={e => updateField('quantity', parseInt(e.target.value))}
          min="1"
          required
          className="input-groove"
        />
        <Input
          type="number"
          label="Price"
          value={formData.price}
          onChange={e => updateField('price', parseFloat(e.target.value))}
          min="0"
          step="0.01"
          required
          className="input-groove"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="From Date"
          value={formData.from_date}
          onChange={e => updateField('from_date', e.target.value)}
          required
          className="input-groove"
        />
        <Input
          type="date"
          label="To Date"
          value={formData.to_date}
          onChange={e => updateField('to_date', e.target.value)}
          required
          className="input-groove"
        />
      </div>
      
      <Input
        label="Additional Info"
        value={formData.additional_info}
        onChange={e => updateField('additional_info', e.target.value)}
        className="input-groove"
      />
    </>
  );
}