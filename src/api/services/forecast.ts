import { BaseApiService } from './base';
import type { IForecast, ICreateForecastModel, ITuneForecastModel } from '../types';

/**
 * Forecast API service
 */
export class ForecastApiService extends BaseApiService {
  async initialize(baseUrl: string) {
    await this.initializeAxios(baseUrl);
  }

  /**
   * Get forecast data
   */
  async getForecast(): Promise<IForecast> {
    this.ensureInitialized();
    return (await this.getAxios().get<IForecast>('forecast')).data;
  }

  /**
   * Create forecast model
   * @param daysToRetrieve - Number of days to retrieve for model creation
   */
  async createModel(daysToRetrieve: number) {
    this.ensureInitialized();
    return await this.getAxios().post<ICreateForecastModel>(`forecast/create_model?days_to_retrieve=${daysToRetrieve}`);
  }

  /**
   * Tune the forecast model
   */
  async tuneModel() {
    this.ensureInitialized();
    return await this.getAxios().post<ITuneForecastModel>('forecast/tune_model');
  }
}
