import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './config';
import { lazy } from 'react';
import BasicWrapper from '@/components/ui/wrapper/basic';
import AuthWrapper from '@/components/ui/wrapper/auth';
import ThemeColor from '@/components/root/themes/color';
const SignIn = lazy(() => import('@/pages/kyc/signIn'));
const SignUp = lazy(() => import('@/pages/kyc/signUp'));
const Home = lazy(() => import('@/pages/home'));
const Album = lazy(() => import('@/pages/album'));
const Podcasts = lazy(() => import('@/pages/podcasts/list'));
const PodcastsDetails = lazy(() => import('@/pages/podcasts/details'));
const Search = lazy(() => import('@/pages/search'));
const Music = lazy(() => import('@/pages/music'));
const Chart = lazy(() => import('@/pages/chart'));
const YourLibrary = lazy(() => import('@/pages/yourLibrary'));
const AddAccount = lazy(() => import('@/pages/addAccount'));
const WhatNews = lazy(() => import('@/pages/whatNews'));
const ListeningHistory = lazy(() => import('@/pages/listeningHistory'));
const Playlist = lazy(() => import('@/pages/playlist'));
const Setting = lazy(() => import('@/pages/setting'));
const Profile = lazy(() => import('@/pages/profile'));

const router = createBrowserRouter([
	{
		path: PATH.HOME,
		element: <ThemeColor />,
		children: [
			{
				path: PATH.KYC._,
				element: <AuthWrapper />,
				children: [
					{
						path: PATH.KYC.SIGN_IN,
						element: <SignIn />,
					},
					{
						path: PATH.KYC.SIGN_UP,
						element: <SignUp />,
					},
				],
			},
			{
				path: PATH.HOME,
				element: <BasicWrapper />,
				children: [
					{
						path: PATH.HOME,
						element: <Home />,
					},
					{
						path: PATH.YOUR_LIBRARY,
						element: <YourLibrary />,
					},
					{
						path: PATH.ALBUM.DETAILS,
						element: <Album />,
					},
					{
						path: PATH.PODCASTS._,
						element: <Podcasts />,
					},
					{
						path: PATH.PODCASTS.DETAILS,
						element: <PodcastsDetails />,
					},
					{
						path: PATH.SEARCH,
						element: <Search />,
					},
					{
						path: PATH.MUSIC._,
						element: <Music />,
					},
					{
						path: PATH.CHART.DETAILS,
						element: <Chart />,
					},
					{
						path: PATH.WHAT_NEWS,
						element: <WhatNews />,
					},
				],
			},
			{
				path: PATH.ADD_ACCOUNT,
				element: <AddAccount />,
			},

			{
				path: PATH.LISTENING_HISTORY._,
				element: <ListeningHistory />,
			},
			{
				path: PATH.PLAYLIST.DETAILS,
				element: <Playlist />,
			},

			{
				path: PATH.PROFILE,
				element: <Profile />,
			},
			{
				path: PATH.SETTING,
				element: <Setting />,
			},
		],
	},
]);

export default router;
