import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import type { Document, VehicleItem } from '../../types';

interface ReceiptPreviewProps {
  document: Document;
  items: VehicleItem[];
}

export function ReceiptPreview({ document, items }: ReceiptPreviewProps) {
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-300">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div></div>
        <h1 className="text-3xl font-bold">RECEIPT</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Date</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {formatDate(document.created_at)}
              </div>
            </div>

            <div>
              <p className="font-medium mb-1">Received From</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {document.client_name}
              </div>
            </div>

            <div>
              <p className="font-medium mb-1">Amount</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {formatCurrency(totalAmount, document.currency)}
              </div>
            </div>

            <div>
              <p className="font-medium mb-1">For</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {items.map(item => (
                  <div key={item.id}>
                    {item.vehicle_type} ({formatDate(item.from_date)} - {formatDate(item.to_date)})
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium mb-1">Received By</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {document.received_by}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Receipt No.</p>
              <div className="border-b-2 border-dotted border-gray-300 py-1">
                {document.id}
              </div>
            </div>

            <div className="mt-8">
              <p className="font-medium mb-3">Paid By</p>
              <div className="space-y-2">
                {['cash', 'cheque', 'mpesa', 'bank'].map(method => (
                  <label key={method} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={document.payment_mode === method}
                      readOnly
                      className="form-checkbox"
                    />
                    <span className="capitalize">{method}</span>
                    {method === document.payment_mode && document.payment_reference && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({document.payment_reference})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Current Balance</span>
                <div className="border-b-2 border-dotted border-gray-300 flex-1 mx-4"></div>
                <span>{formatCurrency(document.balance || 0, document.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Amount</span>
                <div className="border-b-2 border-dotted border-gray-300 flex-1 mx-4"></div>
                <span>{formatCurrency(totalAmount, document.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Balance Due</span>
                <div className="border-b-2 border-dotted border-gray-300 flex-1 mx-4"></div>
                <span>{formatCurrency(document.balance || 0, document.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>This is a computer-generated receipt.</p>
      </div>
    </div>
  );
}