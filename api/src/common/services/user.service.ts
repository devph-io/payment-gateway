// Core dependencies
import { Injectable, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal dependencies
import { User } from '../../entities/User.entity';
import { CreateUserInput, GenericUserClass } from '../dto/user.dto';
import { IncorrectInputFormat } from '../exceptions/IncorrectInputFormat.exception';
import { PTC } from '../utils';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async createUser(user: CreateUserInput): Promise<GenericUserClass> {
    try {
      await this.users.insert(new User({ ...user }));
      return PTC(GenericUserClass, await this.users.findOne(user));
    } catch (error) {
      this.logger.log(error);
      throw new IncorrectInputFormat(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
