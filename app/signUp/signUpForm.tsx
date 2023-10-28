"use client"
import Link from "next/link"
import { useState } from "react"
import SignUpUser from "../libs/user/signUpUser"
type User = {
  f_name: string,
  l_name: string,
  username: string,
  password: string,
  email: string,
  phone_number: string,
  address: string,
}

export default function SignUpForm() {

  const [newUser, setNewUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    f_name: "",
    l_name: "",
    phone_number: "",
    address: "",
  })
  const [cPassword, setCPassword] = useState("")
  const [errorText, setErrorText] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "Cpassword") {
      return setCPassword(value);
    }

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (newUser.password !== cPassword) {
      setErrorText("Password not match try again")
      setIsLoading(false)
      return
    }
    if (!newUser.username || !newUser.password || !newUser.email || !newUser.f_name || !newUser.l_name || !newUser.address || !newUser.phone_number) {
      setErrorText("Please input all the fields")
      setIsLoading(false)
      return
    }
    const result = await SignUpUser(newUser)
    if (result.error) {
      setErrorText(result.error)
      setIsLoading(false)
      return
    }
    if (result.statusText) {
      setErrorText("")
      setSuccess(result.statusText)
      setIsLoading(false)
      return
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
      <div className="mb-4 md:flex w-full">
        <div className="mb-4 md:mr-2 md:mb-0 w-[50%]">
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="f_name"
            type="text"
            name='f_name'
            onChange={handleOnchange}
            placeholder="First Name"
          />
        </div>
        <div className="mb-4 md:mr-2 md:mb-0 w-[50%]">
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="l_name"
            type="text"
            name='l_name'
            onChange={handleOnchange}
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="mb-4 md:flex w-full">
        <div className='mb-4 md:mb-0 w-[58%] mr-2'>
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="Address">
            Address
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            name="address"
            type="text"
            onChange={handleOnchange}
            placeholder="address"
          />
        </div>
        <div className='mb-3 md:mb-0 w-[40%]'>
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phone_number"
            name="phone_number"
            type="text"
            onChange={handleOnchange}
            placeholder="Phone number"
          />
        </div>
      </div>
      <div className='mb-4 md:mb-0 w-full'>
        <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          onChange={handleOnchange}
          placeholder="Email"
        />
      </div>
      <div className=' w-full'>
        <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="username">
          Username
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="username"
          name="username"
          type="text"
          onChange={handleOnchange}
          placeholder="username"
        />
      </div>
      <div className="mb-4 md:flex w-full">
        <div className="mb-4 md:mr-2 md:mb-0 w-[50%]">
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            name='password'
            type="password"
            onChange={handleOnchange}
            placeholder="******************"
          />
        </div>
        <div className="md:ml-2 w-[50%]">
          <label className="block mb-2 text-sm font-bold text-gray-700 " htmlFor="c_password">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="Cpassword"
            name='Cpassword'
            type="password"
            onChange={handleOnchange}
            placeholder="******************"
          />
        </div>
      </div>

      {errorText ? <div className='text-red-600 text-center mb-3'>{errorText}</div> : success && <div className='text-green-600 text-center mb-3'>{success}</div>}
      <div className="mb-6 text-center">
        <button
          className="w-[30%] px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isLoading ? <div className='animate-spin w-full flex items-center justify-center'>🍎</div> :
            <p>Register Account</p>}
        </button>
      </div>
      <hr className="mb-6 border-t" />

      <div className="text-center">
        <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
          href="/signIn">
          Already have an account?
        </Link>
      </div>
    </form>
  )
}
