import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'go to http://localhost:3333/api to see docs';
  }
}
