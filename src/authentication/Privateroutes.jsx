import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const PrivateRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('digibiztocken')

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        const res = await axios.get('http://localhost:5000/authenticate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.data.success) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoutes
