import cookies from 'js-cookie'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react"
import {UserContext} from "../../context/userContext"


export default function Navbar() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      setUser(null)
      toast.success('Signed out')
      navigate('/')
    } catch (error) {
      toast.error('Logout failed')
      console.log(error)
    }
  };

  return (
    <nav className="flex justify-center bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className='flex w-8/12 px-2 py-2 items-center justify-between' >
      
        <Link to='/' >Home</Link>
        {!user ? (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        ) : (
          <>
            <Link to='/dashboard'>Dashboard</Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
       
      </div>
    </nav>
  )
}
