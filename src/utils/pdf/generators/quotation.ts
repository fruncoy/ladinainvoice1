import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { PDFGeneratorOptions } from '../types';
import { PDF_CONFIG } from '../config';
import { formatCurrency } from '../../currency';
import { formatDate } from '../../date';

export function generateQuotationPDF({ document, items }: PDFGeneratorOptions) {
  const pdf = new jsPDF();
  const totalAmount = items.reduce((sum, item) => sum + Math.round(item.quantity * item.price), 0);

  // Header
  pdf.setFontSize(PDF_CONFIG.fonts.header.size);
  pdf.text('QUOTATION', 105, 20, { align: 'center' });
  
  // Client Info
  pdf.setFontSize(PDF_CONFIG.fonts.body.size);
  pdf.text('Quotation For:', 20, 40);
  pdf.text(document.client_name, 20, 50);
  pdf.text(`Date: ${formatDate(document.created_at)}`, 20, 60);
  if (document.due_date) {
    pdf.text(`Valid Until: ${formatDate(document.due_date)}`, 20, 70);
  }

  // Items Table
  const tableData = items.map((item, index) => [
    index + 1,
    {
      content: item.vehicle_type,
      styles: { fontStyle: 'bold', textColor: PDF_CONFIG.colors.primary }
    },
    item.quantity,
    formatCurrency(Math.round(item.price), document.currency),
    formatCurrency(Math.round(item.quantity * item.price), document.currency),
    `${formatDate(item.from_date)} - ${formatDate(item.to_date)}`
  ]);

  (pdf as any).autoTable({
    startY: 80,
    head: [['#', 'Service Details', 'Qty', 'Rate', 'Amount', 'Period']],
    body: tableData,
    foot: [[
      '',
      'Total',
      '',
      '',
      formatCurrency(totalAmount, document.currency),
      ''
    ]],
    theme: 'grid',
    ...PDF_CONFIG.table
  });

  return pdf;
}