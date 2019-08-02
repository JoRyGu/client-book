import { FormulaType } from '../../formula/formula-type.enum';

export class AddFormulaToAppointmentDto {
  name: string;
  region: string;
  body: string;
  type: FormulaType;
}
