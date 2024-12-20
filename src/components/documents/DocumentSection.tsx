import { DocumentCard } from './DocumentCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Document, DocumentType } from '../../types';

interface DocumentSectionProps {
  title: string;
  type: DocumentType;
  emptyMessage: string;
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onEmail: (document: Document) => void;
  onGenerateReceipt?: (id: string) => void;
  onGenerateInvoice?: (id: string) => void;
}

export function DocumentSection({
  title,
  type,
  emptyMessage,
  onEdit,
  onDelete,
  onEmail,
  onGenerateReceipt,
  onGenerateInvoice
}: DocumentSectionProps) {
  const { documents } = useLocalStorage();
  
  // Get documents of specified type, sorted by creation date (newest first)
  const sectionDocuments = documents
    .filter(doc => doc.type === type)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3); // Only show 3 most recent

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sectionDocuments.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-white rounded-lg text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          sectionDocuments.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onEdit={() => onEdit(doc)}
              onDelete={() => onDelete(doc)}
              onEmail={() => onEmail(doc)}
              onGenerateReceipt={
                type === 'invoice' 
                  ? () => onGenerateReceipt?.(doc.id)
                  : undefined
              }
              onGenerateInvoice={
                type === 'quotation'
                  ? () => onGenerateInvoice?.(doc.id)
                  : undefined
              }
            />
          ))
        )}
      </div>
    </section>
  );
}