import { PHI,PCI,PII } from "../models/Sensitivedata.js";
import cloudinary from "../config/cloudinary.js"


const deletePhiScan = async(req,res) => {
    try {
        const record = await PHI.findById({_id: req.params.id});
        if(!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        const result = await deleteImageByUrl(record.fileUrl);
        const deleted = await PHI.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({ success:true,message: "Scan deleted successfully" });
                
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:true,message: "Error deleting scan" });
    }
}

const deletePciScan = async(req,res) => {
    try {
        const record = await PCI.findById({_id: req.params.id});
        if(!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        const result = await deleteImageByUrl(record.fileUrl);
        const deleted = await PCI.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({ success:true,message: "Scan deleted successfully" });
                
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:true,message: "Error deleting scan" });
    }
}

const deletePiiScan = async(req,res) => {
    try {
        const record = await PII.findById({_id: req.params.id});
        if(!record) {
            return res.status(404).json({ message: "Record not found" });
        }
        const result = await deleteImageByUrl(record.fileUrl);
        const deleted = await PII.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({ success:true,message: "Scan deleted successfully" });
                
    } catch (error) {
        console.log(error);
        res.status(500).json({ success:true,message: "Error deleting scan" });
    }
}

const extractPublicId = (url) =>{
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i; 
    const match = url.match(regex);
    return match ? match[1] : null;
};


const deleteImageByUrl = async(url) =>{
    const public_id = extractPublicId(url);
    if (!public_id) {
        throw new Error('Invalid Cloudinary URL');
    }

    try {
        const result = cloudinary.uploader.destroy(public_id);
        console.log('Delete result:', result);
        return result;    
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}



export { deletePhiScan, deletePiiScan, deletePciScan };