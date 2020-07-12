import { Controller, Get, Request, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DraftService } from '../../common/services/draft.service';

@ApiTags('Draft')
@Controller()
export class DraftController {
  private readonly logger = new Logger(DraftController.name);

  constructor(private readonly draftService: DraftService) {}

  @Get()
  getHello(@Request() req): string {
    return this.draftService.getHello();
  }
}
