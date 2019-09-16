import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateTokenDto, UserDtoInterface } from '@zorko/dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
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

  async validateUser(payload: JwtPayload): Promise<UserDtoInterface | null> {

    if (!this.configService.isAuthEnabled) {
      return {
        id: '1',
        email: 'test@zorko.io',
        password: 'qwerty',
        roles: []
      }
    }

    const user = await this.usersService.findOne({
      email: payload.email
    });

    let match;

    if (user && payload && payload.password) {
     match = await bcrypt.compare(payload.password, user.password);
    }

    return match ? user : null;
  }
}
