import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchDropdown from "./SearchDrowpdown";

let names = [
  "Satendra ji Sadhpur",
  "Raju ji Amnour",
  "Raja SP",
  "Shridhar",
  "Dl Shop",
  "Siyaram",
  "PCJ",
  "Huntry",
  "",
  "",
  "",
];

const Ledger = () => {
  const router = useRouter();
  const [partyName, setPartyName] = useState("");
  const [salesReport, setSalesReport] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [showDetails, setShowDetails] = useState("Y")
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/read-json");
      const jsonData = await response.json();
      setSalesReport([...jsonData]);
      console.log("This is me", jsonData);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const date = new Date();
  const dateNow = date.getDate();
  const monthNow = date.getMonth() + 1;
  const yearNow = date.getFullYear();
  const dateStr =
    yearNow.toString() +
    "-" +
    (monthNow > 9 ? monthNow.toString() : "0" + monthNow.toString()) +
    "-" +
    (dateNow > 9 ? dateNow.toString() : "0" + dateNow.toString());
  const [from, setFrom] = useState(dateStr);
  const [to, setTo] = useState(dateStr);
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // month is zero-based in JavaScript Date
  };
  const parseISODate = (dateStr) => {
    return new Date(dateStr); // This works directly for 'yyyy-mm-dd' format
  };

  const handleShowLedger = () => {
    // Parse the date strings into Date objects
    const fromDate = parseISODate(from);
    const toDate = parseISODate(to);

    setFilteredData(salesReport.filter((itm) => {
      // Check if the partyName matches
      const isPartyMatch = itm.partyName === partyName;

      // Parse the item's date string into a Date object
      const itemDate = parseDate(itm.date);

      // console.log(fromDate,toDate,itemDate)

      // Check if the item's date falls within the given range (inclusive)
      const isDateInRange = itemDate >= fromDate && itemDate <= toDate;

      return isPartyMatch && isDateInRange;
    }))
    setShowLedger(true)

    // console.log("Filtered Data:", filteredData);
    // You can now use filteredData as needed, e.g., displaying it in the UI
  };

  return (
    <div className="flex flex-col mt-20 ml-24 min-h-screen gap-4 mr-20">
      {loading ? (
        <div className="flex items-center justify-center rounded-full border-gray-500 border-2">Loading.....</div>
      ) : (
        <>
          <div className="flex justify-start">
            <div
              className="bg-gray-400 text-white hover:text-black cursor-pointer hover:bg-gray-200 text-center block rounded-md p-3"
              onClick={() => router.back()}
            >
              Go Back
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div>Enter Party name</div>
            <SearchDropdown
              searchTerm={partyName}
              setSearchTerm={setPartyName}
              items={names}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div>Enter Start date</div>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div>Enter End date</div>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div>Itemwise Details</div>
            <input
                className="border p-2 rounded-md"
                type="text"
                value={showDetails}
                onChange={(e)=>setShowDetails(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3">
            <div
              onClick={handleShowLedger}
              className="border cursor-pointer border-black rounded-md p-2 hover:bg-gray-300 hover:text-gray-700"
            >
              Show Ledger
            </div>
            <div
              onClick={()=>window.location.reload()}
              className="border cursor-pointer border-black rounded-md p-2 hover:bg-gray-300 hover:text-gray-700"
            >
              Clear Ledger
            </div>
          </div>
          {showLedger && 
            <div className="flex flex-col">
                <div className="flex w-full">
                    <div className='cursor-pointer w-[16.67%] border border-black p-4'>
                        <div>Date</div>
                    </div>
                    <div className='cursor-pointer w-[16.67%] border border-black p-4'>
                        <div>Details</div>
                    </div>
                    <div className='cursor-pointer w-[16.67%] border border-black p-4 '>
                        <div>Credit Fine {"(CR)"}</div>
                    </div>
                    <div className='cursor-pointer w-[16.67%] border border-black p-4 '>
                        <div>Debit Fine {"(DR)"}</div>
                    </div>
                    <div className='cursor-pointer w-[16.67%] border border-black p-4'>
                        <div>Credit Amount</div>
                    </div>
                    <div className='cursor-pointer w-[16.67%] border border-black p-4'>
                        <div>Debit Amount</div>
                    </div>
                </div>
                <div>
                    {
                        filteredData?.map((itm,idx)=>(
                            <div className="flex w-full border-l border-b border-black" key={idx}>
                                <div className="w-[16.67%] p-3 border-r border-black"><div>{itm.date}</div></div>
                                <div className="w-[16.67%] p-2 border-r border-black gap-1">
                                    <div>
                                    {showDetails === "Y" && itm.bill?.map((itm1,idx1)=>(
                                    <div className="text-sm border border-black p-1 mb-1 rounded-md" key={idx1}>
                                        <div>Item : {itm1.item}</div>
                                        <div>Weight : {itm1.wt}</div>
                                        <div>Making : {itm1.mkg}{"%"}</div>
                                        <div>Rate :{itm1.rate}</div>
                                        <div>Amount : {itm1.amount}</div>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                                <div className="w-[16.67%] p-2 border-r border-black"><div>0</div></div>
                                <div className="w-[16.67%] p-2 border-r border-black"><div>0</div></div>
                                <div className="w-[16.67%] p-2 border-r border-black"><div>0</div></div>
                                <div className="w-[16.67%] p-2 border-r border-black"><div>0</div></div>
                            </div>
                        ))
                    }
                </div>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default Ledger;
