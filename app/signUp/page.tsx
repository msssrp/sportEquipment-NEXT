import SignUpForm from "./signUpForm"
export default function Page() {
  return (
    <div className="h-full mt-10">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundImage: "url('https://www.muralunique.com/wp-content/uploads/2022/02/1930_sports-equipment.jpg')", backgroundSize: "cover" }}></div>
            <div className="w-full lg:w-7/12 bg-white  p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 ">Create an Account</h3>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
