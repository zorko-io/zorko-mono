import * as dotenv from 'dotenv';
import * as fs from 'fs';

enum ConfigKeys {
  API_AUTH_ENABLED = 'API_AUTH_ENABLED'
}

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string = `.env.${process.env.NODE_ENV}`) {
    if (fs.existsSync(filePath)) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } else {
      this.envConfig = {};
    }

    // TODO: validate config
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get isAuthEnabled(): boolean {
    let apiAuthEnableFlag = process.env[ConfigKeys.API_AUTH_ENABLED];
    if (!apiAuthEnableFlag) {
      apiAuthEnableFlag = this.envConfig[ConfigKeys.API_AUTH_ENABLED];
    }

    if (apiAuthEnableFlag === 'true') {
      return true;
    } else if (apiAuthEnableFlag === 'false') {
      return false;
    } else {
      return true;
    }
  }
}
