import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Document, VehicleItem } from '../types';

export function useDocumentPreview() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [currentItems, setCurrentItems] = useState<VehicleItem[]>([]);
  const { documents, items: allItems } = useLocalStorage();

  const openPreview = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setCurrentDocument(doc);
      setCurrentItems(allItems[documentId] || []);
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setCurrentDocument(null);
    setCurrentItems([]);
  };

  return {
    isPreviewOpen,
    currentDocument,
    currentItems,
    openPreview,
    closePreview
  };
}