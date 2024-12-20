import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Document } from '../types';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data: invoices } = await supabase.from('invoices').select('*');
      const { data: receipts } = await supabase.from('receipts').select('*');
      const { data: quotations } = await supabase.from('quotations').select('*');
      
      const allDocs = [
        ...(invoices || []).map(doc => ({ ...doc, type: 'invoice' as const })),
        ...(receipts || []).map(doc => ({ ...doc, type: 'receipt' as const })),
        ...(quotations || []).map(doc => ({ ...doc, type: 'quotation' as const }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setDocuments(allDocs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, loading, error, refetch: fetchDocuments };
}