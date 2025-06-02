import { promisify } from 'util'
import { pipeline, Readable } from 'stream'
import { createWriteStream } from 'fs'



const streamPipeline = promisify( pipeline )

export const saveBase64ToFile = async (dataUrl: string, filePath: string): Promise<void> => {
  const base64 = dataUrl.replace(/^data:.+;base64,/, '')

	// // Method-1:
	// const buffer = Buffer.from(base64, 'base64') 			// store image into buffer
	// await fsPromises.writeFile(filePath, buffer) 			// then write at once

	// Method-2: 																					// write chunk by chunk
  const bufferStream = Readable.from(Buffer.from(base64, 'base64'))
  await streamPipeline(bufferStream, createWriteStream(filePath))
}




export const getDataUrlSize = (dataUrl: string) => {
	if( !dataUrl?.startsWith('data') ) throw new Error(`'${dataUrl}' is not valid dataUrl`) 
	
	const base64 = dataUrl.split(';base64,').pop()
	if(!base64) throw new Error(`base64: ${base64} is empty`)

	const buffer = Buffer.from(base64, 'base64')
	return buffer.byteLength
}