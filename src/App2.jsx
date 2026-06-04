import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
          <Route path="/staff" element={user?.role === 'staff' ? <StaffDashboard /> : <Login setUser={setUser} />} />
          <Route path="/owner" element={user?.role === 'owner' ? <OwnerDashboard /> : <Login setUser={setUser} />} />
          <Route path="/scan" element={user?.role === 'staff' ? <BarcodeScan /> : <Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  )
}

export default App
