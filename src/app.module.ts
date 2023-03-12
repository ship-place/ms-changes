import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReqresexModule } from '@ship-place/reqresex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeepMatchLoggerModule } from './deep-match-logger/deep-match-logger.module';
import { DeepMatchLoggerService } from './deep-match-logger/deep-match-logger.service';

const serviceName: string = process.env.SERVICE_NAME ?? 'ms-changes';

@Module({
  imports: [
    ReqresexModule.forRoot({ serviceName }),
    DeepMatchLoggerModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.MONGO_URL || `mongodb://localhost:27017/${serviceName}`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DeepMatchLoggerService],
})
export class AppModule {}
