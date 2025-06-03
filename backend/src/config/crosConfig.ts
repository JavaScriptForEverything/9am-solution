import 'dotenv/config'
import { NODE_ENV } from '@/config/config'

// List of allowed origins
export const allowedOrigins = [

	'http://localhost:3000', 												// => Nextjs Frontend
	'http://localhost:5173', 												// => Vite React

  /\.localhost:5173$/, 														// Allow all subdomains of localhost:5173

	'http://mydomain.com:5173', 										// => DNS
	'http://mydomain.com', 													// => DNS Nginx
]


export const prodCorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add the methods you need to allow
  credentials: true,
}

const devCorsOptions = { 																								// <= fetch(`${backendOrigin}/auth/login`, { credentials: 'include' })
	// origin:  '*', 					// => all all origins
	// origin:  true, 				// => if request comes from abc then response header will be abc
	origin: allowedOrigins, 	// => array of allowed origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add the methods you need to allow
	credentials: true
}	

export const corsOptions = NODE_ENV === 'production' ? prodCorsOptions : devCorsOptions