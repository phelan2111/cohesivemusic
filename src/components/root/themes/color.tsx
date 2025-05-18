import { Outlet } from 'react-router-dom';
import Toast from '../toast/normal';
import Modal from '../modal/normal';

function ThemeColor() {
	return (
		<div className='dark'>
			<Outlet />
			<Toast />
			<Modal />
		</div>
	);
}

export default ThemeColor;
