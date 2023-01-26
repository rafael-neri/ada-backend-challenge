import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { Card } from '@prisma/client';
import { CardService } from './card.service';
import { CardCreateDto } from './dto/card-create.dto';
import { CardResponseDto } from './dto/card-response.dto';
import { CardUpdateDto } from './dto/card-update.dto';

@Controller('/cards')
@UseGuards(AuthGuard('jwt'))
@ApiTags('cards')
@ApiBearerAuth()
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Get()
  @ApiOperation({ summary: 'Show all cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The found records', type: [CardResponseDto] })
  async showAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Show a card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The found record', type: CardResponseDto })
  async showUnique(@Param('id') id: string): Promise<Card> {
    const card = await this.cardService.findOne({ id });
    if (card === null) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    return card;
  }

  @Post()
  @ApiOperation({ summary: 'Create a card' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The created record', type: CardResponseDto })
  async save(@Body() cardCreate: CardCreateDto): Promise<Card> {
    return this.cardService.create(cardCreate);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The updated record', type: CardResponseDto })
  async update(@Param('id') id: string, @Body() cardUpdate: CardUpdateDto): Promise<Card> {
    if (cardUpdate.id !== id) {
      throw new HttpException('Ids does not match', HttpStatus.BAD_REQUEST);
    }

    if (await this.cardService.findOne({ id }) === null) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    return this.cardService.update({
      where: { id },
      data: cardUpdate,
    });
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The deleted record', type: CardResponseDto })
  async delete(@Param('id') id: string): Promise<Card[]> {
    if (await this.cardService.findOne({ id }) === null) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    if (!(await this.cardService.remove({ id }))) {
      throw new HttpException('Error on remove', HttpStatus.BAD_REQUEST);
    }
    return this.cardService.findAll();
  }

}
