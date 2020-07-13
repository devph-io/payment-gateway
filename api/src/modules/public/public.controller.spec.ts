import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as moment from 'moment';

// Internal dependencies
import { CreateUserInput, GenericUserClass } from '../../common/dto/user.dto';
import { UserService } from '../../common/services/user.service';
import { PublicController } from './public.controller';
import { User } from '../../entities/User.entity';
import * as getORMConfig from '../../config/orm.config';

describe('Test controller', () => {
  let controller: PublicController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => getORMConfig(config),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [PublicController],
      providers: [UserService],
    }).compile();

    controller = app.get<PublicController>(PublicController);
  });

  describe('root', () => {
    it('should return token', async () => {
      const usrRand = Math.random()
        .toString(36)
        .slice(2);
      let newUser: CreateUserInput = {
        email: `${usrRand}@email.com`,
        username: `${usrRand}`,
        password: 'supersecret',
        primaryAddress: {
          country: 'PH',
        },
        birthDate: moment('07-31-1990', 'MM-DD-YYYY').toDate(),
      };

      const signup: GenericUserClass = await controller.signUp(newUser);
      console.log(`New User:`, signup);

      expect(signup).toBeTruthy();
      expect(signup.uuid).toBeTruthy();
    });
  });
});
