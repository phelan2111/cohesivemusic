import Button from '@/components/root/button';
import { useRedirect } from '@/hooks/useRedirect';
import Localize from '@/langs';
import { PATH } from '@/routes/config';
import { IoArrowBackSharp } from 'react-icons/io5';

function SettingMobile() {
	const { redirectPage } = useRedirect();
	const itemSettings = [
		{
			path: PATH.ADD_ACCOUNT,
			text: 'ACCOUNT',
		},
		{
			path: PATH.ADD_ACCOUNT,
			text: 'CONTENT_AND_DISPLAY',
		},
		{
			path: PATH.ADD_ACCOUNT,
			text: 'AUDIO_QUALITY',
		},
		{
			path: PATH.ADD_ACCOUNT,
			text: 'VIDEO_QUALITY',
		},
		{
			path: PATH.ADD_ACCOUNT,
			text: 'NOTIFICATIONS',
		},
		{
			path: PATH.ADD_ACCOUNT,
			text: 'ABOUT',
		},
	];
	return (
		<main className='h-screen w-screen lg:hidden block bg-primary_dark-20 text-white pb-40'>
			<header className='flex text-white relative w-full justify-center py-4 animate-translateBottom_duration_0dot8'>
				<h4 className='text-lg font-bold'>{Localize('SETTING')}</h4>
				<IoArrowBackSharp
					className='absolute left-4 top-5 text-xl'
					aria-hidden
					onClick={() => {
						redirectPage(PATH.HOME);
					}}
				/>
			</header>
			<section className='h-yourLibrary overflow-y-auto snap-mandatory snap-y animate-translateBottom_duration_0dot8'>
				{itemSettings.map((setting) => {
					return (
						<div
							className='p-4 text-sm'
							key={setting.text}
							aria-hidden
							onClick={() => {
								redirectPage(setting.path);
							}}>
							{Localize(setting.text)}
						</div>
					);
				})}
				<div className='p-4'>
					<Button>{Localize('LOG_OUT')}</Button>
				</div>
			</section>
		</main>
	);
}

export default SettingMobile;
