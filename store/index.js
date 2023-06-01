import {configureStore, combineReducers} from '@reduxjs/toolkit';
import registerSlice from './reducer/registerSlice';
import makeVerificationRegisterSlice from './reducer/makeVerificationRegisterSlice';
import loginSlice from './reducer/loginSlice';
import getCategorySlice from './authReducer/getCategorySlice';
import getAllProductSlice from './authReducer/getAllProductSlice';
import getProductSingleSlice from './authReducer/getProductSingleSlice';
import getAuthUserInfoSlice from './authReducer/getAuthUserInfoSlice';
import getAllAddressSlice from './authReducer/getAllAddressSlice';
import addNewAddressSlice from './authReducer/addNewAddressSlice';
import getAllFavoritesSlice from './authReducer/getAllFavoritesSlice';
import addFavoriteSlice from './authReducer/addFavoriteSlice';
import changeUserInfoSlice from './authReducer/changeUserInfoSlice';
import getAllBasketSlice from './authReducer/getAllBasketSlice';
import delateInBassketSlice from './authReducer/delateInBassketSlice';
import plusMinusBasketSlice from './authReducer/plusMinusBasketSlice';
import getBasketPriceCountSlice from './authReducer/getBasketPriceCountSlice';
import getAllHistorySlice from './authReducer/getAllHistorySlice';
import deleteHistorySlice from './authReducer/deleteHistorySlice';
import logoutSlice from './authReducer/logoutSlice';

const rootReducer = combineReducers({
  registerSlice: registerSlice,
  makeVerificationRegisterSlice: makeVerificationRegisterSlice,
  loginSlice: loginSlice,
  getCategorySlice: getCategorySlice,
  getAllProductSlice: getAllProductSlice,
  getProductSingleSlice: getProductSingleSlice,
  getAuthUserInfoSlice: getAuthUserInfoSlice,
  getAllAddressSlice: getAllAddressSlice,
  addNewAddressSlice: addNewAddressSlice,
  getAllFavoritesSlice: getAllFavoritesSlice,
  addFavoriteSlice: addFavoriteSlice,
  changeUserInfoSlice: changeUserInfoSlice,
  getAllBasketSlice: getAllBasketSlice,
  delateInBassketSlice: delateInBassketSlice,
  plusMinusBasketSlice: plusMinusBasketSlice,
  getBasketPriceCountSlice: getBasketPriceCountSlice,
  getAllHistorySlice: getAllHistorySlice,
  deleteHistorySlice: deleteHistorySlice,
  logoutSlice: logoutSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
