import { useRedirect } from '@/hooks/useRedirect';
import View from './view';
import { PATH } from '@/routes/config';
import { InformationSignUpProps } from '.';
import { FormDataInformation } from '../../types';

interface IComponentProps extends InformationSignUpProps {}
function Model(props: IComponentProps) {
	const { redirectPage } = useRedirect();
	const handleSubmit = (dataForm?: FormDataInformation) => {
		props.onSubmit(dataForm);
		redirectPage(PATH.HOME);
	};
	return <View onSubmit={handleSubmit} />;
}

export default Model;
