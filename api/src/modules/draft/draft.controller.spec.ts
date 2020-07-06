import { Test, TestingModule } from '@nestjs/testing';
import { DraftController } from './draft.controller';
import { DraftService } from '../../common/services/draft.service';

describe('AppController', () => {
  let appController: DraftController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DraftController],
      providers: [DraftService],
    }).compile();

    appController = app.get<DraftController>(DraftController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
