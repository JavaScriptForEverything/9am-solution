export const { 
	SESSION_SECRET,  
	NODE_ENV, 
	PORT,

	SERVER_ORIGIN,
	CLIENT_ORIGIN,

	MONGO_URI,
	DB_MOUNTED_PORT,

	JWT_AUTH_TOKEN_SECRET,
	JWT_EXPIRES_IN,

} = process.env || {}


// mongoose transform option: 	used in utils/customTransform()
export const server = {
	origin: SERVER_ORIGIN || 'http://localhost:5000'
}
export const client = {
	origin: NODE_ENV === 'production' ? SERVER_ORIGIN : CLIENT_ORIGIN 
}




export const DB = {
	HOST_PORT: PORT,
	MOUNTED_PORT: DB_MOUNTED_PORT,
}

