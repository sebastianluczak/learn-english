import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesProvider } from './images/images.provider';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: ImagesProvider, useValue: {} }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('main', () => {
    it('should be initialized"', () => {
      expect(appController).toBeDefined();
    });
  });
});
