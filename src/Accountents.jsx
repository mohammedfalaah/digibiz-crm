import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';

function Accountants() {
  const [accountantsList, setAccountantsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [currentAccountant, setCurrentAccountant] = useState({
    _id: '',
    name: "",
    email: "",
    contactNo: "",
    district: [] // Changed to array for multiple districts
  });
  const [currentDistrictInput, setCurrentDistrictInput] = useState(""); // New state for district input

  // Fetch Accountants with pagination
  const getAccountants = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const result = await axios.get(`${api}/accounts?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      
      setAccountantsList(result.data.data.docs);
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
      setError('Error fetching accountants');
      console.error('Error fetching accountants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccountants();
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getAccountants(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccountant({
      ...currentAccountant,
      [name]: value
    });
  };

  // Handle district input change
  const handleDistrictInputChange = (e) => {
    setCurrentDistrictInput(e.target.value);
  };

  // Add district to the list
  const addDistrict = () => {
    if (currentDistrictInput.trim() && !currentAccountant.district.includes(currentDistrictInput.trim())) {
      setCurrentAccountant({
        ...currentAccountant,
        district: [...currentAccountant.district, currentDistrictInput.trim()]
      });
      setCurrentDistrictInput("");
    }
  };

  // Remove district from the list
  const removeDistrict = (districtToRemove) => {
    setCurrentAccountant({
      ...currentAccountant,
      district: currentAccountant.district.filter(district => district !== districtToRemove)
    });
  };

  // Add or Update Accountant
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing accountant
        currentAccountant.id=currentAccountant._id
        await axios.put(`${api}/accounts`, currentAccountant, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Add new accountant
        delete currentAccountant._id
        await axios.post(`${api}/accounts`, currentAccountant, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Refresh the list and close modal
      getAccountants(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving accountant:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} accountant: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit Accountant
  const handleEdit = (accountant) => {
    setCurrentAccountant({
      _id: accountant._id,
      name: accountant.name,
      email: accountant.email,
      contactNo: accountant.contactNo,
      district: accountant.district || [] // Ensure district is an array
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Delete Accountant
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this accountant?')) {
      try {
        await axios.delete(`${api}/accounts?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        getAccountants(pagination.page, pagination.limit); // Refresh the current page
      } catch (error) {
        console.error('Error deleting accountant:', error);
        setError('Error deleting accountant');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentAccountant({
      _id: '',
      name: "",
      email: "",
      contactNo: "",
      district: []
    });
    setCurrentDistrictInput("");
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getAccountants(1, newLimit);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Accountants List</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Accountants</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Accountant
                      </button>
                      <button className="btn btn-light me-2" onClick={() => getAccountants(pagination.page, pagination.limit)}>
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
                              <th scope="col">contactNo</th>
                              <th scope="col">district</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountantsList.map((accountant, index) => (
                              <tr key={accountant._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{accountant.name}</td>
                                <td>{accountant.email}</td>
                                <td>{accountant.contactNo}</td>
                                <td>
                                  {accountant.district?.join(", ")}
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <a href="#!" className="text-success" onClick={() => handleEdit(accountant)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a>
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(accountant._id)}>
                                      <i className="mdi mdi-delete font-size-18" />
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

      {/* Add/Edit Accountant Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="accountantModal" 
        tabIndex={-1} 
        aria-labelledby="accountantModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="accountantModalLabel">
                {isEditMode ? 'Edit Accountant' : 'Add New Accountant'}
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
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={currentAccountant.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={currentAccountant.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNo" className="form-label">contactNo</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="contactNo" 
                    name="contactNo"
                    value={currentAccountant.contactNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="district" className="form-label">Districts</label>
                  <div className="input-group mb-2">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="districtInput"
                      value={currentDistrictInput}
                      onChange={handleDistrictInputChange}
                      placeholder="Add district"
                    />
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={addDistrict}
                    >
                      Add
                    </button>
                  </div>
                  {currentAccountant?.district?.map((item)=>(<>{item},</>))}
                  <div className="d-flex flex-wrap gap-2">
                    {currentAccountant.district.map((district, index) => (
                      <span key={index} className="badge bg-primary">
                        {district}
                        <button 
                          type="button" 
                          className="ms-2 btn-close btn-close-white" 
                          onClick={() => removeDistrict(district)}
                          aria-label="Remove"
                          style={{ fontSize: '0.5rem' }}
                        />
                      </span>
                    ))}
                  </div>
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

export default Accountants;