import { ResponseSong } from '@/services/songs/details';
import Model from './model';

export type ControlToolProps = {
	data: ResponseSong;
};

function ControlTool(props: ControlToolProps) {
	return <Model {...props} />;
}

export default ControlTool;
