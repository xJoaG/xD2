import api from './api';
import { API_ENDPOINTS } from '../config/api';

export interface VerificationResponse {
  success: boolean;
  message: string;
}

class VerificationService {
  async sendVerificationEmail(email: string): Promise<VerificationResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.VERIFICATION.SEND_EMAIL, { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send verification email');
    }
  }

  async verifyEmail(token: string): Promise<VerificationResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.VERIFICATION.VERIFY_EMAIL, { token });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  }

  async resendVerificationEmail(email: string): Promise<VerificationResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.VERIFICATION.RESEND_EMAIL, { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification email');
    }
  }
}

export default new VerificationService();