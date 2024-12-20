import type { Document, VehicleItem } from '../../types';
import { generateInvoicePDF, generateQuotationPDF, generateReceiptPDF } from './generators';

export function generatePDF(document: Document, items: VehicleItem[]) {
  switch (document.type) {
    case 'invoice':
      return generateInvoicePDF({ document, items });
    case 'quotation':
      return generateQuotationPDF({ document, items });
    case 'receipt':
      return generateReceiptPDF({ document, items });
    default:
      throw new Error(`Unsupported document type: ${document.type}`);
  }
}

export function downloadPDF(document: Document, items: VehicleItem[]) {
  try {
    const pdf = generatePDF(document, items);
    pdf.save(`${document.type}-${document.id}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}