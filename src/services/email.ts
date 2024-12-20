import type { Document, VehicleItem } from '../types';
import { generatePDF } from '../utils/pdf';

export async function sendDocumentEmail(
  document: Document,
  items: VehicleItem[],
  recipientEmail: string
) {
  try {
    // In a real app, this would call your backend API
    // For demo, we'll simulate email sending
    console.log(`Sending ${document.type} to ${recipientEmail}`);
    
    // Generate PDF attachment
    const pdf = generatePDF(document, items);
    const pdfBlob = pdf.output('blob');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: `${document.type} sent successfully to ${recipientEmail}`
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}