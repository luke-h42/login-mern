import { useContext } from "react"
import {UserContext} from "../../context/userContext"

function Dashboard() {
    const {user} = useContext(UserContext)
  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">
      <h1 className="text-5xl text-gray-700 dark:text-gray-300" >Dashboard</h1>
      {!!user && (<h2 className="text-3xl text-gray-700 dark:text-gray-300">Hi {user.name}!</h2>)}
    </div>
  )
}

export default Dashboard
