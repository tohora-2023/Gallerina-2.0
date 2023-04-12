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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artwork' element={<Artwork />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/collection' element={<Collection />} />
        <Route path='/*' element={<></>} />
      </Routes>
    </>
  )
}

export default App
