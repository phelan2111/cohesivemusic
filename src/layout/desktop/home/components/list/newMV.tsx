import CardNewMV from '@/components/ui/card/newMV';
import { Skeletons } from '@/components/ui/skelentons';
import Localize from '@/langs';
import { ResponseSongNewest } from '@/pages/home/types';
import { PayloadPlaylistAdd } from '@/services/playlist/addSongToPlaylist';
import { PayloadCreatePlaylist } from '@/services/playlist/create';
import { ResponsePlaylist } from '@/services/playlist/me';
import { PayloadPlaylistUpdate } from '@/services/playlist/updateSongToPlaylist';
import { ResponseRequest } from '@/services/types';
import AuthService from '@/utils/auth';
import { Fragment } from 'react/jsx-runtime';

type NewMVProps = {
	MVNewest: ResponseSongNewest;
	handler: {
		onRedirect: (path: string) => void;
		addSongToPlaylist?: (dataItem: PayloadPlaylistAdd) => void;
		updateSongToPlaylist: (dataItem: PayloadPlaylistUpdate) => void;
		createPlaylist: (dataItem: PayloadCreatePlaylist) => void;
		playlistMe: VoidFunction;
		pauseSong: VoidFunction;
		playSong: (songId: string) => void;
	};
	state: {
		playlistMeResponse: ResponseRequest<ResponsePlaylist>;
		songId: string;
		isPause: boolean;
	};
};

function NewMV(props: NewMVProps) {
	const profile = AuthService.getPackageProfile();

	return (
		<Fragment>
			<Skeletons.Songs.NewMVRelease loading={props.MVNewest.loading}>
				<section className='flex flex-col gap-3'>
					<h4 className='text-xl font-bold'>{Localize('NEW_MV_RELEASE')}</h4>
					<div className='grid grid-cols-3 gap-4'>
						{props.MVNewest.songResponse.list.map((i) => (
							<CardNewMV
								key={i.songId}
								item={{
									nameSingle: i.singers.map((s) => s.singerName).join(', '),
									id: i.songId,
									...i,
								}}
								songs={i}
								handler={{
									...props.handler,
									createPlaylist: () => {
										props.handler.createPlaylist({
											descriptionPlaylist: `By ${profile.lastName} ${profile.firstName}`,
											image: i.image,
											namePlaylist: i.songName,
											songId: i.songId,
										});
									},
								}}
								state={props.state}
							/>
						))}
					</div>
				</section>
			</Skeletons.Songs.NewMVRelease>
		</Fragment>
	);
}

export default NewMV;
