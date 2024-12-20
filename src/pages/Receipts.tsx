import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { PreviewModal } from '../components/previews/PreviewModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Document } from '../types';

export function Receipts() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');
  
  const { documents, items: allItems, saveDocument } = useLocalStorage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Get existing receipt if editing, or invoice if creating from invoice
  const existingDocument = id 
    ? documents.find(doc => doc.id === id)
    : invoiceId 
      ? documents.find(doc => doc.id === invoiceId)
      : null;

  const invoiceItems = invoiceId ? allItems[invoiceId] || [] : [];

  // ... existing state ...

  const handlePreview = () => {
    const documentData: Document = {
      id: id || crypto.randomUUID(),
      type: 'receipt',
      client_name: clientName,
      created_at: receiptDate,
      currency: existingDocument?.currency || 'KSH',
      total_amount: parseFloat(amount) || 0,
      received_by: receivedBy,
      payment_mode: paymentMode,
      payment_reference: paymentReference,
      balance: parseFloat(balance) || 0,
    };

    // Save document
    saveDocument(documentData);

    // Open preview modal
    setIsPreviewOpen(true);
  };

  // Rest of the component remains the same, just update the PreviewModal:
  return (
    // ... existing JSX ...
    {isPreviewOpen && (
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={{
          id: id || crypto.randomUUID(),
          type: 'receipt',
          client_name: clientName,
          created_at: receiptDate,
          currency: existingDocument?.currency || 'KSH',
          total_amount: parseFloat(amount) || 0,
          received_by: receivedBy,
          payment_mode: paymentMode,
          payment_reference: paymentReference,
          balance: parseFloat(balance) || 0,
        }}
        items={invoiceItems}
        allowEdit={false}
      />
    )}
  );
}