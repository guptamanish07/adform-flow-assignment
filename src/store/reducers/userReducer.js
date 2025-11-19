import { createAsyncAction, fetchData } from '../../utils/apiUtils';

export const FETCH_USER = 'users/fetchUser';

export const fetchUsers = () => {
  return createAsyncAction(
    FETCH_USER,
    () => fetchData('https://jsonplaceholder.typicode.com/users')
  );
};

const initialState = {
  users: [],
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
        if (action.status === 'pending') {
            return { ...state, loading: true, error: null };
        }
        if (action.status === 'fulfilled') {
            return { ...state, loading: false, users: action.payload };
        }
        if (action.status === 'rejected') {
            return { ...state, loading: false, error: action.error };
        }
        return state;
    
    default:
      return state;
  }
};

export default userReducer;
