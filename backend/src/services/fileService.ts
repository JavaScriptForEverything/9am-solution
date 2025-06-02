import path from 'node:path'
import crypto from 'node:crypto'
import fsPromises from 'node:fs/promises'
import fs from 'node:fs'
import { appError } from '@/controllers/errorController'
import { getDataUrlSize, saveBase64ToFile } from '@/lib/utils'
import { FileUploadReaturn, Image, SEOData } from '@/types/common'
// const { Buffer } = require('node:buffer')
// const { appError } = require('../controllers/errorController');
// const Jimp = require('jimp')

const baseDir = '/upload'

const maxImageSize = 5 * 1024 * 1024; // 5MB
// const baseDir = 'public/uploads'; // Base directory for uploads



/*---------------[ upload file ]----------------
*/

export const handleBase64File = async (dataUrl: string, subDir='/users', seo: SEOData, _fileType='image', ): Promise<FileUploadReaturn> => {
	try {
		if(!dataUrl || typeof dataUrl !== 'string' ) return { error: 'dataUrl is empty or not string', image: null }
		if( !dataUrl?.startsWith('data') ) return { error: `'${dataUrl}' is not valid dataUrl`, image: null  }


		// Step-1: seperate metadata from base64 string dataUrl 
		const [ metadata, base64 ] = dataUrl.split(';base64,')

		const mimetype = metadata.split(':').pop()!
		const [ _type, ext] = mimetype.split('/')

		if( !ext || !base64) return { error: `please upload image as base64 bit data url`, image: null  }

		// // Step-2: allow file: image(default), pdf, ...
		// if(type !== fileType) return { error: `file type: ${fileType} not valid file type` }

		const destination = path.join(process.cwd(), baseDir, subDir)
		await fsPromises.mkdir(destination, { recursive: true })

		// Step-3: Generate unique filename for file
		const filename = crypto.randomUUID() + '.' + ext
		const filePath = path.join(destination, filename)

		// const buffer = Buffer.from(base64, 'base64')
		// await fsPromises.writeFile(filePath, buffer) 				// Without resize
		await saveBase64ToFile(base64, filePath)


		return {
			error: '',
			image: {
				public_id: crypto.randomUUID(),
				secure_url: path.join(baseDir, subDir, filename),
				...seo,
			}
		}

	} catch (err) {
		if(err instanceof Error) throw appError(err.message)
		if(typeof err === 'string' ) throw appError(err)
		// if(err instanceof Error) return { error: err.message, image: null }
		// if(typeof err === 'string' ) return { error: err, image: null }
	}


	return { error: 'Unknown', image: null }
}




// Main upload function (handles both URLs and data URLs)
export const uploadFile = async (url: string, uploadTo: string, seo: SEOData = {}): Promise<FileUploadReaturn> => {
  try {
    if (!url?.trim()) return { error: 'URL is empty', image: null };
    

    // Handle HTTP URLs
    if (url.startsWith('http')) {
      return {
        error: '',
        image: { public_id: crypto.randomUUID(), secure_url: url, ...seo, }
      }
    }

    // Handle Data URLs
    if (url.startsWith('data:')) {
      const imageSize = getDataUrlSize(url)
      if (imageSize > maxImageSize) return { error: `Image exceeds maximum size of ${maxImageSize / 1024 / 1024}MB`, image: null }
      

      const { error, image } = await handleBase64File(url, uploadTo, seo)
			
      if (error || !image) {
        if (image?.secure_url) await removeFile(image.secure_url)
        
        return { error: error || 'Image upload failed', image: null }
      }

      return { error: '', image }
    }

    return { error: 'Unsupported URL format', image: null }
  } catch (err) {
    console.error('Upload error:', err)
    return { error: err instanceof Error ? err.message : 'Unknown upload error', image: null }
  }
}












export const removeFile = (relativePath: string) => {
	if(typeof relativePath !== 'string') return appError(`file path must be string, but got '${relativePath}'`)
	if(relativePath.startsWith('http'))  return

	const filePath = path.join( process.cwd(), relativePath )

	if( fs.existsSync(filePath) ) {
		fs.unlink(filePath, (err) => {
			if(err) return appError(err.message)
		})
	}
}






/**
	copyFile(product.coverPhoto.secure_url, '/upload/orders') 
*/
export const copyFile = (sourcePath: string, targetDir: string): string => {
	if (typeof sourcePath !== 'string') return (`file path must be string, but got '${sourcePath}'`)
	if (sourcePath.startsWith('http')) return 'no need to copy'


	const [, ext] = path.basename(sourcePath).split('.')
	const filename = crypto.randomUUID() + '.' + ext
	const destinationPath = path.join(targetDir, filename)

	const sourceFilePath = path.join(process.cwd(), sourcePath)
	const targetFilePath = path.join(process.cwd(), destinationPath)

	if (!fs.existsSync(sourceFilePath)) return (`Source file not found: ${sourcePath}`)

	if (!fs.existsSync(path.dirname(targetFilePath))) {
		fs.mkdirSync(path.dirname(targetFilePath), { recursive: true })
	}

	fs.copyFile(sourceFilePath, targetFilePath, (err) => {
		if (err) return (`Error copying file: ${err.message}`)
	})

	return destinationPath
}

export const copyImage = ({ secure_url, public_id }: Image, outDir='orders'): Image => {
	return {
		public_id,
		secure_url: copyFile(secure_url, outDir)
	}
}