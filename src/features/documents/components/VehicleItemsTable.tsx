import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { formatCurrency } from '../../../utils/currency';
import type { VehicleItem } from '../../../types';

interface VehicleItemsTableProps {
  items: VehicleItem[];
  currency: 'KSH' | 'USD';
  onAddItem: (item: Omit<VehicleItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
}

export function VehicleItemsTable({
  items,
  currency,
  onAddItem,
  onDeleteItem,
}: VehicleItemsTableProps) {
  const [newItem, setNewItem] = useState<Omit<VehicleItem, 'id'>>({
    vehicle_type: '',
    quantity: 1,
    price: 0,
    from_date: '',
    to_date: '',
    additional_info: ''
  });

  const handleAddItem = () => {
    if (newItem.vehicle_type && newItem.price > 0) {
      onAddItem(newItem);
      setNewItem({
        vehicle_type: '',
        quantity: 1,
        price: 0,
        from_date: '',
        to_date: '',
        additional_info: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Vehicle Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                From Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                To Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Additional Info
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.vehicle_type}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{formatCurrency(item.price, currency)}</td>
                <td className="px-6 py-4">{item.from_date}</td>
                <td className="px-6 py-4">{item.to_date}</td>
                <td className="px-6 py-4">{item.additional_info}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4">
                <Input
                  value={newItem.vehicle_type}
                  onChange={(e) => setNewItem({ ...newItem, vehicle_type: e.target.value })}
                  placeholder="Enter vehicle type"
                />
              </td>
              <td className="px-6 py-4">
                <Input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </td>
              <td className="px-6 py-4">
                <Input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </td>
              <td className="px-6 py-4">
                <Input
                  type="date"
                  value={newItem.from_date}
                  onChange={(e) => setNewItem({ ...newItem, from_date: e.target.value })}
                />
              </td>
              <td className="px-6 py-4">
                <Input
                  type="date"
                  value={newItem.to_date}
                  onChange={(e) => setNewItem({ ...newItem, to_date: e.target.value })}
                />
              </td>
              <td className="px-6 py-4">
                <Input
                  value={newItem.additional_info}
                  onChange={(e) => setNewItem({ ...newItem, additional_info: e.target.value })}
                  placeholder="Additional info"
                />
              </td>
              <td className="px-6 py-4">
                <Button onClick={handleAddItem}>
                  <Plus size={18} />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="text-gray-600">
          Total Items: {items.length}
        </div>
        <div className="text-lg font-medium">
          Total: {formatCurrency(
            items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
            currency
          )}
        </div>
      </div>
    </div>
  );
}