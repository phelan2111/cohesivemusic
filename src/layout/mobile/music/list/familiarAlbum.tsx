import HorizontalItem from '@/components/ui/item/horizontal';
import data from '@/pages/music/data/familiarAlbum.json';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';

interface IFamiliarAlbumProps {}

function FamiliarAlbum(props: IFamiliarAlbumProps) {
	console.log('FamiliarAlbum', props);
	const { redirectPage } = useRedirect();

	return (
		<section className='grid grid-cols-2 gap-3 snap-start'>
			{data.map((album) => {
				return (
					<HorizontalItem
						className='bg-primary_dark-10 hover:opacity-80 transition-all duration-300 shadow-materialDesign rounded-md'
						onClick={() => {
							redirectPage(`${PATH.ALBUM._}/${album.id}`);
						}}
						render={() => (
							<p className='text-xs font-bold'>
								{album.nameAlbum}
							</p>
						)}
						image={{
							className: 'size-12',
							fieldImage: 'cover',
						}}
						key={album.cover}
						item={album}
					/>
				);
			})}
		</section>
	);
}

export default FamiliarAlbum;
