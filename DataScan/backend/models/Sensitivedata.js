
import mongoose from "mongoose";

const pciSchema = new mongoose.Schema({
    fieldName: {type: String,required: true},
    fieldValue: {type: String,required: true},
    sensitiveInfo: {type: String,default: "info"},
    fileUrl: {type: String,required: true,},
    createdAt: {type: Date,default: Date.now}
});

const phiSchema = new mongoose.Schema({
    fieldName: {type: String,required: true},
    fieldValue: {type: String,required: true},
    sensitiveInfo: {type: String,default: "info"},
    fileUrl: {type: String,required: true,},
    createdAt: {type: Date,default: Date.now}
});

const piiSchema = new mongoose.Schema({
    fieldName: {type: String,required: true},
    fieldValue: {type: String,required: true},
    sensitiveInfo: {type: String,default: "info"},
    fileUrl: {type: String,required: true,},
    createdAt: {type: Date,default: Date.now}
});

const PCI = mongoose.model("PCI", pciSchema);
const PHI = mongoose.model("PHI", phiSchema);
const PII = mongoose.model("PII", piiSchema);
export {PCI,PII,PHI};
