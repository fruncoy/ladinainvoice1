import { formatDate, isValidISODate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import type { Document, VehicleItem } from '../../types';

interface InvoicePreviewProps {
  document: Document;
  items: VehicleItem[];
}

export function InvoicePreview({ document, items }: InvoicePreviewProps) {
  // Validate dates before rendering
  const createdAt = isValidISODate(document.created_at) ? formatDate(document.created_at) : '';
  const dueDate = document.due_date && isValidISODate(document.due_date) 
    ? formatDate(document.due_date) 
    : '';

  const renderItemDates = (item: VehicleItem) => {
    const fromDate = isValidISODate(item.from_date) ? formatDate(item.from_date) : '';
    const toDate = isValidISODate(item.to_date) ? formatDate(item.to_date) : '';
    return fromDate && toDate ? `(${fromDate} - ${toDate})` : '';
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      {/* Header Section */}
      <div className="border border-[#FEDFCA] bg-[#FFF4EE] rounded-lg p-6 mb-8">
        <h2 className="text-[#00A651] font-medium mb-2">Bill To:</h2>
        <p className="font-medium mb-1">{document.client_name}</p>
        <div className="text-sm text-gray-600">
          <p>Invoice Date: {createdAt}</p>
          {dueDate && <p>Due Date: {dueDate}</p>}
        </div>
      </div>

      {/* Service Details Table */}
      <table className="w-full mb-8 border-collapse border border-gray-200 rounded-lg">
        {/* ... table header ... */}
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">
                <div className="text-[#00A651] font-medium">
                  {item.vehicle_type}
                </div>
                {item.additional_info && (
                  <div className="text-sm text-gray-500">{item.additional_info}</div>
                )}
                <div className="text-sm text-gray-500">
                  {renderItemDates(item)}
                </div>
              </td>
              {/* ... other cells ... */}
            </tr>
          ))}
        </tbody>
        {/* ... table footer ... */}
      </table>

      {/* ... rest of the component ... */}
    </div>
  );
}