import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Table  } from 'react-bootstrap';
import Axioscall from './services/Axioscall';
import moment from 'moment';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[showEmi,setShowEmi]=useState(false)
  const [type,setType]=useState("")
  const [emiData ,setEmiData]=useState("")
  const navigate = useNavigate();
  const[emiHistoryData,setEmiHistoryData]=useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false
  });
  const TOKEN = localStorage.getItem('digibiztocken');
  let decodedData=jwtDecode(TOKEN)
  let role=decodedData.role
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    _id: '',
    name: "",
    startedDate: "",
    status: "active", 
    scheme: "",
    district: "",
    handledDM: "",
    handledAccountant: "",
    isBlocked: false
  });

  // Fetch projects with pagination
  const getProjects = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const result = await axios.get(`${api}/projects?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      
      setProjectsList(result.data.data.docs);
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
      setError('Error fetching projects');
    //   navigate('/login');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHistory=async(id)=>{
    try {
      let data=await Axioscall('get',`monthly-emi/history?projectId=${id}`,{},true)
      console.log(data,"datasss")
      setEmiHistoryData(data.data.data)
      setType("history")
      setShowEmi(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getProjects(newPage, pagination.limit);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({
      ...currentProject,
      [name]: value
    });
  };

  // Add or Update Project
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Update existing project
        await axios.put(`${api}/project/${currentProject._id}`, currentProject, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Add new project
        await axios.post(`${api}/project`, currentProject, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Refresh the list and close modal
      getProjects(pagination.page, pagination.limit);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      setError(`Error ${isEditMode ? 'updating' : 'adding'} project: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit Project
  const handleEdit = (project) => {
    setCurrentProject({
      _id: project._id,
      name: project.name,
      startedDate: project.startedDate,
      status: project.status,
      scheme: project.scheme,
      district: project.district,
      handledDM: project.handledDM,
      handledAccountant: project.handledAccountant,
      isBlocked: project.isBlocked
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // Delete Project
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${api}/project/${id}`, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        });
        getProjects(pagination.page, pagination.limit); // Refresh the current page
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Error deleting project');
      }
    }
  };

let viewEmi=async(id)=>{
  try {
    let data=await Axioscall('get',`monthly-emi/project-emi?projectId=${id}`,{},true)
    setEmiData(data.data.data[0])
    console.log(data.data.data[0],"data")
    setType("emi")
    setShowEmi(true)
    
  } catch (error) {
    console.log(error)
  }
}

  // Toggle block status
  const toggleBlockStatus = async (id, currentStatus) => {
    try {
     
      const newStatus = currentStatus === 'blocked' ? 'unblock' : 'block';
  
      await axios.put(`${api}/projects/status`, {
        projectId: id,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
  
      // Refresh the project list after successful status toggle
      getProjects(pagination.page, pagination.limit);
  
    } catch (error) {
      console.error('Error toggling block status:', error?.response?.data || error.message);
      setError('Failed to update project status. Please try again.');
    }
  };
  

  // Reset form
  const resetForm = () => {
    setCurrentProject({
      _id: '',
      name: "",
      startedDate: "",
      status: "active",
      scheme: "",
      district: "",
      handledDM: "",
      handledAccountant: "",
      isBlocked: false
    });
    setIsEditMode(false);
  };

  // Change items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    getProjects(1, newLimit);
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Projects List</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Projects List</h5>
                    <div className="flex-shrink-0">
                      {/* <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Project
                      </button> */}
                      <button className="btn btn-light me-2" onClick={() => getProjects(pagination.page, pagination.limit)}>
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
                              <th scope="col">Project Id</th>
                              <th scope="col">Status</th>
                                {/* <th scope="col">Scheme</th> */}
                              <th scope="col">District</th>
                              {/* <th scope="col">Handled DM</th> */}
                              {role="superadmin"&&(                             
                       <th scope="col">Handled DM</th>)}
                              <th scope="col">Block Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectsList.map((project, index) => (
                              <tr key={project._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{project?.clientDetails?.name}</td>
                                <td>{project?.projectCode}</td>
                                <td>
                                  <span className={`badge p-1 bg-${project.status === 'blocked' ? 'danger' : project.status === 'in progress' ? 'primary' : 'warning'}`}>
                                    {project.status}
                                  </span>
                                </td>
                                {/* <td>{project.planName}</td> */}
                                <td>{project.districtManager.district}</td>
                                <td>{project.districtManager.name}</td>
                                {/* <td>{project.handledAccountant}</td> */}
                               {role='admin'&&( <td>
                                  <div className="form-check form-switch">
                                    <input 
                                      type="checkbox" 
                                      className={`form-check-input ${project.status=='blocked' ? 'bg-danger' : ''} `} 
                                      checked={project.status==='blocked'}
                                      onChange={() => toggleBlockStatus(project._id, project.status)}
                                    />
                                    <label className="form-check-label">
                                      {project.status=='blocked' ? 'Blocked' : 'Active'}
                                    </label>
                                  </div>
                                </td>)}
                                <td>
                                  <div className="d-flex gap-3">
                                    {/* <a href="#!" className="text-success" onClick={() => handleEdit(project)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a> */}
                                    {/* <a href="#!" className="text-danger" onClick={() => handleDelete(project._id)}>
                                      <i className="mdi mdi-delete font-size-18" />
                                    </a> */}
                                    <a onClick={()=>viewEmi(project._id)} className=" btn btn-primary btn-sm">
                                    View Emi
                                    </a>
                                     {/* <a onClick={()=>getHistory(project._id)} className=" btn btn-warning btn-sm">
                                    Emi history
                                    </a> */}
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

      {/* Add/Edit Project Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="projectModal" 
        tabIndex={-1} 
        aria-labelledby="projectModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="projectModalLabel">
                {isEditMode ? 'Edit Project' : 'Add New Project'}
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
                  <label htmlFor="name" className="form-label">Project Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={currentProject.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startedDate" className="form-label">Started Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="startedDate" 
                    name="startedDate"
                    value={currentProject.startedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={currentProject.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="scheme" className="form-label">Scheme</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="scheme" 
                    name="scheme"
                    value={currentProject.scheme}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="district" className="form-label">District</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="district" 
                    name="district"
                    value={currentProject.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="handledDM" className="form-label">Handled DM</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="handledDM" 
                    name="handledDM"
                    value={currentProject.handledDM}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="handledAccountant" className="form-label">Handled Accountant</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="handledAccountant" 
                    name="handledAccountant"
                    value={currentProject.handledAccountant}
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
   <Modal size={type=="history"?"lg":'sm'} show={showEmi} onHide={() => setShowEmi(false)}>
      <Modal.Header closeButton>
        <Modal.Title>EMI Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'emi' && emiData ? (
          <div className="space-y-2">
            <p><strong>Monthly EMI Amount:</strong> ₹{emiData.monthlyEmiAmount}</p>
            <p><strong>Status:</strong> {emiData.status}</p>
            <p><strong>EMI Date:</strong> {moment(emiData.emiDate).format('YYYY-MM-DD HH:mm')}</p>
            <p><strong>Due Date:</strong> {moment(emiData.dueDate).format('YYYY-MM-DD')}</p>
            <p><strong>Paid Date:</strong> {emiData.paidDate ? moment(emiData.paidDate).format('YYYY-MM-DD') : '—'}</p>
            <p><strong>Created At:</strong> {moment(emiData.createdAt).format('YYYY-MM-DD')}</p>
          </div>
        ) : type === 'history' && emiHistoryData.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI Amount (₹)</th>
                <th>Status</th>
                <th>EMI Date</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {emiHistoryData.map((emi, index) => (
                <tr key={emi._id || index}>
                  <td>{moment(emi.emiDate).format('MMMM YYYY')}</td>
                  <td>{emi.monthlyEmiAmount}</td>
                  <td>{emi.status}</td>
                  <td>{moment(emi.emiDate).format('YYYY-MM-DD')}</td>
                  <td>{moment(emi.dueDate).format('YYYY-MM-DD')}</td>
                  <td>{emi.paidDate ? moment(emi.paidDate).format('YYYY-MM-DD') : '—'}</td>
                  <td>{moment(emi.createdAt).format('YYYY-MM-DD')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No EMI data available.</p>
        )}
      </Modal.Body>
    </Modal>
    </>
  );
}

export default Projects;