# API Structure Documentation

This document describes the newly organized API structure for the Energy Assistant frontend.

## Overview

The API has been restructured to be more organized and maintainable while maintaining full backward compatibility.

## New Structure

```
src/api/
├── types/                    # Type definitions
│   ├── index.ts             # All types re-exported
│   ├── device.ts           # Device-related types
│   ├── measurement.ts      # Measurement and analytics types
│   ├── config.ts          # Configuration types
│   └── forecast.ts        # Forecasting types
├── services/               # Service implementations
│   ├── index.ts           # Main API class
│   ├── base.ts            # Base API service class
│   ├── device.ts          # Device management
│   ├── measurement.ts     # Measurements and analytics
│   ├── config.ts         # Configuration
│   ├── forecast.ts       # Forecasting
│   └── realtime.ts       # WebSocket/real-time data
├── index.ts              # Main entry point
├── energyAssistant.api.ts # Legacy file (still works)
├── devices.api.ts        # Legacy file (still works)
└── device.ts            # Legacy file (still works)
```

## Usage

### Backward Compatible (Legacy)

```typescript
// Old imports still work
import { api, IDeviceInfo } from '@/api/energyAssistant.api';
import { devicesAPI } from '@/api/devices.api';
```

### New Organized Approach

#### Option 1: Use the main API class (recommended for most cases)

```typescript
import { api } from '@/api';

// All functionality available through domain-specific services
await api.devices.getAllDevices();
await api.measurements.getAllHomeMeasurements();
await api.forecast.getForecast();
await api.config.getConfig();

// Legacy methods still available directly on api
await api.getAllDevices(); // same as api.devices.getAllDevices()
```

#### Option 2: Import specific services

```typescript
import { DeviceApiService, MeasurementApiService } from '@/api';

const deviceService = new DeviceApiService();
await deviceService.initialize(baseUrl);
await deviceService.getAllDevices();
```

#### Option 3: Import types separately

```typescript
import type { IDeviceInfo, IHomeMeasurement } from '@/api/types';
// or
import type { IDeviceInfo, IHomeMeasurement } from '@/api';
```

#### Option 4: Use the real-time service

```typescript
import { devicesAPI } from '@/api';

devicesAPI.initialize(baseUrl);
// Access reactive data
console.log(devicesAPI.home.devices);
console.log(devicesAPI.state.connected);
```

## Benefits of New Structure

1. **Better Organization**: Related functionality is grouped together
2. **Type Safety**: Centralized type definitions prevent duplication
3. **Separation of Concerns**: Each service handles a specific domain
4. **Maintainability**: Easier to find and modify specific functionality
5. **Backward Compatibility**: Existing code continues to work unchanged
6. **Extensibility**: Easy to add new services or modify existing ones

## Domain Services

### DeviceApiService

- Device management (CRUD operations)
- Device configuration
- Power mode control
- Device control settings

### MeasurementApiService

- Home and device measurements
- Historical data
- Session logs
- Analytics data

### ForecastApiService

- Forecast data retrieval
- Model creation and tuning

### ConfigApiService

- System configuration
- Version information

### RealtimeApiService

- WebSocket connections
- Real-time data updates
- Connection state management

## Migration Guide

### For New Code

Use the new organized imports:

```typescript
import { api, type IDeviceInfo } from '@/api';
```

### For Existing Code

No changes needed - all existing imports continue to work:

```typescript
import { api, IDeviceInfo } from '@/api/energyAssistant.api';
```
