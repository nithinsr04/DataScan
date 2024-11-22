import Textract from "../config/aws.js";
import classifyText from "./ClassificationController.js";
import uploadImage from "./uploadcontroller.js";
import fs from 'fs'
import { PHI,PCI,PII } from "../models/Sensitivedata.js";

const AnalyseImage = async (req, res) => {
  try {

    const cloudinaryResponse = await uploadImage(req);
    const imagePath = req.file.path;


    const imageBytes = fs.readFileSync(imagePath);

    const params = {
      Document: {
        Bytes: imageBytes,
      },
    };

    const data = await Textract.detectDocumentText(params).promise();

    if (data && data.Blocks) {
        const extractedText = [];

        // Loop through the blocks and extract the text from each line
        data.Blocks.forEach((block) => {
          if (block.BlockType === "LINE") {
            extractedText.push(block.Text);
          }
        });
        
        const classifiedtext = classifyText(extractedText);
        const fullExtractedText = extractedText.join(' ');
        const savedData = await addRecordInfo(classifiedtext,fullExtractedText,cloudinaryResponse.secure_url);
        if(!savedData.success){
            return res.status(500).send({success:false,message:savedData.message});
        }
        console.log(classifiedtext);

      res.status(200).json({
        success:true,
        message: "Text extracted saved and successfully",
        text:classifiedtext,
        info: fullExtractedText,
        imageUrl: cloudinaryResponse.secure_url, 
      });
    } else {
      res.status(400).json({ success:false,message: "No text detected in the image" });
    }
  } catch (error) {
    console.error("Error processing the image: ", error);
    res.status(500).json({ success:false,message: "Error analyzing the image" });
  }
};

const addRecordInfo = async(classifiedtext,fullExtractedText,secure_url) =>{
    try {
        console.log(classifiedtext);
            const { type, fieldName, value: fieldValue } = classifiedtext[0];

            if (type === 'PCI') {
                const newEntry = new PCI({
                    fieldName,
                    fieldValue,
                    sensitiveInfo: fullExtractedText,
                    fileUrl: secure_url,
                });
                await newEntry.save();
            } else if (type === 'PHI') {
                const newEntry = new PHI({
                    fieldName,
                    fieldValue,
                    sensitiveInfo: fullExtractedText,
                    fileUrl: secure_url,
                });
                await newEntry.save();
            } else if (type === 'PII') {
                const newEntry = new PII({
                    fieldName,
                    fieldValue,
                    sensitiveInfo: fullExtractedText,
                    fileUrl: secure_url,
                });
                await newEntry.save();
            } else {
                console.error(`Unknown type: ${type}. Skipping.`);
            }

            return { success: true, message: "All classified text has been saved successfully." };
    } catch (error) {
        console.error("Error saving classified text: ", error);
        return { success: false, message: "An error occurred while saving classified text." };
    }
};


export default AnalyseImage;
