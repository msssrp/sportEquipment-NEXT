"use client"
import { useAuthContext } from "@/hooks/authContext"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import moment from "moment"
import addBorrow from "./libs/borrow/addBorrow"
type Props = {
  equipmentID: string | undefined
}

const CardState: React.FC<Props> = ({ equipmentID }) => {
  const { user } = useAuthContext()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [borrowDate, setBorrowDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [error, setError] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const toggleDropDown = () => {
    if (!user) {
      router.push("/signIn")
      return
    }
    setIsOpen(!isOpen)
  }

  const selectOption = (day: number) => {
    setSelectedOption(day)
    setIsOpen(false)
  }

  useEffect(() => {
    const currentDate = moment()
    const modifiedDate = moment(currentDate).add(selectedOption, 'days');
    const borrowDateFormatted = currentDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
    const returnDateFormatted = modifiedDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
    setBorrowDate(borrowDateFormatted)
    setReturnDate(returnDateFormatted)
  }, [selectedOption])


  const handleOnBorrow = async () => {
    setIsLoading(true)
    const newBorrowData = {
      user_id: user?.user_id,
      equipment_id: equipmentID,
      borrow_date: borrowDate,
      return_date: returnDate,
    }
    const resp = await addBorrow(newBorrowData)
    if (resp.error) {
      setError(resp.error)
      return setIsLoading(false)
    }
    if (resp.result) {
      router.refresh()
      setTimeout(() => {
        window.location.reload()
      }, 5500)
    }
  }

  return (
    <div className="static flex">
      <button onClick={toggleDropDown} className="bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">
        Borrow
      </button>
      {isOpen && (
        <div className="absolute bg-white border rounded-lg mt-2">
          <ul className="list-none">
            <li className="cursor-pointer py-2 px-4 hover:bg-gray-200" onClick={() => selectOption(3)}>
              3 days
            </li>
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-200"
              onClick={() => selectOption(7)}
            >
              7 days
            </li>
            <li
              className="cursor-pointer py-2 px-4 hover:bg-gray-200"
              onClick={() => selectOption(14)}
            >
              14 days
            </li>
          </ul>
        </div>
      )}
      {selectedOption && <div>
        {error && <p>{error}</p>}
        <p className='inline-block mr-2 mb-2'>Selected:{selectedOption}</p>
        <button onClick={handleOnBorrow} className={`inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 ${isLoading && "animate-bounce"} }`}>👌</button>
        <button onClick={() => setSelectedOption(null)} className={`inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 `}>🙅‍♂️</button>
      </div>}

    </div>
  )
}

export default CardState
