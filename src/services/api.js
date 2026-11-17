// API Integration Service for Rango Demo 04
// Supports configurable backend URL with graceful fallback when backend is offline

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'http://localhost:5000/api';

/**
 * Standardized API client with timeout and diagnostic reporting
 */
export async function apiRequest(endpoint, options = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `API error (${response.status}): ${response.statusText}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return { success: true, data, fromBackend: true };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      success: false,
      error: err.name === 'AbortError' ? 'Connection to server timed out' : err.message,
      isNetworkError: err.name === 'TypeError' || err.name === 'AbortError',
      fromBackend: false
    };
  }
}

/**
 * Authentication API methods
 */
export const authApi = {
  async login(credentials) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async register(userData) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async logout() {
    return apiRequest('/auth/logout', {
      method: 'POST'
    });
  }
};

/**
 * Payment & Checkout API methods
 */
export const paymentApi = {
  async processPayment(orderData) {
    return apiRequest('/checkout/process-payment', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async verifyVoucher(code) {
    return apiRequest(`/vouchers/verify?code=${encodeURIComponent(code)}`, {
      method: 'GET'
    });
  }
};
