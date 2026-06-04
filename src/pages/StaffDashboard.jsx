import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Barcode, Package, AlertCircle, LogOut, Menu, X } from 'lucide-react'

const toast = {
  success: (msg) => alert(msg),
  error: (msg) => alert(msg),
}

export default function StaffDashboard() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  const mockStats = [
    { label: 'Total Items', value: '2,450', color: 'bg-blue-500' },
    { label: 'Items Added Today', value: '85', color: 'bg-green-500' },
    { label: 'Low Stock Items', value: '12', color: 'bg-red-500' },
    { label: 'Categories', value: '18', color: 'bg-purple-500' },
  ]

  const mockLowStockItems = [
    { id: 1, name: 'Cotton Cloth - White', sku: 'CTN-001', current: 5, minimum: 20 },
    { id: 2, name: 'Silk Fabric - Blue', sku: 'SLK-045', current: 8, minimum: 15 },
    { id: 3, name: 'Polyester - Red', sku: 'PLY-089', current: 3, minimum: 10 },
    { id: 4, name: 'Denim - Navy', sku: 'DNM-156', current: 12, minimum: 25 },
  ]

  const handleLogout = () => {
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-orange-600">
                ᴸᵀ
              </div>
              <h1 className="text-2xl font-bold hidden sm:block">Laxmi Textiles</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm">Staff Portal</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 border-t border-orange-400 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your inventory overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold`}>
                {stat.value.charAt(0)}
              </div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button className="bg-white hover:bg-gray-50 border-2 border-green-500 rounded-lg p-6 transition transform hover:scale-105 active:scale-95">
            <Plus className="text-green-500 mx-auto mb-2" size={32} />
            <span className="font-semibold text-gray-800">Add Stock</span>
            <p className="text-xs text-gray-600 mt-1">Manually add items</p>
          </button>

          <button 
            onClick={() => navigate('/scan')}
            className="bg-white hover:bg-gray-50 border-2 border-blue-500 rounded-lg p-6 transition transform hover:scale-105 active:scale-95"
          >
            <Barcode className="text-blue-500 mx-auto mb-2" size={32} />
            <span className="font-semibold text-gray-800">Scan Barcode</span>
            <p className="text-xs text-gray-600 mt-1">Scan & update items</p>
          </button>

          <button className="bg-white hover:bg-gray-50 border-2 border-purple-500 rounded-lg p-6 transition transform hover:scale-105 active:scale-95">
            <Package className="text-purple-500 mx-auto mb-2" size={32} />
            <span className="font-semibold text-gray-800">Check Stock</span>
            <p className="text-xs text-gray-600 mt-1">View all items</p>
          </button>

          <button className="bg-white hover:bg-gray-50 border-2 border-orange-500 rounded-lg p-6 transition transform hover:scale-105 active:scale-95">
            <AlertCircle className="text-orange-500 mx-auto mb-2" size={32} />
            <span className="font-semibold text-gray-800">Manual Entry</span>
            <p className="text-xs text-gray-600 mt-1">Add quick items</p>
          </button>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-red-500" size={28} />
            <h3 className="text-xl font-bold text-gray-800">Low Stock Alerts</h3>
          </div>

          {mockLowStockItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Current</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Minimum</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLowStockItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-gray-800">{item.name}</td>
                      <td className="py-3 px-4 text-gray-600">{item.sku}</td>
                      <td className="py-3 px-4 text-center font-semibold text-gray-800">{item.current}</td>
                      <td className="py-3 px-4 text-center font-semibold text-gray-800">{item.minimum}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Critical
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">All items are in stock!</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-2">Items Added Today</p>
            <p className="text-3xl font-bold text-green-600">85</p>
            <p className="text-xs text-gray-600 mt-2">↑ 12% from yesterday</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <p className="text-gray-600 text-sm mb-2">Stock Value</p>
            <p className="text-3xl font-bold text-blue-600">₹45,890</p>
            <p className="text-xs text-gray-600 mt-2">Current inventory worth</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <p className="text-gray-600 text-sm mb-2">Last Updated</p>
            <p className="text-3xl font-bold text-purple-600">Today</p>
            <p className="text-xs text-gray-600 mt-2">2:45 PM</p>
          </div>
        </div>
      </main>
    </div>
  )
}
