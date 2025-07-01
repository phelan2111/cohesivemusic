import { FaRegPlayCircle } from 'react-icons/fa';

interface IVerticalSingerItemProps {
	avatarSinger: string;
	nameSinger: string;
	onClick?: VoidFunction;
}

function VerticalSingerItem(props: IVerticalSingerItemProps) {
	return (
		<div
			aria-hidden
			onClick={props.onClick}
			className='w-fit flex flex-col gap-1 cursor-pointer group lg:gap-3 snap-end transition-all duration-500 lg:snap-none'>
			<div className='shadow-bootstrapLarge rounded-full p-1 relative'>
				<div className='hidden lg:flex absolute overflow-hidden justify-center items-center transition-all duration-500 delay-300 bottom-0 right-0 w-0 h-0 bg-primary_dark-10 shadow-bootstrapLarge rounded-full group-hover:w-12 group-hover:h-12'>
					<FaRegPlayCircle className='text-3xl' />
				</div>
				<img className='min-w-40 h-40 object-cover rounded-full' src={props.avatarSinger} alt={props.avatarSinger} />
			</div>
			<p className='text-sm text-center'>{props.nameSinger}</p>
		</div>
	);
}

export default VerticalSingerItem;
