import { Mail, FileText, Receipt, Pencil, Trash2 } from 'lucide-react';
import type { Document } from '../../types';

interface DocumentActionsProps {
  document: Document;
  onEdit: () => void;
  onDelete: () => void;
  onEmail: () => void;
  onGenerateReceipt?: () => void;
  onGenerateInvoice?: () => void;
}

export function DocumentActions({
  document,
  onEdit,
  onDelete,
  onEmail,
  onGenerateReceipt,
  onGenerateInvoice
}: DocumentActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-600 hover:text-[#FF771F]"
        title="Edit"
      >
        <Pencil size={18} />
      </button>
      
      <button
        onClick={onEmail}
        className="p-2 text-gray-600 hover:text-[#FF771F]"
        title="Send Email"
      >
        <Mail size={18} />
      </button>

      {document.type === 'invoice' && onGenerateReceipt && (
        <button
          onClick={onGenerateReceipt}
          className="p-2 text-gray-600 hover:text-[#FF771F]"
          title="Generate Receipt"
        >
          <Receipt size={18} />
        </button>
      )}

      {document.type === 'quotation' && onGenerateInvoice && (
        <button
          onClick={onGenerateInvoice}
          className="p-2 text-gray-600 hover:text-[#FF771F]"
          title="Generate Invoice"
        >
          <FileText size={18} />
        </button>
      )}

      <button
        onClick={onDelete}
        className="p-2 text-gray-600 hover:text-red-500"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}