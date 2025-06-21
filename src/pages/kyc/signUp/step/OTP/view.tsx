import ScreenResponsive from '@/components/ui/responsive/screen';
import OTPDesktop from '@/layout/desktop/kyc/otp';
import OTP from '@/layout/mobile/kyc/otp';
import { FormDataOTPSignUp, FormDataUserSignUp } from '../../types';

interface IViewProps {
	formUsername: FormDataUserSignUp;
	onSubmit: (dataItem: FormDataOTPSignUp) => void;
}
function View(props: IViewProps) {
	return (
		<ScreenResponsive
			mobile={() => <OTP {...props} />}
			desktop={() => <OTPDesktop {...props} />}
		/>
	);
}

export default View;
