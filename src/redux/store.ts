import { configureStore } from '@reduxjs/toolkit';
import langueReducer from './slice/langue';
import songReducer from './slice/song';
import toolControl from './slice/toolControl';

export const store = configureStore({
	reducer: {
		langue: langueReducer,
		song: songReducer,
		toolSlice: toolControl,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
