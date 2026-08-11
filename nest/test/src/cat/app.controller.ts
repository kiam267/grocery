import {
  Body,
  Catch,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParamData,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CtsService } from '../cts/cts.service';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/lib/http-exception.filter';
import { ZodValidationPipe } from './zod.pipe';
import { CreateCatDto, createCatSchema } from 'src/lib/zod-schema';
import { RolesGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('cats')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ctsService: CtsService,
  ) {}

  // this a only function that single cat details
  @Get('/cat')
  @HttpCode(300)
  getHello(@Res() response: Response): void {
    response.status(200).json({
      message: this.ctsService.getCts(),
    });
  }
  @Get('/cat2')
  @HttpCode(300)
  @UseFilters(new HttpExceptionFilter())
  getHell2(@Res() response: Response): void {
    throw new ForbiddenException('sorry baby');
    response.status(200).json({
      message: this.appService.getHello(),
    });
  }

  @Post('/cat/:id')
  @UseGuards(RolesGuard)
  // @Roles(['admin'])
  @UseInterceptors(LoggingInterceptor)
  // findIdbyUser(@Param('id', new ParseFloatPipe({
  //   errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  // }))  id: string, @Res() response: Response): void {
  //   console.log(id);
  //   response.json({
  //     id: id,
  //   });
  // }
  // @UsePipes()
  findIdbyUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() /* new ZodValidationPipe(createCatSchema) */ userinfo: CreateCatDto,
    @Res() response: Response,
  ): void {
    console.log(userinfo);
    response.json({
      id: id,
    });
  }
  // index(): any {
  //   return {
  //     message: 'ok',
  //     status: 200,
  //   };
  // }
}
