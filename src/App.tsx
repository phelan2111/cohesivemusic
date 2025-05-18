/** @format */

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import router from './routes';
import LoaderScreen from './components/ui/loader/screen';
import ModalProvider from './contexts/modal';
import ToastProvider from './contexts/toast';

function App() {
	return (
		<Provider store={store}>
			<ModalProvider>
				<ToastProvider>
					<Suspense fallback={<LoaderScreen />}>
						<RouterProvider
							router={router}
							fallbackElement={<>Not Founds Page</>}
						/>
					</Suspense>
				</ToastProvider>
			</ModalProvider>
		</Provider>
	);
}

export default App;
