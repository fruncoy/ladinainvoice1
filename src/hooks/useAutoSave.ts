import { useEffect, useRef } from 'react';
import type { Document, VehicleItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

interface AutoSaveData {
  document: Partial<Document>;
  items: VehicleItem[];
}

export function useAutoSave(documentId: string | null) {
  const { saveDocument, saveItems } = useLocalStorage();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  const save = (data: AutoSaveData) => {
    // Create a hash of the current data to compare
    const currentHash = JSON.stringify(data);
    
    // Only save if data has changed
    if (currentHash !== lastSavedRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (documentId && data.document.client_name) {
          const document: Document = {
            id: documentId,
            type: data.document.type!,
            client_name: data.document.client_name,
            created_at: data.document.created_at || new Date().toISOString(),
            currency: data.document.currency || 'KSH',
            total_amount: data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
            ...data.document
          };

          saveDocument(document);
          if (data.items.length > 0) {
            saveItems(documentId, data.items);
          }
          
          lastSavedRef.current = currentHash;
        }
      }, 1000); // 1 second debounce
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return save;
}