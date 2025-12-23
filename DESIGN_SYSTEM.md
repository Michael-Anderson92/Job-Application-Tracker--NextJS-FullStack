# Jobify Design System

This document outlines the design system for the Jobify Job Application Tracker. All components and pages should follow these guidelines to maintain visual consistency across the application.

## Table of Contents

- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Styles](#component-styles)
- [Usage Examples](#usage-examples)
- [Implementation](#implementation)

---

## Color Palette

### Primary Colors

The application uses a distinctive color scheme that balances professionalism with visual interest:

| Color Name | Hex Code | Usage | Visual |
|------------|----------|-------|--------|
| **Accent Blue** | `#064DB9` | Primary actions, CTAs, interactive elements, active states | ![#064DB9](https://via.placeholder.com/100x30/064DB9/FFFFFF?text=Accent) |
| **Yellow Background** | `#FFFB46` | Card backgrounds, highlighted sections, applied status | ![#FFFB46](https://via.placeholder.com/100x30/FFFB46/113B32?text=Background) |
| **Teal Border** | `#1BA68A` | Borders, success states, positive actions, offer status | ![#1BA68A](https://via.placeholder.com/100x30/1BA68A/FFFFFF?text=Border) |
| **Dark Green Surface** | `#113B32` | Navbar, sidebar, headers, dark sections, foreground text | ![#113B32](https://via.placeholder.com/100x30/113B32/FFFFFF?text=Surface) |

### Status Colors

Job application statuses have specific color assignments:

| Status | Color | Hex Code | Text Color |
|--------|-------|----------|------------|
| **Applied** | Yellow Background | `#FFFB46` | Dark Green `#113B32` |
| **Screening** | Accent Blue | `#064DB9` | White |
| **Interview** | Accent Blue | `#064DB9` | White |
| **Offer** | Teal Border | `#1BA68A` | White |
| **Rejected** | Dark Green | `#113B32` | White (60% opacity) |

### Semantic Colors

| Purpose | Color | Hex Code |
|---------|-------|----------|
| **Success** | Teal | `#1BA68A` |
| **Warning** | Yellow | `#FFFB46` |
| **Error** | Red | `#DC2626` |
| **Info** | Blue | `#064DB9` |

---

## Typography

### Font Family

**Primary Font:** [Lato](https://fonts.google.com/specimen/Lato) (Google Font)

```css
font-family: 'Lato', sans-serif;
```

### Font Sizes

| Size Name | Value | Usage |
|-----------|-------|-------|
| `xs` | 11px | Small labels, footnotes |
| `sm` | 13px | Body text, form inputs (default) |
| `base` | 14px | Standard text |
| `md` | 15px | Medium emphasis text |
| `lg` | 16px | Headers, emphasized text |
| `xl` | 18px | Section headers |
| `2xl` | 20px | Page subheaders |
| `3xl` | 24px | Page headers |
| `4xl` | 32px | Hero text, stats |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| `normal` | 400 | Body text |
| `medium` | 500 | Slightly emphasized text |
| `semibold` | 600 | Headers, important labels |
| `bold` | 700 | Strong emphasis |

### Header Styles

```typescript
// H1 - Main page headers
className: 'text-4xl font-semibold text-[#113B32] font-[Lato]'

// H2 - Section headers
className: 'text-3xl font-semibold text-[#113B32] font-[Lato]'

// H3 - Subsection headers
className: 'text-2xl font-semibold text-[#113B32] font-[Lato]'

// H4 - Card headers
className: 'text-xl font-semibold text-[#113B32] font-[Lato]'
```

---

## Spacing & Layout

### Spacing Scale

Based on a 6px base unit:

| Name | Value |
|------|-------|
| `xs` | 4px |
| `sm` | 6px (base) |
| `md` | 8px |
| `lg` | 12px |
| `xl` | 16px |
| `2xl` | 24px |
| `3xl` | 32px |
| `4xl` | 48px |

### Border Radius

| Size | Value | Usage |
|------|-------|-------|
| `none` | 0px | AG Grid cells |
| `sm` | 4px | Small elements |
| `md` | 8px | Buttons, inputs |
| `lg` | 12px | Cards |
| `xl` | 15px | Large containers |
| `full` | 9999px | Badges, pills |

---

## Component Styles

### Buttons

#### Primary Button (Blue)
```typescript
backgroundColor: '#064DB9'
color: 'white'
hover:bg-[#053A8F]
// Usage: Main CTAs, primary actions
```

#### Success Button (Teal)
```typescript
backgroundColor: '#1BA68A'
color: 'white'
hover:bg-[#158F73]
// Usage: Positive actions, confirmations
```

#### Secondary Button (Yellow)
```typescript
backgroundColor: '#FFFB46'
color: '#113B32'
hover:bg-[#F0EC3D]
// Usage: Secondary actions, less emphasis
```

#### Destructive Button (Red)
```typescript
backgroundColor: '#DC2626'
color: 'white'
hover:bg-[#B91C1C]
// Usage: Delete, remove, destructive actions
```

#### Outline Button
```typescript
backgroundColor: 'transparent'
color: '#064DB9'
border: '2px solid #1BA68A'
hover:bg-[#1BA68A]
hover:text-white
// Usage: Alternative actions, less prominent
```

#### Ghost Button
```typescript
backgroundColor: 'transparent'
color: '#113B32'
hover:bg-[#FFFB46]
// Usage: Minimal emphasis, tertiary actions
```

### Cards

#### Default Card (Yellow)
```typescript
backgroundColor: '#FFFB46'
border: '2px solid #1BA68A'
borderRadius: '12px'
padding: '24px'
// Usage: Job cards, info cards, default content containers
```

#### Dark Card
```typescript
backgroundColor: '#113B32'
color: 'white'
border: '2px solid #1BA68A'
borderRadius: '12px'
padding: '24px'
// Usage: Emphasis cards, dark mode sections
```

#### Outlined Card
```typescript
backgroundColor: 'white'
border: '2px solid #1BA68A'
borderRadius: '12px'
padding: '24px'
// Usage: Neutral content, forms
```

### Status Badges

#### Applied Badge
```typescript
backgroundColor: '#FFFB46'
color: '#113B32'
border: '1px solid #1BA68A'
borderRadius: '9999px'
padding: '4px 12px'
fontSize: '11px'
fontWeight: '600'
textTransform: 'uppercase'
```

#### Screening/Interview Badge
```typescript
backgroundColor: '#064DB9'
color: 'white'
borderRadius: '9999px'
padding: '4px 12px'
fontSize: '11px'
fontWeight: '600'
textTransform: 'uppercase'
```

#### Offer Badge
```typescript
backgroundColor: '#1BA68A'
color: 'white'
borderRadius: '9999px'
padding: '4px 12px'
fontSize: '11px'
fontWeight: '600'
textTransform: 'uppercase'
```

#### Rejected Badge
```typescript
backgroundColor: '#113B32'
color: 'white'
opacity: '0.6'
borderRadius: '9999px'
padding: '4px 12px'
fontSize: '11px'
fontWeight: '600'
textTransform: 'uppercase'
```

### Form Inputs

```typescript
border: '2px solid #1BA68A'
borderRadius: '8px'
padding: '8px 12px'
color: '#113B32'
focus:outline: 'none'
focus:ring: '2px solid #064DB9'
focus:borderColor: 'transparent'
```

### Navigation

#### Navbar
```typescript
backgroundColor: '#113B32'
borderBottom: '2px solid #1BA68A'
color: 'white'
```

#### Sidebar
```typescript
backgroundColor: '#113B32'
borderRight: '2px solid #1BA68A'
color: 'white'

// Active Link
backgroundColor: '#064DB9'
color: 'white'

// Inactive Link
backgroundColor: 'transparent'
color: '#FFFB46'
```

---

## Usage Examples

### Importing the Design System

```typescript
import { colors, buttonVariants, headerVariants, getStatusColor } from '@/lib/design-system';
```

### Using Colors

```tsx
// Direct color usage
<div style={{ backgroundColor: colors.background, borderColor: colors.border }}>
  <h1 style={{ color: colors.foreground }}>Heading</h1>
</div>
```

### Using Button Variants

```tsx
// Primary button
<Button
  style={{
    backgroundColor: colors.accent,
    color: colors.white,
  }}
>
  Primary Action
</Button>

// Or use the variant class (with tailwind)
<Button className={buttonVariants.primary}>
  Primary Action
</Button>
```

### Using Header Variants

```tsx
<h1 className={headerVariants.h1} style={{ color: colors.foreground }}>
  Page Title
</h1>

<h2 className={headerVariants.h2} style={{ color: colors.foreground }}>
  Section Title
</h2>
```

### Dynamic Status Colors

```tsx
import { getStatusColor } from '@/lib/design-system';

// Get color based on status
const statusColor = getStatusColor(job.status);

<Badge
  style={{
    backgroundColor: statusColor,
    color: job.status === 'applied' ? colors.foreground : colors.white,
  }}
>
  {job.status}
</Badge>
```

### Creating Cards

```tsx
import { colors, cardVariants } from '@/lib/design-system';

// Yellow card (default)
<Card
  className="border-2"
  style={{
    backgroundColor: colors.background,
    borderColor: colors.border,
  }}
>
  <CardHeader>
    <CardTitle style={{ color: colors.foreground }}>Title</CardTitle>
  </CardHeader>
</Card>

// Or use the variant class
<Card className={cardVariants.default}>
  <CardContent>Content</CardContent>
</Card>
```

---

## Implementation

### File Location

All design system constants, variants, and utilities are defined in:
```
/lib/design-system.ts
```

### Available Exports

```typescript
// Color constants
export const colors = { ... }

// Typography constants
export const typography = { ... }

// Spacing constants
export const spacing = { ... }

// Border radius constants
export const borderRadius = { ... }

// Component variants (Tailwind classes)
export const buttonVariants = { ... }
export const statusBadgeVariants = { ... }
export const cardVariants = { ... }
export const inputVariants = { ... }
export const headerVariants = { ... }

// Utility functions
export function getStatusBadgeClass(status: string): string
export function getStatusColor(status: string): string
export function cn(...classes): string
```

### Best Practices

1. **Always use design system constants** instead of hardcoded colors
   - ✅ `backgroundColor: colors.accent`
   - ❌ `backgroundColor: '#064DB9'`

2. **Use semantic color names** when available
   - ✅ `colors.success`
   - ✅ `colors.error`

3. **Prefer inline styles** for dynamic colors
   ```tsx
   <div style={{ backgroundColor: colors.background }}>
   ```

4. **Use Tailwind classes** for static layouts
   ```tsx
   <div className="p-6 rounded-lg border-2">
   ```

5. **Combine both approaches** for best results
   ```tsx
   <Card
     className="border-2 p-6 rounded-lg"
     style={{
       backgroundColor: colors.background,
       borderColor: colors.border,
     }}
   >
   ```

6. **Use utility functions** for status-based styling
   ```tsx
   const statusColor = getStatusColor(status);
   const badgeClass = getStatusBadgeClass(status);
   ```

---

## AG Grid Theme

The AG Grid components use a custom theme defined in `/lib/ag-grid-theme.ts`:

```typescript
export const jobTrackerTheme = themeQuartz.withParams({
  accentColor: "#064DB9",          // Accent blue
  backgroundColor: "#FFFB46",       // Yellow background
  borderColor: "#1BA68A",           // Teal border
  chromeBackgroundColor: "#113B32", // Dark green chrome
  foregroundColor: "#113B32",       // Dark green text
  headerBackgroundColor: "#FFFB46", // Yellow headers
  headerTextColor: "#113B32",       // Dark green header text
  fontFamily: { googleFont: "Lato" },
  fontSize: 13,
  headerFontSize: 16,
  headerFontWeight: 600,
});
```

### Using the AG Grid Theme

```tsx
import { jobTrackerTheme } from '@/lib/ag-grid-theme';

<AgGridReact
  theme={jobTrackerTheme}
  rowData={data}
  columnDefs={columnDefs}
/>
```

---

## Migration Guide

If you're updating an existing component to use the design system:

### Before
```tsx
<Card className="bg-muted">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

### After
```tsx
import { colors } from '@/lib/design-system';

<Card
  className="border-2"
  style={{
    backgroundColor: colors.background,
    borderColor: colors.border,
  }}
>
  <CardHeader>
    <CardTitle style={{ color: colors.foreground }}>
      Title
    </CardTitle>
  </CardHeader>
</Card>
```

---

## Design Tokens Summary

### Quick Reference

```typescript
// Primary Colors
colors.accent       // #064DB9 - Blue
colors.background   // #FFFB46 - Yellow
colors.border       // #1BA68A - Teal
colors.surface      // #113B32 - Dark Green
colors.foreground   // #113B32 - Dark Green

// Semantic Colors
colors.success      // #1BA68A
colors.warning      // #FFFB46
colors.error        // #DC2626
colors.info         // #064DB9

// Status Colors
colors.status.applied    // #FFFB46
colors.status.screening  // #064DB9
colors.status.interview  // #064DB9
colors.status.offer      // #1BA68A
colors.status.rejected   // #113B32

// Typography
typography.fontFamily.primary  // 'Lato, sans-serif'
typography.fontSize.sm         // 13px (body)
typography.fontSize.lg         // 16px (headers)
typography.fontWeight.semibold // 600 (headers)

// Spacing
spacing.sm   // 6px (base)
spacing.lg   // 12px
spacing.xl   // 16px
spacing.2xl  // 24px

// Border Radius
borderRadius.md  // 8px (buttons, inputs)
borderRadius.lg  // 12px (cards)
borderRadius.xl  // 15px (containers)
```

---

## Questions or Issues?

If you have questions about the design system or need clarification on usage:

1. Check the `/lib/design-system.ts` file for all available constants
2. Review this documentation
3. Look at existing components for implementation examples
4. Consult the team for design decisions

---

**Last Updated:** December 22, 2024
**Version:** 1.0.0
**Maintainer:** Development Team
