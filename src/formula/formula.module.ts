import { Module } from '@nestjs/common';
import { FormulaController } from './formula.controller';
import { FormulaService } from './formula.service';

@Module({
  controllers: [FormulaController],
  providers: [FormulaService]
})
export class FormulaModule {}
