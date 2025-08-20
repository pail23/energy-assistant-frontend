import { BaseApiService } from './base';
import type {
  IHomeMeasurement,
  IHomeMeasurementResponse,
  IDeviceMeasurement,
  IDeviceMeasurementResponse,
  IHomeMeasurementDate,
  IHomeMeasurementDaily,
  IHomeMeasurementPeriod,
  ISessionLogEntry,
  ISessionLog,
} from '../types';

/**
 * Measurement and analytics API service
 */
export class MeasurementApiService extends BaseApiService {
  async initialize(baseUrl: string) {
    await this.initializeAxios(baseUrl);
  }

  /**
   * Get all home measurements
   */
  async getAllHomeMeasurements(): Promise<IHomeMeasurement[]> {
    this.ensureInitialized();
    const response = await this.getAxios().get<IHomeMeasurementResponse>('homemeasurements');
    return response.data.home_measurements;
  }

  /**
   * Get device measurements by device ID
   * @param id - Device ID
   */
  async getDeviceMeasurements(id: string): Promise<IDeviceMeasurement[]> {
    this.ensureInitialized();
    const response = await this.getAxios().get<IDeviceMeasurementResponse>(`devices/${id}/measurements`);
    return response.data.device_measurements;
  }

  /**
   * Get daily measurements for a date range
   * @param fromDate - Start date
   * @param toDate - End date
   */
  async getDailyMeasurements(fromDate: Date, toDate: Date): Promise<IHomeMeasurementDate[]> {
    this.ensureInitialized();
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];

    const response = await this.getAxios().get<IHomeMeasurementDaily>(`history/daily?from_date=${from}&to_date=${to}`);
    return response.data.measurements;
  }

  /**
   * Get home measurement difference for a period
   * @param fromDate - Start date
   * @param toDate - End date
   */
  async getHomeMeasurementDifference(fromDate: Date, toDate: Date) {
    this.ensureInitialized();
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];

    return await this.getAxios().get<IHomeMeasurementPeriod>(`history/difference?from_date=${from}&to_date=${to}`);
  }

  /**
   * Get device session log
   * @param id - Device ID
   */
  async getDeviceSessionLog(id: string): Promise<ISessionLogEntry[]> {
    this.ensureInitialized();
    const response = await this.getAxios().get<ISessionLog>(`sessionlog?device_id=${id}`);
    return response.data.entries;
  }
}
