import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Formula } from './formula.entity';
import { Stylist } from '../auth/stylist.entity';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Formula)
export class FormulaRepository extends Repository<Formula> {
  async createFormula(formulaInfo: CreateFormulaDto, stylist: Stylist): Promise<Formula> {
    const { name, region, body, type } = formulaInfo;

    const formula = new Formula();

    formula.name = name;
    formula.region = region;
    formula.body = body;
    formula.type = type;
    formula.stylist = stylist;

    await formula.save();
    delete formula.stylist;
    delete formula.appointment;
    delete formula.client;

    return formula;
  }

  async deleteFormula(id: number, stylist: Stylist): Promise<void> {
    const result = await this.delete({ id, stylistId: stylist.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Formula with ID "${id} not found.`);
    }
  }
}
