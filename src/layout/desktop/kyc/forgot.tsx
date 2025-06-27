import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextField from '@/components/root/inputs/textField';
import LogoComponent from '@/components/ui/common/logo';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import { FormDataForgot } from '@/pages/kyc/forgot/types';
import { PATH } from '@/routes/config';
import { string } from 'yup';

type ForgotDesktopProps = {
	onSubmit: (dataItem: FormDataForgot) => void;
};

function ForgotDesktop(props: ForgotDesktopProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge animate-translateRight'>
				<article className='flex flex-col gap-10 w-full'>
					<div className='m-auto'>
						<LogoComponent />
					</div>
					<div className='flex flex-col gap-1'>
						<h4 className='text-xl uppercase font-semibold'>{Localize('FORGOT_PASSWORD')}</h4>
						<p className='text-sm'>{Localize('FORGOT_PASSWORD_DES')}</p>
					</div>
					<div>
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
											<Button disabled={!formState.isValid} type='submit' text='SIGN_IN' />
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
				</article>
			</div>
		</div>
	);
}

export default ForgotDesktop;
