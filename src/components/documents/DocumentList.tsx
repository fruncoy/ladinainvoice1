import { DocumentCard } from './DocumentCard';
import type { Document } from '../../types';

interface DocumentListProps {
  title: string;
  documents: Document[];
  emptyMessage: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onEmail: (id: string) => void;
  onGenerateReceipt?: (id: string) => void;
  onGenerateInvoice?: (id: string) => void;
}

export function DocumentList({
  title,
  documents,
  emptyMessage,
  onEdit,
  onDelete,
  onEmail,
  onGenerateReceipt,
  onGenerateInvoice
}: DocumentListProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-white rounded-lg text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          documents.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onEdit={onEdit}
              onDelete={onDelete}
              onEmail={onEmail}
              onGenerateReceipt={onGenerateReceipt}
              onGenerateInvoice={onGenerateInvoice}
            />
          ))
        )}
      </div>
    </section>
  );
}