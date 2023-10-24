import Link from "next/link"
import SignInForm from "./signInForm"
export default async function Page() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-[150px] w-auto" src="https://cdn.freebiesupply.com/logos/large/2x/sports-logo-png-transparent.png" alt="Your Company" />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-4" href="/signUp">Register</Link>
        </p>
      </div>
    </div>
  )
}
