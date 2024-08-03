import React, {useState, useRef} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Billing = () => {
    const router = useRouter()
    const divRefs = useRef([]); // Array to store refs for each div
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
    const selectedIndex = useRef(0); // Tracks currently focused div index
    const [tab, setTab] = useState(0);

    const handleClick = (text) => {
        console.log('Clicked : ',text)
        if(text === 'Sale'){
            setTab(1)
        }
        else if(text === 'Purchase'){
            setTab(2)
        }
        else if(text === 'Report'){
            setTab(3)
        }
        else if(text === 'Settings'){
            setTab(4)
        }
        else if(text === 'Maintenance'){
            setTab(5)
        }
    }
    const handleKeyDown = (event) => {
        const newIndex = selectedIndex.current;
        switch (event.key) {
          case 'ArrowLeft':
            selectedIndex.current = Math.max(newIndex - 1, 0); // Move left (handle boundary)
            break;
          case 'ArrowRight':
            selectedIndex.current = Math.min(newIndex + 1, divRefs.current.length - 1); // Move right (handle boundary)
            break;
          case 'Enter':
            if (newIndex < 6) { // Check if focusing a div with dropdown (first 6 elements)
              setShowDropdown(!showDropdown); // Toggle dropdown visibility
            } else {
              handleClick(divRefs.current[newIndex].textContent); // Handle click for other divs
            }
            break;
          default:
            break;
        }
      };

  return (
    <div className='flex flex-col mt-1 mx-2'>
        <div className='flex w-full'>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='cursor-pointer w-[16.67%] border border-black p-4 hover:bg-gray-300'>
                <div>Sale</div>
            </div>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='cursor-pointer w-[16.67%] border border-black p-4 hover:bg-gray-300'>
                <div>Purchase</div>
            </div>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='cursor-pointer w-[16.67%] border border-black p-4 hover:bg-gray-300'>
                <div>Report</div>
            </div>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='cursor-pointer w-[16.67%] border border-black p-4 hover:bg-gray-300'>
                <div>Settings</div>
            </div>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='cursor-pointer w-[16.67%] border border-black p-4 hover:bg-gray-300'>
                <div>Maintenance</div>
            </div>
            <Link href={'/home'}>
            <div onClick={(e)=>handleClick(e.currentTarget.textContent)} className='border w-[16.67%] border-black p-4 cursor-pointer hover:bg-gray-300'> 
             
             logout
             
            </div>
            </Link>
        </div>
        {
            tab !== 0 && 
            (
                <div className='flex w-full' onMouseLeave={()=>setTab(0)}>
                    <div className='w-[16.67%]'>
                    {
                        tab === 1 && (
                            
                                <div className={`flex flex-col`}>
                                    <div onClick={()=>router.push('/WholesaleBilling')} className='flex-grow p-4 cursor-pointer border border-black'>Whole Sale</div>
                                    <div onClick={()=>router.push('/RetailsaleBilling')} className='flex-grow p-4 cursor-pointer border border-black'>Retail Sale</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Receipt Payment</div>
                                </div>
                        )
                    }
                    </div>
                    <div className='w-[16.67%]'>
                    {
                        tab === 2 && (
                            
                                <div className={`flex flex-col`}>
                                    <div onClick={()=>router.push('/PurchaseBilling')}  className='flex-grow p-4 cursor-pointer border border-black'>Gold Purchase</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>s</div>
                                </div>
                        )
                    }
                    </div>
                    <div className='w-[16.67%]'>
                    {
                        tab === 3 && (
                                <div className={`flex flex-col`}>
                                    <div onClick={()=>router.push('/Ledger')} className='flex-grow p-4 cursor-pointer border border-black'>Account Ledger</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Partywise Balance</div>
                                </div>
                        )
                    }
                    </div>
                    <div className='w-[16.67%]'>
                    {
                        tab === 4 && (
                            
                                <div className={`flex flex-col`}>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Add Account</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Modify Account</div>
                                </div>
                            
                        )
                    }
                    </div>
                    <div className='w-[16.67%]'>
                    {
                        tab === 5 && (
                                <div className={`flex flex-col`}>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 1</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 2</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 3</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 4</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 5</div>
                                </div>
                        )
                    }
                    </div>
                    <div className='w-[16.67%]'>
                    {
                        tab === 6 && (
                                <div className={`flex flex-col`}>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 1</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 2</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 3</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 4</div>
                                    <div className='flex-grow p-4 cursor-pointer border border-black'>Option 5</div>
                                </div>
                        )
                    }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Billing