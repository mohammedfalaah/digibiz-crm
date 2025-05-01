import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
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
  const [currentProject, setCurrentProject] = useState({
    _id: '',
    name: "",
    startedDate: "",
    status: "active", // active, completed, blocked
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
      const result = await axios.get(`${api}/project?page=${page}&limit=${limit}`, {
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

  // Toggle block status
  const toggleBlockStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`${api}/project/${id}/block`, {
        isBlocked: !currentStatus
      }, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      getProjects(pagination.page, pagination.limit);
    } catch (error) {
      console.error('Error toggling block status:', error);
      setError('Error updating block status');
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
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                      >
                        Add New Project
                      </button>
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
                              <th scope="col">Started Date</th>
                              <th scope="col">Status</th>
                              <th scope="col">Scheme</th>
                              <th scope="col">District</th>
                              <th scope="col">Handled DM</th>
                              <th scope="col">Handled Accountant</th>
                              <th scope="col">Block Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectsList.map((project, index) => (
                              <tr key={project._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{project.name}</td>
                                <td>{new Date(project.startedDate).toLocaleDateString()}</td>
                                <td>
                                  <span className={`badge bg-${project.status === 'active' ? 'success' : project.status === 'completed' ? 'primary' : 'warning'}`}>
                                    {project.status}
                                  </span>
                                </td>
                                <td>{project.scheme}</td>
                                <td>{project.district}</td>
                                <td>{project.handledDM}</td>
                                <td>{project.handledAccountant}</td>
                                <td>
                                  <div className="form-check form-switch">
                                    <input 
                                      type="checkbox" 
                                      className="form-check-input" 
                                      checked={project.isBlocked}
                                      onChange={() => toggleBlockStatus(project._id, project.isBlocked)}
                                    />
                                    <label className="form-check-label">
                                      {project.isBlocked ? 'Blocked' : 'Active'}
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <a href="#!" className="text-success" onClick={() => handleEdit(project)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a>
                                    <a href="#!" className="text-danger" onClick={() => handleDelete(project._id)}>
                                      <i className="mdi mdi-delete font-size-18" />
                                    </a>
                                    <a href={`/projects/${project._id}`} className="text-primary">
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
    </>
  );
}

export default Projects;