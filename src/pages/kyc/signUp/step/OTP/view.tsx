import ScreenResponsive from '@/components/ui/responsive/screen';
import OTPDesktop from '@/layout/desktop/kyc/otp';
import OTP from '@/layout/mobile/kyc/otp';
import { FormDataOTPSignUp, FormDataUserSignUp } from '../../types';
import Loading from '@/components/ui/loader/loading';

interface IViewProps {
	formUsername: FormDataUserSignUp;
	onSubmit: (dataItem: FormDataOTPSignUp) => void;
	loading: boolean;
}
function View(props: IViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive mobile={() => <OTP {...props} />} desktop={() => <OTPDesktop {...props} />} />
		</Loading>
	);
}

export default View;
