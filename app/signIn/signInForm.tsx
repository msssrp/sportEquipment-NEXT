"use client"
import signInUser from "../libs/user/signInUser"
import { useAuthContext } from "@/hooks/authContext"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
type User = {
  username: string,
  password: string
}

export default function SignInForm() {
  const [user, setUser] = useState<User>({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuthContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const router = useRouter()

  const handleOnsubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const userData = await signInUser(user)
      console.log(user)
      if (userData && 'user_id' in userData) {
        login(userData)
        router.push("/")
        setIsLoading(false)
      } else if (userData && 'error' in userData) {
        setError(userData.error)
        setIsLoading(false)
      } else {
        console.log("invalid user data: ", userData)
        setIsLoading(false)
      }
    } catch (error: any) {
      setError(error)
      setIsLoading(false)
    }
  }


  return (
    <form onSubmit={handleOnsubmit} className="space-y-6" >
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div className="mt-2">
          <input onChange={handleInputChange} value={user.username} id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input onChange={handleInputChange} value={user.password} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      {error && <div className='text-red-500 text-center'>{error}</div>}
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {isLoading ? <div className='animate-spin w-full flex items-center justify-center'>🍎</div> :
            <p>Sign in</p>}
        </button>
      </div>
    </form>
  )
}
