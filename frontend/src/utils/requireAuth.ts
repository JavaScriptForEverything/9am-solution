import { redirect } from "react-router-dom"


export function requireAuth() {
	const storedAuth = localStorage.getItem('authDataString')
	const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null

  const authToken = parsedAuth?.authToken || ''

	
  if (!authToken) {
    throw redirect('/login')
    // throw redirect(`/login?storedAuth=${storedAuth}`)
  }
  return null

  // if (!authToken) {
	// 	const url = new URL(location.href)
	// 	const searchParams = new URLSearchParams(url.searchParams)
	// 	const storedAuth = searchParams.get('storedAuth')

	// 	console.log(storedAuth)


	// 	if(storedAuth) {
	// 		localStorage.setItem('authDataString', storedAuth)
	// 		console.log(storedAuth)

	// 	} else {

	// 		throw redirect(`/login`)
	// 		return storedAuth
	// 	}
  // }

  // return null
}





