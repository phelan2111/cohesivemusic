import LogoComponent from '@/components/ui/common/logo';
import Button from '@/components/root/button';
import Form, { SubmitForm } from '@/components/root/form';
import TextField from '@/components/root/inputs/textField';
import Localize from '@/langs';
import { FcGoogle } from 'react-icons/fc';
import { useRedirect } from '@/hooks/useRedirect';
import { PATH } from '@/routes/config';
import { FormDataUserSignUp } from '@/pages/kyc/signUp/types';
import { string } from 'yup';

interface ISignUpDesktopProps extends Pick<SubmitForm<FormDataUserSignUp>, 'onSubmit'> {
	onSignUpWithGG: VoidFunction;
}

function SignUpDesktop(props: ISignUpDesktopProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 h-full w-full'>
			<div className='flex flex-col bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge animate-translateRight'>
				<div className='flex justify-center flex-col items-center '>
					<LogoComponent />
					<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
						<h4 className='font-bold text-lg'>{Localize('COHESIVE_MUSIC')}</h4>
					</div>
				</div>
				<div>
					<h4 className='text-3xl font-bold'>{Localize('SIGN_UP')}</h4>
					<p className='text-xs pt-2'>{Localize('LET_GET_STARTED')} </p>
				</div>
				<div>
					<div
						aria-hidden
						onClick={props.onSignUpWithGG}
						className='border-white border flex items-center cursor-pointer hover:text-primary_dark hover:bg-white/80 transition-colors duration-500 gap-2 justify-center py-3 rounded-sm m-auto'>
						<FcGoogle />
						<p className='font-medium'>{Localize('LOGIN_GOOGLE')}</p>
					</div>
					<p className='text-center py-3'>{Localize('OR')}</p>
					<Form
						validator={{
							username: string().required(),
						}}
						onSubmit={props.onSubmit}
						render={({ formState }) => {
							return (
								<div className='flex flex-col gap-4'>
									<TextField name='username' label='USER_NAME' />
									<div className='pt-[26px] w-full'>
										<Button disabled={!formState.isValid} type='submit' text='SIGN_UP' />
									</div>
								</div>
							);
						}}
					/>
					<p
						aria-hidden='true'
						onClick={() => redirectPage(PATH.KYC.SIGN_IN)}
						className='text-sm py-3 text-center underline cursor-pointer hover:text-white/60 transition-colors duration-300'>
						<span>{Localize('DO_HAVE_ACCOUNT')}</span>{' '}
						<span className='text-blue-200 hover:text-inherit'>{Localize('SIGN_IN')}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUpDesktop;
