import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParamData,
  Res,
} from '@nestjs/common';
import { CtsService } from '../cts/cts.service';
import { Response } from 'express';

@Controller('cts')
export class AppController {
  constructor(private readonly ctsService: CtsService) {}

  @Get()
  @HttpCode(300)
  getCts(@Res() response: Response): void {
    response.status(200).json({
      message: this.ctsService.getCts(),
    });
  }
}
