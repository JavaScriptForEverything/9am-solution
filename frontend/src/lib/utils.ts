import { TempObj } from '@/types/common'
import type { AppDispatch, RootState } from '@/store'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { isEmail } from 'validator'












/*
	const changeHandler = (name: string) => async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files
    if (!files || files.length === 0) return setFields({ ...fields, [name]: evt.target.value })

    const images = await Promise.all(Array.from(files).map(file => readAsDataURL(file)))
    setFields({ ...fields, [name]: evt.target.multiple ? images : images[0] })
	}

	const selectOrTextAreaChangeHandler = (name: string) => async (evt: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
		setFields({ ...fields, [name]: evt.target.value })
	}


*/












export const readAsDataURL = (file: File, { type='image' } = {}): Promise<string> => {
	return new Promise((resolve, reject) => {

		if(type === 'image') {
			const isImage = file?.type.match('image/*')
			if(!isImage) return reject(new Error('Please select an image') )
		}

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.addEventListener('load', () => {
			if(reader.readyState === 2) {
				if(typeof reader.result === 'string') resolve(reader.result)
			}
		})
		reader.addEventListener('error', reject)
	})
}


// if(!isDataURL(data.logo)) delete data.logo
export const isDataURL = (url: unknown): boolean  => {
	if (typeof url !== "string") return false;
	// const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
	const dataUrlPattern = /^data:/
	return dataUrlPattern.test(url)
}


//  new Date().toLocaleDateString()  			// => 04/28/2025 	: ?
//  new Date().toISOString()  						// => 2025-04-28 	: Mongodb Database Format
export const formatToDate = (date: string|undefined) => date?.split("T")[0]  || ''


/* ISO Date: 2025-04-28T11:00:17.409Z 		=> April 28, 2025 

	let isoDate = new Date().toISOString() 						: => 
	    isoDate = "2025-04-28T11:00:17.409Z"; 				: => Comes from MongoDB
	const formattedDate = formatISODate(isoDate);
*/
export const formatISODate = (isoDate: string): string => {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) throw new Error("Invalid ISO date string")
  

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}




/**
 * Formats a date object into a YYYY-MM-DD string.
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string (YYYY-MM-DD).
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0')  			// Add leading zero
  const day = String(date.getDate()).padStart(2, '0')  							// Add leading zero
  return `${year}-${month}-${day}` 
}



// Method-3: 
type AsyncThunkFunction = ( dispatch: AppDispatch, getState: () => RootState) => Promise<void>
type SetError = ActionCreatorWithPayload<string>

export const catchAsyncDispatch = ( fn: AsyncThunkFunction, setError: SetError) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
  try {
    return await fn(dispatch, getState);
  } catch (err) {
    if (err instanceof Error) dispatch(setError(err.message));
    else if (typeof err === 'string') dispatch(setError(err));
    else dispatch(setError('An unknown error occurred.'));
  }
};










// export const isFormValid = (fields: FormFields, setFieldsError: React.Dispatch<React.SetStateAction<TempObj>>) => {
// 	const tempObj: TempObj = {}
// 	const { email, password, confirmPassword } = fields

// 	if( email && !isEmail(email) ) tempObj.email = 'Invalid Email Address'
// 	if( password.length < 8 ) tempObj.password = 'password must by atleast 8 character long'
// 	if( confirmPassword && confirmPassword !== password ) tempObj.confirmPassword = 'please type currect password'

// 	Object.keys(fields).forEach(field => {
// 		if(!fields[field as keyof FormFields]) tempObj[field] = `'${field}' is emapty`
// 	})
// 	setFieldsError(tempObj)

// 	return Object.values(tempObj).every( item => item == '' )
// }


/*

type FormFields = {
	name: string
	state?: string
	icon: string
	thumbnail?: string
	banner?: string
}

	const [ fields, setFields] = useState<Partial<FormFields>>({
		name: '',
		// isVisible: false, 				// boolean value not allowed
		icon: '',
	})
	const [ fieldsError, setFieldsError] = useState<Partial<FormFields>>({
		name: '',
		// isVisible: false,
		icon: '',
	})
*/

// export const isFormValid = <T extends Record<string, any>>(
//   fields: T,
//   setFieldsError: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>
// ): boolean => {
//   const tempObj: Partial<Record<keyof T, string>> = {};

//   // Extract email, password, and confirmPassword with type assertion
//   const { email, password, confirmPassword } = fields as {
//     email?: string;
//     password?: string;
//     confirmPassword?: string;
//   };

//   // Validate email if it exists
//   if (email !== undefined && email !== '' && !isEmail(email)) {
//     (tempObj as Record<string, string>).email = 'Invalid Email Address';
//   }

//   // Validate password if it exists
//   if (password !== undefined && password !== '' && password.length < 8) {
//     (tempObj as Record<string, string>).password = 'Password must be at least 8 characters long';
//   }

//   // Validate confirmPassword if it exists
//   if (confirmPassword !== undefined && confirmPassword !== '' && confirmPassword !== password) {
//     (tempObj as Record<string, string>).confirmPassword = 'Passwords do not match';
//   }

//   // Validate all fields for emptiness
//   Object.keys(fields).forEach((field) => {
//     if (fields[field as keyof T] === '') {
//       (tempObj as Record<string, string>)[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//     }
//   });

//   // Set the error state
//   setFieldsError(tempObj);

//   // Return whether the form is valid (i.e., no error messages)
//   return Object.keys(tempObj).length === 0;
// };


// Assuming TempObj and FormFields types are defined appropriately
export const isFormValid = ( fields: any, setFieldsError: React.Dispatch<React.SetStateAction<any>>): boolean => {
  const tempObj: TempObj = {}
  const { email, password, confirmPassword } = fields

  if (email && !isEmail(email)) tempObj.email = 'Invalid Email Address'
  if (password && password.length < 8) tempObj.password = 'Password must be at least 8 characters long'
  if (confirmPassword && confirmPassword !== password) tempObj.confirmPassword = 'Passwords do not match'

  // Validate all fields for emptiness
  Object.keys(fields).forEach(field => {
    if (fields[field] === '') {
      tempObj[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
    }
  })

  // Set the error state
  setFieldsError(tempObj)

  // Return whether the form is valid (i.e., no error messages)
  return Object.keys(tempObj).length === 0
}


/*
type FormFields = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  // Add other fields here
};
export const isFormValid = (
  fields: FormFields,
  setFieldsError: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormFields, string>>>>
): boolean => {
  const tempObj: Partial<Record<keyof FormFields, string>> = {};
  const { email, password, confirmPassword } = fields;

  // Validate email if it exists
  if (email !== undefined && email !== '' && !isEmail(email)) {
    tempObj.email = 'Invalid Email Address';
  }

  // Validate password if it exists
  if (password !== undefined && password !== '' && password.length < 8) {
    tempObj.password = 'Password must be at least 8 characters long';
  }

  // Validate confirmPassword if it exists
  if (confirmPassword !== undefined && confirmPassword !== '' && confirmPassword !== password) {
    tempObj.confirmPassword = 'Passwords do not match';
  }

  // Validate all fields for emptiness
  Object.keys(fields).forEach((field) => {
    if (fields[field as keyof FormFields] === '') {
      tempObj[field as keyof FormFields] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Set the error state
  setFieldsError(tempObj);

  // Return whether the form is valid (i.e., no error messages)
  return Object.keys(tempObj).length === 0;
};

*/






// // type Order = {
// //   products: Product[];
// //   shippingCharge: number;
// // };

// type Product = {
//   price: number
//   quantity: number
//   metadata: {
//     discount: number
//     vat: number
//     tax: number
//   }
// }
// export const calculateTotals = (products: Product[], shippingCharge: number) => {
//   const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
//   const totalDiscount = products.reduce(
//     (sum, product) => sum + product.metadata.discount * product.quantity,
//     0
//   )
//   const totalTax = products.reduce(
//     (sum, product) => sum + (product.metadata.vat + product.metadata.tax) * product.quantity,
//     0
//   )
//   const total = subtotal - totalDiscount
//   const grandTotal = total + totalTax + shippingCharge

//   return {
//     subtotal,
//     totalDiscount,
//     total,
//     totalTax,
//     grandTotal,
//   }
// }


/* Example usage

const shippingCharge = 50
const products: Product[] = [
  {
    price: 700,
    quantity: 2,
    metadata: { discount: 50, vat: 10, tax: 5 },
  },
  {
    price: 500,
    quantity: 1,
    metadata: { discount: 20, vat: 5, tax: 3 },
  },
]

console.log(calculateTotals(products, shippingCharge))
*/


export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}



// interface Product {
//   product: {
//     price: number;
//     discount: number;
//     vat: number;
//     tax: number;
//   };
//   quantity: number;
// }

// interface Order {
//   products: Product[];
//   discount: number;
//   shippingCharge: number;
// }

// interface CalculatedValues {
//   subtotal: number;
//   discount: number;
//   taxRate: number;
//   totalTax: number;
//   shipping: number;
//   grandTotal: number;
// }

// export const calculateOrderValues = (order: Order): CalculatedValues => {
//   // Calculate Subtotal
//   const subtotal = order.products.reduce((total, product) => {
//     return total + product.product.price * product.quantity;
//   }, 0);

//   // Use provided discount or calculate based on products
//   const discount = order.discount;

//   // Calculate Tax Rate (sum of VAT and Tax for all products)
//   const taxRate = order.products.reduce((total, product) => {
//     return total + (product.product.vat + product.product.tax) * product.quantity;
//   }, 0);

//   // Calculate Total Tax
//   const totalTax = (subtotal * taxRate) / 100;

//   // Use provided shipping charge
//   const shipping = order.shippingCharge;

//   // Calculate Grand Total
//   const grandTotal = subtotal - discount + totalTax + shipping;

//   return {
//     subtotal: parseFloat(subtotal.toFixed(2)),
//     discount: parseFloat(discount.toFixed(2)),
//     taxRate: parseFloat(taxRate.toFixed(2)),
//     totalTax: parseFloat(totalTax.toFixed(2)),
//     shipping: parseFloat(shipping.toFixed(2)),
//     grandTotal: parseFloat(grandTotal.toFixed(2)),
//   };
// }



// const maxLength = (str: string, length: 200 ) => {
// 	return str.length > length ? str.slice(0, length) + '...' : str	
// }