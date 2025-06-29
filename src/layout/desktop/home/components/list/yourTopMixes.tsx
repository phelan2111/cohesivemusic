import HoverCard from '@/components/root/animation/hoverCard';
import AlbumCard from '@/components/ui/card/album';
import Localize from '@/langs';
import { handleStyleViewTool } from '../..';
import { Fragment } from 'react';
import { Skeletons } from '@/components/ui/skelentons';
import Empty from '@/components/root/empty';
import { ResponseYourTopMixes } from '@/pages/home/types';
import { PATH } from '@/routes/config';

type YourTopMixesProps = {
	yourTopMixes: ResponseYourTopMixes;
	handler: {
		onRedirect: (path: string) => void;
	};
};

function YourTopMixes(props: YourTopMixesProps) {
	return (
		<Fragment>
			<Skeletons.YourTopMixes loading={props.yourTopMixes.loading}>
				<Empty emptyComp={<></>} isEmpty={props.yourTopMixes.playlistResponse.list.length === 0}>
					<section className='flex flex-col gap-4 snap-start'>
						<div className='flex justify-between w-full items-center'>
							<h4 className='text-xl font-bold'>{Localize('YOUR_TOP_MIX')}</h4>
							<div className='text-sm cursor-pointer hover:underline'>{Localize('SHOW_ALL')}</div>
						</div>
						<div className={`grid xl:grid-cols-3 lg:grid-cols-3 gap-6 px-4 ${handleStyleViewTool().className}`}>
							{props.yourTopMixes.playlistResponse?.list?.slice(0, handleStyleViewTool().sliceData).map((album) => (
								<HoverCard
									onClick={() => {
										props.handler.onRedirect(`${PATH.ALBUM._}/${album.playlistId}`);
									}}
									className='rounded-lg overflow-hidden cursor-pointer shadow-xl'
									key={album.namePlaylist + album.image + YourTopMixes.name}>
									<AlbumCard
										albumImage={album.image}
										albumName={album.namePlaylist}
										themeColor={album.theme}
										description={album.descriptionPlaylist}
									/>
								</HoverCard>
							))}
						</div>
					</section>
				</Empty>
			</Skeletons.YourTopMixes>
		</Fragment>
	);
}

export default YourTopMixes;
