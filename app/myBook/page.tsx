import MyBookState from "./myBookState"
import getBorrowsByUserID from "../libs/borrow/getBorrowsByUserID"
import { redirect } from "next/navigation"
export default async function Page({ searchParams }: { searchParams: { [key: string]: string[] | string | undefined } }) {
  if (!searchParams.id) {
    redirect("/signIn")
  }
  const borrows = await getBorrowsByUserID("652d4725d484bd941571a0b0")
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
                {borrows.result?.map((borrow) => (
                  <MyBookState key={borrow.borrowing_id} borrow={borrow} />
                ))}

              </table>
            </div>
          </div>
        </div>
      </div>

    </main>

  )
}
