import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import type { Document, VehicleItem } from '../../types';

interface DocumentPreviewProps {
  document: Document;
  items: VehicleItem[];
}

export function DocumentPreview({ document, items }: DocumentPreviewProps) {
  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      {/* Header Section */}
      <div className="border border-[#FEDFCA] bg-[#FFF4EE] rounded-lg p-6 mb-8">
        <h2 className="text-[#00A651] font-medium mb-2">
          {document.type === 'invoice' ? 'Bill To' : 'For'}:
        </h2>
        <p className="font-medium mb-1">{document.client_name}</p>
        <div className="text-sm text-gray-600">
          <p>Date: {formatDate(document.created_at, true)}</p>
          {document.due_date && (
            <p>
              {document.type === 'invoice' ? 'Due Date' : 'Valid Until'}: {formatDate(document.due_date)}
            </p>
          )}
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
            <th className="text-center py-3 px-6">Period</th>
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
              </td>
              <td className="text-center py-4 px-6">{item.quantity}</td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.price, document.currency)}
              </td>
              <td className="text-right py-4 px-6">
                {formatCurrency(item.quantity * item.price, document.currency)}
              </td>
              <td className="text-center py-4 px-6">
                {formatDate(item.from_date)} - {formatDate(item.to_date)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td colSpan={4} className="text-right py-4 px-6 font-medium">
              Total:
            </td>
            <td className="text-right py-4 px-6 font-medium" colSpan={2}>
              {formatCurrency(totalAmount, document.currency)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Payment Details for Invoice */}
      {document.type === 'invoice' && (
        <div className="mb-8">
          <h2 className="text-[#00A651] font-medium mb-4">Payment Details</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-orange-400 mb-3">Bank Transfer</h3>
              <div className="text-sm space-y-2">
                <p>Bank Name: NCBA, Kenya, Code-07000</p>
                <p>Bank Branch: Kilimani, Code-129</p>
                <p>Account Name: Ledina Travel Safaris</p>
                <p>Bank Account: 4550870021</p>
                <p>Swift Code: CBAFKENX</p>
              </div>
            </div>
            <div>
              <h3 className="text-orange-400 text-right mb-3">M-PESA</h3>
              <div className="text-sm space-y-2 text-right">
                <p>MPESA Paybill: 880100</p>
                <p>Account Number: 1007209933</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border border-gray-200 rounded-lg p-6 text-center">
        <h2 className="text-lg font-medium mb-2">
          {document.type === 'invoice' 
            ? 'Thank You for Your Business!'
            : 'Thank you for considering our services!'}
        </h2>
      </div>
    </div>
  );
}