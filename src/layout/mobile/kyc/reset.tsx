import LogoComponent from '@/components/ui/common/logo';
import Button from '@/components/root/button';
import Form from '@/components/root/form';
import Localize from '@/langs';
import { string } from 'yup';
import InputPassword from '@/components/ui/input/password';
import { FormDataReset } from '@/pages/kyc/reset/types';

interface IResetMobileProps {
	onSubmit: (dataItem: FormDataReset) => void;
}

function ResetMobile(props: IResetMobileProps) {
	return (
		<div className='bg-white/10 px-10 py-4 rounded-md flex-col justify-center gap-10 w-full h-screen select-none flex lg:hidden'>
			<div className='flex justify-center flex-col items-center animate-translateRight'>
				<LogoComponent />
				<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
					<h4 className='font-bold text-lg'>{Localize('COHESIVE_MUSIC')}</h4>
				</div>
			</div>
			<div className='animate-translateRight'>
				<h4 className='text-3xl font-bold'>{Localize('RESET_PASS')}</h4>
				<p className='text-xs pt-2'>{Localize('RESET_PASS_DES')} </p>
			</div>
			<div className='animate-translateRight'>
				<Form
					onSubmit={props.onSubmit}
					validator={{
						password: string().required(),
					}}
					render={({ formState }) => {
						return (
							<div className='flex flex-col gap-4'>
								<InputPassword label='PASSWORD' />
								<div className='pt-6 w-full'>
									<Button disabled={!formState.isValid} text='CONFIRM' />
								</div>
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default ResetMobile;
