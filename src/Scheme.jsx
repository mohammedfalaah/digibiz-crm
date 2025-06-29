import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Axioscall from './services/Axioscall';

function Scheme() {
  const [schemesList, setSchemesList] = useState([]);
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
  const [showItem,setShowItem]=useState("emi")
  const [currentScheme, setCurrentScheme] = useState({
    _id: '',
    schemeName: "",
    downPaymentPercentage: 0,
    totalMonthsOfEMI: 0,
    status: "active",
    isBlocked: false
  });

  // Fetch schemes with pagination
  const getSchemes = async (page = 1, limit = 10) => {
    setLoading(true);
    try {

      const result=await Axioscall('get',`emi?page=${page}&limit=${limit}&type=${showItem}`,{},true)
      
      
      setSchemesList(result.data.data.docs);
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
      setError('Error fetching schemes');
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchemes();
  }, [showItem]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getSchemes(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    
    setCurrentScheme({
      ...currentScheme,
      [name]: value
    });
  };

  // Add or Update Scheme
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing scheme
        await axios.put(`${api}/emi/${currentScheme._id}`, currentScheme, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Add new scheme
        let data 
    if(showItem=='emi'){
    data={
      duration:currentScheme.totalMonthsOfEMI,
      planName:currentScheme.schemeName,
      downPayment:currentScheme.downPaymentPercentage,
      type:"emi",
      breakdown:[
        {
          type:currentScheme.key1,
          percentage:currentScheme.value1
        },
         {
          type:currentScheme.key2,
          percentage:currentScheme.value2
        },
         {
          type:currentScheme.key3,
          percentage:currentScheme.value3
        },
         {
          type:currentScheme.key4,
          percentage:currentScheme.value4
        }
      ]

    }
    }
    else{
      console.log(currentScheme,"current schema")
      data={
        type:"normal",
        breakdown:[

          {
          type:currentScheme.key1,
          percentage:currentScheme.value1
        },
         {
          type:currentScheme.key2,
          percentage:currentScheme.value2
        },
         {
          type:currentScheme.key3,
          percentage:currentScheme.value3
        },
         {
          type:currentScheme.key4,
          percentage:currentScheme.value4
        },
         {
          type:currentScheme.key5,
          percentage:currentScheme.value5
        },
 {
          type:currentScheme.key6,
          percentage:currentScheme.value5
        },
         {
          type:currentScheme.key7,
          percentage:currentScheme.value7
        },
         {
          type:currentScheme.key8,
          percentage:currentScheme.value8
        },
         {
          type:currentScheme.key9,
          percentage:currentScheme.value9
        },
         {
          type:currentScheme.key10,
          percentage:currentScheme.value10
        }
        ]
      }
    }
   
console.log(data,"data")
        await Axioscall('post',"emi",data,true)
      }
      
      // Refresh the list and close modal
      getSchemes(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving scheme:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} scheme: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit Scheme
  const handleEdit = (scheme) => {
    setCurrentScheme({
      _id: scheme._id,
      schemeName: scheme.schemeName,
      downPaymentPercentage: scheme.downPaymentPercentage,
      totalMonthsOfEMI: scheme.totalMonthsOfEMI,
      status: scheme.status,
      isBlocked: scheme.isBlocked
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Delete Scheme
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      try {
        await Axioscall('delete',`emi?id=${id}`,{},true)
        
        getSchemes(pagination.page, pagination.limit);
      } catch (error) {
        console.error('Error deleting scheme:', error);
        setError('Error deleting scheme');
      }
    }
  };

  // Toggle block status
  const toggleBlockStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`${api}/emi/${id}/block`, {
        isBlocked: !currentStatus
      }, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      getSchemes(pagination.page, pagination.limit);
    } catch (error) {
      console.error('Error toggling block status:', error);
      setError('Error updating block status');
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentScheme({
      _id: '',
      schemeName: "",
      downPaymentPercentage: 0,
      totalMonthsOfEMI: 0,
      status: "active",
      isBlocked: false
    });
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getSchemes(1, newLimit);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Schemes List</h4>
              </div>
            </div>
          </div>


                                       <ul class="nav nav-pills bg-light rounded mb-2" role="tablist">
                                            <li onClick={()=>setShowItem("emi")} class="nav-item">
                                                <a style={{width:"80px"}} class="nav-link active" data-bs-toggle="tab" href="#transactions-all-tab" role="tab">Emi</a>
                                            </li>
                                            <li onClick={()=>setShowItem("normal")} class="nav-item">
                                                <a style={{width:"80px",textAlign:"center"}} class="nav-link" data-bs-toggle="tab" href="#transactions-buy-tab" role="tab">Normal</a>
                                            </li>
                                           
                                        </ul>
          
          {/* end page title */}
          {showItem=="emi"?(
               <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Emi Schemes List</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Scheme
                      </button>
                      <button className="btn btn-light me-2" onClick={() => getSchemes(pagination.page, pagination.limit)}>
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
                              <th scope="col">Scheme Name</th>
                              <th scope="col">Down Payment (%)</th>
                              <th scope="col">Total Months of EMI</th>
                              {/* <th scope="col">Status</th> */}
                              {/* <th scope="col">Block Status</th> */}
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schemesList.map((scheme, index) => (
                              <tr key={scheme._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{scheme.planName}</td>
                                <td>{scheme.downPayment}%</td>
                                <td>{scheme.duration}</td>
                                {/* <td>
                                  <span className={`badge bg-${scheme.status === 'active' ? 'success' : 'warning'}`}>
                                    {scheme.status}
                                  </span>
                                </td> */}
                                {/* <td>
                                  <div className="form-check form-switch">
                                    <input 
                                      type="checkbox" 
                                      className="form-check-input" 
                                      checked={scheme.isBlocked}
                                      onChange={() => toggleBlockStatus(scheme._id, scheme.isBlocked)}
                                    />
                                    <label className="form-check-label">
                                      {scheme.isBlocked ? 'Blocked' : 'Active'}
                                    </label>
                                  </div>
                                </td> */}
                                <td>
                                  <div className="d-flex gap-3">
                                    {/* <a href="#!" className="text-success" onClick={() => handleEdit(scheme)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a> */}
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(scheme._id)}>
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

          ):(
                <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Normal Schemes List</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Scheme
                      </button>
                      <button className="btn btn-light me-2" onClick={() => getSchemes(pagination.page, pagination.limit)}>
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
                              <th scope="col">Scheme Name</th>
                              {schemesList[0]?.breakdown?.map((item)=>(
                              <th scope="col">{item.type}</th>
    
                              ))}
                             <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schemesList.map((scheme, index) => (
                              <tr key={scheme._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{scheme.planName}</td>

                                {schemesList[0]?.breakdown?.map((item)=>(
                                <td>{item?.percentage} %</td>

                                ))}
                              
                                {/* <td>
                                  <span className={`badge bg-${scheme.status === 'active' ? 'success' : 'warning'}`}>
                                    {scheme.status}
                                  </span>
                                </td> */}
                                {/* <td>
                                  <div className="form-check form-switch">
                                    <input 
                                      type="checkbox" 
                                      className="form-check-input" 
                                      checked={scheme.isBlocked}
                                      onChange={() => toggleBlockStatus(scheme._id, scheme.isBlocked)}
                                    />
                                    <label className="form-check-label">
                                      {scheme.isBlocked ? 'Blocked' : 'Active'}
                                    </label>
                                  </div>
                                </td> */}
                                <td>
                                  <div className="d-flex gap-3">
                                    {/* <a href="#!" className="text-success" onClick={() => handleEdit(scheme)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a> */}
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(scheme._id)}>
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
          )}
       
        </div>
      </div>

      {/* Add/Edit Scheme Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="schemeModal" 
        tabIndex={-1} 
        aria-labelledby="schemeModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="schemeModalLabel">
                {isEditMode ? 'Edit Scheme' : 'Add New Scheme'}
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
              {showItem=="emi"?(
  <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="schemeName" className="form-label">Scheme Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="schemeName" 
                    name="schemeName"
                    value={currentScheme.schemeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="downPaymentPercentage" className="form-label">Down Payment Percentage</label>
                  <div className="input-group">
                    <input 
                      type="number" 
                      className="form-control" 
                      id="downPaymentPercentage" 
                      name="downPaymentPercentage"
                      min="0"
                      max="100"
                      value={currentScheme.downPaymentPercentage}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="totalMonthsOfEMI" className="form-label">Total Months of EMI</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="totalMonthsOfEMI"
                    min="1"
                    value={currentScheme.totalMonthsOfEMI}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                 
              <hr width="100%" color='black'/>
                  <label htmlFor="totalMonthsOfEMI" className="form-label">Down payment Divisions</label>
                <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key1"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value1"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key2"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value2"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key3"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value3"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key4"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value4"
                    onChange={handleInputChange}
                    required
                  />
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
              ):(
                  <form onSubmit={handleSubmit}>
                <label htmlFor="totalMonthsOfEMI" className="form-label">Total key</label>
                <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key1"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value1"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key2"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value2"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key3"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value3"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                  <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key4"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value4"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>

                   <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key5"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value5"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>

                   <div className="mb-3">
                  <div className='d-flex'>
                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key6"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value6"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
              

                 <div className="mb-3">
                
                  <div  className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key7"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value7"
                    onChange={handleInputChange}
                    required
                  />
                  </div>

   <div className="mb-3 mt-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key8"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value8"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
              

                 <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key9"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value9"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                </div>
                 <div className="mb-3">
                  <div className='d-flex'>

                  <input 
                  placeholder='Key'
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="key10"
                    onChange={handleInputChange}
                    required
                  />
                   <input 
                   placeholder='%'
                   style={{width:"40px",marginLeft:"5px"}}
                    type="text" 
                    className="form-control" 
                    id="totalMonthsOfEMI" 
                    name="value10"
                    onChange={handleInputChange}
                    required
                  />
                  </div>
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
              )}
            
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default Scheme;