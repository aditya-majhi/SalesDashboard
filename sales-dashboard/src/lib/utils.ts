import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Format number with thousands separator
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Get random color from palette
export function getRandomColor(index: number, colors: string[]): string {
  return colors[index % colors.length];
}

// Add animation delay based on index
export function getAnimationDelay(index: number, baseDelay: number = 0.1): string {
  return `${baseDelay * index}s`;
}

