export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-t m-4 border-t">
      <div className="w-full max-w-screen-xl mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img src="https://cdn.worldvectorlogo.com/logos/sport-3.svg" className="h-[120px] mr-3" alt="Sport Equipment Logo" />
          </a>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="mb-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">© 2023 <a href="/" className="hover:underline">Sports equipment™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}
