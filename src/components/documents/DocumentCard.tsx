import { DocumentActions } from './DocumentActions';
import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';
import type { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onEmail: (id: string) => void;
  onGenerateReceipt?: (id: string) => void;
  onGenerateInvoice?: (id: string) => void;
}

export function DocumentCard({
  document,
  onEdit,
  onDelete,
  onEmail,
  onGenerateReceipt,
  onGenerateInvoice
}: DocumentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold capitalize">{document.type}</h3>
          <p className="text-sm text-gray-600">{document.client_name}</p>
          <p className="text-sm text-gray-500">
            {formatDate(document.created_at, true)}
          </p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            {formatCurrency(document.total_amount, document.currency)}
          </p>
        </div>
        <DocumentActions
          document={document}
          onEdit={() => onEdit(document.id)}
          onDelete={() => onDelete(document.id)}
          onEmail={() => onEmail(document.id)}
          onGenerateReceipt={
            document.type === 'invoice' && onGenerateReceipt
              ? () => onGenerateReceipt(document.id)
              : undefined
          }
          onGenerateInvoice={
            document.type === 'quotation' && onGenerateInvoice
              ? () => onGenerateInvoice(document.id)
              : undefined
          }
        />
      </div>
    </div>
  );
}