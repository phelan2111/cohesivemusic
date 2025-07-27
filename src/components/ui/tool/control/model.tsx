import usePlay from '@/hooks/usePlay';
import { ControlToolProps } from '.';
import View from './view';
import { Logger } from '@/utils/logger';

function Model(props: ControlToolProps) {
	const { state, handler } = usePlay();

	const play = () => {
		try {
			Logger.info('Tool.control execute play');
			handler.play();
		} catch (error) {
			console.log('errorerrorerror', error);
			Logger.error('Tool.control execute play error', error as object);
		}
	};
	const pause = (timing: number) => {
		try {
			Logger.info('Tool.control execute pause');
			handler.pause(timing);
		} catch (error) {
			Logger.error('Tool.control execute pause error', error as object);
		}
	};

	return (
		<View
			state={{
				link: props.data.link,
				timeCurrent: state.timing,
				isPlay: state.isPlay,
			}}
			handler={{
				pause,
				play,
			}}
		/>
	);
}

export default Model;
