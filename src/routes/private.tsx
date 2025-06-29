import { useRedirect } from '@/hooks/useRedirect';
import AuthService from '@/utils/auth';
import { Helper } from '@/utils/helper';
import { Fragment, ReactNode, useEffect } from 'react';
import { PATH } from './config';
import LoaderScreen from '@/components/ui/loader/screen';

type PrivateRouteProps = {
	children: ReactNode;
};

function PrivateRoute(props: PrivateRouteProps) {
	const auth = AuthService.getPackageAuth();
	const { redirectPage } = useRedirect();

	useEffect(() => {
		if (Helper.isEmpty(auth?.token)) {
			redirectPage(PATH.KYC.SIGN_IN);
		}
	}, [auth, redirectPage]);

	return <Fragment>{!Helper.isEmpty(auth?.token) ? props.children : <LoaderScreen />}</Fragment>;
}

export default PrivateRoute;
