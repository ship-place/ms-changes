import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcHttpException } from '@ship-place/reqresex';
import { DeepMatchLoggerService } from './deep-match-logger/deep-match-logger.service';
import { CreateDeepMatchesDto } from './deep-match-logger/dto/create-deep-matches.dto';
import { GetDeepMatchesDto } from './deep-match-logger/dto/get-deep-matches.dto';
import { DeepMatches } from './deep-match-logger/schemas/deep-matches.schema';

@Injectable()
export class AppService {
  // prettier-ignore
  constructor(
    @Inject(DeepMatchLoggerService) private readonly service: DeepMatchLoggerService,
  ) {}

  get(dto: GetDeepMatchesDto): Promise<DeepMatches[]> {
    return this.service.get(dto);
  }

  async create(dto: CreateDeepMatchesDto): Promise<DeepMatches> {
    try {
      return await this.service.create(dto);
    } catch (e) {
      throw new RpcHttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
