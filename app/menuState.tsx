import Link from "next/link"

export default function Menu() {


  return (
    <div className='flex items-center justify-center mt-9'>
      <div className="inline-flex">
        <Link href="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7">
          All
        </Link>
        <Link href="/search?q=available" className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7" >
          Available
        </Link>
        <Link href="/search?q=pending" className="bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-7" >
          Pending
        </Link>
        <Link href="/search?q=In use" className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-full">
          In use
        </Link>
      </div>
    </div>

  )
}
