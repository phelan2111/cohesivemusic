import { SubmitForm } from '@/components/root/form';
import ScreenResponsive from '@/components/ui/responsive/screen';
import SignUpDesktop from '@/layout/desktop/kyc/signUp';
import SignUpMobile from '@/layout/mobile/kyc/signUp';
import { FormDataUserSignUp } from '../../types';
import Loading from '@/components/ui/loader/loading';

interface IViewProps extends Pick<SubmitForm<FormDataUserSignUp>, 'onSubmit'> {
	onSignUpWithGG: VoidFunction;
	loading: boolean;
}

function View(props: IViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive mobile={() => <SignUpMobile {...props} />} desktop={() => <SignUpDesktop {...props} />} />
		</Loading>
	);
}

export default View;
