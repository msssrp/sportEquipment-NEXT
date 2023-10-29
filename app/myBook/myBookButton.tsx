"use client"
import deleteBorrowing from "../libs/borrow/deleteBorrowing"
import { useState } from "react"

type MyBookingBtn = {
  borrowingID: string,
  equipmentID: string
}

const MyBookButton: React.FC<MyBookingBtn> = ({ borrowingID, equipmentID }) => {
  const [error, setError] = useState("")
  const [isCancelLoading, setIsCancelLoading] = useState(false)
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