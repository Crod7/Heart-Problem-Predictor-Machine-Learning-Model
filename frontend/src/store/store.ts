
import { configureStore } from '@reduxjs/toolkit';
import loadingScreenReducer from './loadingScreenSlice';

const store = configureStore({
    reducer: {
        loadingScreen: loadingScreenReducer,
    },
});

export default store;
