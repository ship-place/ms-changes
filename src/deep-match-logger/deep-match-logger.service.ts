import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeepMatchesDto } from './dto/create-deep-matches.dto';
import { GetDeepMatchesDto } from './dto/get-deep-matches.dto';
import deepMatch from 'deep-matcher';
import {
  DeepMatches,
  DeepMatchesDocument,
} from './schemas/deep-matches.schema';

@Injectable()
export class DeepMatchLoggerService {
  // prettier-ignore
  constructor(
    @InjectModel(DeepMatches.name) private model: Model<DeepMatchesDocument>,
  ) {}

  get(dto: GetDeepMatchesDto): Promise<DeepMatches[]> {
    return this.model.find(dto).exec();
  }

  create(dto: CreateDeepMatchesDto): Promise<DeepMatches> {
    this.checkDtoOrError(dto);
    dto.timestamp = dto.timestamp || Date.now();
    const createdChanges = new this.model({
      ...dto,
      details: deepMatch(dto.details[0], dto.details[1]),
    });
    return createdChanges.save();
  }

  private checkDtoOrError(dto: CreateDeepMatchesDto): boolean {
    if (
      !dto.details ||
      !dto.details[0] ||
      !dto.details[1] ||
      !dto.category ||
      !dto.object_id ||
      !dto.author_id
    ) {
      throw new Error('Invalid DeepMatchesDto');
    }
    return true;
  }
}
