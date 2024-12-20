import type { Document, VehicleItem } from '../types';

const STORAGE_KEYS = {
  DOCUMENTS: 'ladina_documents',
  ITEMS: 'ladina_items'
};

export function saveDocuments(documents: Document[]) {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
}

export function getDocuments(): Document[] {
  const stored = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveDocument(document: Document) {
  const documents = getDocuments();
  const existingIndex = documents.findIndex(doc => doc.id === document.id);
  
  if (existingIndex >= 0) {
    documents[existingIndex] = document;
  } else {
    documents.push(document);
  }
  
  saveDocuments(documents);
}

export function deleteDocument(id: string) {
  const documents = getDocuments().filter(doc => doc.id !== id);
  saveDocuments(documents);
  deleteItems(id);
}

export function saveItems(documentId: string, items: VehicleItem[]) {
  const allItems = getItems();
  allItems[documentId] = items;
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(allItems));
}

export function getItems(): Record<string, VehicleItem[]> {
  const stored = localStorage.getItem(STORAGE_KEYS.ITEMS);
  return stored ? JSON.parse(stored) : {};
}

export function deleteItems(documentId: string) {
  const allItems = getItems();
  delete allItems[documentId];
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(allItems));
}