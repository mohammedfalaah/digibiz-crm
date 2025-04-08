import React from 'react'

const Dashboard = () => {
  return (
    <>
  <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">HR & SUPER ADMIN Dashboard</h4>
                <div className="page-title-right">
                  
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
           
            <div className="col-xl-12">
              <div className="row">
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Project In Progress</p>
                          <h4 className="mb-0">₹1,235</h4>
                        </div>
                        <div className="flex-shrink-0 align-self-center">
                          <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                            <span className="avatar-title">
                              <i className="bx bx-copy-alt font-size-24" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Cancel Projects</p>
                          <h4 className="mb-0">₹35, 723</h4>
                        </div>
                        <div className="flex-shrink-0 align-self-center ">
                          <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className="bx bx-archive-in font-size-24" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Overdue Payments</p>
                          <h4 className="mb-0">₹16.2</h4>
                        </div>
                        <div className="flex-shrink-0 align-self-center">
                          <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className="bx bx-purchase-tag-alt font-size-24" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
              <div className="card">
                <div className="card-body">
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">EMI COLLECTION</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a className="nav-link" href="#">Week</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Month</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" href="#">Year</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div id="stacked-column-chart" className="apex-charts" data-colors="[&quot;--bs-primary&quot;, &quot;--bs-warning&quot;, &quot;--bs-success&quot;]" dir="ltr" />
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Social Source</h4>
                  <div className="text-center">
                    <div className="avatar-sm mx-auto mb-4">
                      <span className="avatar-title rounded-circle bg-primary-subtle font-size-24">
                        <i className="mdi mdi-facebook text-primary" />
                      </span>
                    </div>
                    <p className="font-16 text-muted mb-2" />
                    <h5><a href="javascript: void(0);" className="text-dark">Facebook - <span className="text-muted font-16">125 sales</span> </a></h5>
                    <p className="text-muted">Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus tincidunt.</p>
                    <a href="javascript: void(0);" className="text-primary font-16">Learn more <i className="mdi mdi-chevron-right" /></a>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4">
                      <div className="social-source text-center mt-3">
                        <div className="avatar-xs mx-auto mb-3">
                          <span className="avatar-title rounded-circle bg-primary font-size-16">
                            <i className="mdi mdi-facebook text-white" />
                          </span>
                        </div>
                        <h5 className="font-size-15">Facebook</h5>
                        <p className="text-muted mb-0">125 sales</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="social-source text-center mt-3">
                        <div className="avatar-xs mx-auto mb-3">
                          <span className="avatar-title rounded-circle bg-info font-size-16">
                            <i className="mdi mdi-twitter text-white" />
                          </span>
                        </div>
                        <h5 className="font-size-15">Twitter</h5>
                        <p className="text-muted mb-0">112 sales</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="social-source text-center mt-3">
                        <div className="avatar-xs mx-auto mb-3">
                          <span className="avatar-title rounded-circle bg-pink font-size-16">
                            <i className="mdi mdi-instagram text-white" />
                          </span>
                        </div>
                        <h5 className="font-size-15">Instagram</h5>
                        <p className="text-muted mb-0">104 sales</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-5">Activity</h4>
                  <ul className="verti-timeline list-unstyled">
                    <li className="event-list">
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18" />
                      </div>
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <h5 className="font-size-14">22 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" /></h5>
                        </div>
                        <div className="flex-grow-1">
                          <div>
                            Responded to need “Volunteer Activities
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="event-list">
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18" />
                      </div>
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <h5 className="font-size-14">17 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" /></h5>
                        </div>
                        <div className="flex-grow-1">
                          <div>
                            Everyone realizes why a new common language would be desirable... <a href="javascript: void(0);">Read more</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="event-list active">
                      <div className="event-timeline-dot">
                        <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right" />
                      </div>
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <h5 className="font-size-14">15 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" /></h5>
                        </div>
                        <div className="flex-grow-1">
                          <div>
                            Joined the group “Boardsmanship Forum”
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="event-list">
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18" />
                      </div>
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <h5 className="font-size-14">12 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" /></h5>
                        </div>
                        <div className="flex-grow-1">
                          <div>
                            Responded to need “In-Kind Opportunity”
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="text-center mt-4"><a href="javascript: void(0);" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ms-1" /></a></div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Top Cities Selling Product</h4>
                  <div className="text-center">
                    <div className="mb-4">
                      <i className="bx bx-map-pin text-primary display-4" />
                    </div>
                    <h3>1,456</h3>
                    <p>San Francisco</p>
                  </div>
                  <div className="table-responsive mt-4">
                    <table className="table align-middle table-nowrap">
                      <tbody>
                        <tr>
                          <td style={{width: '30%'}}>
                            <p className="mb-0">San Francisco</p>
                          </td>
                          <td style={{width: '25%'}}>
                            <h5 className="mb-0">1,456</h5></td>
                          <td>
                            <div className="progress bg-transparent progress-sm">
                              <div className="progress-bar bg-primary rounded" role="progressbar" style={{width: '94%'}} aria-valuenow={94} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="mb-0">Los Angeles</p>
                          </td>
                          <td>
                            <h5 className="mb-0">1,123</h5>
                          </td>
                          <td>
                            <div className="progress bg-transparent progress-sm">
                              <div className="progress-bar bg-success rounded" role="progressbar" style={{width: '82%'}} aria-valuenow={82} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="mb-0">San Diego</p>
                          </td>
                          <td>
                            <h5 className="mb-0">1,026</h5>
                          </td>
                          <td>
                            <div className="progress bg-transparent progress-sm">
                              <div className="progress-bar bg-warning rounded" role="progressbar" style={{width: '70%'}} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Latest Transaction</h4>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{width: 20}}>
                            <div className="form-check font-size-16 align-middle">
                              <input className="form-check-input" type="checkbox" id="transactionCheck01" />
                              <label className="form-check-label" htmlFor="transactionCheck01" />
                            </div>
                          </th>
                          <th className="align-middle">Order ID</th>
                          <th className="align-middle">Billing Name</th>
                          <th className="align-middle">Date</th>
                          <th className="align-middle">Total</th>
                          <th className="align-middle">Payment Status</th>
                          <th className="align-middle">Payment Method</th>
                          <th className="align-middle">View Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck02" />
                              <label className="form-check-label" htmlFor="transactionCheck02" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2540</a> </td>
                          <td>Neal Matthews</td>
                          <td>
                            07 Oct, 2019
                          </td>
                          <td>
                            $400
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-success font-size-11">Paid</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-mastercard me-1" /> Mastercard
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck03" />
                              <label className="form-check-label" htmlFor="transactionCheck03" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2541</a> </td>
                          <td>Jamal Burnett</td>
                          <td>
                            07 Oct, 2019
                          </td>
                          <td>
                            $380
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-danger font-size-11">Chargeback</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-visa me-1" /> Visa
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck04" />
                              <label className="form-check-label" htmlFor="transactionCheck04" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2542</a> </td>
                          <td>Juan Mitchell</td>
                          <td>
                            06 Oct, 2019
                          </td>
                          <td>
                            $384
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-success font-size-11">Paid</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-paypal me-1" /> Paypal
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck05" />
                              <label className="form-check-label" htmlFor="transactionCheck05" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2543</a> </td>
                          <td>Barry Dick</td>
                          <td>
                            05 Oct, 2019
                          </td>
                          <td>
                            $412
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-success font-size-11">Paid</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-mastercard me-1" /> Mastercard
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck06" />
                              <label className="form-check-label" htmlFor="transactionCheck06" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2544</a> </td>
                          <td>Ronald Taylor</td>
                          <td>
                            04 Oct, 2019
                          </td>
                          <td>
                            $404
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-warning font-size-11">Refund</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-visa me-1" /> Visa
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="form-check font-size-16">
                              <input className="form-check-input" type="checkbox" id="transactionCheck07" />
                              <label className="form-check-label" htmlFor="transactionCheck07" />
                            </div>
                          </td>
                          <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2545</a> </td>
                          <td>Jacob Hunter</td>
                          <td>
                            04 Oct, 2019
                          </td>
                          <td>
                            $392
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-success font-size-11">Paid</span>
                          </td>
                          <td>
                            <i className="fab fa-cc-paypal me-1" /> Paypal
                          </td>
                          <td>
                            {/* Button trigger modal */}
                            <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                              View Details
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* end table-responsive */}
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* container-fluid */}
      </div>
    </>
  )
}

export default Dashboard