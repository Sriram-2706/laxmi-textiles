import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import StaffDashboard from './pages/StaffDashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import BarcodeScan from './pages/BarcodeScan'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/staff" element={user?.role === 'staff' ? <StaffDashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/owner" element={user?.role === 'owner' ? <OwnerDashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/scan" element={user?.role === 'staff' ? <BarcodeScan /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

