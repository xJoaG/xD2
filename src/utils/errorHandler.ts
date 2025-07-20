export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiErrorHandler {
  static handle(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        code: error.response.data?.code,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
      };
    }
  }

  static isNetworkError(error: any): boolean {
    return !error.response && error.request;
  }

  static isAuthError(error: any): boolean {
    return error.response?.status === 401;
  }

  static isValidationError(error: any): boolean {
    return error.response?.status === 400;
  }

  static isServerError(error: any): boolean {
    return error.response?.status >= 500;
  }
}

export default ApiErrorHandler;