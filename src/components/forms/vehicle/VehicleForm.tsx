import { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import type { VehicleItem } from '../../../types';
import { VehicleFormFields } from './VehicleFormFields';
import type { VehicleFormData } from './types';

interface VehicleFormProps {
  onSubmit: (data: Omit<VehicleItem, 'id'>) => void;
  onCancel: () => void;
  initialData?: VehicleItem;
}

export function VehicleForm({ onSubmit, onCancel, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState<VehicleFormData>({
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
      <VehicleFormFields
        formData={formData}
        setFormData={setFormData}
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