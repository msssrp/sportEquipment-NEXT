"use client"
import { useAuthContext } from "@/hooks/authContext";
import { useRouter } from "next/navigation";
export default function Page() {
  const { user } = useAuthContext()
  const router = useRouter()
  if (!user) {
    router.push("/signIn")
  }
  return (
    <div className="flex items-center mt-[100px] justify-center mb-[150px]">
      <div className="border w-[400px]">
        <div className="bg-white shadow-xl rounded-lg py-3 w-full">
          <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" alt="Sport Equipment Profile" />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user?.f_name} {user?.l_name}</h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{user?.roles.map((role) => <p>{role}</p>)}</p>
            </div>
            <table className="text-xs my-3 flex flex-row justify-center items-center">
              <tbody><tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td className="px-2 py-2">{user?.address}</td>
              </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td className="px-2 py-2">{user?.phone_number}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td className="px-2 py-2">{user?.email}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center my-3">
              <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
