import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent, useState } from 'react'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0()
  console.log(user)

  const [activeButton, setActiveButton] = useState('')

  const handleLogOut = () => {
    logout({ returnTo: window.location.origin })
  }

  const handleLogIn = () => {
    loginWithRedirect()
  }

  function handleKeyDownLogout(e: KeyboardEvent<HTMLDivElement>) {
    if (e.code == 'Enter') {
      logout({ returnTo: window.location.origin })
    }
  }

  function handleKeyDownLogin(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.code == 'Enter') {
      loginWithRedirect()
    }
  }

  return (
    <nav className="bg-white-200 border-black-200 flex flex-wrap items-center justify-between border p-6">
      <div>
        <Link to="/">
          <img
            src="./logo3.png"
            alt="gallerina logo"
            className="mr-10 h-12 w-auto"
          />
        </Link>
      </div>

      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-white hover:text-white"
          type="button"
          aria-label="Toggle menu"
        ></button>
      </div>

      <div className="ml-auto w-full flex-grow lg:flex lg:w-auto lg:items-center lg:justify-end">
        <div className="justify-right text-sm lg:flex lg:flex-grow lg:items-center">
          <Link to="/">
            <button
              className={`mt-4 block cursor-pointer rounded-full border border-black ${
                activeButton === 'home'
                  ? 'bg-my-gold'
                  : 'bg-gray-500 hover:bg-my-gold'
              } px-3 py-0.5 font-bold text-black lg:mt-0 lg:inline-block`}
              onClick={() => setActiveButton('home')}
            >
              Home
            </button>
          </Link>

          {isAuthenticated && (
            <Link to="/profile">
              <button
                className={` mt-4  block cursor-pointer rounded-full border border-black ${
                  activeButton === 'profile'
                    ? 'bg-my-gold'
                    : 'bg-gray-500 hover:bg-my-gold'
                } px-3 py-0.5 font-bold text-black lg:mt-0 lg:inline-block`}
                onClick={() => setActiveButton('profile')}
              >
                Profile
              </button>
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogOut}
              onKeyDown={handleKeyDownLogout}
              role="button"
              tabIndex={0}
              className="inline-block cursor-pointer rounded-full border border-black bg-gray-500 px-3 py-0.5 font-bold text-black hover:bg-my-gold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogIn}
              onKeyDown={handleKeyDownLogin}
              className="inline-block cursor-pointer rounded-full border border-black bg-gray-500 px-3 py-0.5 font-bold text-black hover:bg-my-gold"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
