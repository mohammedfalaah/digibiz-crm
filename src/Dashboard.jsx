import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Axioscall from './services/Axioscall'

const Dashboard = () => {
  const[user,setUser]=useState('')
  const[dashboardData,setData]=useState("")
  const[pendingEmi,setPending]=useState([])

  const getDashboard=async()=>{
    try {
      let data=await Axioscall('get',"monthly-emi/dashboard",{},true)

      const today = new Date();
   const currentMonth = today.getMonth() + 1; 
   const currentYear = today.getFullYear();
   let response=await Axioscall('get',`monthly-emi/month-wise?status=pending&month=${currentMonth}&year=${currentYear}`,{},true)

      console.log(response.data.data.docs,"response data")
      setPending(response.data.data.docs)
      setData(data.data.data)
    } catch (error) {
      console.log(error,"error in fetch data")
      
    }
  }

useEffect(()=>{
  let token=localStorage.getItem('digibiztocken')

  let data=jwtDecode(token)
// console.log(data,"dataaaa")
setUser(data.role)
getDashboard()
},[])

  return (
    <>
  <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">{user}</h4>
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
                          <p className="text-muted fw-medium">Total Projects</p>
                          <h4 className="mb-0">{dashboardData?.totalproject}</h4>
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
                          <p className="text-muted fw-medium">Total Revenue through Emi</p>
                          <h4 className="mb-0">{dashboardData?.totalEmiAmount}</h4>
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
                          <p className="text-muted fw-medium">Total client</p>
                          <h4 className="mb-0">{dashboardData?.totalClients}</h4>
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
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Pending Emi's in these month</p>
                          <h4 className="mb-0">{dashboardData?.pendingEmis}</h4>
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
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">Total Emi in these month</p>
                          <h4 className="mb-0">{dashboardData?.totalEmiinthesemonth}</h4>
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
              {/* <div className="card">
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
              </div> */}
            </div>
          </div>





        <div className="row">
  <div className="col-lg-12">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Pending Emi's</h4>
        <div className="table-responsive">
          <table className="table align-middle table-nowrap mb-0">
            <thead className="table-light">
              <tr>
                {/* <th style={{width: 20}}>
                  <div className="form-check font-size-16 align-middle">
                    <input className="form-check-input" type="checkbox" id="transactionCheck01" />
                    <label className="form-check-label" htmlFor="transactionCheck01" />
                  </div>
                </th> */}
                <th className="align-middle">Project ID</th>
                <th className="align-middle">Client Name</th>
                <th className="align-middle">Contact No</th>
                <th className="align-middle">Emi Amount</th>
                <th className="align-middle">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {pendingEmi?.map((item)=>(
                 <tr>
               
                <td><a href="javascript: void(0);" className="text-body fw-bold">DIGI-123</a> </td>
                <td>{item?.userId?.name}</td>
                <td>
                {item?.userId?.contactNo}                </td>
                <td>
                 RS-{item?.monthlyEmiAmount}
                </td>
                
                
                <td>
                  {/* Button trigger modal */}
                  <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                    Pay Now
                  </button>
                </td>
              </tr>

              ))}
             
            
    
             
             
            </tbody>
          </table>
        </div>
        {/* end table-responsive */}
      </div>
    </div>
  </div>
</div>

        </div>
        {/* container-fluid */}
      </div>
    </>
  )
}

export default Dashboard