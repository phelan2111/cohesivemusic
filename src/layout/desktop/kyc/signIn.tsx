import Button from '@/components/root/button';
import Form from '@/components/root/form';
import Checkbox from '@/components/root/inputs/checkbox';
import TextField from '@/components/root/inputs/textField';
import LogoComponent from '@/components/ui/common/logo';
import InputPassword from '@/components/ui/input/password';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import { PATH } from '@/routes/config';
import { FcGoogle } from 'react-icons/fc';

type SignInDesktopProps = {
	onLoginWithGG: VoidFunction;
};

function SignInDesktop(props: SignInDesktopProps) {
	const { redirectPage } = useRedirect();
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge animate-translateRight'>
				<article className='flex flex-col gap-10 w-full'>
					<div className='m-auto'>
						<LogoComponent />
					</div>
					<div className='flex flex-col gap-1'>
						<h4 className='text-xl uppercase font-semibold'>
							{Localize('SIGN_IN')}
						</h4>
						<p className='text-sm'>{Localize('LET_GET_STARTED')}</p>
					</div>
					<div>
						<div
							aria-hidden
							onClick={props.onLoginWithGG}
							className='border-white border flex items-center cursor-pointer hover:text-primary_dark hover:bg-white/80 transition-colors duration-500 gap-2 justify-center py-3 rounded-sm m-auto'>
							<FcGoogle />
							<p className='font-medium'>
								{Localize('LOGIN_GOOGLE')}
							</p>
						</div>
						<p className='text-center py-3'>{Localize('OR')}</p>
						<Form
							render={() => {
								return (
									<div className='flex flex-col gap-4'>
										<TextField label='USER_NAME' />
										<InputPassword label='PASSWORD' />
										<div className='flex justify-between items-center'>
											<Checkbox
												label={{
													direction: 'horizontal',
													text: 'REMEMBER_FOR_30DAYS',
												}}
											/>
											<p className='text-xs underline cursor-pointer hover:text-white/70 transition-colors duration-300'>
												{Localize('FORGOT_PASSWORD')}
											</p>
										</div>
										<div className='pt-6 w-full'>
											<Button
												onClick={() =>
													redirectPage(PATH.HOME)
												}
												text='SIGN_IN'
											/>
										</div>
									</div>
								);
							}}
						/>
						<p
							onClick={() => redirectPage(PATH.KYC.SIGN_UP)}
							aria-hidden='true'
							className='text-sm py-3 text-center underline cursor-pointer hover:text-white/60 transition-colors duration-300'>
							<span>{Localize('DO_NOT_HAVE_ACCOUNT')}</span>{' '}
							<span className='text-blue-200 hover:text-inherit'>
								{Localize('SIGN_UP')}
							</span>
						</p>
					</div>
				</article>
			</div>
		</div>
	);
}

export default SignInDesktop;
