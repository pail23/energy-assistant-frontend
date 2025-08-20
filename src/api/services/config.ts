import { BaseApiService } from './base';
import type { IConfig, IVersion } from '../types';

/**
 * Configuration API service
 */
export class ConfigApiService extends BaseApiService {
  async initialize(baseUrl: string) {
    await this.initializeAxios(baseUrl);
  }

  /**
   * Get system configuration
   */
  async getConfig(): Promise<object> {
    this.ensureInitialized();
    return (await this.getAxios().get<IConfig>('config')).data.config;
  }

  /**
   * Get system version information
   */
  async getVersion(): Promise<string> {
    this.ensureInitialized();
    return (await this.getAxios().get<IVersion>('config/version')).data.version;
  }
}
