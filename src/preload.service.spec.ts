import { Test, TestingModule } from '@nestjs/testing';
import { PreloadService } from './preload.service';

describe('PreloadService', () => {
  let service: PreloadService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreloadService],
    }).compile();

    service = module.get<PreloadService>(PreloadService);
  }); */

  it('should be defined', () => {
    //expect(service).toBeDefined();
  });
});
