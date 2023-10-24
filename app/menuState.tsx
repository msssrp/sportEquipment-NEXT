"use client"
import { useSearchContext } from "@/hooks/searchContext"
export default function Menu() {

  const { setSearchValue } = useSearchContext()

  const handlerAllClick = () => {
    setSearchValue("")
  }
  const handlerAvailableClick = () => {
    setSearchValue("available")
  }
  const handlerPeningClick = () => {
    setSearchValue("pending")
  }
  const handlerInUseClick = () => {
    setSearchValue("In use")
  }


  return (
    <div className='flex items-center justify-center mt-9'>
      <div className="inline-flex">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7" onClick={() => handlerAllClick()}>
          All
        </button>
        <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7" onClick={() => handlerAvailableClick()}>
          Available
        </button>
        <button className="bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7" onClick={() => handlerPeningClick()}>
          Pending
        </button>
        <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => handlerInUseClick()}>
          In use
        </button>
      </div>
    </div>

  )
}
