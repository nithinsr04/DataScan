import './DeleteScans.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../Context/ContextProvider';

const DeleteScans = () => {

  const {backendUrl} = useContext(Context)
  const [selectedCollection, setSelectedCollection] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchRecords = async (collection) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/scans/${collection.toLowerCase()}`);
      console.log(response);
      setRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${backendUrl}/api/delete/${selectedCollection}/${id}`,{headers:{type:selectedCollection}});
      if (response.data.success) {
        alert(response.data.message);
        fetchRecords(selectedCollection); 
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionChange = (e) => {
    const collection = e.target.value;
    setSelectedCollection(collection);
    if (collection) fetchRecords(collection);
  };

  return (
    <div className="delete-page">
      <div><h1>Delete Records</h1></div>

      { loading && <div className="pop-up"><div className="spinner"></div> <p>please wait..</p> </div> }

      <div className='selection-dropdown'>
        <label htmlFor="collection">Select Collection:</label>
        <select id="collection" onChange={handleCollectionChange} value={selectedCollection}>
          <option value="">--Select Collection--</option>
          <option value="PHI">PHI</option>
          <option value="PCI">PCI</option>
          <option value="PII">PII</option>
        </select>
      </div>

      {loading && <p>Loading records...</p>}
      {!loading && records.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Field Value</th>
              <th>Sensitive Info</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>{record.fieldName}</td>
                <td>{record.fieldValue}</td>
                <td>{record.sensitiveInfo}</td>
                <td>{new Date(record.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(record._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && records.length === 0 && <p>No records found.</p>}
    </div>
  );
};

export default DeleteScans;

