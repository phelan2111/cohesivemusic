import Button from '@/components/root/button';
import LogoComponent from '@/components/ui/common/logo';
import Localize from '@/langs';

type ForgotSuccessProps = {
	onClose: VoidFunction;
};
function ForgotSuccess(props: ForgotSuccessProps) {
	return (
		<div className='bg-white/20 rounded-md px-4 py-8 flex flex-col gap-10 justify-center items-center'>
			<div className='m-auto'>
				<LogoComponent />
			</div>
			<div className='text-center flex flex-col gap-2'>
				<p className='text-2xl font-semibold'>{Localize('FORGOT_PASS_SUCCESS')}</p>
				<p className='text-base max-w-96'>{Localize('FORGOT_PASS_SUCCESS_DES')}</p>
			</div>
			<div className='px-4 w-full'>
				<Button onClick={props.onClose}>{Localize('GOT_IT')}</Button>
			</div>
		</div>
	);
}

export default ForgotSuccess;
