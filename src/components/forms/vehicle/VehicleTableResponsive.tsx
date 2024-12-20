import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import type { VehicleItem } from '../../../types';
import { formatCurrency } from '../../../utils/currency';

interface VehicleTableResponsiveProps {
  items: VehicleItem[];
  currency: 'KSH' | 'USD';
  onAddItem: (item: Omit<VehicleItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  onPreview: () => void;
}

export function VehicleTableResponsive({
  items,
  currency,
  onAddItem,
  onDeleteItem,
  onPreview
}: VehicleTableResponsiveProps) {
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
      {/* Existing Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{item.vehicle_type}</h3>
                <p className="text-gray-600">{item.additional_info}</p>
              </div>
              <button
                onClick={() => onDeleteItem(item.id)}
                className="text-gray-400 hover:text-red-500 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-base">
              <div>
                <span className="text-gray-500">Quantity:</span>
                <span className="ml-2 font-medium">{item.quantity}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-2 font-medium">
                  {formatCurrency(Math.round(item.price), currency)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">From:</span>
                <span className="ml-2 font-medium">{item.from_date}</span>
              </div>
              <div>
                <span className="text-gray-500">To:</span>
                <span className="ml-2 font-medium">{item.to_date}</span>
              </div>
              <div className="col-span-2 pt-2 border-t">
                <span className="text-gray-500">Total:</span>
                <span className="ml-2 font-medium text-lg">
                  {formatCurrency(Math.round(item.quantity * item.price), currency)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-medium">Add New Item</h3>
          <Button onClick={handleAddItem} size="lg" className="flex items-center gap-2">
            <Plus size={20} />
            <span>Add Item</span>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Vehicle Type"
            value={newItem.vehicle_type}
            onChange={(e) => setNewItem({ ...newItem, vehicle_type: e.target.value })}
            placeholder="Enter vehicle type"
            className="text-lg p-4"
          />
          
          <Input
            type="number"
            label="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            min="1"
            className="text-lg p-4"
          />
          
          <Input
            type="number"
            label="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ 
              ...newItem, 
              price: Math.round(parseFloat(e.target.value)) 
            })}
            min="0"
            className="text-lg p-4"
          />
          
          <Input
            type="date"
            label="From Date"
            value={newItem.from_date}
            onChange={(e) => setNewItem({ ...newItem, from_date: e.target.value })}
            className="text-lg p-4"
          />
          
          <Input
            type="date"
            label="To Date"
            value={newItem.to_date}
            onChange={(e) => setNewItem({ ...newItem, to_date: e.target.value })}
            className="text-lg p-4"
          />
          
          <Input
            label="Additional Info"
            value={newItem.additional_info}
            onChange={(e) => setNewItem({ ...newItem, additional_info: e.target.value })}
            placeholder="Additional info"
            className="text-lg p-4"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-lg gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="text-lg">Total Items: {items.length}</div>
          <div className="text-xl font-medium">
            Subtotal: {formatCurrency(
              items.reduce((sum, item) => sum + Math.round(item.quantity * item.price), 0),
              currency
            )}
          </div>
        </div>
        <Button 
          variant="primary" 
          size="lg"
          onClick={onPreview}
          className="w-full sm:w-auto text-lg"
        >
          Preview
        </Button>
      </div>
    </div>
  );
}