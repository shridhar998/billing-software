import React , { useState, useRef} from 'react'
import LoginForm from './LoginForm';


export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const ref = useRef()
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center'>
        <div className='text-3xl font-semibold bg-black text-white p-4 text-center mt-4'> Billing Software </div>
         <LoginForm setLoggedIn={setLoggedIn}/>
      </div>
    </div>
  )
}
