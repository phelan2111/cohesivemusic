/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),

			routes: `${path.resolve(__dirname, './src/routes/')}`,

			services: `${path.resolve(__dirname, './src/services/')}`,

			assets: `${path.resolve(__dirname, './src/assets/')}`,

			hook: `${path.resolve(__dirname, './src/hooks/')}`,

			context: `${path.resolve(__dirname, './src/context/')}`,

			styles: `${path.resolve(__dirname, './src/styles/')}`,

			utils: `${path.resolve(__dirname, './src/utils/')}`,

			pages: `${path.resolve(__dirname, './src/pages/')}`,

			ui: `${path.resolve(__dirname, './src/ui/')}`,
		},
	},
	build: {
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo: any) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					}
					return `assets/${extType}/[name]-[hash][extname]`;
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
			},
		},
	},
	server: {
		open: true,
		port: 8000,
		host: true,
	},
});
