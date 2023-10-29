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

  const { user } = useAuthContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleDeleteEquipment = async () => {
    setIsLoading(true)
    try {
      const deleteRes = await deleteEquipment(equipmentID)
      if (deleteRes !== undefined) {
        router.refresh()
        window.location.reload()
        setIsLoading(false)
      } else {
        console.log(deleteRes)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {user && user.roles && user.roles.some(role => role === 'admin') &&
        <div className="px-6 pt-2 pb-2">
          <Link className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" href={`/update?id=${equipmentID}`}>Edit</Link>
          <button className={`inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 ${isLoading && "animate-bounce"}`} onClick={handleDeleteEquipment}>Delete</button>
        </div>}
    </div>
  )
}

export default CardButton
