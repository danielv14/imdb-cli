/**
 * Truncate text
 */
export const truncate = (text: string, limit: number): string => text ? `${text.substring(0, limit)}...` : '';
