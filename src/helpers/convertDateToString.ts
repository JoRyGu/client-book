import { DateInput } from './dateInput';

function convertToDate(date: DateInput): Date {
  const { day, month, year, hour, minute } = date;
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
}
