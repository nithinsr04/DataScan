import { PHI,PCI,PII } from "../models/Sensitivedata.js";
const getPciData = async(req,res)=>{
    try {
        const response = await PCI.find({});
        res.send({success:true,data:response});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:error.message});
    }
}

const getPiiData = async(req,res)=>{
    try {
        const response = await PII.find({});
        res.send({success:true,data:response});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:error.message});
    }
}

const getPhiData = async(req,res)=>{
    try {
        const response = await PHI.find({});
        res.send({success:true,data:response});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:error.message});
    }
}

export {getPiiData,getPciData,getPhiData};