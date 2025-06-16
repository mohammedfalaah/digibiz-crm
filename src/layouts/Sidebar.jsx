import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Helper function to determine if a path is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {/* Sidemenu */}
          <div id="sidebar-menu">
            {/* Left Menu Start */}
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title" key="t-menu">Menu</li>
              
              <li onClick={() => navigate('/')} className={isActive('/') ? 'mm-active' : ''}>
                <a href="javascript: void(0);" className="waves-effect">
                  <i className="bx bx-home-circle" />
                  <span key="t-dashboards">Dashboards</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/dms')} className={isActive('/dms') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-user" />
                  <span key="t-layouts">Dm's</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/accounts')} className={isActive('/accounts') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-user" />
                  <span key="t-layouts">Accountents</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/scheme')} className={isActive('/scheme') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-paste" />
                  <span key="t-layouts">Scheme</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/projects')} className={isActive('/projects') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-repeat" />
                  <span key="t-layouts">Projects</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/client')} className={isActive('/client') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-group" />
                  <span key="t-layouts">Clients</span>
                </a>
              </li>
              <li onClick={() => navigate('/emi')} className={isActive('/emi') ? 'mm-active' : ''}>
                <a className="waves-effect">
                  <i className="bx bx-notepad" />
                  <span key="t-layouts">Emi's</span>
                </a>
              </li>
              
              <li onClick={() => navigate('/complaints')} className={isActive('/complaints') ? 'mm-active' : ''}>
                <a href="javascript: void(0);" className="waves-effect">
                  <i className="bx bx-book" />
                  <span key="t-layouts">Complaints</span>
                </a>
              </li>
            </ul>
          </div>
          {/* Sidebar */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar