import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  const [activeButton, setActiveButton] = useState('')

  const handleLogOut = () => {
    logout({ returnTo: window.location.origin })
  }

  const handleLogIn = () => {
    loginWithRedirect()
  }

  return (
    <nav className="bg-white-200 flex flex-wrap items-center justify-between border-b-2 border-my-gold p-6">
      <div>
        <Link to="/">
          <img
            src="/logo.png"
            alt="gallerina logo"
            className="ml-10 h-12 w-auto scale-150 transform"
            onClick={() => setActiveButton('')}
          />
        </Link>
      </div>

      <div className="w-fz ull  ml-auto lg:w-auto">
        <div className="flex justify-end">
          <Link to="/">
            <button
              className={`mt-4 block cursor-pointer rounded-full border border-my-gold ${
                activeButton === 'home'
                  ? 'bg-my-gold text-white'
                  : 'bg-white hover:border-white hover:bg-my-gold hover:text-white'
              } shadow-xs mr-5 transform px-3 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-xl lg:mt-0 lg:inline-block `}
              onClick={() => setActiveButton('home')}
            >
              Home
            </button>
          </Link>
          <Link to="/search">
            <button
              className={`mt-4 block cursor-pointer rounded-full border border-my-gold ${
                activeButton === 'search'
                  ? 'bg-my-gold text-white'
                  : 'bg-white hover:border-white hover:bg-my-gold hover:text-white'
              } shadow-xs transform px-3 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-xl lg:mt-0 lg:inline-block `}
              onClick={() => setActiveButton('search')}
            >
              Search
            </button>
          </Link>

          {isAuthenticated && (
            <Link to={`/profile`}>
              <button
                className={` mt-4   ml-5 block cursor-pointer rounded-full border border-my-gold ${
                  activeButton === 'profile'
                    ? 'bg-my-gold text-white'
                    : 'bg-white hover:border-white hover:bg-my-gold hover:text-white'
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
              tabIndex={0}
              className=" shadow-xs bg-white0 ml-5 inline-block transform cursor-pointer rounded-full border border-my-gold bg-white px-3 py-0 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:border-white  hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogIn}
              className="shadow-xs gold ml-5 inline-block transform cursor-pointer rounded-full border  border-my-gold bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:border-white hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
