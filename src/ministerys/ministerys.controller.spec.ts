import { Test, TestingModule } from '@nestjs/testing';
import { MinisterysController } from './ministerys.controller';
import { MinisterysService } from './ministerys.service';

describe('MinisterysController', () => {
  let controller: MinisterysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinisterysController],
      providers: [MinisterysService],
    }).compile();

    controller = module.get<MinisterysController>(MinisterysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
