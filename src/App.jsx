import { useState } from 'react'
import {ArrowDownTrayIcon, BoltIcon, NumberedListIcon} from '@heroicons/react/24/outline'

function App() {
  const [balance, setBalance] = useState(0);

  return (
    <div className='font-[Rubik] h-screen flex flex-col gap-10 items-center justify-center bg-gray-800 text-white'>
      <h1 className='text-3xl absolute top-10 text-center'>Welcome to your Bitcoin wallet</h1>
      <h3 className='text-5xl lg:text-7xl font-medium'>{balance} SATS</h3>
      <div className='flex items-center gap-10'>
        <button className='text-2xl lg:text-4xl bg-gray-900 rounded-lg flex gap-2 p-4 items-center hover:bg-gray-700 transition duration-200'><ArrowDownTrayIcon className='size-10' />Receive</button>
        <button className='text-2xl lg:text-4xl bg-gray-900 rounded-lg flex gap-2 p-4 items-center hover:bg-gray-700 transition duration-200'><BoltIcon className='size-10' />Send</button>
      </div>
      <button className='flex items-center text-gray-400 text-xl gap-2 p-4'><NumberedListIcon className='size-8' /> History</button>
    </div>
  )
}

export default App
