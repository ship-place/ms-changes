import { resolve } from "path";

export function getEnvPath() {

  const node_env = process.env.NODE_ENV ? process.env.NODE_ENV.trim().toLowerCase() : '';

  var envPath: string = '';
  switch (node_env) {
    case "dev":
    case "development":
      envPath = resolve(process.cwd(), '.development.env');
      break;
    case "prod":
    case "prodaction":
      envPath = resolve(process.cwd(), '.prodaction.env');
      break;
    case "test":
      envPath = resolve(process.cwd(), '.test.env');
      break;
    default:
      throw new Error('Specify the NODE_ENV variable [ prod | dev | test ]')
  }
  
  return envPath;  
}
