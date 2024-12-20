import { jsPDF } from 'jspdf';
import type { PDFGeneratorOptions } from '../types';
import { PDF_CONFIG } from '../config';
import { formatCurrency } from '../../currency';
import { formatDate } from '../../date';

export function generateReceiptPDF({ document, items }: PDFGeneratorOptions) {
  const pdf = new jsPDF('l'); // landscape mode
  const totalAmount = items.reduce((sum, item) => sum + Math.round(item.quantity * item.price), 0);

  // Header
  pdf.setFontSize(24);
  pdf.text('RECEIPT', 148, 20, { align: 'center' });

  // Left Column
  pdf.setFontSize(PDF_CONFIG.fonts.body.size);
  let y = 40;
  
  // Date
  pdf.text('Date:', 20, y);
  pdf.setLineWidth(0.1);
  pdf.line(45, y, 140, y);
  pdf.text(formatDate(document.created_at), 50, y);
  y += 15;

  // Received From
  pdf.text('Received From:', 20, y);
  pdf.line(45, y, 140, y);
  pdf.text(document.client_name, 50, y);
  y += 15;

  // Amount
  pdf.text('Amount:', 20, y);
  pdf.line(45, y, 140, y);
  pdf.text(formatCurrency(totalAmount, document.currency), 50, y);
  y += 15;

  // For
  pdf.text('For:', 20, y);
  pdf.line(45, y, 140, y);
  const services = items.map(item => 
    `${item.vehicle_type} (${formatDate(item.from_date)} - ${formatDate(item.to_date)})`
  ).join(', ');
  pdf.text(services, 50, y, { maxWidth: 85 });

  // Right Column
  y = 40;
  const rightX = 160;

  // Receipt No
  pdf.text('Receipt No:', rightX, y);
  pdf.line(rightX + 25, y, rightX + 100, y);
  pdf.text(document.id, rightX + 30, y);
  y += 25;

  // Payment Method
  pdf.text('Paid By:', rightX, y);
  y += 10;
  
  const paymentMethods = ['Cash', 'Cheque', 'M-PESA', 'Bank'];
  paymentMethods.forEach(method => {
    pdf.rect(rightX, y - 4, 4, 4);
    if (document.payment_mode?.toLowerCase() === method.toLowerCase()) {
      pdf.text('✓', rightX + 1, y);
    }
    pdf.text(method, rightX + 10, y);
    if (document.payment_mode?.toLowerCase() === method.toLowerCase() && document.payment_reference) {
      pdf.text(`(${document.payment_reference})`, rightX + 50, y);
    }
    y += 10;
  });

  return pdf;
}