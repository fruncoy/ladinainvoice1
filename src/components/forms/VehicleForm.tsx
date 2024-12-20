import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { VehicleItem } from '../../types';

interface VehicleFormProps {
  onSubmit: (data: Omit<VehicleItem, 'id'>) => void;
  onCancel: () => void;
  initialData?: VehicleItem;
}

export function VehicleForm({ onSubmit, onCancel, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    vehicle_type: initialData?.vehicle_type || '',
    quantity: initialData?.quantity || 1,
    price: initialData?.price || 0,
    from_date: initialData?.from_date || '',
    to_date: initialData?.to_date || '',
    additional_info: initialData?.additional_info || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Vehicle Type"
        value={formData.vehicle_type}
        onChange={e => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
        required
        className="input-groove"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="Quantity"
          value={formData.quantity}
          onChange={e => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
          min="1"
          required
          className="input-groove"
        />
        <Input
          type="number"
          label="Price"
          value={formData.price}
          onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
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
          onChange={e => setFormData(prev => ({ ...prev, from_date: e.target.value }))}
          required
          className="input-groove"
        />
        <Input
          type="date"
          label="To Date"
          value={formData.to_date}
          onChange={e => setFormData(prev => ({ ...prev, to_date: e.target.value }))}
          required
          className="input-groove"
        />
      </div>
      
      <Input
        label="Additional Info"
        value={formData.additional_info}
        onChange={e => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
        className="input-groove"
      />
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Vehicle
        </Button>
      </div>
    </form>
  );
}