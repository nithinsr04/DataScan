import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext(null);

const ContextProvider = (props) =>{

    const backendUrl = 'http://localhost:4000'
    const [phiData,setPhiData] = useState([]);
    const [piiData,setPiiData] = useState([]);
    const [pciData,setPciData] = useState([]);


    const loadData = async() => {
        try {
            const PHI = await axios.get(`${backendUrl}/api/scans/phi`);
            const PII = await axios.get(`${backendUrl}/api/scans/pii`);
            const PCI = await axios.get(`${backendUrl}/api/scans/pci`);
            setPhiData(PHI.data.data)
            setPciData(PCI.data.data)
            setPiiData(PII.data.data)
            console.log(piiData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(()=>{
        loadData();
    },[])
    

    const contextValue ={
        phiData,
        piiData,
        pciData,
        backendUrl,
        loadData
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;
