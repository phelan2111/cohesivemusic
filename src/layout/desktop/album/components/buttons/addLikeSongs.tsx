import Button from '@/components/root/button';
import Empty from '@/components/root/empty';
import TextField from '@/components/root/inputs/textField';
import Popover from '@/components/root/popper';
import LoaderAstronaut from '@/components/ui/loader/astronaut';
import { useDebounce } from '@/hooks/useDebounce';
import useLoading from '@/hooks/useLoading';
import Localize from '@/langs';
import { AddNewPlaylistFunc } from '@/pages/album/types';
import { PayloadPlaylistAdd } from '@/services/playlist/addSongToPlaylist';
import { ResponsePlaylist } from '@/services/playlist/me';
import { ResponseRequest } from '@/services/types';
import { StatusPlaylist } from '@/utils/enums';
import { Helper } from '@/utils/helper';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { TiPin } from 'react-icons/ti';

type AddLikeSongsProps = {
	defaultLike: boolean;
	songId: string;
	addSongToPlaylist?: (dataItem: PayloadPlaylistAdd) => void;
	updateSongToPlaylist: (dataItem: AddNewPlaylistFunc) => void;
	playlistMeResponse: ResponseRequest<ResponsePlaylist>;
	getPlaylistMe: VoidFunction;
	createPlaylist: VoidFunction;
};

type CheckIconProps = {
	checked: boolean;
	onClick: VoidFunction;
};
function CheckIcon(props: CheckIconProps) {
	return (
		<div
			aria-hidden
			onClick={() => {
				props.onClick();
			}}
			className='size-6 flex items-center justify-center relative'>
			<GoPlusCircle className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer' />
			<div
				className={`${
					props.checked ? 'size-5 active' : 'size-0'
				} rounded-full transition-all duration-300 absolute bg-gradient-to-r from-pink-500 to-violet-500 fireworks`}>
				<div className='flex items-center justify-center h-full'>
					<IoMdCheckmark className='text-xs text-white' />
				</div>
			</div>
		</div>
	);
}
let timer: number;
function AddLikeSongs({ defaultLike, ...props }: AddLikeSongsProps) {
	const { stateLoading, handlerLoading } = useLoading({ defaultLoading: defaultLike });
	const [playlistOfSong, setPlaylistOfSong] = useState<string[]>([]);
	const [searchValue, setSearchValue] = useState<string>('');
	const value = useDebounce(searchValue);

	const isDirty = useMemo(() => {
		const playlistRecent = props.playlistMeResponse.list.filter((pl) => {
			const { isExist } = Helper.findItem(pl.songs as never[], 'songId', props.songId);
			return isExist;
		});
		const playlistIdRecent = playlistRecent.map((pl) => pl.playlistId);
		return Helper.deepEqual(playlistIdRecent as never, playlistOfSong as never);
	}, [playlistOfSong]);
	const playlistCurrent = useMemo(() => {
		return props.playlistMeResponse.list.filter((pl) => {
			const clearText = Helper.removeVietnameseTones(value);
			const keywordParts = clearText.split(/\s+/);
			const clearPlaylistName = Helper.removeVietnameseTones(pl.namePlaylist);
			return keywordParts.every((part) => clearPlaylistName.includes(part));
		});
	}, [value, props.playlistMeResponse]);

	const createInitialState = () => {
		if (!Helper.isEmpty(props.playlistMeResponse.list)) {
			const playlistRecent = props.playlistMeResponse.list.filter((pl) => {
				const { isExist } = Helper.findItem(pl.songs as never[], 'songId', props.songId);
				return isExist;
			});
			const playlistIdRecent = playlistRecent.map((pl) => pl.playlistId);
			setPlaylistOfSong(playlistIdRecent);
		}
	};
	const timerFuncCreateInitialState = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			createInitialState();
		}, 500) as never;
	};

	useEffect(() => {
		createInitialState();
	}, [props.playlistMeResponse]);
	useEffect(() => {
		handlerLoading.onSetLoading(defaultLike);
	}, [defaultLike]);

	return (
		<Popover
			bottom='10px'
			onCloseByBlur={() => {
				timerFuncCreateInitialState();
			}}
			className='text-primary_dark rounded-sm right-52'
			renderContent={({ onClose }) => {
				return (
					<div className='bg-primary_dark-20 rounded-lg flex flex-col gap-3 w-64 text-white'>
						<div className='flex flex-col gap-2 px-4 pt-4'>
							<p className='text-sm'>{Localize('ADD_TO_PLAYLIST')}</p>
							<TextField
								onChange={(dataItem) => {
									setSearchValue(dataItem);
								}}
								classNameInput='h-7 text-xs'
								placeholder={Localize('FIND_A_PLAYLIST')}
							/>
						</div>
						<div
							aria-hidden
							onClick={() => {
								onClose();
								props.createPlaylist();
							}}
							className='flex items-center gap-1 text-sm border-b px-4 border-primary_dark-10 pb-2'>
							<FaPlus />
							<p>{Localize('NEW_PLAYLIST')}</p>
						</div>
						<div className='h-[156px] overflow-y-auto px-4 scrollHiddenY'>
							<Empty isEmpty={Helper.isEmpty(playlistCurrent)} emptyComp={<LoaderAstronaut />}>
								{playlistCurrent.map((pl) => {
									const index = playlistOfSong.findIndex((pc) => pc === pl.playlistId);
									const isExist = index !== -1;

									return (
										<div
											key={pl.playlistId}
											className='flex items-center gap-2 justify-between hover:bg-primary_dark-10 p-2 rounded-md transition-all duration-300'>
											<div className='flex items-center gap-1'>
												<div>
													<figure>
														<img
															className='size-10 object-cover rounded-sm'
															src={pl.image}
															alt={pl.namePlaylist}
														/>
													</figure>
												</div>
												<p className='text-sm font-medium'>{pl.namePlaylist}</p>
											</div>
											<div className='flex items-center gap-2'>
												{pl.status === StatusPlaylist.user && <TiPin className='text-xl' />}
												<CheckIcon
													checked={isExist}
													onClick={() => {
														let freshState = [...playlistOfSong];
														if (isExist) {
															freshState.splice(index, 1);
														} else {
															freshState = [...freshState, pl.playlistId];
														}
														setPlaylistOfSong(freshState);
													}}
												/>
											</div>
										</div>
									);
								})}
							</Empty>
						</div>
						<div
							style={{
								boxShadow: '-0px -4px 4px -3px #ffffff10',
							}}
							className='shadow-red-100 w-full py-3 px-4 flex justify-end gap-2'>
							<Button
								onClick={() => {
									onClose();
									timerFuncCreateInitialState();
								}}
								className='h-8 px-2 text-sm w-20 !bg-transparent'>
								{Localize('CANCEL')}
							</Button>
							<Button
								disabled={isDirty}
								onClick={() => {
									onClose();
									timerFuncCreateInitialState();
									props.updateSongToPlaylist({ playlistId: playlistOfSong, songId: props.songId });
								}}
								className='h-8 px-2 text-sm w-20'>
								{Localize('DONE')}
							</Button>
						</div>
					</div>
				);
			}}
			renderChildren={({ onOpen }) => {
				return (
					<CheckIcon
						checked={stateLoading.loading}
						onClick={() => {
							handlerLoading.onSetLoading(true);
							if (stateLoading.loading) {
								onOpen();
							}
							if (!stateLoading.loading) {
								props.addSongToPlaylist?.({
									songId: props.songId,
								});
							}
						}}
					/>
				);
			}}
		/>
	);
}

export default AddLikeSongs;
