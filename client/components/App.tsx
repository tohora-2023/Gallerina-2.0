import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Homepage'
import Artwork from './Artwork-info'
import Profile from './Profile'
import Collection from './Collection'
import CollectionItems from './CollectionItems'

function App() {
  return (
    <>
      <Navbar />
      <div className="border-black-200 bg-white-200 m-20 min-h-screen rounded-2xl border p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile/collections/:id"
            element={<CollectionItems />}
          />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  )
}

export default App
