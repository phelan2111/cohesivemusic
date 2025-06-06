import LogoComponent from '@/components/ui/common/logo';
import Button from '@/components/root/button';
import Form from '@/components/root/form';
import InputOTP from '@/components/root/inputs/otp';
import Localize from '@/langs';

interface IOTPDesktopProps {
	onSubmit: VoidFunction;
}

function OTPDesktop(props: IOTPDesktopProps) {
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex flex-col bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge'>
				<div className='flex justify-center flex-col items-center '>
					<LogoComponent />
					<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
						<h4 className='font-bold text-lg'>
							{Localize('COHESIVE_MUSIC')}
						</h4>
					</div>
				</div>
				<div>
					<h4 className='text-3xl font-bold'>{Localize('OTP')}</h4>
					<p className='text-xs pt-2'>
						{Localize('OTP_DES')} +84 824 84**
					</p>
				</div>
				<div>
					<Form
						render={() => {
							return (
								<div className='flex flex-col gap-12'>
									<InputOTP numInputs={5} />
									<div className='pt-[26px] w-full'>
										<Button
											onClick={props.onSubmit}
											text='VERIFY'
										/>
									</div>
								</div>
							);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default OTPDesktop;
