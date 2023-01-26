import { PrismaService } from 'src/common/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';

@Injectable()
export class CardService {

  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.CardCreateInput): Promise<Card | null> {
    return this.prisma.card.create({
      data,
    });
  }

  async findAll(where?: Prisma.CardWhereInput): Promise<Card[]> {
    return this.prisma.card.findMany({
      where,
    });
  }

  async findOne(where: Prisma.CardWhereUniqueInput): Promise<Card> {
    return this.prisma.card.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.CardWhereUniqueInput;
    data: Prisma.CardUpdateInput;
  }): Promise<Card> {
    const { where, data } = params;
    return this.prisma.card.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.CardWhereUniqueInput): Promise<boolean> {
    const card = await this.prisma.card.delete({
      where,
    });

    return !!card;
  }

}
