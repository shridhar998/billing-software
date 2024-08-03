import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router';
import SearchDropdown from './SearchDrowpdown';
import { RupeeSymbol } from './WholesaleBilling';
import { addCommas, numberToWords } from '../utils/utils';
import { MdDeleteOutline } from "react-icons/md";
import CustomerForm from './CustomerForm';



let tempNames = [
    'Satendra ji Sadhpur',
    'Raju ji Amnour',
    'Raja SP',
    'Shridhar',
    'Dl Shop',
    'Siyaram',
    'PCJ',
    'Huntry'
]

const tempItems = [
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
      if (!name?.toLowerCase()?.includes(searchTerm[i])) {
        return false; // No match if any character is missing
      }
    }
    return true; // All characters found in the name 
  }


const RetailsaleBilling = () => {
    const router = useRouter()
    const [salesReport, setSalesReport] = useState([])
    const [loading,setLoading] = useState(false)
    const [partyName, setPartyName] = useState('')
    const [matchedNames, setMatchedNames] = useState([]);
    const [visibleList, setVisibleList] = useState(false);
    const [bill, setBill] = useState([]);
    const [billno, setBillno] = useState(1)
    const [pdfUrl, setPdfUrl] = useState(null);
    const [items, setItems] = useState(tempItems)
    const [names, setNames] = useState(tempNames)
    const [showModal, setShowModal] = useState(false);
    const [addCustomer, setAddCustomer] = useState({})
    const date = new Date()
    const dateNow = date.getDate();
    const monthNow = date.getMonth() + 1;
    const yearNow = date.getFullYear();
    const billnoRef = useRef(billno);

    useEffect(() => {
        billnoRef.current = billno;
    }, [billno]);
    const [dateStr, setDateStr] = useState((dateNow>9 ? dateNow.toString() : "0" + dateNow.toString())+ "/" + ( monthNow>9 ? monthNow.toString() : "0" + monthNow.toString() )+ "/" + yearNow.toString())

    const fetchAllStock = async() => {
        try {
            const res = await fetch('/api/read-stock-json')
            const jsonData = await res.json();
            setItems([
                ...jsonData
            ])
            //console.log("Items fetched : ",[...jsonData])
        } catch (error) {
            console.error('Error reading JSON file:', error);
        }
    }

    const fetchAllParties = async () => {
        try {
            const res = await fetch('/api/read-party-json')
            const jsonData = await res.json();
            setNames(jsonData.map((itm)=>itm.partyName))
            //console.log("Names fetched : ",jsonData.map((itm)=>itm.partyName))
        } catch (error) {
            console.error('Error reading JSON file:', error);
        }
    }
    const fetchData = async () => {
        setLoading(true)
       try {
         const response = await fetch('/api/read-json');
         const jsonData = await response.json();
         setSalesReport([
          ...jsonData
         ]);
         setBillno(jsonData.length + 1)
         //console.log("This is me",jsonData)
       } catch (error) {
         console.error('Error reading JSON file:', error);
       } finally{
        setLoading(false)
       }
     };
     const writeJsonData = async (itm) => {
        const jsonData = [...salesReport, itm]; // Replace with your data
    
        try {
          const response = await fetch('/api/write-json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          });
    
          const responseData = await response.json();
          //console.log('JSON data written successfully:', responseData);
          //handleSuccess()
        } catch (error) {
          console.error('Error writing JSON file:', error);
        }
      };
      const updateJsonData = async () => {
        const jsonData = [...salesReport]; // Replace with your data
    
        try {
          const response = await fetch('/api/write-json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          });
    
          const responseData = await response.json();
          //console.log('JSON data written successfully:', responseData);
          //handleSuccess()
        } catch (error) {
          console.error('Error writing JSON file:', error);
        }
      };

     useEffect(()=>{
        fetchData()
        fetchAllStock()
        fetchAllParties()
     },[])

    // Define the function to be executed on "Page Up" key press
    const handlePageUp = async() => {
        console.log('Page Up key pressed');
        // Add your specific function logic here
        const response = await fetch('/api/read-json');
        const jsonData = await response.json();
        const currentBillno = billnoRef.current;
        console.log("Inside pg up function", currentBillno - 2);

        if (currentBillno > 2) {
            console.log(jsonData[currentBillno - 2]);
            setBill(jsonData[currentBillno - 2].bill);
            setBillno(jsonData[currentBillno - 2]?.bill_no);
            setPartyName(jsonData[currentBillno - 2]?.partyName);
            setDateStr(jsonData[currentBillno - 2]?.date);
        }
    };

    useEffect(() => {
        // Define the keyup event handler
        const handleKeyUp = (event) => {
            if (event.key === 'PageUp') {
                console.log("Before pg up function",billnoRef.current-2)
                handlePageUp();
            }
        };

        // Add the event listener for keyup events
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    function handleOpenModal(){
        setShowModal(true)
    }

    const handleSavePdf = async() => {
        const payload = {
            bill_no: billno,
            partyName : partyName,
            bill : bill,
            sgst : (bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            cgst : (bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            amount : addCommas(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0))),
            date : dateStr,
            amount_words : numberToWords(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0))),
        }
        const res = await fetch('/api/edit-pdf', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        handleSaveBill()
        if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            // Create a link element, set the download attribute and click it
            const link = document.createElement('a');
            link.href = url;
            link.download = `${partyName}-bill.pdf`; // Specify the desired filename here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Failed to edit PDF');
        }
        
    }
    const handleSaveBill = async() => {
        const billnoExists = salesReport.some(report => report.bill_no === billno)
       // console.log("Bill No Exists : ",billnoExists, billno)
        const writePayload = {
            bill_no: billno,
            partyName : partyName,
            bill : bill,
            sgst : parseFloat(bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            cgst : parseFloat(bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            amount : parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0)),
            date : dateStr,
            amount_words : numberToWords(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0))),
        }
        if(billnoExists){
           // console.log("Bill No Exists and bill is : ",writePayload)
            const idx = salesReport.findIndex(report => report.bill_no === billno)
            let tempReport  = salesReport
            tempReport[idx] = writePayload;
            console.log("updated data.json : ",idx,tempReport)
            setSalesReport(tempReport)
            updateJsonData().then((res)=>{
                setBill([])
                // setBillno(billno=>billno+1)
                setPartyName('')
                fetchData()
            })
        }
        else{
            writeJsonData(writePayload).then((res)=>{
                setBill([])
                // setBillno(billno=>billno+1)
                setPartyName('')
                fetchData()
            })
        }
        
    }
    const handlePrintBill = async(e) => {
        e.preventDefault();
        const payload = {
            bill_no: billno,
            partyName : partyName,
            bill : bill,
            sgst : (bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            cgst : (bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.015).toFixed(2),
            amount : addCommas(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0))),
            date : dateStr,
            amount_words : numberToWords(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0))),
        }
        const res = await fetch('/api/edit-pdf', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        handleSaveBill()
        if (res.ok) {
            const blob = await res.blob();
            const file = new Blob([blob], { type: 'application/pdf' });

            // Use FileReader to read blob into a data URL
            const fileReader = new FileReader();
            fileReader.onloadend = function () {
                const pdfData = fileReader.result;
                const win = window.open();
                win.document.write('<iframe src="' + pdfData + '" width="100%" height="100%"></iframe>');
                win.document.write('<script>window.onload = function() { window.print(); }</script>');
            };
            fileReader.readAsDataURL(file);
        } else {
            console.error('Failed to print PDF');
        }
    }

  return (
    <div className='flex flex-col min-h-screen'>
        <div className='mt-3 flex flex-row gap-5'>
            <div className='bg-gray-400 text-white hover:text-black cursor-pointer hover:bg-gray-200 text-center block rounded-md p-3' onClick={()=>router.back()}>Go Back</div>
            <h1 className='text-center text-3xl'>Retail Sale Billing</h1>
            <div className='text-center text-3xl fixed right-[21rem] border border-black rounded-md p-1'> 
                Bill No : {billno}
            </div>
            <div className='text-center text-3xl fixed right-12 border border-black rounded-md p-1'> 
                Date : {dateStr}
            </div>
        </div>
        {
            showModal ? 
            <>
            <CustomerForm 
             setShowModal={setShowModal}
             setAddCustomer={setAddCustomer}
            />
            </>
            :
            <div className='mx-10 mt-4'>
            <div className='flex flex-row gap-4 items-center'>
                <label>Customer Name :</label>
                {/* <input
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
                /> */}
                <SearchDropdown 
                searchTerm={partyName} 
                setSearchTerm={setPartyName} 
                items={names}
                isParty={true}
                />
            </div>
            <div className='flex flex-col'>
                <div><button onClick={handleOpenModal} className='bg-green-300 cursor-pointer hover:text-white rounded-md p-2'>Add new Party</button></div>     
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
                                    Making Charges {"(pc or %)"}
                                </div>
                                <div className='col-span-1'>
                                    Weight {"(gm)"}
                                </div>
                                <div className='col-span-1'>
                                    Rate
                                </div>
                                <div className='col-span-1'>
                                    Amount
                                </div>
                            </div>
                            {
                               bill.length > 0 &&
                               bill.map((itm,idx)=>(
                                <RowComp
                                 itm={itm}
                                 idx={idx} 
                                 bill={bill}
                                 setBill={setBill}
                                 key={idx}
                                 isActive={false}
                                 items={items}
                                />
                               ))
                            }
                            <RowCompActive
                            isActive={true}
                            bill={bill}
                            setBill={setBill}
                            items={items}
                            />
                    </>
                }
            </div>
            {
                partyName.length > 0 && !visibleList &&
                <div>
                    <div className='ml-[50%] mt-[10%] p-3 border border-black rounded-md gap-2'>
                   <div>
                   GST {"3% (CGST 1.5% + SGST 1.5%) :"}
                    <span className='ml-8'>
                    {
                        (bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 0.03).toFixed(2)
                    }
                    </span>
                    </div>
                    <div className='font-bold'>
                   Total Payable Amount :
                    <span className='ml-8'>
                        <RupeeSymbol/>
                    {
                        addCommas(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0)))
                    }
                    </span>
                    </div>
                    <div className='font-bold'>In words : {numberToWords(parseInt((bill.reduce((prev, curr)=> prev + parseFloat(curr.amount) , 0) * 1.03).toFixed(0)))}</div>
                    </div>
                    <div className='flex flex-row gap-7 justify-center mt-6'>
                        <div onClick={handleSaveBill} className='py-1 px-1 cursor-pointer text-lg border border-black rounded-md hover:bg-gray-300 hover:text-white'>Save and Screen</div>
                        <div onClick={handlePrintBill} className='py-1 px-1 cursor-pointer text-lg border border-black rounded-md hover:bg-gray-300 hover:text-white'>Save and Print</div>
                        <div onClick={handleSavePdf} className='py-1 px-1 cursor-pointer text-lg border border-black rounded-md hover:bg-gray-300 hover:text-white'>Save and PDF</div>
                        <div onClick={()=>router.back()} className='py-1 px-5 cursor-pointer text-lg border border-black rounded-md hover:bg-gray-300 hover:text-white'>Exit</div>
                    </div>
                    
                </div>
            }
        </div>
        }
    </div>
  )
}

const RowCompActive = ({
    bill,
    setBill,
    isActive,
    items = []
}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [pcs, setPcs] = useState(1)
    const [mkgWay,setMkgWay] = useState("%")
    const [mkg, setMkg] = useState()
    const [wt, setWt] = useState()
    const [rate, setRate] = useState()


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
    const dropdownRef = useRef()
    const pcsRef = useRef()
    const mkgWayRef = useRef()
    const mkgRef = useRef()
    const wtRef = useRef()
    const rateRef = useRef()
    const fineRef = useRef()
        return(
            <div className='col-span-8 grid grid-cols-6 border-t-2 p-2 border-neutral-800'>
                <div ref={dropdownRef} className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,pcsRef, null,null,null )}>
                    <SearchDropdown
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm} 
                     items={items}
                    />
                </div>
                <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,mkgRef,null,null,dropdownRef)}>
                    <input
                     ref={pcsRef}
                     type='number'
                     value={pcs}
                     onChange={(e)=>setPcs(e.target.value)}
                     className='p-2 border border-gray-300 rounded'
                     />
                </div>
                <div className='col-span-1 flex flex-row' onKeyDown={(e)=>handleKeyPress(e, wtRef,null,pcsRef,null )}>
                    <select className='border border-gray-300 rounded' onChange={(e)=>setMkgWay(e.target.value)}>
                        <option>{"%"}</option>
                        <option>pc</option>
                    </select>
                    <input
                     ref={mkgRef}
                     type='number'
                     value={mkg}
                     onChange={(e)=>setMkg(parseFloat(e.target.value))}
                     className='p-2 border border-gray-300 rounded w-[70%]'
                     />
                </div>
                <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,rateRef ,null, mkgRef,null)}>
                    <input
                     ref={wtRef}
                     type='number'
                     value={wt}
                     onChange={(e)=>setWt(parseFloat(e.target.value))}
                     className='p-2 border border-gray-300 rounded'
                     />
                </div>
                <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, null, fineRef,wtRef,null)}>
                    <input
                     ref={rateRef}
                     type='number'
                     value={rate}
                     onChange={(e)=>setRate(parseFloat(e.target.value))}
                     className='p-2 border border-gray-300 rounded'
                     />
                </div>
                <div onClick={()=>{
                    if(wt > 0 && rate > 0){
                        let arr = [
                            ...bill,
                            {
                                idx : bill.length,
                                item : searchTerm,
                                pcs : pcs,
                                wt : wt,
                                mkg :mkg,
                                rate : rate,
                                amount : ((wt * (100+mkg) * rate)/100)?.toFixed(0),
                            }
                        ]
                        setSearchTerm('')
                        setPcs(1)
                        setWt(0)
                        setMkg(0)
                        setRate(0)
                        setBill(arr)
                        console.log("From RowCompActive",arr);
    
                    }
                    else{
                        setShowToast(true);
                        setTimeout(()=>{
                            setShowToast(false)
                        },1500)
                    }
                }} className='col-span-1 flex flex-row items-center gap-10' ref={fineRef}>
                     <RupeeSymbol/>
                    {wt>0 && rate > 0 
                    ? mkgWay === '%'?
                    addCommas(((wt * (100+mkg) * rate)/100)?.toFixed(0)) : 
                    (0)
                    : 
                     "0"}
                    
                </div>
                {
                    showToast && (
                        <div className='fixed right-[40%] bg-red-500 text-white text-3xl font-semibold whitespace-normal p-4'>
                            Please enter weight and rate before proceeding
                        </div>
                    )
                }
            </div>
        )
}

export const RowComp = ({
    idx = 0,
    itm = {},
    bill = [],
    setBill,
    isActive,
    items = []
}) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [pcs, setPcs] = useState(1)
    const [mkgWay,setMkgWay] = useState("%")
    const [mkg, setMkg] = useState()
    const [wt, setWt] = useState()
    const [rate, setRate] = useState()

    useEffect(()=>{
        if(itm && !isActive){
            setSearchTerm(itm.item)
            setPcs(itm.pcs)
            setWt(itm.wt)
            setMkg(itm.mkg)
            setRate(itm.rate)
        }
    },[itm])


    useEffect(()=>{
        let tempBill = bill
        let temp = {
            idx : idx,
            item : searchTerm,
            pcs : pcs,
            wt : wt,
            mkg :mkg,
            rate : rate,
            amount : ((wt * (100+mkg) * rate)/100)?.toFixed(0),
        }
        tempBill[idx] = temp
        setBill(tempBill)
        console.log("useEffect ran due to updation in between : ",tempBill)
    },[searchTerm,pcs,mkg,wt,rate])
    
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
    const mkgWayRef = useRef()
    const mkgRef = useRef()
    const wtRef = useRef()
    const rateRef = useRef()
    const fineRef = useRef()

    const deleteRow = (id) => {
        let tempBill = bill;
        tempBill = tempBill.filter((itm)=>itm.idx !== id).map((itm,idx)=>({
            idx : idx,
            item : itm.item,
            pcs : itm.pcs,
            wt : itm.wt,
            mkg :itm.mkg,
            rate : itm.rate,
            amount : itm.amount
        }))
        console.log("From delete of RowComp",tempBill)
        setBill(tempBill)
    }
    return(
        <div className='col-span-8 grid grid-cols-6 border-t-2 p-2 border-neutral-800'>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,pcsRef, null,null,null )}>
                <SearchDropdown
                 searchTerm={searchTerm}
                 setSearchTerm={setSearchTerm} 
                 items={items}
                />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,mkgRef,null,null,null )}>
                <input
                 ref={pcsRef}
                 type='number'
                 value={pcs}
                 onChange={(e)=>setPcs(e.target.value)}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div className='col-span-1 flex flex-row' onKeyDown={(e)=>handleKeyPress(e, wtRef,null,pcsRef,null )}>
                <select className='border border-gray-300 rounded' onChange={(e)=>setMkgWay(e.target.value)}>
                    <option>{"%"}</option>
                    <option>pc</option>
                </select>
                <input
                 ref={mkgRef}
                 type='number'
                 value={mkg}
                 onChange={(e)=>setMkg(parseFloat(e.target.value))}
                 className='p-2 border border-gray-300 rounded w-[70%]'
                 />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e,rateRef ,null, mkgRef,null)}>
                <input
                 ref={wtRef}
                 type='number'
                 value={wt}
                 onChange={(e)=>setWt(parseFloat(e.target.value))}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div className='col-span-1' onKeyDown={(e)=>handleKeyPress(e, null, fineRef,wtRef,null)}>
                <input
                 ref={rateRef}
                 type='number'
                 value={rate}
                 onChange={(e)=>setRate(parseFloat(e.target.value))}
                 className='p-2 border border-gray-300 rounded'
                 />
            </div>
            <div onClick={()=>{
            }} className='col-span-1 flex flex-row items-center gap-10' ref={fineRef}>
                 <RupeeSymbol/>
                {wt>0 && rate > 0 
                ? mkgWay === '%'?
                addCommas(((wt * (100+mkg) * rate)/100)?.toFixed(0)) : 
                (0)
                : 
                 "0"}
                <div className='scale-150 cursor-pointer rounded-md hover:bg-gray-300 p-1' onClick={()=>{
                    deleteRow(itm.idx)
                }}><MdDeleteOutline/></div>
            </div>
            {
                showToast && (
                    <div className='fixed right-[40%] bg-red-500 text-white text-3xl font-semibold whitespace-normal p-4'>
                        Please enter weight and rate before proceeding
                    </div>
                )
            }
        </div>
    )
}

export default RetailsaleBilling