import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DraftService } from '../../common/services/draft.service';

@ApiTags('Draft')
@Controller()
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Get()
  getHello(): string {
    return this.draftService.getHello();
  }
}
