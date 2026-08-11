import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CtsModule } from 'src/cts/cts.module';
import { logger } from './cat.middleware';

@Module({
  imports: [CtsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(AppController);
  }
}
