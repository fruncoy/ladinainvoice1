import { Plus } from 'lucide-react';
import type { VehicleItem } from '../../../types';
import { Button } from '../../ui/Button';
import { VehicleTableHeader } from './VehicleTableHeader';
import { VehicleTableRow } from './VehicleTableRow';

interface VehicleTableProps {
  items: VehicleItem[];
  currency: 'KSH' | 'USD';
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VehicleTable({ 
  items, 
  currency,
  onAdd, 
  onEdit, 
  onDelete 
}: VehicleTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Vehicle/Item Details</h2>
        <Button onClick={onAdd} className="flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Item</span>
        </Button>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
          No items added yet. Click "Add Item" to begin.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <VehicleTableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <VehicleTableRow
                  key={item.id}
                  item={item}
                  currency={currency}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}