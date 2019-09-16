import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto, TokenDto } from '@zorko/dto';
import { ApiUseTags } from '@nestjs/swagger';
import { UserService } from '../users/user.service';
import { RemoteAuthApi } from '@zorko/remote-api';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController implements RemoteAuthApi {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('token')
  async createToken(@Body() tokenPayloadDto: CreateTokenDto): Promise<TokenDto> {
    const accessKey = await this.authService.createTokenKey(tokenPayloadDto);
    if (!accessKey) {
       throw new ForbiddenException('Access Denied.')
    }
    const user = await this.userService.findOne({
      email: tokenPayloadDto.email
    });
    return {
       accessKey,
       userId: user ? user.id : ''
     };
  }
}
