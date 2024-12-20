import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Document, VehicleItem } from '../types';

export function useSupabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDocument = async (
    type: Document['type'],
    data: Omit<Document, 'id' | 'type' | 'created_at'>,
    items?: Omit<VehicleItem, 'id'>[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { data: document, error: docError } = await supabase
        .from(type + 's')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (docError) throw docError;

      if (items && items.length > 0) {
        const { error: itemsError } = await supabase
          .from(type + '_items')
          .insert(
            items.map(item => ({
              ...item,
              document_id: document.id
            }))
          );

        if (itemsError) throw itemsError;
      }

      return document;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (
    type: Document['type'],
    id: string,
    data: Partial<Document>,
    items?: Omit<VehicleItem, 'id'>[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { error: docError } = await supabase
        .from(type + 's')
        .update(data)
        .eq('id', id);

      if (docError) throw docError;

      if (items) {
        // Delete existing items
        await supabase
          .from(type + '_items')
          .delete()
          .eq('document_id', id);

        // Insert new items
        const { error: itemsError } = await supabase
          .from(type + '_items')
          .insert(
            items.map(item => ({
              ...item,
              document_id: id
            }))
          );

        if (itemsError) throw itemsError;
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (type: Document['type'], id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from(type + 's')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createDocument,
    updateDocument,
    deleteDocument,
    loading,
    error
  };
}