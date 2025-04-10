import React from "react"
import { Route, Routes } from "react-router-dom"
import AdminRoute from "./routes/AdminRoute"
import Dashboard from "./Dashboard"
import Login from "./Login"
import { Toaster } from "react-hot-toast"
import Dms from "./Dms"
import PrivateRoutes from "./authentication/Privateroutes"

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
      <Route index element={<Dashboard />} />
      <Route path="/dms" element={<Dms/>}/>
      </Route>
    </Routes>


      
    </>
  )
}

export default App
