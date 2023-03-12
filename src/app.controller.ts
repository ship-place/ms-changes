import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IMsMessage, ReqresexService } from '@ship-place/reqresex';
import { AppService } from './app.service';
import { CreateDeepMatchesDto } from './deep-match-logger/dto/create-deep-matches.dto';
import { GetDeepMatchesDto } from './deep-match-logger/dto/get-deep-matches.dto';
import { DeepMatches } from './deep-match-logger/schemas/deep-matches.schema';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    @Inject(ReqresexService) private readonly rre: ReqresexService,
  ) {}

  @MessagePattern('changes.ping')
  ping(): 'pong' {
    return 'pong';
  }

  @MessagePattern('changes.get')
  async get(
    @Payload() message: IMsMessage<GetDeepMatchesDto>,
  ): Promise<IMsMessage<DeepMatches[]>> {
    return this.rre.buildResponse(await this.appService.get(message.data));
  }

  @MessagePattern('changes.create')
  async create(
    @Payload() message: IMsMessage<CreateDeepMatchesDto>,
  ): Promise<IMsMessage<DeepMatches>> {
    return this.rre.buildResponse(await this.appService.create(message.data));
  }
}
