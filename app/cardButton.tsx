"use client"
import { useAuthContext } from "@/hooks/authContext"
import Link from "next/link"
import deleteEquipment from "./libs/equipment/deleteEquipment"
import { useRouter } from "next/navigation"
import { useState } from "react"
type data = {
  equipmentID: string | undefined
}

const CardButton: React.FC<data> = ({ equipmentID }) => {

  const { user, logout } = useAuthContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const handleDeleteEquipment = async () => {
    setIsLoading(true)
    try {
      const deleteRes = await deleteEquipment(equipmentID)
      if (deleteRes.result === "deleted") {
        router.refresh()
        window.location.reload()
      } else if (deleteRes.error === "token is expired") {
        setError("session is out of date please log in again")
        setTimeout(() => {
          logout()
          document.cookie = "token=; Max-Age=0;"
          document.cookie = "uid=; Max-Age=0;"
          document.cookie = "pms=; Max-Age=0;"
          document.cookie = "refresh_token=; Max-Age=0;"
          router.push("/signIn")
          setIsLoading(false)
        }, 3500)
      } else if (deleteRes.error) {
        setError(deleteRes.error)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {user && user.roles && user.roles.some(role => role === 'admin') &&
        <div className="px-6 pt-2 pb-2">
          <Link className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" href={`/update?id=${equipmentID}`}>Edit</Link>
          <button className={`inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 ${isLoading && "animate-bounce"}`} onClick={handleDeleteEquipment}>Delete</button>
        </div>}
    </div>
  )
}

export default CardButton
