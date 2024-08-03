import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchDropdown from "./SearchDrowpdown";

const ReceiptPayment = () => {
    const [mode, setMode] = useState('Receipt');
    const router = useRouter();
    const [partyName, setPartyName] = useState("");
    const [salesReport, setSalesReport] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState("Y")
    
  return (
    <div>ReceiptPayment</div>
  )
}

export default ReceiptPayment