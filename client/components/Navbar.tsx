import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent, useState } from 'react'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0()
  // console.log(user)

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
            src="./logo4.png"
            alt="gallerina logo"
            className="mr-10 h-auto w-12"
          />
        </Link>
      </div>

      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-gray-600 px-3 py-2 text-white hover:border-white hover:text-white"
          type="button"
          aria-label="Toggle menu"
        ></button>
      </div>

      <div className="ml-auto w-full lg:w-auto">
        <div className="flex justify-end">
          <Link to="/">
            <button
              className={`mt-4 block cursor-pointer rounded-full border border-black ${
                activeButton === 'home'
                  ? 'bg-my-gold'
                  : 'bg-white hover:bg-my-gold'
              } shadow-xs transform px-3 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-xl lg:mt-0 lg:inline-block `}
              onClick={() => setActiveButton('home')}
            >
              Home
            </button>
          </Link>

          {isAuthenticated && (
            <Link to="/profile">
              <button
                className={` mt-4  mr-1 ml-1 block cursor-pointer rounded-full border border-black ${
                  activeButton === 'profile'
                    ? 'bg-my-gold'
                    : 'bg-white hover:bg-my-gold'
                } shadow-xs transform px-3 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-xl lg:mt-0 lg:inline-block `}
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
              className="shadow-xs bg-white0 inline-block transform cursor-pointer rounded-full border border-black px-3 py-0 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogIn}
              onKeyDown={handleKeyDownLogin}
              className="shadow-xs inline-block transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
