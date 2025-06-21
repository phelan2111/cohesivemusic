import { FormDataInformation } from '../../types';
import Component from './component';

export type InformationSignUpProps = {
	onSubmit: (dataForm?: FormDataInformation) => void;
};

function InformationSignUp(props: InformationSignUpProps) {
	return <Component {...props} />;
}

export default InformationSignUp;
