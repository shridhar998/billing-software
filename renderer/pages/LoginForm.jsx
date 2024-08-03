import React ,{ useState, useRef } from 'react'
import {useRouter} from 'next/router'

const LoginForm = ({ setLoggedIn}) => {
    const [auth, setAuth] = useState([
        {
            title : "Admin",
            password : "sdg453",
            checked : false,
        },
        {
            title : "Operator",
            password : "1234",
            checked : false,
        }
    ])
    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [showToast, setShowToast] = useState(0)
    const router  = useRouter()
    const handleLogin = () => {
        if(password === "" || title === ""){
            setShowToast(1)
            setTimeout(()=>{
                setShowToast(0)
            },1500)
        }
        else{
            if(auth.some((itm)=> itm.password === password && itm.title === title )){
                console.log("You are loggen in as",title)
                router.push('/billing')
                setLoggedIn(title)
                window.sessionStorage.setItem("Role",title)
            }
            else{
                setLoggedIn("None")
                setShowToast(2)
                setTimeout(()=>{
                    setShowToast(0)
                },1500)
            }
        }
    }
    const handleKeyPress = (e, nextInputRef, nextDivRef) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (nextInputRef) {
            nextInputRef.current.focus();
          } else if (nextDivRef) {
            nextDivRef.current.click();
          }
        }
    };
    const nextButtonRef = useRef()

    
  return (
    <div className='flex items-center flex-col justify-center h-[48rem] gap-5 relative'>
        {
            showToast === 1 && (
                <div className='flex items-center justify-center bg-red-500 text-white text-3xl font-semibold'>
                    Please enter all fields before proceeding
                </div>
            )
        }
        <div>Select one of your roles</div>
        <div className='flex flex-row gap-5'>
            {
                auth.map((itm,idx)=>(
                    <div 
                    key={idx}
                    className='border border-black rounded-md p-4  bg-blue-500 hover:bg-blue-400 text-[#FFF] cursor-pointer'
                    onClick={()=>setTitle(itm.title)}
                    >
                        {itm.title}
                    </div>
                ))
            }
        </div>
        {
            title != "" && (
                <div>You are logging as {title} role</div>
            )
        }
        {
            showToast === 2 && (
                <div className='flex items-center justify-center bg-red-500 text-white text-3xl font-semibold'>
                    Wrong Password
                </div>
            )
        }
        <div className='flex flex-row gap-5 mt-8'>
            <div>Enter {title} Password :</div>
            <input
                className='w-[12rem] h-[4rem] p-4 border-2 border-black'
                onChange={(e)=>setPassword(e.target.value)}
                onKeyDown={(e)=>handleKeyPress(e, null, nextButtonRef)}
                type='password'
            />
        </div>

        <div
            ref={nextButtonRef}
            onClick={()=>handleLogin()}
         className='border border-black rounded-md p-4 bg-blue-500 hover:bg-blue-400 absolute bottom-0 text-[#FFF] cursor-pointer'>
            Next
        </div>
    </div>
  )
}

export default LoginForm