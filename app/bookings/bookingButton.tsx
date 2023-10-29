"use client"
import deleteBorrowing from "../libs/borrow/deleteBorrowing"
import approveBorrow from "../libs/borrow/approveBorrow"
import { useState } from "react"
type BookingBtn = {
  borrowingID: string,
  equipmentID: string
}

const BookingButton: React.FC<BookingBtn> = ({ borrowingID, equipmentID }) => {
  const [error, setError] = useState("")
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const handleOnClickDelete = async () => {
    setIsCancelLoading(true)
    const resp = await deleteBorrowing(borrowingID, equipmentID)
    if (resp.error) {
      setError(resp.error)
      return setIsCancelLoading(false)
    }
    window.location.reload()
    setIsCancelLoading(false)
  }
  const handleOnClickApprove = async () => {
    setIsApproveLoading(true)
    const resp = await approveBorrow(borrowingID, equipmentID)
    if (resp.error) {
      setError(resp.error)
      return setIsApproveLoading(false)
    }
    window.location.reload()
    setIsApproveLoading(false)
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
