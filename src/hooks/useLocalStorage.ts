import { useState, useEffect } from 'react';
import type { Document, VehicleItem } from '../types';

const STORAGE_KEYS = {
  DOCUMENTS: 'ladina_documents',
  ITEMS: 'ladina_items'
};

export function useLocalStorage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [items, setItems] = useState<Record<string, VehicleItem[]>>({});

  useEffect(() => {
    const storedDocs = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    const storedItems = localStorage.getItem(STORAGE_KEYS.ITEMS);
    
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    }
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const saveDocument = (document: Document) => {
    const updatedDocs = documents.filter(doc => doc.id !== document.id);
    const newDocs = [...updatedDocs, document];
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(newDocs));
    setDocuments(newDocs);
  };

  const deleteDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(updatedDocs));
    setDocuments(updatedDocs);
    
    // Also delete associated items
    const updatedItems = { ...items };
    delete updatedItems[id];
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const saveItems = (documentId: string, documentItems: VehicleItem[]) => {
    const updatedItems = { ...items, [documentId]: documentItems };
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  return {
    documents,
    items,
    saveDocument,
    deleteDocument,
    saveItems
  };
}