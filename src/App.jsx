import React from "react"
import { Route, Routes } from "react-router-dom"
import AdminRoute from "./routes/AdminRoute"
import Dashboard from "./Dashboard"
import Login from "./Login"
import { Toaster } from "react-hot-toast"
import Dms from "./Dms"
import PrivateRoutes from "./authentication/Privateroutes"
import Accountants from "./Accountents"
import Projects from "./Projects"
import Scheme from "./Scheme"
import Clients from "./Client"
import Emi from "./Emi"
import Complaints from "./Complaints"
import ProfilePage from "./ProjectProfile"
import './App.css'

function App() {

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<PrivateRoutes><AdminRoute /></PrivateRoutes>}>
      <Route index element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
      <Route path="/dms" element={<PrivateRoutes><Dms/></PrivateRoutes>}/>
      <Route path="/accounts" element={<PrivateRoutes><Accountants/></PrivateRoutes>}/>
      <Route path="/projects" element={<PrivateRoutes><Projects/></PrivateRoutes>}/>
      <Route path="/scheme" element={<PrivateRoutes><Scheme/></PrivateRoutes>}/>
      <Route path="/client" element={<PrivateRoutes><Clients/></PrivateRoutes>}/>
      <Route path="/emi" element={<PrivateRoutes><Emi/></PrivateRoutes>}/>
    <Route path="/profile" element={<ProfilePage/>}/>

      <Route path="/complaints" element={<Complaints/>}/>



      </Route>
    </Routes>


      
    </>
  )
}

export default App
