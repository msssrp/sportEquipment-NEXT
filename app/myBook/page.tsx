import MyBookState from "./myBookState"
import getBorrowsByUserID from "../libs/borrow/getBorrowsByUserID"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
export default async function Page({ searchParams }: { searchParams: { [key: string]: string[] | boolean | string | undefined } }) {
  if (!searchParams.id) {
    redirect("/signIn")
  }
  const cookieStore = cookies()
  const pms = cookieStore.get("pms")
  if (!pms) {
    redirect("/signIn")
  }

  const borrows = await getBorrowsByUserID(searchParams.id)
  return (
    <main className="h-screen mt-[20px]">
      <div className="flex flex-col justify-center items-center h-full bg-white">
        {borrows.result ?
          <div className="mx-4 mt-[-150px]">
            <div className="p-4 w-[1590px] overflow-hidden shadow-xs ">
              <div className="w-full overflow-x-auto rounded-lg border-2">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-ray-50 dark:text-gray-400 ">
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
          : <><p className="mt-[-100px]">You dont have any borrow yet go pick one!</p></>}
      </div>
    </main>

  )
}
