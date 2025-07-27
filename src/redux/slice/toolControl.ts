import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Logger } from '@/utils/logger';
export enum EnumToolType {
	nowPlayingView = 0,
	queue,
	connectToADevice,
}
export type ToolControl = {
	open: boolean;
	typeTool: EnumToolType;
};
const initialState: ToolControl = {
	open: false,
	typeTool: EnumToolType.nowPlayingView,
};
export const toolControl = createSlice({
	name: 'toolSlice',
	initialState,
	reducers: {
		onSetState: (state, action: PayloadAction<ToolControl>) => {
			Logger.info('reduce execute toolControl');
			Logger.debug('reduce execute toolControl have state', state);
			return action.payload;
		},
	},
});

export const funcToolControl = toolControl.actions;
export const dataToolControl = (state: RootState) => state.toolSlice;
export default toolControl.reducer;
