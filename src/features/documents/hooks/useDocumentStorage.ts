import { useCallback } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { Document, VehicleItem } from '../../../types';

export function useDocumentStorage() {
  const { saveDocument, deleteDocument, saveItems } = useLocalStorage();

  const saveDocumentWithItems = useCallback((document: Document, items: VehicleItem[]) => {
    const documentWithTotal = {
      ...document,
      total_amount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    };
    saveDocument(documentWithTotal);
    saveItems(document.id, items);
    return documentWithTotal;
  }, [saveDocument, saveItems]);

  const deleteDocumentWithItems = useCallback((id: string) => {
    deleteDocument(id);
  }, [deleteDocument]);

  return {
    saveDocumentWithItems,
    deleteDocumentWithItems,
  };
}