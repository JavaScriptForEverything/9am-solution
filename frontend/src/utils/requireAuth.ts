import { redirect } from "react-router-dom";


export function requireAuth() {
const storedAuth = localStorage.getItem('authDataString')
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null

  const authToken = parsedAuth?.authToken || ''


  if (!authToken) {
    throw redirect("/login")
  }
  return null;
}
