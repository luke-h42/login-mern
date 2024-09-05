import cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import {UserContext} from "../../context/userContext"


export default function Navbar() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const handleSignOut = () => {
    cookies.remove('token')
    setUser(null)
    toast.success('Signed out')
    navigate('/')
  }

  return (
    <nav className="flex justify-center bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className='flex w-8/12 px-2 py-2 items-center justify-between' >
      {!user && <>
        <a href='/' >Home</a>
        <a href='/login' >Login</a>
        <a href='/register' >Register</a>
      </>}
      
        {!!user && (<>
          <a href='/' >Home</a>
          <a href='/dashboard' >Dashboard</a>
          <button onClick={handleSignOut}>Sign Out</button>
        </>)}
       
      </div>
    </nav>
  )
}
