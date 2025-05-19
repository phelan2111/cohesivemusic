import Wrapper from '@/components/root/wrapper';
import { Outlet } from 'react-router-dom';
import ParallaxWrap from './parallax';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Config from '@/configs';

const config = new Config().getState();

function AuthWrapper() {
	return (
		<GoogleOAuthProvider clientId={config.clientId}>
			<Wrapper
				extends={<ParallaxWrap />}
				className='flex justify-center items-center relative h-screen overflow-hidden'>
				<Outlet />
			</Wrapper>
		</GoogleOAuthProvider>
	);
}

export default AuthWrapper;
