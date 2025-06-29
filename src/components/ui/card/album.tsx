interface IAlbumCardProps {
	themeColor: string;
	singersName?: string[];
	description?: string;
	albumName: string;
	albumImage: string;
}

function AlbumCard(props: IAlbumCardProps) {
	const singersName = props.singersName?.join(', ');

	return (
		<div className='h-fit min-w-36 flex flex-col group lg:p-2 lg:hover:shadow-sm gap-3 lg:group transition-all duration-500 lg:rounded-lg lg:overflow-hidden cursor-pointer snap-end lg:snap-none'>
			<div
				style={{
					borderColor: props.themeColor,
				}}
				className='relative border-b-4'>
				<img className='h-36 w-36 object-cover lg:w-full lg:h-44' src={props.albumImage} alt={props.albumImage} />
				<div
					style={{
						borderColor: props.themeColor,
					}}
					className='absolute bottom-2 left-0 border-l-4 pl-4'>
					<p className='font-bold'>{props.albumName}</p>
				</div>
			</div>
			{props.description ? (
				<p className='text-xs transition-all line-clamp-1'>{props.description}</p>
			) : (
				<p className='text-xs transition-all'>{singersName} and more</p>
			)}
		</div>
	);
}

export default AlbumCard;
