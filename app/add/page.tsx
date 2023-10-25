import AddForm from "./addFormInput"
async function page() {
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

export default page
