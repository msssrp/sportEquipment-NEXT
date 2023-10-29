"use client"
import { useAuthContext } from "@/hooks/authContext"
export default function getSession() {

  const { user } = useAuthContext()

  if (!user) {
    return false
  } else if (!user.roles) {
    return false
  } else if (!user.roles.some((role: any) => role === 'admin')) {
    return "notAdmin"
  } else {
    return true
  }
}
