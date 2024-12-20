import type { Document } from '../types';

export async function sendDocumentEmail(document: Document, recipientEmail: string) {
  try {
    // In a real application, this would call your backend API
    // For now, we'll simulate the email sending
    console.log(`Sending ${document.type} to ${recipientEmail}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}