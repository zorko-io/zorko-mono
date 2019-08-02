import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateTokenDto } from '@zorko/dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  async createTokenKey(token: CreateTokenDto): Promise<string> {
    const user = await this.validateUser({
         email: token.email,
         password: token.password,
    });

    if (user) {
      return this.jwtService.sign({
          email: token.email,
          password: token.password,
          roles: user.roles
      }, {expiresIn: 3600});
    } else {
      return ''
    }
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {

    if (!this.configService.isAuthEnabled) {
      return {
        id: '1',
        email: 'test@zorko.io',
        password: 'qwerty',
        roles: []
      }
    }

    const user = await this.usersService.findOneByEmail(payload.email);

    let match;

    if (user && payload && payload.password) {
     match = await bcrypt.compare(payload.password, user.password);
    }

    return match ? user : null;
  }
}
