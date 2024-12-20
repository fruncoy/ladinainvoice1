import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CurrencySelector } from '../components/forms/CurrencySelector';
import { InlineVehicleTable } from '../components/forms/vehicle/InlineVehicleTable';
import { PreviewModal } from '../components/previews/PreviewModal';
import { Input } from '../components/ui/Input';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Document, VehicleItem } from '../types';

export function Quotations() {
  const { id } = useParams();
  const { documents, items: allItems, saveDocument, saveItems } = useLocalStorage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Get existing quotation if editing
  const existingDocument = id ? documents.find(doc => doc.id === id) : null;
  const existingItems = id ? allItems[id] || [] : [];

  const [currency, setCurrency] = useState<'KSH' | 'USD'>(existingDocument?.currency || 'KSH');
  const [clientName, setClientName] = useState(existingDocument?.client_name || '');
  const [quotationDate, setQuotationDate] = useState(
    existingDocument?.created_at 
      ? new Date(existingDocument.created_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [validUntil, setValidUntil] = useState(existingDocument?.due_date || '');
  const [items, setItems] = useState<VehicleItem[]>(existingItems);

  const handleAddItem = (item: Omit<VehicleItem, 'id'>) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handlePreview = () => {
    const documentData: Document = {
      id: id || crypto.randomUUID(),
      type: 'quotation',
      client_name: clientName,
      created_at: quotationDate,
      currency,
      due_date: validUntil,
      total_amount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    };

    // Save document and items
    saveDocument(documentData);
    saveItems(documentData.id, items);

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
          type: 'quotation',
          client_name: clientName,
          created_at: quotationDate,
          currency,
          due_date: validUntil,
          total_amount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
        }}
        items={items}
        allowEdit={false}
      />
    )}
  );
}