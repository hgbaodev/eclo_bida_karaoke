// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import slices from './slices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['kitchen_order_notification'], // Chỉ định slice nào cần được lưu vào localStorage
};

const persistedReducer = persistReducer(persistConfig, slices);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, persistor, dispatch, useSelector, useDispatch };
