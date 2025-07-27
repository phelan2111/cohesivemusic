import { sliceSong } from '@/redux/slice';
import { ISongState } from '@/redux/slice/song';
import { Logger } from '@/utils/logger';
import useLocal from './useLocal';
import { LocalStorage } from '@/utils/enums';
import { useAppDispatch } from './redux';
import { useEffect } from 'react';
import { Helper } from '@/utils/helper';

function usePlay() {
	const state = sliceSong.useGetState();
	const { handler } = useLocal();
	const dispatch = useAppDispatch();

	const playSong = (songId: string) => {
		try {
			Logger.info('usePlay execute playSong');
			Logger.debug('usePlay execute playSong have songId', songId);
			const value: ISongState = {
				isPlay: true,
				playlist: [songId],
				songId,
				timing: 0,
			};
			dispatch(sliceSong.func.onSetData(value));
			handler.set(LocalStorage.SONG, { ...value, isPlay: false });
		} catch (error) {
			Logger.error('usePlay execute playSong error', error as object);
		}
	};
	const playAlbum = (songId: string, playlist: string[]) => {
		try {
			Logger.info('usePlay execute playAlbum');
			Logger.debug('usePlay execute playAlbum have songId', songId);
			Logger.debug('usePlay execute playAlbum have playlist', playlist);
			const value: ISongState = {
				isPlay: true,
				playlist,
				songId,
				timing: 0,
			};
			dispatch(sliceSong.func.onSetData(value));
			handler.set(LocalStorage.SONG, { ...value, isPlay: false });
		} catch (error) {
			Logger.error('usePlay execute playAlbum error', error as object);
		}
	};
	const pause = (timing: number) => {
		try {
			Logger.info('usePlay execute pause');
			sliceSong.func.onPause();
			dispatch(sliceSong.func.onSetData({ ...state, isPlay: false, timing }));
			handler.set(LocalStorage.SONG, { ...state, isPlay: false, timing });
		} catch (error) {
			Logger.error('usePlay execute pause error', error as object);
		}
	};
	const play = () => {
		try {
			Logger.info('usePlay execute play');
			sliceSong.func.onPlay();
			dispatch(sliceSong.func.onSetData({ ...state, isPlay: true }));
			handler.set(LocalStorage.SONG, { ...state, isPlay: true });
		} catch (error) {
			Logger.error('usePlay execute pause play', error as object);
		}
	};

	useEffect(() => {
		const value = handler.get(LocalStorage.SONG) as ISongState;
		if (!Helper.isEmpty(value) && Helper.isEmpty(state.songId)) {
			dispatch(sliceSong.func.onSetData({...value, playlist: [], isPlay: false}));
		}
	}, []);
	return {
		handler: {
			pause,
			play,
			playAlbum,
			playSong,
		},
		state,
	};
}

export default usePlay;
