import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { SupportedCategories } from './dictionaries/dictonaries.factory';
import { Request } from 'express';

@Controller()
export class AppController {
  private lastGeneratedBoard: string[] | undefined;

  constructor(private readonly appService: AppService) {}

  @Get('/words/get')
  getWordInfo(@Query('category') category?: SupportedCategories) {
    return this.appService.getRandomWord(category);
  }

  @Post('/math/board/validate')
  validateBoard(@Req() req: Request) {
    const isSame = this.lastGeneratedBoard?.every((entry, index) => {
      return entry === req.body[index];
    });

    return {
      valid: isSame,
    };
  }

  @Get('/math/board')
  getBoard() {
    const equations = this.appService.generateEquations(5);
    this.lastGeneratedBoard = equations.flatMap((equation) => equation.split(''));

    return this.lastGeneratedBoard.map((character, index) => {
      const isStartOfNewEquation = index % 8 === 0;
      if (isStartOfNewEquation) {
        return ' ';
      }

      return character;
    });
  }
}
