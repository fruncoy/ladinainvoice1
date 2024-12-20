import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import type { Document, VehicleItem } from '../../types';

interface QuotationPreviewProps {
  document: Document;
  items: VehicleItem[];
}

export function QuotationPreview({ document, items }: QuotationPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      {/* Header Section */}
      <div className="border border-[#FEDFCA] bg-[#FFF4EE] rounded-lg p-6 mb-8">
        <h2 className="text-[#00A651] font-medium mb-2">Quotation For:</h2>
        <p className="font-medium mb-1">{document.client_name}</p>
        <div className="text-sm text-gray-600">
          <p>Quotation Date: {formatDate(document.created_at)}</p>
          {document.due_date && <p>Valid Until: {formatDate(document.due_date)}</p>}
        </div>
      </div>

      {/* Service Details Table */}
      <table className="w-full mb-8 border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-6">#</th>
            <th className="text-left py-3 px-6">Service Details</th>
            <th className="text-center py-3 px-6">Qty</th>
            <th className="text-right py-3 px-6">Rate</th>
            <th className="text-right py-3 px-6">Amount</th>
          </tr>
        </thead>
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
                  ({formatDate(item.from_date)} - {formatDate(item.to_date)})
                </div>
              </td>
              <td className="text-center py-4 px-6">{item.quantity}</td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.price, document.currency)}
              </td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.quantity * item.price, document.currency)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td colSpan={4} className="text-right py-4 px-6 font-medium">
              Total:
            </td>
            <td className="text-right py-4 px-6 font-medium">
              {formatCurrency(
                items.reduce((sum, item) => sum + item.quantity * item.price, 0),
                document.currency
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}
      <div className="border border-gray-200 rounded-lg p-6 text-center">
        <h2 className="text-lg font-medium mb-2">
          Thank you for considering our services!
        </h2>
      </div>
    </div>
  );
}