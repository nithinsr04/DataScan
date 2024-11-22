import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
            const result = await cloudinary.uploader.upload(req.file.path);
            return result;
        } catch (error) {
            console.error("Cloudinary upload failed: ", error);
            throw new Error('Cloudinary upload failed');
        }
    
};

export default uploadImage;
