import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormulaRepository } from './formula.repository';
import { Formula } from './formula.entity';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { Stylist } from '../auth/stylist.entity';

@Injectable()
export class FormulaService {
  constructor(
    @InjectRepository(FormulaRepository)
    private formulaRepo: FormulaRepository,
  ) {}

  createFormula(formulaInfo: CreateFormulaDto, stylist: Stylist): Promise<Formula> {
    return this.formulaRepo.createFormula(formulaInfo, stylist);
  }
}
