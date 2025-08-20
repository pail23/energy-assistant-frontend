import axios, { AxiosInstance } from 'axios';

/**
 * Base API service class that provides common HTTP functionality
 */
export abstract class BaseApiService {
  protected axiosInstance?: AxiosInstance;
  protected baseUrl?: string;

  /**
   * Initialize the API service with a base URL
   * @param baseUrl - Base URL for the API
   * @param pathPrefix - Additional path prefix to append to base URL
   */
  protected async initializeAxios(baseUrl: string, pathPrefix = '/api') {
    if (this.axiosInstance) throw new Error('already initialized');
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);

    this.baseUrl = baseUrl + pathPrefix;
    console.log(`Initializing API service: ${this.baseUrl}`);

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    this.axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Ensure axios is initialized before making requests
   */
  protected ensureInitialized(): void {
    if (!this.axiosInstance) {
      throw new Error('API service not initialized. Call initialize() first.');
    }
  }

  /**
   * Get the axios instance (for subclasses that need direct access)
   */
  protected getAxios(): AxiosInstance {
    this.ensureInitialized();
    return this.axiosInstance!;
  }
}
