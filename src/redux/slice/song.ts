import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ISongState {
	isPlay: boolean;
	playlist: string[];
	timing: number;
	songId: string;
}

const initialState: ISongState = {
	playlist: [],
	timing: 0,
	isPlay: false,
	songId: '',
};

export const songSlice = createSlice({
	name: 'songSlice',
	initialState,
	reducers: {
		onPlay: (state) => {
			state.isPlay = true;
		},
		onPause: (state) => {
			state.isPlay = false;
		},
		onSetData: (state, action: PayloadAction<ISongState>) => {
			state.songId = action.payload.songId;
			state.isPlay = action.payload.isPlay;
			state.playlist = action.payload.playlist;
			state.timing = action.payload.timing;
		},
	},
});

export const funcSong = songSlice.actions;

export const dataSong = (state: RootState) => state.song;

export default songSlice.reducer;
