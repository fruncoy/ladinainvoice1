import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Document, DocumentType } from '../types';
import { isValidISODate } from '../utils/date';

interface UseDocumentProps {
  id?: string;
  type: DocumentType;
}

export function useDocument({ id, type }: UseDocumentProps) {
  const { documents, saveDocument } = useLocalStorage();
  const [document, setDocument] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const doc = documents.find(d => d.id === id);
      if (doc) {
        // Validate date fields before setting
        if (!isValidISODate(doc.created_at)) {
          setError('Invalid document date format');
          return;
        }
        setDocument(doc);
      }
    }
  }, [id, documents]);

  const updateDocument = (updates: Partial<Document>) => {
    if (document) {
      const updatedDoc = {
        ...document,
        ...updates,
        type // Ensure type remains unchanged
      };
      saveDocument(updatedDoc);
      setDocument(updatedDoc);
    }
  };

  return {
    document,
    updateDocument,
    error
  };
}