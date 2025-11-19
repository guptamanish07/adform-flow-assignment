import axios from 'axios';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generic async action creator that handles pending/fulfilled/rejected states
 * @param {string} actionType - The base action type (e.g., 'FETCH_USERS')
 * @param {Function} apiCall - Function that returns a promise (API call)
 * @param {object} options - Additional options
 * @returns {Function} Redux thunk function
 */
export const createAsyncAction = (actionType, apiCall, options = {}) => {
  return (dispatch) => {
    dispatch({
      type: actionType,
      status: 'pending',
      ...options.pendingPayload
    });

    return apiCall()
      .then(response => {
        dispatch({
          type: actionType,
          status: 'fulfilled',
          payload: response.data || response,
          ...options.fulfilledPayload
        });
        return response;
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        dispatch({
          type: actionType,
          status: 'rejected',
          error: errorMessage,
          ...options.rejectedPayload
        });
        throw error;
      });
  };
};

/**
 * Generic fetch data function
 * @param {string} url - API endpoint URL
 * @param {object} config - Axios config options
 * @returns {Promise} API response promise
 */
export const fetchData = (url, config = {}) => {
  return api.get(url, config);
};

/**
 * Generic post data function
 * @param {string} url - API endpoint URL
 * @param {object} data - Data to post
 * @param {object} config - Axios config options
 * @returns {Promise} API response promise
 */
export const postData = (url, data, config = {}) => {
  return api.post(url, data, config);
};

/**
 * Generic put data function
 * @param {string} url - API endpoint URL
 * @param {object} data - Data to put
 * @param {object} config - Axios config options
 * @returns {Promise} API response promise
 */
export const putData = (url, data, config = {}) => {
  return api.put(url, data, config);
};

/**
 * Generic delete data function
 * @param {string} url - API endpoint URL
 * @param {object} config - Axios config options
 * @returns {Promise} API response promise
 */
export const deleteData = (url, config = {}) => {
  return api.delete(url, config);
};

