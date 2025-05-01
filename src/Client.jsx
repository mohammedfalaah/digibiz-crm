import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Clients() {
  const [clientsList, setClientsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false
  });
  const TOKEN = localStorage.getItem('digibiztocken');

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    _id: '',
    name: "",
    email: "",
    contactNo: "",
    district: "",
    address: [{
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: ""
    }]
  });

  // Fetch clients with pagination
  const getClients = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const result = await axios.get(`${api}/projects/clients?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      
      setClientsList(result.data.data.docs);
      setPagination({
        page: result.data.data.page,
        limit: result.data.data.limit,
        totalDocs: result.data.data.totalDocs,
        totalPages: result.data.data.totalPages,
        hasPrevPage: result.data.data.hasPrevPage,
        hasNextPage: result.data.data.hasNextPage
      });
      setError(null);
    } catch (error) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getClients(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({
      ...currentClient,
      [name]: value
    });
  };

  // Handle address change
  const handleAddressChange = (index, field, value) => {
    const updatedAddress = [...currentClient.address];
    updatedAddress[index][field] = value;
    setCurrentClient({
      ...currentClient,
      address: updatedAddress
    });
  };

  // Add new address field
  const addAddressField = () => {
    setCurrentClient({
      ...currentClient,
      address: [
        ...currentClient.address,
        { line1: "", line2: "", city: "", state: "", pincode: "" }
      ]
    });
  };

  // Remove address field
  const removeAddressField = (index) => {
    if (currentClient.address.length > 1) {
      const updatedAddress = [...currentClient.address];
      updatedAddress.splice(index, 1);
      setCurrentClient({
        ...currentClient,
        address: updatedAddress
      });
    }
  };

  // Add or Update Client
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing client
        await axios.put(`${api}/projects/clients${currentClient._id}`, currentClient, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Add new client
        await axios.post(`${api}/projects/clients`, currentClient, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Refresh the list and close modal
      getClients(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving client:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} client: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit Client
  const handleEdit = (client) => {
    setCurrentClient({
      _id: client._id,
      name: client.name,
      email: client.email,
      contactNo: client.contactNo,
      district: client.district,
      address: client.address.length > 0 ? client.address : [{
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: ""
      }]
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Delete Client
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`${api}/client/${id}`, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        getClients(pagination.page, pagination.limit); // Refresh the current page
      } catch (error) {
        console.error('Error deleting client:', error);
        setError('Error deleting client');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentClient({
      _id: '',
      name: "",
      email: "",
      contactNo: "",
      district: "",
      address: [{
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: ""
      }]
    });
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getClients(1, newLimit);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Clients List</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Clients List</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Client
                      </button>
                      <button className="btn btn-light me-2" onClick={() => getClients(pagination.page, pagination.limit)}>
                        <i className="mdi mdi-refresh" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {error && (
                  <div className="alert alert-danger m-3">
                    {error}
                  </div>
                )}
                
                {loading ? (
                  <div className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <select 
                            className="form-select" 
                            value={pagination.limit}
                            onChange={handleLimitChange}
                          >
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                            <option value="20">20 per page</option>
                            <option value="50">50 per page</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="table-responsive">
                        <table className="table align-middle dt-responsive nowrap w-100 table-check">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Contact No</th>
                              <th scope="col">District</th>
                              <th scope="col">Address</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clientsList.map((client, index) => (
                              <tr key={client._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.contactNo}</td>
                                <td>{client.district}</td>
                                <td>
                                  {client.address.length > 0 ? (
                                    <>
                                      {client.address[0].line1}, {client.address[0].city}
                                      {client.address.length > 1 && (
                                        <span className="badge bg-info ms-1">+{client.address.length - 1} more</span>
                                      )}
                                    </>
                                  ) : 'N/A'}
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <a href="#!" className="text-success" onClick={() => handleEdit(client)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a>
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(client._id)}>
                                      <i className="mdi mdi-delete font-size-18" />
                                    </a>
                                    <a href={`/clients/${client._id}`} className="text-primary">
                                      <i className="mdi mdi-eye font-size-18" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Pagination */}
                    <div className="card-footer">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <div>Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs} entries</div>
                        </div>
                        <div className="col-md-6">
                          <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-end mb-0">
                              <li className={`page-item ${!pagination.hasPrevPage ? 'disabled' : ''}`}>
                                <button 
                                  className="page-link" 
                                  onClick={() => handlePageChange(pagination.page - 1)}
                                  disabled={!pagination.hasPrevPage}
                                >
                                  Previous
                                </button>
                              </li>
                              
                              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                                <li 
                                  key={pageNum} 
                                  className={`page-item ${pagination.page === pageNum ? 'active' : ''}`}
                                >
                                  <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(pageNum)}
                                  >
                                    {pageNum}
                                  </button>
                                </li>
                              ))}
                              
                              <li className={`page-item ${!pagination.hasNextPage ? 'disabled' : ''}`}>
                                <button 
                                  className="page-link" 
                                  onClick={() => handlePageChange(pagination.page + 1)}
                                  disabled={!pagination.hasNextPage}
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="clientModal" 
        tabIndex={-1} 
        aria-labelledby="clientModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientModalLabel">
                {isEditMode ? 'Edit Client' : 'Add New Client'}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Client Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={currentClient.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={currentClient.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contactNo" className="form-label">Contact Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="contactNo" 
                      name="contactNo"
                      value={currentClient.contactNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="district" className="form-label">District</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="district" 
                      name="district"
                      value={currentClient.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  {currentClient.address.map((addr, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <label htmlFor={`line1-${index}`} className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id={`line1-${index}`}
                              value={addr.line1}
                              onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <label htmlFor={`line2-${index}`} className="form-label">Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id={`line2-${index}`}
                              value={addr.line2}
                              onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 mb-2">
                            <label htmlFor={`city-${index}`} className="form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              id={`city-${index}`}
                              value={addr.city}
                              onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label htmlFor={`state-${index}`} className="form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              id={`state-${index}`}
                              value={addr.state}
                              onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-2">
                            <label htmlFor={`pincode-${index}`} className="form-label">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              id={`pincode-${index}`}
                              value={addr.pincode}
                              onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        {currentClient.address.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => removeAddressField(index)}
                          >
                            Remove Address
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addAddressField}
                  >
                    Add Another Address
                  </button>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default Clients; 