import { Test, TestingModule } from '@nestjs/testing';
import { MinisterysService } from './ministerys.service';

describe('MinisterysService', () => {
  let service: MinisterysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinisterysService],
    }).compile();

    service = module.get<MinisterysService>(MinisterysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
