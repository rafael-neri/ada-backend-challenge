import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async validateAuth(user: string, pass: string): Promise<boolean> {
    return user === process.env.USER_LOGIN && pass === process.env.USER_PASSWORD;
  }

  async login(username: string) {
    const payload = { username, userId: Math.floor(Math.random() * 10000) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
