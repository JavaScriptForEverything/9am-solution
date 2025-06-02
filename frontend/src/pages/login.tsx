import { useNavigate } from 'react-router-dom'
import { Button, Input, Switch } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { LoadingIcon } from '@/icons'
import { isFormValid } from '@/lib/utils'
import { useState, useEffect } from 'react'
import * as layoutReducer from '@/store/layoutReducer'
import * as userReducer from '@/store/userReducer'

const formFields = {
	username: { label: 'Your Username', placeholder: 'robitops10', type: 'text', helperText: '' },
	password: { label: 'Your Password', placeholder: '********', type: 'password', helperText: '' },
}

type FormFields = {
  username: string
  password: string
	// isRemembered: boolean
}

const initialFields = {
  username: '',
  password: '',
}

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { error, loading, status, message, isRemembered, isAuthenticated } = useAppSelector( state => state.user)

	const [ fields, setFields] = useState<FormFields>(initialFields)
	const [ fieldsError, setFieldsError] = useState<FormFields>(initialFields)
	const [ isChecked, setIsChecked ] = useState(isRemembered)

	useEffect(() => {
		if(isAuthenticated) navigate('/dashboard')
	},[isAuthenticated])


	useEffect(() => {
		if(error) {
			dispatch(layoutReducer.setIsOpenSnackbar(true, {
				severity: 'error',
				title: 'Error',
				message: error,
				autoClose: true,
			}))
		}
	},[error])

	useEffect(() => {
		if(status === 'created') {
			dispatch(layoutReducer.setIsOpenSnackbar(true, {
				severity: 'success',
				title: 'Login',
				message: 'your Login successfull!!!',
				autoClose: true,
			}))

		}
	},[status, message])

	const changeHandler = (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFields({ ...fields, [name]: evt.target.value })
	}


	const switchChangeHandler = (checked: boolean) => {
		setIsChecked(checked)
	}


	const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		if(!isFormValid(fields, setFieldsError)) return


    const data = {
      ...fields,
			isRemembered: isChecked
    }
		// console.log(data)

		dispatch(userReducer.loginUser(data))
	}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-full ">
      <div className=" flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex-col md:flex-row">

        {/* Left Panel */}
        <div className="hidden md:block relative md:w-1/2 w-full p-8 text-white bg-[url(/assets/login-bg.jpg)] bg-no-repeat ">
          <div className="text-black mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome To Our <br />Wonderful Digital World
            </h1>
            <p className="text-base">Login to 9AM-Solution</p>
          </div>

          <div className="px-8 ">
            <img
              src="/assets/login-person.png"
              alt="Login Visual"
              className="w-full"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-8  flex flex-col justify-center">
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900"> 9AM-Solution Ltd.  </h1>
            <p className="text-gray-700 mt-1">Welcome to join our family!</p>
          </div>

          <form onSubmit={submitHandler} className="w-full max-w-md">

						{Object.entries(formFields).map(([key, {label, type, placeholder, helperText }]) => (
							<div className="mb-4" key={key}>
								<label className="block mb-1 text-sm font-bold text-gray-700">
									{label}
								</label>
								<Input
									type={type}
									placeholder={placeholder}
									value={fields[key as keyof FormFields]} 		// Don't set value on files, which throw error
									onChange={changeHandler(key)}
								/>
								{fieldsError[key as keyof FormFields] && (
									<span className='text-red-500'>{fieldsError[key as keyof FormFields]}</span>
								)}
								{fieldsError[key as keyof FormFields] && (
									<span className='text-red-500'>{helperText}</span>
								)}
							</div>
						))}

            <div className="mb-6 flex items-center gap-2">
							<Switch checked={isChecked} onChange={switchChangeHandler} />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>

						<Button disabled={loading} type='submit' className='w-full'>
							{loading ? (
								<LoadingIcon />
							) : (
								<>
									Login
								</>
							)}
						</Button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

