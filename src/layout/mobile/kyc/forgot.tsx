import LogoComponent from '@/components/ui/common/logo';
import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextField from '@/components/root/inputs/textField';
import Localize from '@/langs';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { string } from 'yup';
import { FormDataForgot } from '@/pages/kyc/forgot/types';

interface IForgotMobileProps {
	onSubmit: (dataItem: FormDataForgot) => void;
}

function ForgotMobile(props: IForgotMobileProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='bg-white/10 px-10 py-4 rounded-md flex-col justify-center gap-10 w-full h-screen select-none flex lg:hidden'>
			<div className='flex justify-center flex-col items-center animate-translateRight'>
				<LogoComponent />
				<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
					<h4 className='font-bold text-lg'>{Localize('COHESIVE_MUSIC')}</h4>
				</div>
			</div>
			<div className='animate-translateRight'>
				<h4 className='text-3xl font-bold'>{Localize('FORGOT_PASSWORD')}</h4>
				<p className='text-xs pt-2'>{Localize('FORGOT_PASSWORD_DES')} </p>
			</div>
			<div className='animate-translateRight'>
				<Form
					onSubmit={props.onSubmit}
					validator={{
						email: string().required(),
					}}
					render={({ formState }) => {
						return (
							<div className='flex flex-col gap-4'>
								<TextField name='email' label='USER_NAME' />
								<div className='pt-6 w-full'>
									<Button disabled={!formState.isValid} text='CONFIRM' />
								</div>
							</div>
						);
					}}
				/>
				<p
					onClick={() => redirectPage(PATH.KYC.SIGN_IN)}
					aria-hidden='true'
					className='text-sm py-3 text-center underline cursor-pointer hover:text-white/60 transition-colors duration-300'>
					<span>{Localize('DO_HAVE_ACCOUNT')}</span>{' '}
					<span className='text-blue-200 hover:text-inherit'>{Localize('SIGN_UP')}</span>
				</p>
			</div>
		</div>
	);
}

export default ForgotMobile;
