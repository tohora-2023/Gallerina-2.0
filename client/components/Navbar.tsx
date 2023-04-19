import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent, useState } from 'react'

export default function Navbar() {
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

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
    <nav className="bg-white-200 border-my-gold border-b-2 flex flex-wrap items-center justify-between p-6">
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

      <div className="ml-auto w-fz  ull lg:w-auto">
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
                className={` mt-4  mr-5 ml-5 block cursor-pointer rounded-full border border-my-gold ${
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
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleKeyDownLogout
                }
              }}
              tabIndex={0}
              className="shadow-xs bg-white0 inline-block transform cursor-pointer rounded-full border border-my-gold bg-white px-3 py-0 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:border-white  hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogIn}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleKeyDownLogin
                }
              }}
              className="shadow-xs gold inline-block transform cursor-pointer rounded-full border  border-my-gold bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:border-white hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
