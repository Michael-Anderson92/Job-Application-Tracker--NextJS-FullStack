/**
 * Jobify Design System
 *
 * This file contains all design tokens, color constants, and reusable style variants
 * for the Job Tracker application. Use these constants throughout the app to maintain
 * visual consistency.
 *
 * Color Palette:
 * - Accent Blue: Primary actions, CTAs, interactive elements
 * - Yellow Background: Card backgrounds, highlighted sections
 * - Teal Border: Borders, success states, positive actions
 * - Dark Green: Headers, dark surfaces, primary text
 */

// ============================================
// COLOR CONSTANTS
// ============================================

export const colors = {
  // Primary Colors
  pageBackground: '#8EF3F5',  // Blue - Main content area background
  componentBg: '#FFFB46',     // Yellow - Cards, navbar, sidebar backgrounds
  border: '#1BA68A',          // Teal - Borders, success states
  text: '#113B32',            // Dark Green - Primary text color
  foreground: '#113B32',      // Dark Green - Primary text (alias)

  // Legacy aliases (for backward compatibility)
  background: '#FFFB46',      // Yellow - Component backgrounds
  surface: '#FFFB46',         // Yellow - Navigation surfaces
  accent: '#1BA68A',          // Teal - Accent color (changed from blue)

  // Semantic Colors
  success: '#1BA68A',         // Success messages, positive actions
  warning: '#FFFB46',         // Warnings, caution states
  error: '#DC2626',           // Errors, destructive actions
  info: '#1BA68A',            // Information (changed from blue to teal)

  // Status Colors (for job application statuses)
  status: {
    applied: '#FFFB46',     // Applied - Yellow background
    screening: '#1BA68A',   // Screening - Teal (changed from blue)
    interview: '#1BA68A',   // Interview - Teal (changed from blue)
    offer: '#1BA68A',       // Offer - Teal/Green (success)
    rejected: '#113B32',    // Rejected - Dark green with opacity
  },

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// ============================================
// TYPOGRAPHY
// ============================================

// Update only the typography section - keep everything else the same
export const typography = {
  fontFamily: {
    primary: 'var(--font-work), sans-serif',
    heading: 'var(--font-archivo), sans-serif',
    body: 'var(--font-work), sans-serif',
    mono: 'Monaco, Courier, monospace',
  },

  fontSize: {
    xs: '11px',
    sm: '13px',      // Body text
    base: '14px',
    md: '15px',
    lg: '16px',      // Headers
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: '4px',
  sm: '6px',       // Base spacing
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '48px',
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '15px',      // Wrapper border radius
  full: '9999px',
};

// ============================================
// BUTTON VARIANTS (Tailwind Classes)
// ============================================

export const buttonVariants = {
  // Primary button - Teal background (changed from blue)
  primary: `
    bg-[#1BA68A]
    text-white
    hover:bg-[#158F73]
    active:bg-[#117A5F]
    font-semibold
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Success button - Teal background
  success: `
    bg-[#1BA68A]
    text-white
    hover:bg-[#158F73]
    active:bg-[#117A5F]
    font-semibold
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Secondary button - Yellow background
  secondary: `
    bg-[#FFFB46]
    text-[#113B32]
    hover:bg-[#F0EC3D]
    active:bg-[#E0DC2D]
    font-semibold
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Outline button - Border with transparent background
  outline: `
    bg-transparent
    text-[#1BA68A]
    border-2
    border-[#1BA68A]
    hover:bg-[#1BA68A]
    hover:text-white
    font-semibold
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Ghost button - Minimal styling
  ghost: `
    bg-transparent
    text-[#113B32]
    hover:bg-[#FFFB46]
    font-medium
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Destructive button - Red for delete actions
  destructive: `
    bg-[#DC2626]
    text-white
    hover:bg-[#B91C1C]
    active:bg-[#991B1B]
    font-semibold
    px-4
    py-2
    rounded-md
    transition-colors
    duration-200
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================
// STATUS BADGE VARIANTS
// ============================================

export const statusBadgeVariants = {
  applied: `
    bg-[#FFFB46]
    text-[#113B32]
    border
    border-[#1BA68A]
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold
    uppercase
  `.replace(/\s+/g, ' ').trim(),

  screening: `
    bg-[#1BA68A]
    text-white
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold
    uppercase
  `.replace(/\s+/g, ' ').trim(),

  interview: `
    bg-[#1BA68A]
    text-white
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold
    uppercase
  `.replace(/\s+/g, ' ').trim(),

  offer: `
    bg-[#1BA68A]
    text-white
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold
    uppercase
  `.replace(/\s+/g, ' ').trim(),

  rejected: `
    bg-[#113B32]
    text-white
    opacity-60
    px-3
    py-1
    rounded-full
    text-xs
    font-semibold
    uppercase
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================
// CARD VARIANTS
// ============================================

export const cardVariants = {
  // Standard card with yellow background
  default: `
    bg-[#FFFB46]
    border-2
    border-[#1BA68A]
    rounded-lg
    p-6
    shadow-sm
  `.replace(/\s+/g, ' ').trim(),

  // Dark card with dark green background
  dark: `
    bg-[#113B32]
    text-white
    border-2
    border-[#1BA68A]
    rounded-lg
    p-6
    shadow-sm
  `.replace(/\s+/g, ' ').trim(),

  // Outlined card
  outlined: `
    bg-white
    border-2
    border-[#1BA68A]
    rounded-lg
    p-6
    shadow-sm
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================
// INPUT VARIANTS
// ============================================

export const inputVariants = {
  default: `
    border-2
    border-[#1BA68A]
    rounded-md
    px-3
    py-2
    text-[#113B32]
    focus:outline-none
    focus:ring-2
    focus:ring-[#064DB9]
    focus:border-transparent
    transition-all
    duration-200
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================
// HEADER VARIANTS
// ============================================

export const headerVariants = {
  h1: `
    text-4xl
    font-semibold
    text-[#113B32]
    font-[Lato]
  `.replace(/\s+/g, ' ').trim(),

  h2: `
    text-3xl
    font-semibold
    text-[#113B32]
    font-[Lato]
  `.replace(/\s+/g, ' ').trim(),

  h3: `
    text-2xl
    font-semibold
    text-[#113B32]
    font-[Lato]
  `.replace(/\s+/g, ' ').trim(),

  h4: `
    text-xl
    font-semibold
    text-[#113B32]
    font-[Lato]
  `.replace(/\s+/g, ' ').trim(),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get status badge variant class based on status value
 */
export function getStatusBadgeClass(status: string): string {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'applied':
      return statusBadgeVariants.applied;
    case 'screening':
      return statusBadgeVariants.screening;
    case 'interview':
      return statusBadgeVariants.interview;
    case 'offer':
      return statusBadgeVariants.offer;
    case 'rejected':
      return statusBadgeVariants.rejected;
    default:
      return statusBadgeVariants.applied;
  }
}

/**
 * Get status color based on status value
 */
export function getStatusColor(status: string): string {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'applied':
      return colors.status.applied;
    case 'screening':
      return colors.status.screening;
    case 'interview':
      return colors.status.interview;
    case 'offer':
      return colors.status.offer;
    case 'rejected':
      return colors.status.rejected;
    default:
      return colors.status.applied;
  }
}

/**
 * Merge Tailwind classes safely (basic implementation)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
