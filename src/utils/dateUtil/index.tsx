export const getMinDate = ({ day, month, year }: { day?: number; month?: number; year?: number }): Date => {
  const date = new Date()
  if (day) date.setDate(date.getDate() - day)
  if (month) date.setMonth(date.getMonth() - month)
  if (year) date.setFullYear(date.getFullYear() - year)
  return date
}

export const getMaxDate = ({ day, month, year }: { day?: number; month?: number; year?: number }): Date => {
  const date = new Date()
  if (day) date.setDate(date.getDate() + day)
  if (month) date.setMonth(date.getMonth() + month)
  if (year) date.setFullYear(date.getFullYear() + year)
  return date
}
export const getMonthName = (month?: number): string => {
  if (!month || month < 1 || month > 12) return "-";

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return MONTH_NAMES[month - 1];
};
