import { Test, TestingModule } from '@nestjs/testing';
import { QrdataService } from './qrdata.service';

describe('QrdataService', () => {
  let service: QrdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrdataService],
    }).compile();

    service = module.get<QrdataService>(QrdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
