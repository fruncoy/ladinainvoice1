import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentList } from '../components/documents/DocumentList';
import { PreviewModal } from '../components/previews/PreviewModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDocumentPreview } from '../hooks/useDocumentPreview';
import type { Document } from '../types';

export function Home() {
  const navigate = useNavigate();
  const { documents, deleteDocument } = useLocalStorage();
  const [documentsList, setDocumentsList] = useState<Document[]>([]);
  const { 
    isPreviewOpen, 
    currentDocument, 
    currentItems, 
    openPreview, 
    closePreview 
  } = useDocumentPreview();

  useEffect(() => {
    const sortedDocs = [...documents].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setDocumentsList(sortedDocs);
  }, [documents]);

  const handleEdit = (id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (document) {
      navigate(`/${document.type}s/${id}`);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
      setDocumentsList(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleEmail = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      const email = window.prompt('Enter recipient email address:');
      if (email) {
        alert(`Email sent to ${email}`);
      }
    }
  };

  const handleGenerateReceipt = (id: string) => {
    navigate(`/receipts/new?invoiceId=${id}`);
  };

  const handleGenerateInvoice = (id: string) => {
    navigate(`/invoices/new?quotationId=${id}`);
  };

  const getDocumentsByType = (type: Document['type']) => {
    return documentsList.filter(doc => doc.type === type).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-[#2B372A] pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
        
        <DocumentList
          title="Recent Invoices"
          documents={getDocumentsByType('invoice')}
          emptyMessage="No recent invoices"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
          onGenerateReceipt={handleGenerateReceipt}
        />
        
        <DocumentList
          title="Recent Quotations"
          documents={getDocumentsByType('quotation')}
          emptyMessage="No recent quotations"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
          onGenerateInvoice={handleGenerateInvoice}
        />
        
        <DocumentList
          title="Recent Receipts"
          documents={getDocumentsByType('receipt')}
          emptyMessage="No recent receipts"
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
        />
      </div>

      {isPreviewOpen && currentDocument && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={closePreview}
          document={currentDocument}
          items={currentItems}
        />
      )}
    </div>
  );
}