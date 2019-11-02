import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserOneApiService } from '../users/user.one.api.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateTokenDto, User, UserModelFactory } from '@zorko/dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserOneApiService,
    private readonly configService: ConfigService,
    private readonly userFactory: UserModelFactory
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

    const user = await this.usersService.findOne({
      email: payload.email
    });

    let match;

    if (user && payload && payload.password) {
      const userDomainModel = this.userFactory.create(user);
      match = await userDomainModel.comparePassword(payload.password);
    }

    return match ? user : null;
  }
}
