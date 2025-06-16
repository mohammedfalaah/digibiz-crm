import React, { useState, useEffect } from 'react';
import { FaUpload, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import Axioscall from './services/Axioscall';

function ProfilePage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleFile, setRescheduleFile] = useState(null);
  const [uploadCategory, setUploadCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const TOKEN = localStorage.getItem('digibiztocken');

  // Sample profile data - replace with actual API call
  const [profileData, setProfileData] = useState({
    name: "Muhammed Fazil PM",
    phone: "9526788138",
    email: "fazilfezz@gmail.com",
    projectStatus: "Active",
    emiAmount: "₹5,000",
    emiStatus: "Paid",
    profileImage: "https://via.placeholder.com/150",
    stages: [
      {
        id: 1,
        name: "Initial Payment",
        date: "2023-01-15",
        status: "Completed",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Foundation Work",
        date: "2023-02-20",
        status: "Completed",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Structure Work",
        date: "2023-04-10",
        status: "In Progress",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Finishing Work",
        date: "2023-06-01",
        status: "Pending",
        image: null,
      },
    ],
  });

  // Fetch profile data - implement actual API call
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // const response = await Axioscall('get', 'profile', {}, true);
      // setProfileData(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching profile data');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRescheduleFileUpload = (e) => {
    setRescheduleFile(e.target.files[0]);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement actual upload logic
      // await Axioscall('post', 'upload', { image: selectedImage, category: uploadCategory }, true);
      setShowUploadModal(false);
      setSelectedImage(null);
      setUploadCategory("");
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement actual reschedule logic
      // await Axioscall('put', 'reschedule', { date: rescheduleDate, file: rescheduleFile }, true);
      setShowRescheduleModal(false);
      setRescheduleDate("");
      setRescheduleFile(null);
    } catch (error) {
      console.error('Error rescheduling:', error);
      setError('Error rescheduling project');
    }
  };

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Client Profile</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Profile Information</h5>
                    <div className="flex-shrink-0">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => setShowUploadModal(true)}
                      >
                        <FaUpload className="me-2" />
                        Upload
                      </button>
                      <button 
                        className="btn btn-warning" 
                        onClick={() => setShowRescheduleModal(true)}
                      >
                        <FaCalendarAlt className="me-2" />
                        Reschedule
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
                  <div className="card-body">
                    <div className="row">
                      {/* Profile Image and Basic Info */}
                      <div className="col-md-4 text-center">
                        {/* <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="img-fluid rounded-circle mb-3"
                          style={{ width: "150px", height: "150px" }}
                        /> */}
                        <h4>{profileData.name}</h4>
                        <p className="text-muted">{profileData.email}</p>
                      </div>

                      {/* Profile Details */}
                      <div className="col-md-8">
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <h6>Phone</h6>
                              <p>{profileData.phone}</p>
                            </div>
                            <div className="mb-3">
                              <h6>Project Status</h6>
                              <span className={`badge ${
                                profileData.projectStatus === "Active"
                                  ? "bg-success"
                                  : profileData.projectStatus === "Completed"
                                  ? "bg-primary"
                                  : "bg-warning"
                              }`}>
                                {profileData.projectStatus}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <h6>EMI Amount</h6>
                              <p>{profileData.emiAmount}</p>
                            </div>
                            <div className="mb-3">
                              <h6>EMI Status</h6>
                              <span className={`badge ${
                                profileData.emiStatus === "Paid"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}>
                                {profileData.emiStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Stages Table */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <h5 className="card-title">Project Stages</h5>
                        <div className="table-responsive">
                          <table className="table align-middle dt-responsive nowrap w-100 table-check">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Stage Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Image</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profileData.stages.map((stage) => (
                                <tr key={stage.id}>
                                  <td>{stage.id}</td>
                                  <td>{stage.name}</td>
                                  <td>{stage.date}</td>
                                  <td>
                                    <span className={`badge ${
                                      stage.status === "Completed"
                                        ? "bg-success"
                                        : stage.status === "In Progress"
                                        ? "bg-warning"
                                        : "bg-secondary"
                                    }`}>
                                      {stage.status}
                                    </span>
                                  </td>
                                  <td>
                                    {stage.image ? (
                                      <img
                                        src={stage.image}
                                        alt="Stage"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          window.open(stage.image, "_blank")
                                        }
                                      />
                                    ) : (
                                      "No image"
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Image Modal */}
      <div 
        className={`modal fade ${showUploadModal ? 'show' : ''}`} 
        style={{ display: showUploadModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload Image</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedImage(null);
                }}
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleUploadSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="stage">Project Stage 1</option>
                    <option value="document">Project Stage 1</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUpload" className="form-label">
                    Select Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                </div>
                {selectedImage && (
                  <div className="mb-3 text-center">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedImage(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <div
        className={`modal fade ${showRescheduleModal ? 'show' : ''}`}
        style={{ display: showRescheduleModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reschedule Project</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleDate("");
                  setRescheduleFile(null);
                }}
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleRescheduleSubmit}>
                <div className="mb-3">
                  <label htmlFor="rescheduleDate" className="form-label">
                    New Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="rescheduleDate"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rescheduleFile" className="form-label">
                    Supporting Document (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="rescheduleFile"
                    onChange={handleRescheduleFileUpload}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setRescheduleDate("");
                      setRescheduleFile(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for modals */}
      {(showUploadModal || showRescheduleModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </>
  );
}

export default ProfilePage;