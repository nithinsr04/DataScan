import React,{useState, useEffect, useContext} from 'react'
import './Upload.css'
import axios from 'axios';
import {Context} from "../../Context/ContextProvider"

const Upload = () => {

  const { backendUrl } = useContext(Context);

  const [selectedImage,setSelectedImage] = useState(null);
  const [imageData,setImageData] = useState("");
  const [textResult,setTextResult] = useState("");
  const [loading,setLoading] = useState(false);

  const AnalyseImage = async(e) => {
    if(selectedImage){
      setLoading(true);

      try {
       
        const formData = new FormData();
        formData.append("file", selectedImage); 
        
        const response = await axios.post(`${backendUrl}/api/analyse/image`,formData,{headers:{"Content-Type": "multipart/form-data"}});

        if (!response.success) {
            alert(response.data.message);
        }
        
        console.log(response);
        setImageData(response.data.text[0]);
        setTextResult(response.data.info || "Couldn't be identified!"); 
    } catch (error) {
        console.error("Error analyzing image:", error.message);
        setTextResult("Error analyzing image");
    } finally {
      
        setLoading(false); 
    }

    }else{
      setSelectedImage(null);
      setTextResult("");
    } 
  }

  return (
    <div className='upload'>
      <div className='input-section'>
        <h1>Image Scanner</h1>
        <p>An online image Scanner extract text from images.</p>
          <div className="image-wrapper">
            <label htmlFor="upload" className="upload-label">
              Upload Image
            </label>
            <input 
              type="file" 
              id="upload" 
              accept="image/*" 
              onChange={(e) => setSelectedImage(e.target.files[0])} 
              className="upload-input" 
            />
          {selectedImage && (
              <div className="image-preview">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            )}
          </div>
      </div>
      <button  type="submit" onClick={AnalyseImage} className="add-btn">Identify</button>
      <div className="result">
        { textResult && 
        <div className="box-image">
          <img src={URL.createObjectURL(selectedImage) || imageData.fileUrl} alt="thumb*" />
        </div> }
        { loading && <div className="pop-up"><div className="spinner"></div> <p>processing image..</p> </div> }
        { textResult && 
        <div className="box-p">
          <h2>{imageData.type}</h2>
          <h3>{imageData.fieldName}</h3>
          <h3>{imageData.fieldValue}</h3>
          <h4>Info in the Image: </h4>
          <p>{textResult}</p>
        </div> }
      </div>
    </div>
  )
}

export default Upload
