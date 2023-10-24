"use client"
import { useAuthContext } from "@/hooks/authContext"
import Link from "next/link"
import deleteEquipment from "./libs/equipment/deleteEquipment"

type data = {
  equipmentID: string | undefined
}

const CardButton: React.FC<data> = ({ equipmentID }) => {

  const { user } = useAuthContext()

  const handleDeleteEquipment = async () => {
    try {
      const deleteRes = await deleteEquipment(equipmentID)
      if (deleteRes !== undefined) {
        window.location.reload()
      } else {
        console.log(deleteRes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user && user.roles && user.roles.some(role => role === 'admin') &&
        <div className="px-6 pt-2 pb-2">
          <Link className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" href={`/update/${equipmentID}`}>Edit</Link>
          <button className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" onClick={handleDeleteEquipment}>Delete</button>
        </div>}
    </>
  )
}

export default CardButton