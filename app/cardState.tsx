"use client"
import { useAuthContext } from "@/hooks/authContext"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function CardState() {
  const { user } = useAuthContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selecetedToggle = searchParams.get("toggle")

  const [isOpen, setIsOpen] = useState(false)
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
        <p className='inline-block mr-2 mb-2'>Selected:{selectedOption}</p>
        <button className={`inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 }`}>👌</button>
        <button onClick={() => setSelectedOption(null)} className={`inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 `}>🙅‍♂️</button>
      </div>}

    </div>
  )
}
