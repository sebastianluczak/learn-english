import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './images/cache.service';
import { ImagesProvider } from './images/images.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CacheService, ImagesProvider],
})
export class AppModule {}
