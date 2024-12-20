import { format, parseISO, isValid } from 'date-fns';

/**
 * Safely formats a date string or Date object with optional time
 * @param date Date string or Date object
 * @param includeTime Whether to include time in the output
 * @returns Formatted date string or empty string if invalid
 */
export function formatDate(date: string | Date, includeTime: boolean = false): string {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(parsedDate)) {
      console.warn('Invalid date value:', date);
      return '';
    }

    return format(parsedDate, includeTime ? 'MMM d, yyyy HH:mm' : 'MMM d, yyyy');
  } catch (error) {
    console.warn('Error formatting date:', error);
    return '';
  }
}

/**
 * Formats a date for input fields (yyyy-MM-dd)
 * @param date Date object
 * @returns Formatted date string
 */
export function formatDateInput(date: Date): string {
  try {
    if (!isValid(date)) {
      console.warn('Invalid date object:', date);
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.warn('Error formatting date for input:', error);
    return '';
  }
}

/**
 * Validates if a string is a valid ISO date
 * @param dateString Date string to validate
 * @returns boolean indicating if the date is valid
 */
export function isValidISODate(dateString: string): boolean {
  try {
    return isValid(parseISO(dateString));
  } catch {
    return false;
  }
}