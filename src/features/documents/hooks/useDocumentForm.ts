import { useState } from 'react';
import type { Document, DocumentType } from '../../../types';

interface UseDocumentFormProps {
  type: DocumentType;
  initialData?: Document;
}

export function useDocumentForm({ type, initialData }: UseDocumentFormProps) {
  const [clientName, setClientName] = useState(initialData?.client_name || '');
  const [currency, setCurrency] = useState<'KSH' | 'USD'>(initialData?.currency || 'KSH');
  const [documentDate, setDocumentDate] = useState(
    initialData?.created_at || new Date().toISOString()
  );
  const [dueDate, setDueDate] = useState(initialData?.due_date || '');

  const documentData: Document = {
    id: initialData?.id || crypto.randomUUID(),
    type,
    client_name: clientName,
    created_at: documentDate,
    currency,
    due_date: dueDate,
    total_amount: 0, // This will be calculated from items
  };

  return {
    clientName,
    setClientName,
    currency,
    setCurrency,
    documentDate,
    setDocumentDate,
    dueDate,
    setDueDate,
    documentData,
  };
}