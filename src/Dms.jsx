import React, { useState } from 'react';

function Dms() {
  // Dummy data for DMs table
  const [dmsList, setDmsList] = useState([
    {
      id: 1,
      name: "John Doe",
      district: "Central",
      phone: "123-456-7890",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      district: "Eastern",
      phone: "234-567-8901",
      email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Robert Johnson",
      district: "Western",
      phone: "345-678-9012",
      email: "robert.j@example.com"
    },
    {
      id: 4,
      name: "Emily Davis",
      district: "Northern",
      phone: "456-789-0123",
      email: "emily.d@example.com"
    },
    {
      id: 5,
      name: "Michael Wilson",
      district: "Southern",
      phone: "567-890-1234",
      email: "michael.w@example.com"
    }
  ]);

  // State for Add DM modal
  const [showModal, setShowModal] = useState(false);
  const [newDm, setNewDm] = useState({
    name: "",
    district: "",
    phone: "",
    email: ""
  });

  // Handle input change for Add DM form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDm({
      ...newDm,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = dmsList.length > 0 ? Math.max(...dmsList.map(dm => dm.id)) + 1 : 1;
    const dmToAdd = {
      id: newId,
      ...newDm
    };
    setDmsList([...dmsList, dmToAdd]);
    setShowModal(false);
    setNewDm({
      name: "",
      district: "",
      phone: "",
      email: ""
    });
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
                        className="btn btn-primary" 
                        onClick={() => setShowModal(true)}
                      >
                        Add New DM
                      </button>
                      <button className="btn btn-light">
                        <i className="mdi mdi-refresh" />
                      </button>
                      <div className="dropdown d-inline-block">
                        <button 
                          type="button" 
                          className="btn btn-success" 
                          id="dropdownMenuButton1" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false"
                        >
                          <i className="mdi mdi-dots-vertical" />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body border-bottom">
                  <div className="row g-3">
                    <div className="col-xxl-4 col-lg-6">
                      <input 
                        type="search" 
                        className="form-control" 
                        id="searchTableList" 
                        placeholder="Search for ..." 
                      />
                    </div>
                    <div className="col-xxl-2 col-lg-6">
                      <select className="form-select" id="idStatus" aria-label="Default select example">
                        <option value="all">Status</option>
                        <option value="Active">Active</option>
                        <option value="New">New</option>
                        <option value="Close">Close</option>
                      </select>
                    </div>
                    <div className="col-xxl-2 col-lg-4">
                      <select className="form-select" id="idType" aria-label="Default select example">
                        <option value="all">Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                      </select>
                    </div>
                    <div className="col-xxl-2 col-lg-4">
                      <div id="datepicker1">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Select date" 
                          data-date-format="dd M, yyyy" 
                          data-date-container="#datepicker1" 
                          data-date-autoclose="true" 
                          data-provide="datepicker" 
                        />
                      </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4">
                      <button type="button" className="btn btn-soft-secondary w-100">
                        <i className="mdi mdi-filter-outline align-middle" /> Filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
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
                          <tr key={dm.id}>
                            <td>{index + 1}</td>
                            <td>{dm.name}</td>
                            <td>{dm.district}</td>
                            <td>{dm.phone}</td>
                            <td>{dm.email}</td>
                            <td>
                              <div className="d-flex gap-3">
                                <a href="#!" className="text-success">
                                  <i className="mdi mdi-pencil font-size-18" />
                                </a>
                                <a href="#!" className="text-danger">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal (existing) */}
      <div className="modal fade" id="jobDelete" tabIndex={-1} aria-labelledby="jobDeleteLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body px-4 py-5 text-center">
              <button type="button" className="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close" />
              <div className="avatar-sm mb-4 mx-auto">
                <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
                  <i className="mdi mdi-trash-can-outline" />
                </div>
              </div>
              <p className="text-muted font-size-16 mb-4">Are you sure you want to permanently erase the job.</p>
              <div className="hstack gap-2 justify-content-center mb-0">
                <button type="button" className="btn btn-danger">Delete Now</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add DM Modal */}
      <div 
        className={`modal fade ${showModal ? 'show' : ''}`} 
        style={{ display: showModal ? 'block' : 'none' }}
        id="addDmModal" 
        tabIndex={-1} 
        aria-labelledby="addDmModalLabel" 
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDmModalLabel">Add New DM</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
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
                    value={newDm.name}
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
                    value={newDm.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    name="phone"
                    value={newDm.phone}
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
                    value={newDm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
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