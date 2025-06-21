import LogoComponent from '@/components/ui/common/logo';
import Form from '@/components/root/form';
import InputOTP from '@/components/root/inputs/otp';
import Localize from '@/langs';
import { FormDataOTPSignUp, FormDataUserSignUp } from '@/pages/kyc/signUp/types';
import { Helper } from '@/utils/helper';

interface IOTPDesktopProps {
	onSubmit: (dataForm: FormDataOTPSignUp) => void;
	formUsername: FormDataUserSignUp;
}

function OTPDesktop(props: IOTPDesktopProps) {
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex flex-col bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge'>
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
		</div>
	);
}

export default OTPDesktop;
