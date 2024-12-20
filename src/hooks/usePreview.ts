import { useState } from 'react';
import type { Document, VehicleItem } from '../types';

export function usePreview() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    document: Document;
    items: VehicleItem[];
  } | null>(null);

  const openPreview = (document: Document, items: VehicleItem[]) => {
    setPreviewData({ document, items });
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewData(null);
  };

  return {
    isPreviewOpen,
    previewData,
    openPreview,
    closePreview
  };
}