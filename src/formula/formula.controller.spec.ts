import { Test, TestingModule } from '@nestjs/testing';
import { FormulaController } from './formula.controller';

describe('Formula Controller', () => {
  let controller: FormulaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulaController],
    }).compile();

    controller = module.get<FormulaController>(FormulaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
