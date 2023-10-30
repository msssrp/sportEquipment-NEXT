import AddForm from "./addFormInput"
import { redirect } from "next/navigation"
export default async function page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined | boolean } }) {
  if (searchParams.session === false) {
    redirect("/signIn")
  }
  if (!searchParams.session) {
    redirect("/signIn")
  }
  return (
    <div className="flex mt-[20px]">
      <main className={`flex-1 "h-full"}`}>
        <div className="flex flex-col justify-center items-center h-full  pt-[50px] pb-[50px]">

          <div className="w-full max-w-[550px] h-full bg-white">
            <AddForm />
          </div>
        </div>
      </main >
    </div >
  )
}


