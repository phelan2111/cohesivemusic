import { useAppSelector } from '@/hooks/redux';
import { dataToolControl, funcToolControl } from './toolControl';
import { dataLangue, funcLangue } from './langue';
import { dataSong, funcSong } from './song';
import { dataMe, funcMe } from './me';

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

export const sliceMe = {
	useGetState: () => useAppSelector(dataMe),
	func: funcMe,
};
