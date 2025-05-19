import { Logger } from '@/utils/logger';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

type useGoogleProps = {
	func: {
		onSuccess: (tokenResponse: TokenResponse) => void;
		onError: VoidFunction;
	};
};
function useGoogle(props: useGoogleProps) {
	const onLoginWithGG = useGoogleLogin({
		onSuccess: async (tokenResponse: TokenResponse) => {
			props.func.onSuccess(tokenResponse);
		},
		onError: async () => {
			Logger.info('useGoogle execute onError');
			props.func.onError();
		},
		flow: 'implicit',
	});

	return {
		handler: {
			onLoginWithGG,
		},
	};
}

export default useGoogle;
