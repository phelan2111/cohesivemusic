import LogoComponent from '@/components/ui/common/logo';
import Button from '@/components/root/button';
import Form from '@/components/root/form';
import TextField from '@/components/root/inputs/textField';
import Localize from '@/langs';
import InputPassword from '@/components/ui/input/password';
import { FormDataInformation } from '@/pages/kyc/signUp/types';
import { string } from 'yup';

interface IInformationSignUpDesktopProps {
	onSubmit: (dataForm: FormDataInformation) => void;
}

function InformationSignUpDesktop(props: IInformationSignUpDesktopProps) {
	return (
		<div className='hidden lg:flex m-auto p-6 relative z-10 w-full h-full'>
			<div className='flex flex-col bg-white/30 p-6 rounded-2xl backdrop-blur m-auto gap-6 max-w-96 w-full shadow-bootstrapLarge select-none'>
				<div className='flex justify-center flex-col items-center'>
					<LogoComponent />
					<div className='mt-2 px-2 py-2 rounded-sm text-center w-full'>
						<h4 className='font-bold text-lg'>
							{Localize('COHESIVE_MUSIC')}
						</h4>
					</div>
				</div>
				<div>
					<h4 className='text-3xl font-bold'>
						{Localize('CREATE_PROFILE')}
					</h4>
					<p className='text-xs pt-2'>
						{Localize('LET_GET_STARTED')}
					</p>
				</div>
				<Form
					validator={{
						firstName: string().required(),
						lastName: string().required(),
						password: string().required(),
					}}
					onSubmit={props.onSubmit}
					render={({ formState }) => {
						return (
							<div className='flex flex-col gap-12'>
								<div className='flex flex-col gap-6'>
									<TextField name='firstName' label='FIRST_NAME' />
									<TextField name='lastName' label='LAST_NAME' />
									<InputPassword label='PASSWORD' />
								</div>
								<div className='pt-[26px] w-full'>
									<Button type='submit' disabled={!formState.isValid} text='GET_START' />
								</div>
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default InformationSignUpDesktop;
