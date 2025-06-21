import { useState } from 'react';
import OTPInput from 'react-otp-input';
import Button from '../button';
import { useFormContext } from 'react-hook-form';
import Localize from '@/langs';
import CountdownTimer from '@/hooks/useCountdown';
import { Helper } from '@/utils/helper';

interface IInputOTPProps {
	numInputs?: number;
	defaultValue?: string;
	name?: string;
	onSubmit?: (dataItem: string) => void;
	onResend?: VoidFunction;
}

function InputOTP({ defaultValue = '', numInputs = 6, name = 'otp', ...props }: IInputOTPProps) {
	const form = useFormContext();
	const [otp, setOtp] = useState<string>(defaultValue);
	const { state } = CountdownTimer({ minutes: 2 });

	const handleSubmit = () => {
		props.onSubmit?.(otp);
		form?.setValue(name, otp, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	return (
		<div className='flex flex-col gap-12'>
			<OTPInput
				value={otp}
				onChange={setOtp}
				numInputs={numInputs}
				containerStyle={{
					justifyContent: 'space-between',
				}}
				renderInput={(props) => (
					<input
						{...props}
						className='!w-12 !h-12 rounded-sm outline-none text-primary_dark text-lg focus:shadow-white shadow-bootstrapLarge'
					/>
				)}
				{...props}
			/>
			<p className='text-xs'>
				{Localize('DONT_RECEIVE_OTP')}:{' '}
				<span
					aria-hidden
					onClick={props.onResend}
					style={{
						opacity: Helper.isEmpty(state.time) ? '1' : '0.5',
						pointerEvents: Helper.isEmpty(state.time) ? 'auto' : 'none',
					}}
					className='underline'>
					{' '}
					{Localize('RESEND_OTP')}
				</span>{' '}
				{!Helper.isEmpty(state.time) && '- '}
				{state.time}
			</p>
			<div className='pt-[26px] w-full'>
				<Button disabled={!(otp.length === numInputs)} type='submit' onClick={handleSubmit} text='VERIFY' />
			</div>
		</div>
	);
}

export default InputOTP;
