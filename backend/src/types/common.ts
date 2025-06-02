import type { NextFunction, Request, RequestHandler, Response } from 'express'


export type AsyncRequestHandler = ( req: Request, res: Response, next: NextFunction) => Promise<void>



export type RestrictTo = (...roles: string[]) => RequestHandler


export type ErrorStatus = 'error' | 'failed' | 'AuthError' | 'PermissionDenied'
export interface MyError<Status extends string = ErrorStatus> extends Error {
  message: string
  statusCode: number
  status: Status
}

export type ResponseStatus = 'success' | 'fialed' | 'error'
export interface ResponseData<Data = any> {
	status: ResponseStatus
	message?: string, 		// if status === 'success' then message is success message, else error message
	data?: Data,

	count?: number
	total?: number
	limit?: number
}

// export interface Image {
// 	public_id: string
// 	secure_url: string
// }

export interface SEOData {
  alt?: string;
  title?: string;
  caption?: string;
  description?: string;
}
export interface Image extends SEOData {
	public_id: string
	secure_url: string
}
export interface FileUploadReaturn {
	error: string
	image: Image | null
}
