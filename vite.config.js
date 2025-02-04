import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const base = env.GITHUB_ACTIONS ? '/web-portfolio-react/' : './';

	return {
		base,
		server: {
			port: 5173,
			strictPort: true,
			watch: {
				usePolling: true
			},
			host: true,
			middleware: [
				(req, res, next) => {
					if (!req.url.includes('.') && req.url !== '/' && !req.url.startsWith('/web-portfolio-react/')) {
						res.statusCode = 404;
					}
					next();
				}
			]
		},
		plugins: [
			react()
		],
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			chunkSizeWarningLimit: 1000
		}
	};
});
