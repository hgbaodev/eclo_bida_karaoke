import env from '@/env';
import { getValidAuthTokens } from '@/lib/cookies';
import axios from 'axios';

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: env.NEXT_API_URL,
});

// Đăng ký interceptor để gắn token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = getValidAuthTokens();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
