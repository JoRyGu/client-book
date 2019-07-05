import { DateInput } from './dateInput';

export function convertToDateString(date: DateInput): string {
  const { day, month, year, hour, minute } = date;
  return `${year}-${month}-${day}T${hour || '00'}:${minute || '00'}:00`;
}
