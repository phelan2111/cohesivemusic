import Localize from '@/langs';
import { CiVolumeMute } from 'react-icons/ci';
import { FaPlayCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import Video from '@/components/root/video/video';
import { useCallback, useEffect, useRef } from 'react';
import useLoading from '@/hooks/useLoading';
import { Logger } from '@/utils/logger';
import LoaderPreviewMV from '../loader/previewMV';
import AddLikeSongs from '@/layout/desktop/home/components/buttons/addLikeSongs';

interface INewMVProps {
	name: string;
	nameSingle: string;
	link: string;
	id: string;
	image: string;
}

function CardNewMV(props: INewMVProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: false });

	const takeElementVideo = useCallback((): HTMLVideoElement => {
		const elementVideo: HTMLVideoElement = document.querySelector(`#videoDesktop${props.id}`) as HTMLVideoElement;
		return elementVideo;
	}, [props.id]);
	const takeElementAudio = useCallback((): HTMLVideoElement => {
		const elementAudio: HTMLVideoElement = document.querySelector(`#voiceDesktop${props.id}`) as HTMLVideoElement;
		return elementAudio;
	}, [props.id]);
	const onMouseEnter = () => {
		takeElementVideo().play();
	};
	const onMouseLeave = () => {
		takeElementVideo().pause();
	};
	const onPreview = () => {
		try {
			handlerLoading.onSetLoading(true);
			const audio = takeElementAudio();
			audio.muted = false;
			audio.volume = 1;
			audio.play();
		} catch (error) {
			Logger.error('CardNewMV execute onPreview have error', JSON.stringify(error));
		}
	};
	const onUnPreview = () => {
		handlerLoading.onSetLoading(false);
		const audio = takeElementAudio();
		audio.muted = true;
		audio.volume = 0;
		audio.play();
	};

	useEffect(() => {
		const container = ref.current;
		if (container) {
			container.addEventListener('mouseenter', onMouseEnter);
			container.addEventListener('mouseleave', onMouseLeave);
			return () => {
				container.removeEventListener('mouseenter', onMouseEnter);
				container.removeEventListener('mouseleave', onMouseLeave);
			};
		}
		return () => {};
	}, [ref]);

	return (
		<div ref={ref} className={'flex flex-col justify-between w-full relative rounded-lg group h-96'}>
			<div className='absolute z-0 w-full h-full animate-translateToTry'>
				<Video mute={true} id={`videoDesktop${props.id}`} src={props.link} track={props.link ?? ''} />
			</div>
			<video id={`voiceDesktop${props.id}`} className='hidden'>
				<source src={props.link} type='video/mp4' />
				<track src={props.link} kind='captions' />
			</video>
			<div className='flex justify-between relative z-10 w-full bg-gradient-to-b from-primary_dark/65 to-primary_dark/0 h-fit p-3 items-center'>
				<div className='flex gap-3 h-fit'>
					<img className='h-20 w-20 rounded-md object-cover' src={props.image} alt={props.image} />
					<div className='w-48'>
						<h4 className='line-clamp-2'>{props.name}</h4>
						<p className='flex gap-2 text-xs items-center text-white/80'>
							<span>{Localize('SINGLE')}</span>
							<GoDotFill className='text-[10px]' />
							<span>{props.nameSingle}</span>
						</p>
					</div>
				</div>
			</div>
			<div className='flex justify-between items-center p-4 group-hover:translate-y-0 transition-all duration-300 translate-y-4 opacity-0 group-hover:opacity-100'>
				<div className='h-[34px] flex justify-start'>
					<div
						aria-hidden
						onClick={onPreview}
						className={`overflow-hidden transition-all duration-300  ${
							!stateLoading.loading ? 'scale-100 pointer-events-auto' : 'scale-0 pointer-events-none'
						}`}>
						<div
							className={`bg-primary_dark/70 cursor-pointer relative z-10 rounded-3xl font-semibold flex h-[34px] w-[96px] justify-center hover:bg-primary_dark/90 transition-colors duration-300 items-center gap-2`}>
							<CiVolumeMute className='text-lg' />
							<p className='text-xs'>{Localize('PREVIEW')}</p>
						</div>
					</div>
					<div
						aria-hidden
						onClick={onUnPreview}
						className={`overflow-hidden transition-all -translate-x-24 duration-300  ${
							stateLoading.loading ? 'scale-100' : 'scale-0'
						}`}>
						<div
							className={`bg-primary_dark/70 cursor-pointer relative z-10 rounded-3xl font-semibold px-3 flex h-[34px] justify-center hover:bg-primary_dark/90 transition-colors duration-300 items-center gap-2`}>
							<LoaderPreviewMV />
							<p className='text-xs truncate max-w-20'>{props.name}</p>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center gap-6'>
					<AddLikeSongs defaultLike={false} />
					<div className='flex items-center gap-4 hover:scale-125 transition-all duration-300 cursor-pointer'>
						<FaPlayCircle className='text-5xl relative z-10' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardNewMV;
