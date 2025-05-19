import { useRedirect } from '@/hooks/useRedirect';
import AuthService from '@/utils/auth';
import { Helper } from '@/utils/helper';
import { Fragment, ReactNode, useEffect } from 'react';
import { PATH } from './config';

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

	return <Fragment>{props.children}</Fragment>;
}

export default PrivateRoute;
