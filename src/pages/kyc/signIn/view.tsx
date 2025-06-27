import ScreenResponsive from '@/components/ui/responsive/screen';
import SignInDesktop from '@/layout/desktop/kyc/signIn';
import SignInMobile from '@/layout/mobile/kyc/signIn';
import { FormDataLogin } from './types';
import Loading from '@/components/ui/loader/loading';

type ViewProps = {
	onLoginWithGG: VoidFunction;
	onSubmit: (dataItem: FormDataLogin) => void;
	loading: boolean;
};
function View(props: ViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive
				mobile={() => <SignInMobile onSubmit={props.onSubmit} onLoginWithGG={props.onLoginWithGG} />}
				desktop={() => <SignInDesktop onSubmit={props.onSubmit} onLoginWithGG={props.onLoginWithGG} />}
			/>
		</Loading>
	);
}

export default View;
