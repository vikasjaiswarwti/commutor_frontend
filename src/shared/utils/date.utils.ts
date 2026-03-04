// src/shared/utils/date.utils.ts
export const formatDate = (
  date: string | Date,
  format: "short" | "long" = "short",
): string => {
  const d = new Date(date);
  if (format === "short") {
    return d.toLocaleDateString();
  }
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString();
};

export const isToday = (date: string | Date): boolean => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};
