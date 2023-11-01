import BookingState from "./bookingState"
import getBorrowings from "../libs/borrow/getBorrowings"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
export default async function Page() {
  const cookieStore = cookies()
  const pms = cookieStore.get("pms")
  if (!pms) {
    redirect("/signIn")
  }
  if (pms.value === "false") {
    redirect("/signIn")
  }
  const borrowings = await getBorrowings()

  return (
    <main className="h-screen mt-[30px]">
      <div className="flex flex-col justify-center items-center h-full bg-white">
        <div className="mx-4 mt-[-150px]">
          <div className="p-4 w-[1590px] overflow-hidden shadow-xs ">
            <div className="w-full overflow-x-auto rounded-lg border-2">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 dark:text-gray-400 ">
                    <th className="px-4 py-3">Borrowing ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Equipment Name</th>
                    <th className="px-4 py-3">Borrow Date</th>
                    <th className="px-4 py-3">Return Date</th>
                    <th className="px-4 py-3">Days</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                {borrowings.result?.map((borrowing) => (
                  <BookingState key={borrowing.borrowing_id} borrow={borrowing} />
                ))}

              </table>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
