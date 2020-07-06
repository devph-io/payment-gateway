import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DraftService {
  private readonly logger = new Logger(DraftService.name)

  getHello(): string {
    this.logger.debug('Hello World!')
    return 'Hello World!';
  }
}
