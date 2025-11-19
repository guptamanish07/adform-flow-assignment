import userReducer, { FETCH_USER } from '../userReducer';

jest.mock('../../../utils/apiUtils', () => ({
  createAsyncAction: jest.fn(),
  fetchData: jest.fn()
}));

describe('userReducer', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle FETCH_USER pending', () => {
    const action = {
      type: FETCH_USER,
      status: 'pending'
    };
    const result = userReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle FETCH_USER fulfilled', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    const action = {
      type: FETCH_USER,
      status: 'fulfilled',
      payload: mockUsers
    };
    const result = userReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.users).toEqual(mockUsers);
  });

  it('should handle FETCH_USER rejected', () => {
    const action = {
      type: FETCH_USER,
      status: 'rejected',
      error: 'Network error'
    };
    const result = userReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Network error');
  });
});
