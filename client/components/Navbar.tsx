import { Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <>
      <div>
        <img src='/logo.png' alt='gallerina logo'/>
      </div>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/profile'>Profile</Link>
      </div>
      <div>
        <Link to='/'>Login</Link>
      </div>
    </>
  )
}