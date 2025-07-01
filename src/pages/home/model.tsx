import { ResponseSingerNewest, ResponseSongNewest, ResponseYourTopMixes } from './types';
import View from './view';
import { useRedirect } from '@/hooks/useRedirect';

interface IModelProps {
	yourTopMixes: ResponseYourTopMixes;
	singersNewest: ResponseSingerNewest;
	songsNewest: ResponseSongNewest;
	MVNewest: ResponseSongNewest;
}

function Model(props: IModelProps) {
	const { redirectPage } = useRedirect();

	return (
		<View
			{...props}
			handler={{
				onRedirect: (path) => redirectPage(path),
			}}
		/>
	);
}

export default Model;
