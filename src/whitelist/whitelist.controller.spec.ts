import { Test, TestingModule } from '@nestjs/testing';
import { WhitelistController } from './whitelist.controller';

describe('WhitelistController', () => {
  let controller: WhitelistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhitelistController],
    }).compile();

    controller = module.get<WhitelistController>(WhitelistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
