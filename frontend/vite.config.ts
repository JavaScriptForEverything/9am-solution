import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'), 		// Set the alias for src directory
		},
		// extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},

  // base: '/admin/', 					// Set the base path for your Vite app

  server: {
		host: '0.0.0.0',
    port: 5173,
		
    allowedHosts: [
      'mydomain.com', 		// Add your custom host here
    ],
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:5000', 	// Backend server URL
		// 		changeOrigin: true,
		// 	}
		// }
  },
	preview: {
    host: '0.0.0.0',
    port: 5173, 						// Port for preview server

    allowedHosts: [
      'mydomain.com', 		// Add your custom host here
    ],
  },

})
