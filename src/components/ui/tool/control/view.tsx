import ProcessPlaySong from '@/components/root/process/playSong';

type ViewProps = {
	state: {
		link: string;
		timeCurrent?: number;
		isPlay: boolean;
	};
	handler: {
		play: VoidFunction;
		updateViewOnce: VoidFunction;
		pause: (timing: number) => void;
	};
};
function View(props: ViewProps) {
	return (
		<div className='flex flex-col gap-1 justify-center items-center'>
			<ProcessPlaySong {...props} />
		</div>
	);
}

export default View;
