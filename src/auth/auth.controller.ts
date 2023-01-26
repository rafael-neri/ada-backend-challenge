import {
  Body, Controller, HttpStatus, Post, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('/login')
@UseGuards(AuthGuard('local'))
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiOperation({ summary: 'Authentication user login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Authenticated' })
  async login(@Body() authLogin: AuthLoginDto) {
    return this.authService.login(authLogin.username);
  }

}
