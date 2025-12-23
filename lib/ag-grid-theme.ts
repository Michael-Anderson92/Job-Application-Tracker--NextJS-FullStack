import { themeQuartz } from 'ag-grid-community';
import { colors } from './design-system';

export const jobTrackerTheme = themeQuartz.withParams({
  // CRITICAL: These control the grid background
  backgroundColor: colors.componentBg,
  headerBackgroundColor: colors.componentBg,
  
  // Text colors
  foregroundColor: colors.text,
  headerTextColor: colors.text,
  
  // Borders
  borderColor: colors.border,
  
  // Typography - Array format for 2025
  fontFamily: ["Work Sans", "sans-serif"],
  fontSize: 13,
  headerFontSize: 16,
  headerFontWeight: 600,
  
  // Layout
  borderRadius: 0,
  browserColorScheme: "light",
  cellHorizontalPaddingScale: 1,
  chromeBackgroundColor: colors.componentBg,
  columnBorder: false,
  headerVerticalPaddingScale: 1.6,
  rowBorder: true, // Keep this - we'll make it work
  rowVerticalPaddingScale: 1,
  sidePanelBorder: true,
  spacing: 6,
  wrapperBorder: false,
  wrapperBorderRadius: 0,
  
  // Row colors
  oddRowBackgroundColor: colors.componentBg,
  
  // Selection & Hover - Semi-transparent so borders show through
  rowHoverColor: 'rgba(240, 236, 61, 0.5)',
  selectedRowBackgroundColor: 'rgba(240, 236, 61, 0.8)',
});