import { Module } from '@nestjs/common';
import { FormulaController } from './formula.controller';
import { FormulaService } from './formula.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormulaRepository } from './formula.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([FormulaRepository]),
  ],
  controllers: [FormulaController],
  providers: [FormulaService],
  exports: [
    TypeOrmModule.forFeature([FormulaRepository]),
  ],
})
export class FormulaModule {}
