import { IncomingMessage, ServerResponse } from 'http';
import { CardService } from 'src/card/card.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly cardService: CardService) { }

  async use(request: IncomingMessage, _response: ServerResponse, next: () => void) {
    if (
      request.url.startsWith('/cards')
      && (request.method === 'PUT' || request.method === 'DELETE')
    ) {
      const matches = request.url.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
      const uuid = matches.length > 0 ? matches[0] : 'unknown';

      if (uuid !== 'unknown') {
        let message = `Card ${uuid}`;

        const card: Card = await this.cardService.findOne({ id: uuid });

        if (card !== null) {
          message += ` - ${card.title}`;

          if (request.method === 'PUT') {
            message += ' - alterado';
          }

          if (request.method === 'DELETE') {
            message += ' - removido';
          }

          Logger.log(message);
        }
      }
    }
    next();
  }
}
