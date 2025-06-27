import ScreenResponsive from '@/components/ui/responsive/screen';
import InformationSignUpDesktop from '@/layout/desktop/kyc/information';
import InformationSignUpMobile from '@/layout/mobile/kyc/information';
import { FormDataInformation } from '../../types';
import Loading from '@/components/ui/loader/loading';

interface IViewProps {
	onSubmit: (dataForm: FormDataInformation) => void;
	loading: boolean;
}
function View(props: IViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive
				mobile={() => <InformationSignUpMobile onSubmit={props.onSubmit} />}
				desktop={() => <InformationSignUpDesktop onSubmit={props.onSubmit} />}
			/>
		</Loading>
	);
}

export default View;
