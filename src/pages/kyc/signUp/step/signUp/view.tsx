import ScreenResponsive from '@/components/ui/responsive/screen';
import SignUpDesktop from '@/layout/desktop/kyc/signUp';
import SignUpMobile from '@/layout/mobile/kyc/signUp';

interface IViewProps {
	onSubmit: VoidFunction;
	onSignUpWithGG: VoidFunction;
}

function View(props: IViewProps) {
	return (
		<ScreenResponsive
			mobile={() => <SignUpMobile {...props} />}
			desktop={() => <SignUpDesktop {...props} />}
		/>
	);
}

export default View;
