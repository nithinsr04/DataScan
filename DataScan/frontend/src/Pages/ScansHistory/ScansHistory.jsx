import React, { useContext, useEffect } from 'react'
import './ScansHistory.css'
import { Context } from '../../Context/ContextProvider'
import ScanCard from '../../components/ScanCard/ScanCard';

const ScansHistory = () => {

  const { loadData,phiData,piiData,pciData } = useContext(Context);

  useEffect(()=>{
    async function fetchData(){
      await loadData();
    }
    fetchData();
    console.log(piiData);
  },[]);

  return (
    <div className='scans'>
      <h2>Recently scanned documents</h2>
      <div className="pii-div">
          {piiData &&  
              piiData.map((item, index) => (
                <>
                <ScanCard key={index} item={item} index={index} type='PII-Personally Identifiable Information'/>
                <br />
                </>
              )
            )
          }
      </div>
      <div className="pci-div">
      {pciData &&  
              pciData.map((item, index) => (
                <>
                <ScanCard key={index} item={item} index={index} type='PCI-Payment Card Information'/>
                <br />
                </>
              )
            )
          }
      </div>
      <div className="phi-div">
      {phiData &&  
              phiData.map((item, index) => (
                <>
                <ScanCard key={index} item={item} index={index} type='PHI-Protected Health Information'/>
                <br />
                </>
              )
            )
          }
      </div>
    </div>
  )
}

export default ScansHistory
