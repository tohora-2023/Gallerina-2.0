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
      <div className="border-black-200 bg-white-200 mt-20 mr-10 ml-10 mb-20 min-h-screen rounded-2xl border pl-10 pr-10 pt-10 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/collections" element={<Collection />} />
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
