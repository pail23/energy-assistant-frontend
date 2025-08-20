import { BaseApiService } from './base';
import type {
  IDeviceInfo,
  IDeviceResponse,
  ICreateDeviceResponse,
  IDeviceControlDisabled,
  ConfigValueType,
} from '../types';

/**
 * Device management API service
 */
export class DeviceApiService extends BaseApiService {
  private deviceInfos?: IDeviceInfo[];

  async initialize(baseUrl: string) {
    await this.initializeAxios(baseUrl);
    // Load device infos on initialization
    this.deviceInfos = await this.getAllDevices();
  }

  /**
   * Get all devices
   * @param filterWithSessionLogEntries - Filter devices with session log entries
   */
  async getAllDevices(filterWithSessionLogEntries = false): Promise<IDeviceInfo[]> {
    this.ensureInitialized();
    const response = await this.getAxios().get<IDeviceResponse>(
      `devices?filter_with_session_log_enties=${filterWithSessionLogEntries}`,
    );
    return response.data.devices;
  }

  /**
   * Get device info by ID
   * @param id - Device ID
   */
  getDeviceInfo(id: string): IDeviceInfo {
    if (this.deviceInfos != null) {
      const result = this.deviceInfos.find((info) => info.id === id);
      if (result != null) {
        return result;
      }
    }
    return {
      id: '',
      name: '',
      icon: '',
      supported_power_modes: [],
      power_mode: '',
    };
  }

  /**
   * Delete a device
   * @param id - Device ID
   */
  async deleteDevice(id: string): Promise<void> {
    this.ensureInitialized();
    await this.getAxios().delete(`devices/${id}`);
  }

  /**
   * Add a new device
   * @param deviceType - Type of device
   * @param name - Device name
   * @param config - Device configuration
   */
  async addDevice(deviceType: string, name: string, config: object): Promise<string> {
    this.ensureInitialized();
    const response = await this.getAxios().post<ICreateDeviceResponse>('devices', {
      device_type: deviceType,
      device_name: name,
      config: config,
    });
    return response.data.device_id;
  }

  /**
   * Set device power mode
   * @param id - Device ID
   * @param powerMode - Power mode to set
   */
  async setPowerMode(id: string, powerMode: string) {
    // Update local cache
    const deviceInfo = this.getDeviceInfo(id);
    if (deviceInfo != null) {
      deviceInfo.power_mode = powerMode;
    }

    this.ensureInitialized();
    const response = await this.getAxios().put<IDeviceInfo>(`devices/${id}/power_mode`, {
      power_mode: powerMode,
    });
    return response;
  }

  /**
   * Get device control disabled status
   */
  async getDeviceControlDisabled(): Promise<IDeviceControlDisabled> {
    this.ensureInitialized();
    return (await this.getAxios().get<IDeviceControlDisabled>('config/device_control')).data;
  }

  /**
   * Set device control disabled status
   * @param disableDeviceControl - Whether to disable device control
   */
  async setDeviceControlDisabled(disableDeviceControl: boolean) {
    this.ensureInitialized();
    return await this.getAxios().put<IDeviceControlDisabled>(
      `config/device_control?disable_device_control=${disableDeviceControl}`,
    );
  }

  /**
   * Get device configuration
   * @param deviceId - Device ID
   */
  async getDeviceConfig(deviceId: string): Promise<object> {
    this.ensureInitialized();
    return (await this.getAxios().get<{ config: object }>(`config/device/${deviceId}`)).data.config;
  }

  /**
   * Save device configuration
   * @param deviceId - Device ID
   * @param values - Configuration values
   */
  async saveDeviceConfig(deviceId: string, values: Record<string, ConfigValueType>) {
    this.ensureInitialized();
    return await this.getAxios().put<{ config: object }>(`config/device/${deviceId}`, values);
  }
}
