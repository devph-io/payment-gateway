import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { UserService } from '../../common/services/user.service';

@Module({
  controllers: [PublicController],
  providers: [UserService],
})
export class PublicModule {}
