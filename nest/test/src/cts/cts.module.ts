import { Global, Module } from '@nestjs/common';
import { AppController } from './cts.controller';
import { CtsService } from './cts.service';

// @Global()
@Module({
  
  imports: [],
  controllers: [AppController],
  providers: [CtsService],
  exports: [CtsService],
})
export class CtsModule {}
