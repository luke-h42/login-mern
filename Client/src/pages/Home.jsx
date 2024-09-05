import React from 'react'

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">
      <h1  className="text-5xl text-gray-700 dark:text-gray-300">Welcome!</h1>
      <h2 className="text-2xl text-gray-700 dark:text-gray-300">Please login to use our services.</h2>
    </div>
  )
}
