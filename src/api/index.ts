/**
 * Main API entry point with organized structure and backward compatibility
 */

// Export all types
export * from './types';

// Export services
export {
  EnergyAssistantApi,
  DeviceApiService,
  MeasurementApiService,
  ForecastApiService,
  ConfigApiService,
  RealtimeApiService,
} from './services';

// Create API instances
import { EnergyAssistantApi, RealtimeApiService } from './services';

// Main API instance (backward compatible)
export const api = new EnergyAssistantApi();

// Separate realtime/WebSocket service instance (backward compatible)
export const devicesAPI = new RealtimeApiService();

// Legacy function exports (backward compatible)
export const getAllHomeMeasurementsFn = async () => {
  return await api.getAllHomeMeasurements();
};

export const getHomeMeasurementsByDateFn = async (fromDate: Date, toDate: Date) => {
  return await api.getHomeMeasurementDifference(fromDate, toDate);
};
