import React, { useEffect, useState } from 'react'
import Axioscall from './services/Axioscall';


function Complaints() {
     const [error, setError] = useState(null);
     const [loading, setLoading] = useState(false);
     const [complaints,setComplaints]=useState([])

 const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false
  });

     const getComplaints=async()=>{
      try {
        let data=await Axioscall('get','complaints',{},true)
        console.log(data.data.data.docs,"dataaaa")
        setComplaints(data.data.data.docs)
      } catch (error) {
        
      }
     }

     useEffect(()=>{
     getComplaints()

     },[])
  return (
    <> <div className="page-content">
         <div className="container-fluid">


            <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Complaints</h4>
              </div>
            </div>
          </div>

       <div className="row">
 <div className="col-lg-12">
       <div className="card">

          <div className="card-body border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Compliants</h5>
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
                      <button className="btn btn-light me-2" >
                        <i className="mdi mdi-refresh" />
                      </button>
                    </div>
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
                ) : (<> <div className="card-body">

                     <div className="row mb-3">
                        <div className="col-md-2">
                          <select 
                            className="form-select" 
                            // value={pagination.limit}
                            // onChange={handleLimitChange}
                          >
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                            <option value="20">20 per page</option>
                            <option value="50">50 per page</option>
                          </select>
                        </div>
                        {/* <div className="col-md-3">
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
                        </div> */}
                        {/* <div className="col-md-3">
                          <select
                            className="form-select"
                            name="year"
                           
                          >
                            {years.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div> */}
                      </div>
                        <div className="table-responsive">
    <table className="table align-middle dt-responsive nowrap w-100 table-check">
   <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Client Name</th>
                              <th scope="col">Dm name</th>
                              <th scope="col">Issue Type</th>
                              <th scope="col">Priority</th>
                              <th scope="col">Status</th>
                              <th scope="col">Complaints</th>
                              <th  scope="col">Action</th>
                            </tr>
                          </thead>



                              <tbody>
                            {complaints?.map((item, index) => (
                              <tr key={item._id}>
                                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                <td>{item?.client}</td>
                                <td>{item.districtManager}</td>
                                <td>{item?.issueType}</td>                                 
                                <td>{item?.status}</td>                               
                                <td>{item.priority}</td>
                                <td>
                                    {item.priority.toUpperCase()}
                                </td>
                                  <td>
                                    {item.complaint}
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    {/* <a href="#!" className="text-success" onClick={() => handleEdit(item)}>
                                      <i className="mdi mdi-pencil font-size-18" />
                                    </a> */}
                                     {/* <a href="" className="text-primary" onClick={() => handleView(item)}>
                                      <i className="mdi mdi-eye font-size-18" />
                                    </a> */}
                                    {item.status=='paid'&&(  <a href="" className="text-danger" onClick={() => generateBill(item._id)}>
                                   <button className='btn btn-secondary btn-sm'>Print bill</button>
                                    </a>)}
                                  
                                   
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>


    </table>



                        </div>
                    
                    </div></>)}


 </div>




       </div>


         </div>
        
        
        </div></>
  )
}

export default Complaints