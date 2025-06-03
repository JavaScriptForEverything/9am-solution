
## Project Demo

```
github 	: https://github.com/JavaScriptForEverything/9am-solution.git
demo 		: http://157.173.218.4:5173/
API 		: http://157.173.218.4:5000/api/users
```



### Backend
```
$ sudo systemctl start mongod
$ sudo systemctl start docker docker.socket

$ cd clone https://github.com/JavaScriptForEverything/9am-solution.git
$ cd backend
$ mv .env.example .env
$ docker compose up -d
$ docker compose logs -f backend_svc

(browser) : http://localhost:5000 								: => backend API
```


### Frontend
```
$ cd frontend
$ install
$ mv .env.example .env

$ yarn dev

$ yarn build
$ yarn preview

(browser) : http://localhost:5173 								: => frontend
```





### Resolve Cros-site Origin by Nginx Reverse Proxy

- Step-1: 

```
$ sudo vim /etc/hosts 

			127.0.0.1 	mydomain.com 							(1) : for dummy subdommain, skip if you have read one
```


Step-2: 
```
$ vim /frontend/vite.config.ts

	import { defineConfig } from 'vite'
	import react from '@vitejs/plugin-react'
	import tailwindcss from '@tailwindcss/vite'
	import { resolve } from 'path'

	export default defineConfig({
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'), 		
			},
		},

		server: {
			host: '0.0.0.0',
			port: 5173,
			
			allowedHosts: [
				'mydomain.com', 									(2) : Add your custom host here
			],
		},
		preview: {
			host: '0.0.0.0',
			port: 5173, 														: Port for preview server

			allowedHosts: [
				'mydomain.com', 									(2)	: Add your custom host here
			],
		},

	})
```




Step-3: 
```
$ vim /server/src/config/crossCofnig.ts

	export const allowedOrigins = [

		'http://localhost:3000', 									// => Nextjs Frontend
		'http://localhost:5173', 									// => Vite React

		/\.localhost:5173$/, 											// Allow all subdomains of localhost:5173

		'http://mydomain.com:5173', 					(3)	: => DNS
		'http://mydomain.com', 								(3)	: => DNS Nginx
	]
```


Step-4: 
```
$ vim /backend/.env
	...
	SERVER_ORIGIN='http://mydomain.com:5000' 
	CLIENT_ORIGIN='http://mydomain.com:5173'
	...

$ vim /frontend/.env
	VITE_APP_ORIGIN=http://mydomain.com
```




Step-5:  	Configure Nginx:
```
$ sudo apt install nginx -y
$ sudo vim /etc/nginx/nginx.conf
		...

$ sudo nginx -t
$ sudo systemctl restart nginx
```


(browser) : http://localhost:5000 								: => backend API
(browser) : http://localhost:5173 								: => frontend

(browser) : http://mydomain.com:80  							: => frontend
(browser) : http://mydomain.com   								: => frontend
(browser) : http://mydomain.com/api  							: => backend

(browser) : http://shop1.mydomain.com/ 						: => frontend subdomain shop1


NB:
	*Dynamic Subdomain not works*, I need a help from someone who knows how.