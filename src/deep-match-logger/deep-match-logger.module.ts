import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeepMatchLoggerService } from './deep-match-logger.service';
import { DeepMatches, DeepMatchesSchema } from './schemas/deep-matches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeepMatches.name, schema: DeepMatchesSchema },
    ]),
  ],
  providers: [DeepMatchLoggerService],
  exports: [MongooseModule],
})
export class DeepMatchLoggerModule {}
