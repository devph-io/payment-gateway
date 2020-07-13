// Core dependencies
import { Controller, Get, Request, Logger, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Internal dependencies
import { UserService } from '../../common/services/user.service';
import { CreateUserInput, GenericUserClass } from '../../common/dto/user.dto';

@ApiTags('Public')
@Controller()
export class PublicController {
  private readonly logger = new Logger(PublicController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/auth/signup')
  async signUp(
    @Body() newUserInfo: CreateUserInput,
  ): Promise<GenericUserClass> {
    return await this.userService.createUser(newUserInfo);
  }

  @Post('/auth/login')
  async signIn() {
    return 'Ok';
  }

  @Post('/auth/logout')
  async signOut() {
    return 'Ok';
  }
}
