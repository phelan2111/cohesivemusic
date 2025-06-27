import Loading from '@/components/ui/loader/loading';
import ScreenResponsive from '@/components/ui/responsive/screen';
import ForgotMobile from '@/layout/mobile/kyc/forgot';
import { FormDataForgot } from './types';
import ForgotDesktop from '@/layout/desktop/kyc/forgot';

type ViewProps = {
	loading: boolean;
	onSubmit: (dataForm: FormDataForgot) => void;
};
function View(props: ViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive
				mobile={() => <ForgotMobile onSubmit={props.onSubmit} />}
				desktop={() => <ForgotDesktop onSubmit={props.onSubmit} />}
			/>
		</Loading>
	);
}

export default View;
