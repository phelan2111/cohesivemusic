import ScreenResponsive from '@/components/ui/responsive/screen';
import SignInDesktop from '@/layout/desktop/kyc/signIn';
import SignInMobile from '@/layout/mobile/kyc/signIn';

type ViewProps = {
	onLoginWithGG: VoidFunction;
};
function View(props: ViewProps) {
	return (
		<ScreenResponsive
			mobile={() => <SignInMobile onLoginWithGG={props.onLoginWithGG} />}
			desktop={() => (
				<SignInDesktop onLoginWithGG={props.onLoginWithGG} />
			)}
		/>
	);
}

export default View;
