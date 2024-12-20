import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { Document, VehicleItem } from '../types';
import { formatCurrency } from './currency';
import { formatDate } from './date';

function generateHeader(pdf: jsPDF, document: Document) {
  pdf.setFontSize(20);
  pdf.text(document.type.toUpperCase(), 105, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text(`${document.type === 'invoice' ? 'Bill To' : 'For'}:`, 20, 40);
  pdf.text(document.client_name, 20, 50);
  pdf.text(`Date: ${formatDate(document.created_at)}`, 20, 60);
  if (document.due_date) {
    pdf.text(
      `${document.type === 'invoice' ? 'Due Date' : 'Valid Until'}: ${formatDate(document.due_date)}`,
      20,
      70
    );
  }
}

function generateTable(pdf: jsPDF, document: Document, items: VehicleItem[]) {
  const tableData = items.map((item, index) => [
    index + 1,
    {
      content: item.vehicle_type,
      styles: { fontStyle: 'bold', textColor: [0, 166, 81] }
    },
    item.quantity,
    formatCurrency(Math.round(item.price), document.currency),
    formatCurrency(Math.round(item.quantity * item.price), document.currency),
    `${formatDate(item.from_date)} - ${formatDate(item.to_date)}`
  ]);

  const totalAmount = items.reduce((sum, item) => sum + (Math.round(item.quantity * item.price)), 0);

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
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    footStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    }
  });
}

export function generatePDF(document: Document, items: VehicleItem[]) {
  const pdf = new jsPDF();
  
  generateHeader(pdf, document);
  generateTable(pdf, document, items);
  
  return pdf;
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