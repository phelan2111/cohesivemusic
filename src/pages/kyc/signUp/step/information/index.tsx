import { ResponseState } from '../../controller';
import { FormDataInformation } from '../../types';
import Component from './component';

export type InformationSignUpProps = {
	onSubmit: (dataForm?: FormDataInformation) => void;
	onRequestRegisterSuccess: VoidFunction;
	response: ResponseState;
};

function InformationSignUp(props: InformationSignUpProps) {
	return <Component {...props} />;
}

export default InformationSignUp;
