export function formatCurrency(amount: number, currency: 'KSH' | 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'KSH' ? 'KES' : 'USD',
  }).format(amount);
}