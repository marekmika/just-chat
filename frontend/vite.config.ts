import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
		// cors: {
		// 	origin: 'http://localhost:4000/graphql',
		// 	methods: '*',
		// },
		// origin: 'http://localhost:3000',
	},
	build: {
		target: 'esnext',
	},
});
