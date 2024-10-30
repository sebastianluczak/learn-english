import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SupportedCategories } from './dictionaries/dictonaries.factory';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/words/get')
  getWordInfo(@Query('category') category?: SupportedCategories) {
    return this.appService.getRandomWord(category);
  }
}
