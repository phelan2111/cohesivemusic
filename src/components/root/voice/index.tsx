interface IVoiceProps {
	src: string;
	track: string;
	controls?: boolean;
	id?: string;
	mute?: boolean;
	autoPlay?: boolean;
}
function Voice({ autoPlay = false, ...props }: IVoiceProps) {
	return (
		<video
			id={props.id}
			muted={props.mute}
			autoPlay={autoPlay}
			style={{
				display: 'none',
			}}
			className='h-full w-full object-cover rounded-lg'
			controls={props.controls}>
			<source src={props.src} type='video/mp3' />
			<track src={props.track} kind='captions' />
		</video>
	);
}

export default Voice;
