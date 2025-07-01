import FilterChip, { IItemFilterChip } from '@/components/ui/filter/chip';
// import YourLibraryAlbumItem from '@/components/ui/item/album';
import Localize from '@/langs';
import { IoLibraryOutline } from 'react-icons/io5';
// import data from '@/layout/mobile/yourLibrary/data/data.json';
import SearchYourLibrary from '@/components/ui/input/search/yourLibrary';
import { LuLayoutPanelLeft } from 'react-icons/lu';
import AnimationScale from '../animation/scale';
import { Skeletons } from '@/components/ui/skelentons';
import { Services } from '@/services';
import { useEffect, useState } from 'react';
import { initialResponseRequest, ResponseRequest } from '@/services/types';
import { ResponsePlaylist } from '@/services/playlist/useGet';
import useLoading from '@/hooks/useLoading';
import { StatusPlaylist } from '@/utils/enums';
import AlbumOfMeItem from '@/components/ui/item/albumMe';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { useParams } from 'react-router-dom';

const filter: IItemFilterChip[] = [
	{
		label: 'Playlist',
		value: 'Playlist',
		children: [
			{
				label: 'Playlist',
				value: 'Playlist',
			},
			{
				label: 'By you',
				value: 'By you',
			},
			{
				label: 'By Cohesive',
				value: 'By Cohesive',
			},
		],
	},
	{
		label: 'Podcasts',
		value: 'Podcasts',
	},
	{
		label: 'Artist',
		value: 'Artist',
	},
];

type ParamsCurrent = {
	id?: string;
};
function NavigateLeft() {
	const { handlerLoading, stateLoading } = useLoading({ defaultLoading: true });
	const { redirectPage } = useRedirect();
	const params = useParams() as ParamsCurrent;

	const [playlistMeResponse, setPlaylistMeResponse] = useState<ResponseRequest<ResponsePlaylist>>(
		initialResponseRequest as ResponseRequest<ResponsePlaylist>,
	);
	const { handlerService } = Services.Playlist.useGet({
		onSuccess: (dataItem) => {
			setPlaylistMeResponse(dataItem);
			handlerLoading.onSetLoading(false);
		},
		defaultLoading: true,
	});

	useEffect(() => {
		handlerService.onGet({
			from: 0,
			limit: 0,
			status: StatusPlaylist.user,
		});
	}, []);

	return (
		<div className='lg:block hidden w-[360px] min-w-[360px]'>
			<div>
				<div className='bg-primary_dark-10 rounded-3xl'>
					<div className='flex items-center gap-2 px-4 py-4'>
						<IoLibraryOutline />
						<p className='relative z-20 font-bold pt-1'>{Localize('YOUR_LIBRARY')}</p>
					</div>
					<article className='px-4 pb-4'>
						<FilterChip data={filter} />
					</article>
					<article className='px-4 pb-4 flex justify-between items-center'>
						<SearchYourLibrary onChange={() => void 0} />
						<AnimationScale>
							<div className='h-10 w-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer'>
								<LuLayoutPanelLeft />
							</div>
						</AnimationScale>
					</article>
					<article className='pb-4 pt-2 pr-2'>
						<div className='flex flex-col gap-4 h-yourLibraryDk scrollHiddenY relative z-10 overflow-y-auto snap-mandatory snap-y p-4 pr-2'>
							<Skeletons.YourLibraryAlbum loading={stateLoading.loading}>
								<AlbumOfMeItem
									id={params.id}
									onClick={() => {
										redirectPage(`${PATH.ALBUM._}/${playlistMeResponse?.list?.[0]?.playlistId}`);
									}}
									item={playlistMeResponse?.list?.[0]}
								/>
								{/* {data.map((i) => {
									return <YourLibraryAlbumItem key={i.image} {...i} />;
								})} */}
							</Skeletons.YourLibraryAlbum>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}

export default NavigateLeft;
