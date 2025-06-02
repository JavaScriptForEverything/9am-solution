export type ResponseStatus = 'created' | 'updated' | 'deleted' | 'none'
export interface ResponseData<Data = unknown> {
	status: ResponseStatus
	count?: number
	total?: number
	data?: Data,
	message?: string
	error?: string
}


export type TempObj = {
	[key: string]: string
}



interface SEOData {
  alt?: string;
  title?: string;
  caption?: string;
  description?: string;
}
export interface Image extends SEOData {
	public_id: string
	secure_url: string
}

export type Status = 'active' | 'inactive'
export type Currency = string

export interface Address {
  street: string
	city: string
	state: string
	postCode: number
	country: string
}


export type	Gender = 'male' | 'female' | null
export type Role = 'vendor' | 'user' | 'admin' 
// export type Role = (typeof Roles)[keyof typeof Roles] 						// => type Role = "vendor" | "user" | "admin"
// const roles = Object.values(Roles) 														// => [ 'vendor', 'user', 'admin' ]



// export type ColorItem = {
//   color: string
//   price: number
// }


export interface ListObject {
	label: string
	Icon: React.ComponentType<any>
	path: string
}

