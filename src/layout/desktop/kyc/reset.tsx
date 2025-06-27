import Button from '@/components/root/button';
import Form from '@/components/root/form';
import LogoComponent from '@/components/ui/common/logo';
import InputPassword from '@/components/ui/input/password';
import Localize from '@/langs';
import { FormDataReset } from '@/pages/kyc/reset/types';
import { string } from 'yup';

type ResetDesktopProps = {
	onSubmit: (dataItem: FormDataReset) => void;
};

function ResetDesktop(props: ResetDesktopProps) {
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge animate-translateRight'>
				<article className='flex flex-col gap-10 w-full'>
					<div className='m-auto'>
						<LogoComponent />
					</div>
					<div className='flex flex-col gap-1'>
						<h4 className='text-xl uppercase font-semibold'>{Localize('RESET_PASS')}</h4>
						<p className='text-sm'>{Localize('RESET_PASS_DES')}</p>
					</div>
					<div>
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
											<Button disabled={!formState.isValid} type='submit' text='CONFIRM' />
										</div>
									</div>
								);
							}}
						/>
					</div>
				</article>
			</div>
		</div>
	);
}

export default ResetDesktop;
