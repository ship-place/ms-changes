import { Logger } from '@nestjs/common';
import ucFirst from './ucfirst.helper';

export const logger = new Logger(`Ms${ucFirst(process.env.SERVICE_NAME)}Main`);
