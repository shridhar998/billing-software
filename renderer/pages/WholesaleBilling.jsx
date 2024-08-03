import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router';
import SearchDropdown from './SearchDrowpdown';

let names = [
    'Satendra ji Sadhpur',
    'Raju ji Amnour',
    'Raja SP',
    'Shridhar',
    'Dl Shop',
    'Siyaram',
    'PCJ',
    'Huntry',
    '',
    '',
    ''
]

const items = [
    '916 Gold Ornaments',
    '750 Gold Ornaments',
    'Silver Ornaments',
    '916 Jhala',
    '916 Earrings',
    '916 2 kunda',
    '916 Jhumka',
    '916 Bali',
    '916 Churi',
    '916 Har',
    '916 Chain',
    '916 Haiway Chain',
    '916 Nice chain',
    '916 Coy jhumka',
    '916 Dholna',
    '916 GR',
    '916 LR',
    '916 Nathiya',
    '916 Tika',
    '916 Pola',
    '916 M S Lari',
    '916 tana',
    '750 Jhala',
    '750 Earrings',
    '750 2 kunda',
    '750 Jhumka',
    '750 Bali',
    '750 Churi',
    '750 Har',
    '750 Chain',
    '750 Nice chain',
    '750 Coy jhumka',
    '750 Dholna',
    '750 GR',
    '750 LR',
    '750 Nathiya',
    '750 Tika',
    '750 Pola',
    '750 M S Lari',
    '750 tana'
]

function hasMatchingChars(name, searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Ensure case-insensitive search
    for (let i = 0; i < searchTerm.length; i++) {
      if (!name.toLowerCase().includes(searchTerm[i])) {
        return false; // No match if any character is missing
      }
    }
    return true; // All characters found in the name
  }
  
const WholesaleBilling = () => {
    const router = useRouter()
    const [partyName, setPartyName] = useState('')
    const [matchedNames, setMatchedNames] = useState([]);
    const [visibleList, setVisibleList] = useState(false);
    const [bill, setBill] = useState([]);
    const [rows, setRows] = useState(1)
   

  return (
    <div className='flex flex-col min-h-screen'>
        <div className='mt-3 flex flex-row gap-5'>
            <div className='bg-gray-400 text-white hover:text-black cursor-pointer hover:bg-gray-200 text-center block rounded-md p-3' onClick={()=>router.back()}>Go Back</div>
            <h1 className='text-center text-3xl'>WholeSale Billing</h1>
        </div>
        <div className='mx-10 mt-4'>
            <div className='flex flex-row gap-4 items-center'>
                <label>Party Name :</label>
                <input
                 className='border border-gray-500 p-4 text-nowrap rounded-md'
                 value={partyName}
                 onFocus={()=>setVisibleList(true)}
                 onChange={(event)=>{
                    setPartyName(event.target.value)
                    const matches = names.filter((name) => hasMatchingChars(name, event.target.value));
                    // Clear matchedNames if input text is empty
                    if (event.target.value === '') {
                      setMatchedNames([]);
                    } else {
                      setMatchedNames(matches);
                    }
                }}
                />
                {/* <SearchDropdown 
                searchTerm={partyName} 
                setSearchTerm={setPartyName} 
                items={names}
                /> */}
            </div>
            <div className='flex flex-col'>
                {
                    partyName.length > 0 && visibleList && (
                        matchedNames.length > 0 ?
                        matchedNames.map((itm,idx)=>(
                            <div onClick={()=>{
                                setPartyName(itm)
                                setVisibleList(false)
                            }} className='border cursor-pointer hover:bg-gray-500 hover:text-white border-black rounded p-2 w-[20%]' key={idx}>{itm}</div>
                        ))
                        :
                        <div className='flex flex-col gap-1'>
                            
                            <div><i><u>No results found</u></i></div>
                            <div><button className='bg-green-300 cursor-pointer hover:text-white rounded-md p-2'>Add new Party</button></div>
                            
                        </div> 
                    )
                }
            </div>
            <div className='grid grid-cols-6 border-l-2 border-r-2 border-neutral-800 mt-4'>
                {
                    partyName.length > 0 && !visibleList &&
                    <>
                            <div className='col-span-8 grid grid-cols-6 border-t-2 p-2 border-neutral-800'>
                                <div className='col-span-1'>
                                    Item
                                </div>
                                <div className='col-span-1'>
                                    Pcs
                                </div>
                                <div className='col-span-1'>
                                    HUID
                                </div>
                                <div className='col-span-1'>
                                    Weight {"(gm)"}
                                </div>
                                <div className='col-span-1'>
                                    Tunch {"(%)"}
                                </div>
                                <div className='col-span-1'>
                                    Fine {"(F)"}
                                </div>
                            </div>
                            {
                               Array.from({ length: rows }, (_, i) => i).map((itm,idx)=>(
                                <RowComp idx={idx} rows={rows} setRows={setRows} key={idx}/>
                               ))
                            }
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export const RowComp = ({
    idx = 0,
    rows,
    setRows
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pcs, setPcs] = useState(1)
    const [HUID, setHUID] = useState(55)
    const [wt, setWt] = useState()
    const [tunch, setTunch] = useState()
    const [showToast, setShowToast] = useState(false)
    const handleKeyPress = (e, nextInputRef, nextDivRef, prevInputRef, prevDivRef) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (nextInputRef) {
            nextInputRef.current.focus();
          } else if (nextDivRef) {
            nextDivRef.current.click();
          }
        }
        else if(e.key === 'ArrowLeft'){
            e.preventDefault();
          if (prevInputRef) {
            prevInputRef.current.focus();
          } else if (prevDivRef) {
            prevDivRef.current.click();
          }
        }
    };
    const pcsRef = useRef()
    const huidRef = useRef()
    const wtRef = useRef()
    const tunchRef = useRef()
    const fineRef = useRef()
    return(
        <div className='col-span-8 grid grid-cols-6 border-t-2 p-2 border-neutral-800'>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,pcsRef, null,null,null )}>
                <SearchDropdown
                 searchTerm={searchTerm}
                 setSearchTerm={setSearchTerm} 
                 items={items}
                />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, huidRef,null,null,null )}>
                <input
                 ref={pcsRef}
                 type='number'
                 value={pcs}
                 onChange={(e)=>setPcs(e.target.value)}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, wtRef,null,pcsRef,null )}>
                <input
                 ref={huidRef}
                 type='number'
                 value={HUID}
                 onChange={(e)=>setHUID(e.target.value)}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, tunchRef,null, huidRef,null)}>
                <input
                 ref={wtRef}
                 type='number'
                 value={wt}
                 onChange={(e)=>setWt(e.target.value)}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, null, fineRef,wtRef,null)}>
                <input
                 ref={tunchRef}
                 type='number'
                 value={tunch}
                 onChange={(e)=>setTunch(e.target.value)}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div onClick={()=>{
                if(wt > 0 && tunch > 0){
                    setRows(rows=>rows+1)
                }
                else{
                    setShowToast(true);
                    setTimeout(()=>{
                        setShowToast(false)
                    },1500)
                }
            }} className='col-span-1' ref={fineRef}>
                {wt>0 && tunch>0 ? (wt*tunch/100)?.toFixed(2) : "0"}
            </div>
            {
                showToast && (
                    <div className='flex items-center justify-center bg-red-500 text-white text-3xl font-semibold'>
                        Please enter weight and tunch before proceeding
                    </div>
                )
            }
        </div>
    )
}

export default WholesaleBilling

export const RupeeSymbol = () => {
    return(
        <>
        &#8377;
        </>
    )
}