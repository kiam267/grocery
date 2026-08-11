import { Injectable } from '@nestjs/common';

@Injectable()
export class CtsService {
  getCts(): string {
    return 'Hello World! from  cts';
  }
}
