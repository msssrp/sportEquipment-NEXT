"use client"
export default function getSession() {

  const userString = localStorage.getItem("user")
  if (!userString) {
    return false
  }

  const user = JSON.parse(userString)

  if (!user) {
    return false
  }
  if (!user.roles || !user.roles.some((role: any) => role === 'admin')) {
    return "notAdmin"
  }


  return true
}
