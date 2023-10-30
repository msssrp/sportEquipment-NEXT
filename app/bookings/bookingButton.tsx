"use client"
import deleteBorrowing from "../libs/borrow/deleteBorrowing"
import approveBorrow from "../libs/borrow/approveBorrow"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/hooks/authContext"
type BookingBtn = {
  borrowingID: string,
  equipmentID: string
}

const BookingButton: React.FC<BookingBtn> = ({ borrowingID, equipmentID }) => {
  const router = useRouter()
  const { logout } = useAuthContext()
  const [error, setError] = useState("")
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const [isApproveLoading, setIsApproveLoading] = useState(false)


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


  const handleOnClickApprove = async () => {
    setIsApproveLoading(true)
    const resp = await approveBorrow(borrowingID, equipmentID)
    if (resp.result === "approved") {
      window.location.reload()
      setIsApproveLoading(false)
    } else if (resp.error === "token is expired") {
      setError("session is out of date please log in again")
      setTimeout(() => {
        logout()
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "refresh_token=; Max-Age=0;"
        router.push("/signIn")
        setIsApproveLoading(false)
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
      <button className={`mr-[15px] text-orange-400 ${isApproveLoading && "animate-bounce"}`} onClick={handleOnClickApprove} >
        Approve
      </button>
      {error && <p>{error}</p>}
      <button className={`text-red-700 ${isCancelLoading && "animate-bounce"}`} onClick={handleOnClickDelete}>
        Cancel
      </button>
    </>
  )
}

export default BookingButton
