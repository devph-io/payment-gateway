import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as moment from 'moment';

// Internal dependencies
import { AppModule } from '../src/modules/app.module';
import { GenericUserClass, CreateUserInput } from '../src/common/dto/user.dto';
import { INCORRECT_INPUT_FORMAT_EXCEPTION } from '../src/common/exceptions/IncorrectInputFormat.exception';

describe('Seller (end to end testing)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Default seller generic user flow', async done => {
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

    // Signup a test user
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .then(res => {
        console.log('New user:', res.body);
        expect(res.status).toEqual(201);

        const body: GenericUserClass = res.body;
        expect(body.uuid).toBeTruthy();
        expect(body.email).toEqual(newUser.email);
        expect(body.username).toEqual(newUser.username);
      });
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .then(res => {
        console.log('New user w/ Duplicate User Error:', res.body);
        expect(res.status).toEqual(500);
        expect(res.body.alias).toEqual(INCORRECT_INPUT_FORMAT_EXCEPTION);
      });
    // ---------------------------------------------------------

    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
