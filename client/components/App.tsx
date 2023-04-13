import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Artwork from './Artwork-info'
import Profile from './Profile'
import Collection from './Collection'

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-10 mr-10 ml-10 mb-10 flex flex-wrap items-center justify-between bg-gray-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork" element={<Artwork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/collection" element={<Collection />} />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  )
}

export default App
