import React from 'react'
import './ScanCard.css';  

const ScanCard = ({ item, index,type }) => {
  return (
    <div key={index} className="card-item">
      <figure>
        <img 
          src={item.fileUrl} 
          alt="Scan Image" 
        />
        <div className="content">
          <blockquote>
            <p><strong>INFO: </strong>{item.sensitiveInfo}</p> 
          </blockquote>
          <figcaption className="figcaption">
            <div className='field-type'>
              {type}
            </div>
            <div className="field-name">
              {item.fieldName}
            </div>
            <div className="field-value">
              {item.fieldValue}
            </div>
            <div className="created-at">
              {item.createdAt}
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

export default ScanCard;
