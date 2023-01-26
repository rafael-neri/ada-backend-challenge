import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
  @ApiProperty({ example: 'My Card ID', description: 'Card ID' })
  id: string;

  @ApiProperty({ example: 'My Card Title', description: 'Card title' })
  title: string;

  @ApiProperty({ example: 'My Card Description', description: 'Card content' })
  content: string;

  @ApiProperty({ example: 'My Card List', description: 'Card list' })
  list: string;
}
