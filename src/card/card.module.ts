import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { PrismaService } from 'src/common/service/prisma.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    PrismaService,
    JwtStrategy,
  ],
})
export class CardModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
