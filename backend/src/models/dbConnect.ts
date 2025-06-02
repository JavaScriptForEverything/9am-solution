import 'dotenv/config'
import { logger } from '@/lib/logger'
import { connect, connection } from 'mongoose'
import { MONGO_URI } from '@/config/config'



export const dbConnect = async () => {
	try {
		// const DATABASE_URL = process.env.MONGO_URI
		const DATABASE_URL = MONGO_URI

		if(!DATABASE_URL ) throw new Error(`Database Connection Error: => DATABASE_URL: ${DATABASE_URL}`)

		if(connection.readyState >= 1) return
		const conn = await connect(DATABASE_URL)	
		// const { host, port, name } = conn.connection
		// logger.info(`---- Database connected to : [${host}:${port}/${name}]----` )

	} catch (err: unknown) {
		if( err instanceof Error) return logger.error(`database connection failed: ${err.message}`)
		logger.error(err)
	}
}

