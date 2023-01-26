import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'username', description: 'My Username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'password', description: 'My Password' })
  password: string;
}
