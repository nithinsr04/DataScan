
const pciRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b/; // Credit Card
const ssnRegex = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/; // Social Security Number
const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN Card
const aadhaarRegex = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}$/; //Aadhaar
const medicalRecordRegex = /mr[0-9]{5,6}/; // Example: Prefix-based medical record (customize as needed)
const medicalTestRegex = /mr(\d+)\s?(mg\/dl|mmHg|%|mL\/hr)?/i; // Medical Test Results
const healthInsuranceRegex = /mr\bH\d{9}\b/;

const classifyText = (textArray)=> {
    console.log(textArray);

    const classifiedResults = textArray.map(text => {
        if (aadhaarRegex.test(text)) {
            return { type: 'PII', fieldName: "Aadhaar", value: text };
        } else if (pciRegex.test(text)) {
            return { type: 'PCI', fieldName: "Credit/Debit", value: text };
        } else if (panCardRegex.test(text)) {
            return { type: 'PII', fieldName: "PAN CARD", value: text };
        } else if (ssnRegex.test(text)) {
            return { type: 'PII', fieldName: "SSN", value: text };
        } else if (medicalRecordRegex.test(text)) {
            return { type: 'PHI', fieldName: "Medical Record", value: text };
        } else if (medicalTestRegex.test(text)) { 
            return { type: 'PHI', fieldName: "Medical Test Record", value: text };
        } else if (healthInsuranceRegex.test(text)) {
            return { type: 'PHI', fieldName: "Health Insurance", value: text };
        }
        return null; 
    }).filter(item => item !== null); 

   
    return classifiedResults;
}


export default classifyText;




