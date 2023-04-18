import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Homepage'
import ArtworkInfo from './ArtworkInfo'
import Profile from './Profile'
import CollectionItems from './CollectionItems'
import Search from './Search'

function App() {
  // useEffect that sends a api request, to add the user into the users table
  return (
    <>
      <Navbar />
      <div className="border-black-200 bg-white-200 m-20 min-h-screen rounded-2xl border p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artworks/:id" element={<ArtworkInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collections/:id" element={<CollectionItems />} />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  )
}

export default App
