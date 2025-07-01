import CardNewMV from '@/components/ui/card/newMV';
import { Skeletons } from '@/components/ui/skelentons';
import Localize from '@/langs';
import { ResponseSongNewest } from '@/pages/home/types';
import { Fragment } from 'react/jsx-runtime';

type NewMVProps = {
	MVNewest: ResponseSongNewest;
	handler: {
		onRedirect: (path: string) => void;
	};
};

function NewMV(props: NewMVProps) {
	return (
		<Fragment>
			<Skeletons.Songs.NewMVRelease loading={props.MVNewest.loading}>
				<section className='flex flex-col gap-3'>
					<h4 className='text-xl font-bold'>{Localize('NEW_MV_RELEASE')}</h4>
					<div className='grid grid-cols-3 gap-4'>
						{props.MVNewest.songResponse.list.map((i) => (
							<CardNewMV
								key={i.songId}
								id={i.songId}
								name={i.songName}
								nameSingle={i.singers.map((s) => s.singerName).join(', ')}
								link={i.link}
								image={i.image}
							/>
						))}
					</div>
				</section>
			</Skeletons.Songs.NewMVRelease>
		</Fragment>
	);
}

export default NewMV;
