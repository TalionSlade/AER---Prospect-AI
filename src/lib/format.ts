// Indian-rupee formatting helpers.

export function formatINR(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

// Compact lakh/crore form for large loan amounts, e.g. ₹32.5L, ₹1.24Cr.
export function formatLakh(n: number): string {
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + 'Cr';
  if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + 'L';
  return formatINR(n);
}

export const pct = (x: number, digits = 0) => (x * 100).toFixed(digits) + '%';
