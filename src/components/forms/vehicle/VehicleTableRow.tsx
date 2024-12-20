import { Pencil, Trash2 } from 'lucide-react';
import type { VehicleItem } from '../../../types';
import { formatCurrency } from '../../../utils/currency';

interface VehicleTableRowProps {
  item: VehicleItem;
  currency: 'KSH' | 'USD';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VehicleTableRow({
  item,
  currency,
  onEdit,
  onDelete
}: VehicleTableRowProps) {
  const calculateTotal = () => item.quantity * item.price;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{item.vehicle_type}</td>
      <td className="px-6 py-4">{item.additional_info}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(item.price, currency)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(calculateTotal(), currency)}
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
  );
}