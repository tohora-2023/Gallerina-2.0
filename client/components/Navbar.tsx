import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent } from 'react'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

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
    <nav className="flex items-center justify-between flex-wrap bg-gray-300 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <img src="/logo.png" alt="gallerina logo" className="h-8 w-auto"/>
        </Link>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400 mr-4">
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400 mr-4">
              Profile
            </Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <div
              onClick={handleLogOut}
              onKeyDown={handleKeyDownLogout}
              role="button"
              tabIndex={0}
              className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400 mr-4"
            >
              Logout
            </div>
          ) : (
            <div
              onClick={handleLogIn}
              onKeyDown={handleKeyDownLogin}
              role="button"
              tabIndex={0}
              className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-red-500 hover:text-red-600 mr-4"
            >
              Login
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
