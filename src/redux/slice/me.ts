import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { initialResponseRequest, ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/me';

export interface ISongState {
	playlistMe: ResponseRequest<ResponsePlaylist>;
}

const initialState: ISongState = {
	playlistMe: initialResponseRequest as ResponseRequest<ResponsePlaylist>,
};

export const meSlice = createSlice({
	name: 'meSlice',
	initialState,
	reducers: {
		onSetData: (state, action: PayloadAction<ResponseRequest<ResponsePlaylist>>) => {
			state.playlistMe = action.payload;
		},
	},
});

export const funcMe = meSlice.actions;

export const dataMe = (state: RootState) => state.me;

export default meSlice.reducer;
