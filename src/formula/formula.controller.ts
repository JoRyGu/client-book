import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FormulaService } from './formula.service';
import { Formula } from './formula.entity';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { GetStylist } from '../auth/getStylist.decorator';
import { Stylist } from '../auth/stylist.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('formulas')
@UseGuards(AuthGuard())
export class FormulaController {
  constructor( private forumulaService: FormulaService) {}

  @Post()
  createFormula(
    @Body() formulaInfo: CreateFormulaDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Formula> {
    return this.forumulaService.createFormula(formulaInfo, stylist);
  }
}
