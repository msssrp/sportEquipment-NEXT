"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/authContext';
export default function Navbar() {

  const [searchValue, setSearchValue] = useState("")

  const { user, logout } = useAuthContext()

  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    if (user) {
      setIsAuth(true)
      return
    } else {
      setIsAuth(false)
      return
    }
  }, [user])

  const handleLogout = () => {
    logout()
    document.cookie = `token=; Max-Age=0;`
    document.cookie = `refresh_token=; Max-Age=0;`
  }

  const router = useRouter()

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      router.push(`/search?q=${searchValue}`)
    }
  }
  return (
    <nav className="bg-body-tertiary p-4" suppressHydrationWarning={true}>
      <div className="mx-auhref flex items-center justify-around">
        <div>
          <Link className="text-black text-lg font-bold" href="/">
            Sports Equipment Borrowing
          </Link>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <ul className="flex space-x-4">

            {isAuth ? <>
              {user && user.user.roles && user.user.roles.some(role => role === 'admin') && (<>
                <li className="nav-item">
                  <Link className="text-gray-900 hover:text-gray-400" href="/bookings">
                    Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="text-gray-900 hover:text-gray-400" href="/add">
                    Add
                  </Link>
                </li>
              </>
              )}
              {user && <>
                <li className="nav-item">
                  <Link className="text-gray-900 hover:text-gray-400" href={`/myBook?id=${user.user.user_id}&session=${user.session}`}>
                    My Book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="text-gray-900 hover:text-gray-400" href="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="text-gray-900 hover:text-gray-400"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
              }
            </> : <>
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/signUp">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/signIn">
                  Sign In
                </Link>
              </li>
            </>}

          </ul>
          <form className="flex items-center" role='search'>
            <input
              className="form-input py-1 px-2 border border-black rounded-lg"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
              onKeyDown={handleOnKeyDown}
            />
          </form>
          <Link href={`/search?q=${searchValue}`}>Search</Link>
        </div>
      </div>
    </nav>
  );
};
