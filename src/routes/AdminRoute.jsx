import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from '../layouts/Header'
import Sidebar from '../layouts/Sidebar'
import Footer from '../layouts/Footer'

function AdminRoute() {
  return (
    <div>
        <div id="layout-wrapper">
            <Header/>
            <Sidebar />
            <div className="main-content">
                <Outlet />
               
                <Footer />
                
            </div>
        </div>
        {/* <div className="rightbar-overlay" /> */}
        <Helmet>
    <link href="/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
    <script src="/assets/libs/jquery/jquery.min.js"></script>
    <script src="/assets/libs/metismenu/metisMenu.min.js"></script>
    <script src="/assets/libs/simplebar/simplebar.min.js"></script>
    <script src="/assets/libs/node-waves/waves.min.js"></script>
    <script src="/assets/libs/apexcharts/apexcharts.min.js"></script>
    <script src="/assets/js/pages/dashboard.init.js"></script>
    <script src="/assets/js/app.js"></script>
  </Helmet>
    </div>
  )
}

export default AdminRoute