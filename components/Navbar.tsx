"use client"
import React from 'react'
import Link from 'next/link';
import { useSearchContext } from '@/hooks/searchContext';
import { useAuthContext } from '@/hooks/authContext';

export default function Navbar() {
  const { searchValue, setSearchValue } = useSearchContext()
  const handlerSearchInput = (e: any) => {
    setSearchValue(e.target.value)
  }

  const { user, logout } = useAuthContext()

  const handleLogout = () => {
    logout()
    document.cookie = `token=; Max-Age=0;`
  }

  return (
    <nav className="bg-body-tertiary p-4">
      <div className="mx-auhref flex items-center justify-around">
        <div>
          <Link className="text-black text-lg font-bold" href="/">
            Sports Equipment Borrowing
          </Link>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <ul className="flex space-x-4">

            {user && user.roles && user.roles.some && user.roles.some(role => role === 'admin') && (
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/allBookings">
                  Bookings
                </Link>
              </li>
            )}

            {user && user.roles && user.roles.some && user.roles.some(role => role === 'admin') && (
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/add">
                  Add
                </Link>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/signUp">
                  Sign Up
                </Link>
              </li>
            )}


            {user &&
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/profile">
                  Profile
                </Link>
              </li>
            }
            {user ?
              <li className="nav-item">
                <button
                  className="text-gray-900 hover:text-gray-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li> :
              <li className="nav-item">
                <Link className="text-gray-900 hover:text-gray-400" href="/signIn">
                  Sign In
                </Link>
              </li>
            }


          </ul>
          <form className="flex items-center" role='search'>
            <input
              className="form-input py-1 px-2 border border-black rounded-lg"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handlerSearchInput}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};
