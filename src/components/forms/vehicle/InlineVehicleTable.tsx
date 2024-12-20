import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import type { VehicleItem } from '../../../types';
import { formatCurrency } from '../../../utils/currency';

interface InlineVehicleTableProps {
  items: VehicleItem[];
  currency: 'KSH' | 'USD';
  onAddItem: (item: Omit<VehicleItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onPreview: () => void;
}

export function InlineVehicleTable({
  items,
  currency,
  onAddItem,
  onDeleteItem,
  onPreview
}: InlineVehicleTableProps) {
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
      onAddItem({
        ...newItem,
        price: Math.round(newItem.price), // Round price to remove decimals
        quantity: Math.max(1, Math.round(newItem.quantity)) // Ensure quantity is at least 1
      });
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
      <div className="bg-white rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">From Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Additional Info</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-base">{item.vehicle_type}</td>
                  <td className="px-4 py-3 text-base">{item.quantity}</td>
                  <td className="px-4 py-3 text-base">{formatCurrency(item.price, currency)}</td>
                  <td className="px-4 py-3 text-base">{item.from_date}</td>
                  <td className="px-4 py-3 text-base">{item.to_date}</td>
                  <td className="px-4 py-3 text-base">{item.additional_info}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-gray-600 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-3">
                  <Input
                    value={newItem.vehicle_type}
                    onChange={(e) => setNewItem({ ...newItem, vehicle_type: e.target.value })}
                    placeholder="Enter vehicle type"
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={String(newItem.quantity)}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={String(newItem.price)}
                    onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="date"
                    value={newItem.from_date}
                    onChange={(e) => setNewItem({ ...newItem, from_date: e.target.value })}
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="date"
                    value={newItem.to_date}
                    onChange={(e) => setNewItem({ ...newItem, to_date: e.target.value })}
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    value={newItem.additional_info}
                    onChange={(e) => setNewItem({ ...newItem, additional_info: e.target.value })}
                    placeholder="Additional info"
                    className="text-base p-3"
                  />
                </td>
                <td className="px-4 py-3">
                  <Button onClick={handleAddItem}>Add</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="space-x-4">
          <span className="text-gray-600">Total Vehicles: {items.length}</span>
          <span className="text-gray-600">
            Subtotal: {formatCurrency(
              items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
              currency
            )}
          </span>
        </div>
        <Button variant="primary" onClick={onPreview}>Preview</Button>
      </div>
    </div>
  );
}