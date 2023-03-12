import * as dotenv from 'dotenv';
import { getEnvPath } from './get-env-path.helper';
dotenv.config({ path: getEnvPath() });
