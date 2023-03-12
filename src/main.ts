import './helpers/init-env.helper';
import 'colors';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { logger } from './helpers';

async function bootstrap() {
  if (!process.env.SERVICE_NAME)
    throw new Error('Missing environment variable SERVICE_NAME');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_URL || 'localhost:9092'],
        },
        consumer: {
          groupId: `${process.env.SERVICE_NAME || 'service'}-consumer`,
        },
      },
    },
  );
  await app.listen();
  logger.log(
    `MS ${(process.env.SERVICE_NAME || 'service').toUpperCase()} LISTENING...`
      .bgBlue,
  );
}
bootstrap();
