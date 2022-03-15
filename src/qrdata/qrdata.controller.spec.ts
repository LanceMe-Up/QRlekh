import { Test, TestingModule } from '@nestjs/testing';
import { QrdataController } from './qrdata.controller';

describe('QrdataController', () => {
  let controller: QrdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrdataController],
    }).compile();

    controller = module.get<QrdataController>(QrdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
