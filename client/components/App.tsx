import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

import Navbar from './Navbar'
import Home from './Homepage'
import ArtworkInfo from './ArtworkInfo'
import Profile from './Profile'
import CollectionItems from './CollectionItems'
import Search from './Search'
import { addNewUser } from '../apis/user'

function App() {
  const { getAccessTokenSilently, user } = useAuth0()

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      const username = user?.name
      if (username == null) {
        return console.log('Username doesnt exist')
      }
      addNewUser(token, username)
    }
    getAccess().catch(console.error)
  }, [user, getAccessTokenSilently])

  return (
    <>
      <Navbar />
      <div className="bg-white-200 m-20 rounded-2xl border-2 border-my-gold p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artworks/:id" element={<ArtworkInfo />} />
          <Route path="/collections/:id" element={<CollectionItems />} />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  )
}

export default App
