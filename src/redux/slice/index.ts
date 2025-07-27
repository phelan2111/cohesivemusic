import { useAppSelector } from '@/hooks/redux';
import { dataToolControl, funcToolControl } from './toolControl';
import { dataLangue, funcLangue } from './langue';
import { dataSong, funcSong } from './song';

export const sliceToolControl = {
	useGetState: () => useAppSelector(dataToolControl),
	func: funcToolControl,
};

export const sliceLangue = {
	useGetState: () => useAppSelector(dataLangue),
	func: funcLangue,
};

export const sliceSong = {
	useGetState: () => useAppSelector(dataSong),
	func: funcSong,
};
