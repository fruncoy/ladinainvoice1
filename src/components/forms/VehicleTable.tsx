import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { VehicleItem } from '../../types';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/currency';

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
  const calculateTotal = (item: VehicleItem) => item.quantity * item.price;

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
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Per Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.vehicle_type}</td>
                  <td className="px-6 py-4">{item.additional_info}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(item.price, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(calculateTotal(item), currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="text-gray-600 hover:text-[#FF771F]"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}