import { useState } from 'react';
import type { VehicleItem } from '../../../types';

export function useDocumentItems(initialItems: VehicleItem[] = []) {
  const [items, setItems] = useState<VehicleItem[]>(initialItems);

  const addItem = (item: Omit<VehicleItem, 'id'>) => {
    setItems([...items, { ...item, id: crypto.randomUUID() }]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<VehicleItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const calculateTotal = () => 
    items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return {
    items,
    setItems,
    addItem,
    deleteItem,
    updateItem,
    calculateTotal,
  };
}