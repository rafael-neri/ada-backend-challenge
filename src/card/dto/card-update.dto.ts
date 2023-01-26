import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CardUpdateDto {

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ required: true, example: 'My Card Id', description: 'Card id' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'My Card Title', description: 'Card title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'My Card Description', description: 'Card content' })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'My Card List', description: 'Card list' })
  list: string;

}
