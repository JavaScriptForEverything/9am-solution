
POST {{origin}}/api/auth/register
POST {{origin}}/api/auth/login
POST {{origin}}/api/auth/logout



GET {{origin}}/api/users
GET {{origin}}/api/users/:userId



## HTTPS

#### Step-1: Configure `https` instead of `http`

$ yarn install -D mkcert

```
/package.json
	...
  "scripts": {
    "build": "tsc",
    "dev1": "nodemon src/server.ts",
    "dev": "nodemon --exec ts-node --transpile-only src/server.ts",
    "start": "node .",

		"create-ca": "mkcert create-ca",
		"create-cert": "mkcert create-cert" 			
  },
	...
```

$ yarn create-cert

$ mkdir src/cert
$ mv cert.key cert.crt src/cert



```
/src/server.ts
...
import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'

...
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'cert/cert.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.crt')),
}
const httpsServer = https.createServer(options, app)

const server = httpsServer.listen(PORT, async () => {
	await dbConnect() 		// also add dotenv.config()
	appLogs(app, PORT, 'https')
})
...
```

```
$ yarn dev

(browser) 	: https://localhost:5000 				# `https` instead of http
```


#### Step-2: Trust in Browser: (For Firefox):

```
. Preferences -> Privacy & Security -> View Certificates
. Choose (Authorities) Tab > import > ca.crt
```