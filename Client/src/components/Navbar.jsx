import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from "../../context/userContext";

export default function Navbar() {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      setUser(null);
      toast.success('Signed out');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
      console.log(error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">Loading...</div>;
  }

  return (
    <nav className="flex justify-center bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className='flex w-8/12 px-2 py-2 items-center justify-between'>
        <a href='/'>Home</a>
        {!user ? (
          <>
            <a href='/login'>Login</a>
            <a href='/register'>Register</a>
          </>
        ) : (
          <>
            <a href='/dashboard'>Dashboard</a>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}
