import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Axioscall from './services/Axioscall';


function Emi() {
  const [emiList, setEmiList] = useState([]);
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

  // Date filter state
  const [dateFilter, setDateFilter] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  // Modal states
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmi, setCurrentEmi] = useState({
    _id: '',
    planName: "",
    duration: "",
    interestRate: "",
    processingFee: "",
    status: "active"
  });

  // Fetch EMI plans with pagination and date filter
  const getEmiPlans = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const result = await Axioscall(
        'get', 
        `monthly-emi/month-wise?page=${page}&limit=${limit}&month=${dateFilter.month}&year=${dateFilter.year}`,
        {},
        true
      );
      console.log(result?.data?.data?.docs,"result")
      if(result?.data?.data?.docs.length>0){
        setEmiList(result.data.data.docs);
      }
      else{
        setEmiList([])
      }
      
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
      setError('Error fetching EMI plans');
      console.error('Error fetching EMI plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmiPlans();
  }, [dateFilter]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getEmiPlans(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmi({
      ...currentEmi,
      [name]: value
    });
  };

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter({
      ...dateFilter,
      [name]: value
    });
  };

  // Add or Update EMI Plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing EMI plan
        await Axioscall('put', `emi/${currentEmi._id}`, currentEmi, true);
      } else {
        // Add new EMI plan
        await Axioscall('post', 'emi', currentEmi, true);
      }
      
      // Refresh the list and close modal
      getEmiPlans(pagination.page, pagination.limit);
      setShowEmiModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving EMI plan:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} EMI plan: ${error.response?.data?.message || error.message}`);
    }
  };

  // View EMI Details
  const handleView = (emi) => {
    setCurrentEmi(emi);
    setShowViewModal(true);
  };

  // Edit EMI
//   const handleEdit = (emi) => {
//     setCurrentEmi({
//       _id: emi._id,
//       planName: emi.planName,
//       duration: emi.duration,
//       interestRate: emi.interestRate,
//       processingFee: emi.processingFee,
//       status: emi.status
//     });
//     setIsEditMode(true);
//     setShowEmiModal(true);
//   };

  // Delete EMI
const generateBill = (id) => {
  if (!id) {
    setError('Invalid ID');
    return;
  }

  const url = `${api}/monthly-emi/report?id=${id}`;
  window.open(url, '_blank'); 
};



  // Reset form
  const resetForm = () => {
    setCurrentEmi({
      _id: '',
      planName: "",
      duration: "",
      interestRate: "",
      processingFee: "",
      status: "active"
    });
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getEmiPlans(1, newLimit);
  };

  // Generate month options
  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" }
  ];

  // Generate year options (current year and next 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">EMI Plans</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Monthly EMI </h5>
                    <div className="flex-shrink-0">
                      {/* <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowEmiModal(true);
                        }}
                      >
                        Add New EMI Plan
                      </button> */}
                      <button className="btn btn-light me-2" onClick={() => getEmiPlans(pagination.page, pagination.limit)}>
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
                        <div className="col-md-3">
                          <select
                            className="form-select"
                            name="month"
                            value={dateFilter.month}
                            onChange={handleDateFilterChange}
                          >
                            {months.map(month => (
                              <option key={month.value} value={month.value}>{month.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <select
                            className="form-select"
                            name="year"
                            value={dateFilter.year}
                            onChange={handleDateFilterChange}
                          >
                            {years.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="table-responsive">
                        <table className="table align-middle dt-responsive nowrap w-100 table-check">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Client Name</th>
                              <th scope="col">District</th>
                              <th scope="col">Dm name</th>
                              <th scope="col">Due date</th>
                              <th scope="col">Emi Amount</th>
                              <th scope="col">Payment Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emiList.map((emi, index) => (
                              <tr key={emi._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{emi.userId.name}</td>
                                <td>{emi.districtManager.district}</td>
                                <td>{emi.districtManager.name}</td>
                                <td>{new Date(emi.dueDate).toLocaleDateString('en-GB')}</td>                                 <td>{emi.monthlyEmiAmount}</td>
                                <td>
                                  <span className={`badge bg-${emi.status === 'paid' ? 'success' : 'warning'} p-1`}>
                                    {emi.status.toUpperCase()}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    {/* <a href="#!" className="text-success" onClick={() => handleEdit(emi)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a> */}
                                     {/* <a href="" className="text-primary" onClick={() => handleView(emi)}>
                                      <i className="mdi mdi-eye font-size-18" />
                                    </a> */}
                                    {emi.status=='paid'&&(  <a href="" className="text-danger" onClick={() => generateBill(emi._id)}>
                                   <button className='btn btn-secondary btn-sm'>Print bill</button>
                                    </a>)}
                                  
                                   
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

      {/* Add/Edit EMI Modal */}
      <div 
        className={`modal fade ${showEmiModal ? 'show' : ''}`} 
        style={{ display: showEmiModal ? 'block' : 'none' }}
        id="emiModal" 
        tabIndex={-1} 
        aria-labelledby="emiModalLabel" 
        aria-hidden={!showEmiModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="emiModalLabel">
                {isEditMode ? 'Edit EMI Plan' : 'Add New EMI Plan'}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => {
                  setShowEmiModal(false);
                  resetForm();
                }}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="planName" className="form-label">Plan Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="planName" 
                    name="planName"
                    value={currentEmi.planName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration (months)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="duration" 
                    name="duration"
                    value={currentEmi.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="interestRate" 
                    name="interestRate"
                    value={currentEmi.interestRate}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="processingFee" className="form-label">Processing Fee (%)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="processingFee" 
                    name="processingFee"
                    value={currentEmi.processingFee}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={currentEmi.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setShowEmiModal(false);
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

      {/* View EMI Details Modal */}
      <div 
        className={`modal fade ${showViewModal ? 'show' : ''}`} 
        style={{ display: showViewModal ? 'block' : 'none' }}
        id="viewModal" 
        tabIndex={-1} 
        aria-labelledby="viewModalLabel" 
        aria-hidden={!showViewModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">EMI Plan Details</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowViewModal(false)}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-12">
                  <h6>Plan Name</h6>
                  <p>{currentEmi.planName}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>Duration</h6>
                  <p>{currentEmi.duration} months</p>
                </div>
                <div className="col-md-6">
                  <h6>Interest Rate</h6>
                  <p>{currentEmi.interestRate}%</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>Processing Fee</h6>
                  <p>{currentEmi.processingFee}%</p>
                </div>
                <div className="col-md-6">
                  <h6>Status</h6>
                  <p>
                    <span className={`badge bg-${currentEmi.status === 'active' ? 'success' : 'danger'}`}>
                      {currentEmi.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for modals */}
      {(showEmiModal || showViewModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </>
  );
}

export default Emi;