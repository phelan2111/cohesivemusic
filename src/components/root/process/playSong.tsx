import { Helper } from '@/utils/helper';
import { Logger } from '@/utils/logger';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FaPause } from 'react-icons/fa6';
import { IoIosPlay, IoMdRepeat } from 'react-icons/io';
import { IoShuffle } from 'react-icons/io5';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

type ProcessPlaySongProps = {
	state: {
		link: string;
		timeCurrent?: number;
		isPlay: boolean;
	};
	handler: {
		play: VoidFunction;
		pause: (timing: number) => void;
		updateViewOnce: VoidFunction;
	};
};

let hasViewed = false;
type DurationSong = {
	timeCurrent: number;
	totalTime: number;
};
function ProcessPlaySong({ state: { link = '', timeCurrent = 0, isPlay = false }, ...props }: ProcessPlaySongProps) {
	const ref = useRef<HTMLAudioElement>(null);

	const [duration, setDuration] = useState<DurationSong>({
		timeCurrent,
		totalTime: 0,
	});

	const widthProcess = useMemo(() => {
		const widthOfPer = Number((400 / duration.totalTime).toFixed(3));
		return !isFinite(widthOfPer) ? 0 : widthOfPer;
	}, [duration]);

	const play = () => {
		try {
			Logger.info('Tool.song ProcessPlaySong execute play');
			if (!ref.current) {
				throw new Error('Not found element!!');
			}
			ref.current.muted = false;
			ref.current.volume = 1;
			ref.current.play();
		} catch (error: unknown) {
			Logger.error('Tool.song ProcessPlaySong execute play error', error as object);
		}
	};
	const pause = () => {
		try {
			Logger.info('Tool.song ProcessPlaySong execute pause');
			if (!ref.current) {
				throw new Error('Not found element!!');
			}
			ref.current.muted = true;
			ref.current.volume = 0;
			ref.current.pause();
		} catch (error: unknown) {
			Logger.error('Tool.song ProcessPlaySong execute pause error', error as object);
		}
	};
	const seek = (e: React.MouseEvent<HTMLDivElement>) => {
		try {
			Logger.info('Tool.song ProcessPlaySong execute seek');
			if (!ref.current) return;
			const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
			//width đang đc target = Tọa độ từ mép trái của trình duyệt tới vị trí con chuột đang trỏ - Tọa độ từ mép trái của trình duyệt tới đầu mép trái của phần từ
			const clickX = e.clientX - rect.left;
			const percent = clickX / rect.width;

			const newTime = percent * duration.totalTime;
			ref.current.currentTime = newTime;
			setDuration((prev) => ({
				...prev,
				timeCurrent: newTime,
			}));
		} catch (error) {
			Logger.error('Tool.song ProcessPlaySong execute seek error', error as object);
		}
	};

	useEffect(() => {
		if (ref.current) {
			ref.current.currentTime = timeCurrent;
		}
	}, [ref]);

	useEffect(() => {
		Logger.debug('ProcessPlaySong isPlay', `${isPlay}`);
		if (isPlay) {
			play();
		} else {
			pause();
		}
	}, [isPlay, link]);

	useEffect(() => {
		hasViewed = false;
	}, [link]);
	return (
		<Fragment>
			<div className='text-2xl flex gap-4 items-center'>
				<IoShuffle className='transition-transform hover:scale-110 cursor-pointer duration-500' />
				<MdSkipPrevious className='transition-transform hover:scale-110 cursor-pointer duration-500' />
				<div
					aria-hidden
					onClick={() => {
						if (isPlay) {
							props.handler.pause(duration.timeCurrent);
						} else {
							props.handler.play();
						}
					}}
					className='min-w-10 h-10 bg-primary_dark-20 rounded-full flex justify-center duration-500 items-center transition-transform hover:scale-110 cursor-pointer'>
					{isPlay ? <FaPause /> : <IoIosPlay />}
				</div>
				<MdSkipNext className='transition-transform hover:scale-110 cursor-pointer duration-500' />
				<IoMdRepeat className='transition-transform hover:scale-110 cursor-pointer duration-500' />
			</div>
			<audio
				ref={ref}
				onLoadedData={(event) => {
					setDuration({
						timeCurrent: event.currentTarget.currentTime,
						totalTime: event.currentTarget.duration,
					});
				}}
				onTimeUpdate={(event) => {
					if (event.currentTarget.currentTime >= duration.totalTime / 10 && !hasViewed && duration.totalTime > 0) {
						props.handler.updateViewOnce();
						hasViewed = true;
					}
					setDuration({
						timeCurrent: event.currentTarget.currentTime,
						totalTime: duration.totalTime,
					});
				}}
				id={'toolSong'}
				muted
				autoPlay={false}
				src={link}
				className={`h-full w-full object-cover`}
				controls={false}>
				<source src='horse.ogg' type='audio/ogg' />
				<source src='horse.mp3' type='audio/mpeg' />
				<track src={link} kind='captions' />
			</audio>
			<div className='flex text-xs gap-2 items-center'>
				<div>
					{`0${Helper.convertTime(duration.timeCurrent).minus}`.slice(-2)}:
					{`0${Helper.convertTime(duration.timeCurrent).second}`.slice(-2)}
				</div>
				<div
					aria-hidden
					onClick={seek}
					className='w-[400px] hover:bg-primary_dark-20/60 transition-all duration-300 cursor-pointer h-1.5 rounded-xl overflow-hidden bg-primary_dark-20'>
					<div
						style={{
							width: widthProcess * duration.timeCurrent,
						}}
						className='bg-gradient-to-r from-indigo-500 via-purple-500 transition-all duration-500 to-pink-500 h-1.5 rounded-xl'
					/>
				</div>
				<div>
					{`0${Helper.convertTime(duration.totalTime).minus}`.slice(-2)}:
					{`0${Helper.convertTime(duration.totalTime).second}`.slice(-2)}
				</div>
			</div>
		</Fragment>
	);
}

export default ProcessPlaySong;
