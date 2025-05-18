import NewSingerItem, { NewsItem } from '@/components/ui/item/newSinger';

type NewsProps = {
	data: NewsItem[];
};
function News(props: NewsProps) {
	return (
		<div className='grid grid-cols-1 divide-y-[0.5px] divide-primary_dark-10 animate-translateBottom_duration_0dot8'>
			{props.data.map((item) => {
				return <NewSingerItem key={item.image} {...item} />;
			})}
		</div>
	);
}

export default News;
