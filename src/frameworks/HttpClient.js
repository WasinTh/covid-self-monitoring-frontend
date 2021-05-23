import axios from 'axios';
import { applyAuthTokenInterceptor, setAuthTokens, clearAuthTokens } from 'axios-jwt';

const USERNAME_KEY = 'username';
const BASE_URL_KEY = 'baseurl';
let axiosInstance = null;

const initialize = (baseUrl) => {
  axiosInstance = axios.create({ baseURL: baseUrl })

  const requestRefresh = (refresh) => {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/api-token-refresh/`, { refresh })
        .then(response => resolve(response.data.access))
        .catch(err => reject(err))
    });
  };

  applyAuthTokenInterceptor(axiosInstance, { requestRefresh })
}

if (localStorage.getItem(BASE_URL_KEY) != null) {
  // Auto re-initialize when refresh
  initialize(localStorage.getItem(BASE_URL_KEY));
}

/**
 * Util method for parse the axios error response and generate readable text
 * @param {String} error 
 * @returns 
 */
export const getErrorDisplay = error => {
  if (error.response != null && error.response.status >= 400) { // Show error content error message
    return 'detail' in error.response.data ? error.response.data.detail : error.response.data
  }
  else {
    return error.message
  }
}

export const login = async (params) => {
  initialize(params['baseUrl']);
  const response = await axiosInstance.post('api-token-auth/', params)
  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh
  })
  localStorage.setItem(USERNAME_KEY, params['username']);
  localStorage.setItem(BASE_URL_KEY, params['baseUrl']);
}

export const logout = () => {
  clearAuthTokens();
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(BASE_URL_KEY);
}
export const fetchSymptom = () => axiosInstance.get('/monitor/symptom-viewsets/');
export const fetchMeasurement = () => axiosInstance.get(`/monitor/measurement-viewsets/?user__username=${localStorage.getItem(USERNAME_KEY)}`);
export const createMeasurement = values => axiosInstance.post(`/monitor/measurement-viewsets/`, {...values});
export const updateMeasurement = (id, values) => axiosInstance.put(`/monitor/measurement-viewsets/${id}/`, { ...values });
export const deleteMeasurement = id => axiosInstance.delete(`/monitor/measurement-viewsets/${id}/`);
