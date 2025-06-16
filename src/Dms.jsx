import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Dms() {
  const [dmsList, setDmsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
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
  const [currentDm, setCurrentDm] = useState({
    _id: '',
    name: "",
    district: [],
    contactNo: "",
    email: ""
  });

  // Fetch DMs with pagination
  const getDms = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const result = await axios.get(`${api}/dm?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      
      setDmsList(result.data.data.docs);
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
      setError('Error fetching DMs');
      navigate('/login')
      console.error('Error fetching DMs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDms();
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getDms(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDm({
      ...currentDm,
      [name]: value
    });
  };

  // Add or Update DM
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare district array
      const dmData = {
        ...currentDm,
        district: typeof currentDm.district === 'string' 
          ? currentDm.district.split(',').map(item => item.trim()).filter(item => item)
          : currentDm.district
      };

      let response

      if (isEditMode) {
        // Update existing DM
        dmData.id=dmData._id
     response=await axios.put(`${api}/dm`, dmData, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        console.log(response,"response..........")
      } else {
        // Add new DM
      response=  await axios.post(`${api}/dm`, dmData, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      toast.success(response.data.message)
      // Refresh the list and close modal
      getDms(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving DM:', error);
      toast.error(error.response.data.message)
      setError(`Error ${isEditMode ? 'updating' : 'adding'} DM: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit DM
  const handleEdit = (dm) => {
    setCurrentDm({
      _id: dm._id,
      name: dm.name,
      district: Array.isArray(dm.district) ? dm.district.join(', ') : dm.district,
      contactNo: dm.contactNo,
      email: dm.email
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Delete DM
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this DM?')) {
      try {
        await axios.delete(`${api}/dm/${id}`, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        getDms(pagination.page, pagination.limit); // Refresh the current page
      } catch (error) {
        console.error('Error deleting DM:', error);
        setError('Error deleting DM');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentDm({
      _id: '',
      name: "",
      district: [],
      contactNo: "",
      email: ""
    });
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getDms(1, newLimit);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">DM's List</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">DM's Lists</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New DM
                      </button>
                      <button className="btn btn-light me-2" onClick={() => getDms(pagination.page, pagination.limit)}>
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
                            <option value="2">2 per page</option>

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
                              <th scope="col">District</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Email</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dmsList.map((dm, index) => (
                              <tr key={dm._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{dm.name}</td>
                                <td>
                                  {Array.isArray(dm.district) ? dm.district.join(', ') : dm.district}
                                </td>
                                <td>{dm.contactNo}</td>
                                <td>{dm.email}</td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <a href="#!" className="text-success" onClick={() => handleEdit(dm)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a>
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(dm._id)}>
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

      {/* Add/Edit DM Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="dmModal" 
        tabIndex={-1} 
        aria-labelledby="dmModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dmModalLabel">
                {isEditMode ? 'Edit DM' : 'Add New DM'}
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
                    value={currentDm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="district" className="form-label">District (comma separated)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="district" 
                    name="district"
                    value={currentDm.district}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="text-muted">Enter multiple districts separated by commas</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNo" className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="contactNo" 
                    name="contactNo"
                    value={currentDm.contactNo}
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
                    value={currentDm.email}
                    onChange={handleInputChange}
                    required
                  />
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
  )
}

export default Dms;