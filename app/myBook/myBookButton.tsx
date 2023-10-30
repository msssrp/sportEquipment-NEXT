"use client"
import deleteBorrowing from "../libs/borrow/deleteBorrowing"
import { useState } from "react"
import { useAuthContext } from "@/hooks/authContext"
import { useRouter } from "next/navigation"
type MyBookingBtn = {
  borrowingID: string,
  equipmentID: string
}

const MyBookButton: React.FC<MyBookingBtn> = ({ borrowingID, equipmentID }) => {
  const router = useRouter()
  const { logout } = useAuthContext()

  const [error, setError] = useState("")
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const handleOnClickDelete = async () => {
    setIsCancelLoading(true)
    const resp = await deleteBorrowing(borrowingID, equipmentID)
    if (resp.result === "deleted") {
      window.location.reload()
      setIsCancelLoading(false)
    } else if (resp.error === "token is expired") {
      setError("session is out of date please log in again")
      setTimeout(() => {
        logout()
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "refresh_token=; Max-Age=0;"
        router.push("/signIn")
        setIsCancelLoading(false)
      }, 3500)
    } else if (resp.error) {
      setError("session is out of date please log in again")
      setTimeout(() => {
        logout()
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "refresh_token=; Max-Age=0;"
        router.push("/signIn")
        setIsCancelLoading(false)
      }, 3500)
    }
  }
  return (
    <>
      {error && <p>{error}</p>}
      <button className={`text-red-700 ${isCancelLoading && "animate-bounce"}`} onClick={handleOnClickDelete}>
        Cancel
      </button>
    </>
  )
}

export default MyBookButton
