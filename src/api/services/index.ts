import { $t } from '@/plugins/i18n';
import { DeviceApiService } from './device';
import { MeasurementApiService } from './measurement';
import { ForecastApiService } from './forecast';
import { ConfigApiService } from './config';
import { RealtimeApiService } from './realtime';
import type { IDeviceInfo, ConfigValueType } from '../types';

/**
 * Main API service that provides access to all domain-specific services
 */
export class EnergyAssistantApi {
  // Domain-specific services
  public devices: DeviceApiService;
  public measurements: MeasurementApiService;
  public forecast: ForecastApiService;
  public config: ConfigApiService;
  public realtime: RealtimeApiService;

  // Legacy properties for backward compatibility
  public baseUrl?: string;
  public deviceInfos?: IDeviceInfo[];

  constructor() {
    this.devices = new DeviceApiService();
    this.measurements = new MeasurementApiService();
    this.forecast = new ForecastApiService();
    this.config = new ConfigApiService();
    this.realtime = new RealtimeApiService();
  }

  /**
   * Initialize all API services
   * @param baseUrl - Base URL for the API
   */
  public async initialize(baseUrl: string) {
    this.baseUrl = baseUrl;

    // Initialize all services
    await Promise.all([
      this.devices.initialize(baseUrl),
      this.measurements.initialize(baseUrl),
      this.forecast.initialize(baseUrl),
      this.config.initialize(baseUrl),
    ]);

    // Initialize realtime service separately as it doesn't extend BaseApiService
    this.realtime.initialize(baseUrl);

    // Set up legacy compatibility
    this.deviceInfos = await this.devices.getAllDevices();

    // Apply custom device naming (legacy behavior)
    const otherDevice = this.devices.getDeviceInfo('9c0e0865-f3b0-488f-8d3f-b3b0cdda5de7');
    if (otherDevice != null) {
      otherDevice.name = $t('otherDeviceName');
    }
  }

  // Legacy method aliases for backward compatibility
  public async getAllHomeMeasurements() {
    return await this.measurements.getAllHomeMeasurements();
  }

  public async getDeviceMeasurements(id: string) {
    return await this.measurements.getDeviceMeasurements(id);
  }

  public async getDailyMeasurements(fromDate: Date, toDate: Date) {
    return await this.measurements.getDailyMeasurements(fromDate, toDate);
  }

  public async getDeviceSessionLog(id: string) {
    return await this.measurements.getDeviceSessionLog(id);
  }

  public async getAllDevices(filterWithSessionLogEntries = false) {
    return await this.devices.getAllDevices(filterWithSessionLogEntries);
  }

  public getDeviceInfo(id: string) {
    return this.devices.getDeviceInfo(id);
  }

  public async deleteDevice(id: string) {
    return await this.devices.deleteDevice(id);
  }

  public async addDevice(deviceType: string, name: string, config: object) {
    return await this.devices.addDevice(deviceType, name, config);
  }

  public async setPowerMode(id: string, powerMode: string) {
    return await this.devices.setPowerMode(id, powerMode);
  }

  public async getHomeMeasurementDifference(fromDate: Date, toDate: Date) {
    return await this.measurements.getHomeMeasurementDifference(fromDate, toDate);
  }

  public async getForecast() {
    return await this.forecast.getForecast();
  }

  public async createModel(daysToRetrieve: number) {
    return await this.forecast.createModel(daysToRetrieve);
  }

  public async tuneModel() {
    return await this.forecast.tuneModel();
  }

  public async getConfig() {
    return await this.config.getConfig();
  }

  public async getVersion() {
    return await this.config.getVersion();
  }

  public async getDeviceConfig(deviceId: string) {
    return await this.devices.getDeviceConfig(deviceId);
  }

  public async saveDeviceConfig(deviceId: string, values: Record<string, ConfigValueType>) {
    return await this.devices.saveDeviceConfig(deviceId, values);
  }

  public async getDeviceControlDisabled() {
    return await this.devices.getDeviceControlDisabled();
  }

  public async setDeviceControlDisabled(disableDeviceControl: boolean) {
    return await this.devices.setDeviceControlDisabled(disableDeviceControl);
  }
}

// Export service classes for direct use if needed
export { DeviceApiService, MeasurementApiService, ForecastApiService, ConfigApiService, RealtimeApiService };
