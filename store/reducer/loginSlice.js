import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginRequest = createAsyncThunk(
  'login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    password_error: '',
    phone_error: '',

    loading: false,
    success_login: false,
  },
  reducers: {
    clearLoginState(state) {
      state.password_error = '';
      state.phone_error = '';
      state.user_not_verify = false;
      state.loading = false;
      state.success_login = false;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(loginRequest.pending, state => {
        state.password_error = '';
        state.phone_error = '';
        state.user_not_verify = false;
        state.loading = false;
        state.success_login = false;
      })

      .addCase(loginRequest.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.loading = false;
          state.success_login = true;
          // AsyncStorage.setItem('userToken', action.payload.token);
        }
      })

      .addCase(loginRequest.rejected, (state, action) => {
        if (!action.payload.status) {
          state.phone_error =
            action.payload.message.phone || action.payload.message;
          state.password_error =
            action.payload.message.password || action.payload.message;
          state.loading = false;

          state.loading = false;
          state.success_login = false;

          if (action.payload?.data?.phone == 'The phone field is required.') {
            state.phone_error = 'Данные поля обязательны.';
          }

          if (
            action.payload?.data?.password == 'The password field is required.'
          ) {
            state.password_error = 'Данные поля обязательны.';
          }

          if (action.payload?.message == 'user not registred') {
            state.phone_error = 'Такой пользователь не существует.';
          } else if (action.payload?.message == 'user not verified') {
            state.user_not_verify = true;
          } else if (action.payload?.message == 'not valid password') {
            state.password_error = 'Неверный пароль.';
          }
        }
      });
  },
});

export default loginSlice.reducer;
export const {clearLoginState} = loginSlice.actions;
