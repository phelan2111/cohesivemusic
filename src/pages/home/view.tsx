import ScreenResponsive from '@/components/ui/responsive/screen';
import HomeDesktop from '@/layout/desktop/home';
import HomeMobile from '@/layout/mobile/home';
import { ResponseSingerNewest, ResponseYourTopMixes } from './types';

interface IViewProps {
	yourTopMixes: ResponseYourTopMixes;
	singersNewest: ResponseSingerNewest;
	handler: {
		onRedirect: (path: string) => void;
	};
}

function View(props: IViewProps) {
	return <ScreenResponsive mobile={() => <HomeMobile />} desktop={() => <HomeDesktop {...props} />} />;
}

export default View;
