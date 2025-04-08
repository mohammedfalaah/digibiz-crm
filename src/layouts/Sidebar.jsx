import React from 'react'

const Sidebar = () => {
  return (
    <div>
         <div className="vertical-menu">
      <div data-simplebar className="h-100">
        {/*- Sidemenu */}
        <div id="sidebar-menu">
          {/* Left Menu Start */}
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title" key="t-menu">Menu</li>
            <li>
              <a href="javascript: void(0);" className=" waves-effect">
                <i className="bx bx-home-circle" />
                <span key="t-dashboards">Dashboards</span>
              </a>
             
            </li>
            <li>
              <a href="javascript: void(0);" className="waves-effect">
                <i className="bx bx-layout" />
                <span key="t-layouts">Settings</span>
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