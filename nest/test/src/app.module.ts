import { Module } from '@nestjs/common';
import { CtsModule } from './cts/cts.module';
import { CatModule } from './cat/app.module';

@Module({
  imports: [CatModule, CtsModule],
})
export class AppModule {}
