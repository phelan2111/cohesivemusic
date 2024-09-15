/** @format */

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';
import LoaderScreen from './components/ui/loader/screen';
function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<LoaderScreen />}>
				<RouterProvider
					router={router}
					fallbackElement={<>Not Founds Page</>}
				/>
			</Suspense>
		</Provider>
	);
}

export default App;
