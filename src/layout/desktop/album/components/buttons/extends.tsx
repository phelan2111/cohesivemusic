import Popover from '@/components/root/popper';
import Localize from '@/langs';
import { BiSolidCopy } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { GiLoveSong, GiPlagueDoctorProfile } from 'react-icons/gi';
import { IoRadioOutline } from 'react-icons/io5';

function Extends() {
	return (
		<Popover
		bottom='10px'
			className='text-primary_dark rounded-sm right-44'
			renderChildren={() => (
				<div>
					<BsThreeDots className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer' />
				</div>
			)}
			renderContent={() => {
				return (
					<div className='bg-primary_dark-20 px-2 py-2 rounded-lg flex flex-col w-52 text-white'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-2 hover:bg-primary_dark-10 transition-all duration-500 px-2 rounded-md'>
								<IoRadioOutline />
								<p className='text-sm py-2 '>{Localize('GO_TO_RADIO_SONG')}</p>
							</div>
							<div className='flex items-center gap-2 hover:bg-primary_dark-10 transition-all duration-500 px-2 rounded-md'>
								<GiPlagueDoctorProfile />
								<p className='text-sm py-2'>{Localize('GO_TO_ARTIST')}</p>
							</div>
							<div className='flex items-center gap-2 hover:bg-primary_dark-10 transition-all duration-500 px-2 rounded-md'>
								<GiLoveSong />
								<p className='text-sm py-2 '>{Localize('VIEW_CREDITS')}</p>
							</div>
							<div className='flex items-center gap-2 hover:bg-primary_dark-10 transition-all duration-500 px-2 rounded-md'>
								<BiSolidCopy />
								<p className='text-sm py-2'>{Localize('COPY_LINK_TO_SONG')}</p>
							</div>
						</div>
					</div>
				);
			}}
		/>
	);
}

export default Extends;
