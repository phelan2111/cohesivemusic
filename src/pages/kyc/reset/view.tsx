import Loading from '@/components/ui/loader/loading';
import ScreenResponsive from '@/components/ui/responsive/screen';
import { FormDataReset } from './types';
import ResetDesktop from '@/layout/desktop/kyc/reset';
import ResetMobile from '@/layout/mobile/kyc/reset';

type ViewProps = {
	loading: boolean;
	onSubmit: (dataForm: FormDataReset) => void;
};
function View(props: ViewProps) {
	return (
		<Loading loading={props.loading}>
			<ScreenResponsive
				mobile={() => <ResetMobile onSubmit={props.onSubmit} />}
				desktop={() => <ResetDesktop onSubmit={props.onSubmit} />}
			/>
		</Loading>
	);
}

export default View;
