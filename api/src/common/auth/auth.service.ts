import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/User.entity';
import { RevokedToken } from '../../entities/RevokedToken.entity';

interface LoginInterface {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(RevokedToken) private revoked: Repository<RevokedToken>,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: LoginInterface): Promise<User | null> {
    const user: User = await this.users.findOne({ email, disabled: false });

    if (user) {
      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }

    return null;
  }

  // async login(user: User): Promise<LoginOutput> {
  //   const token = await this.jwtService.sign({
  //     username: user.username,
  //     sub: user.uuid,
  //     nth: Math.random(),
  //   });
  //   await this.users.update(user.id, { auth: token });

  //   return PTC(LoginOutput, { token });
  // }

  // async logout(author: Author): Promise<void> {
  //   const tmp = author.user.auth;
  //   await this.users.update(author.user.id, { auth: null });
  //   await this.revokedTokens.insert(new RevokedToken({ auth: tmp }));
  // }
}
