import React from "react"
import { Route, Routes } from "react-router-dom"
import AdminRoute from "./routes/AdminRoute"
import Dashboard from "./Dashboard"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<AdminRoute />}>
      <Route index element={<Dashboard />} />
      </Route>
    </Routes>


      
    </>
  )
}

export default App
