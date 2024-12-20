import { isValid, parseISO } from 'date-fns';

export function validateDateString(date: string): boolean {
  try {
    return isValid(parseISO(date));
  } catch {
    return false;
  }
}

export function validateDateRange(startDate: string, endDate: string): boolean {
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    return isValid(start) && isValid(end) && start <= end;
  } catch {
    return false;
  }
}