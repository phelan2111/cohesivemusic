import Button from '@/components/root/button';
import Localize from '@/langs';

interface IFollowButtonProps {
	className?: string;
	text?: string;
	onClick?: VoidFunction;
}
function FollowButton({ className = 'w-fit !bg-primary_dark-10', text = 'UN_FOLLOW', onClick = () => {} }: IFollowButtonProps) {
	return (
		<Button
			onClick={onClick}
			className={`px-3 !rounded-3xl buttonFollow !transition-colors duration-700  hover:!bg-primary_dark-20 ${className}`}>
			<div className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold text-sm'>
				{Localize(text)}
			</div>
		</Button>
	);
}

export default FollowButton;
