import { ResponseSong } from '@/services/songs/details';
import Model from './model';
import { Services } from '@/services';

export type ControlToolProps = {
	data: ResponseSong;
};

function ControlTool(props: ControlToolProps) {
	const { UpdateView } = Services.Song;

	const updateView = UpdateView({
		onSuccess: () => {},
	});

	return <Model updateView={updateView.handlerService.onRequest} {...props} />;
}

export default ControlTool;
