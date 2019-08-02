import { FormulaType } from '../formula-type.enum';

export class CreateFormulaDto {
  name: string;
  region: string;
  body: string;
  type: FormulaType;
}
