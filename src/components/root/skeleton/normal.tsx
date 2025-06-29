import { type CSSProperties } from 'react';

interface ISkeletonProps {
	className?: string;
	style?: CSSProperties;
}
function Skeleton({ className = 'h-[56px] min-w-[56px] rounded-full ', style }: ISkeletonProps) {
	return <div style={style} className={`bg-white/20 backdrop-blur-2xl animate-pulse ${className}`} />;
}

export default Skeleton;
