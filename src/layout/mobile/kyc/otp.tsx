import LogoComponent from '@/components/ui/common/logo';
import Form from '@/components/root/form';
import InputOTP from '@/components/root/inputs/otp';
import Localize from '@/langs';
import { FormDataOTPSignUp, FormDataUserSignUp } from '@/pages/kyc/signUp/types';
import { Helper } from '@/utils/helper';

interface IOTPProps {
	onSubmit: (dataItem: FormDataOTPSignUp) => void;
	formUsername: FormDataUserSignUp;
}

function OTP(props: IOTPProps) {
	return (
		<div className='bg-white/10 px-10 py-4 rounded-md flex-col justify-center gap-10 w-full h-screen select-none flex'>
			<div className='flex justify-center flex-col items-center '>
				<LogoComponent />
				<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
					<h4 className='font-bold text-lg'>{Localize('COHESIVE_MUSIC')}</h4>
				</div>
			</div>
			<div>
				<h4 className='text-3xl font-bold'>{Localize('OTP')}</h4>
				<p className='text-xs pt-2'>
					{Localize('OTP_DES')} {Helper.maskEmail(props.formUsername.username)}
				</p>
			</div>
			<div>
				<Form
					onSubmit={props.onSubmit}
					render={() => {
						return <InputOTP numInputs={5} />;
					}}
				/>
			</div>
		</div>
	);
}

export default OTP;
