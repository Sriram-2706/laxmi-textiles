import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, DollarSign, Package, AlertCircle, LogOut, Menu, X } from 'lucide-react'

const toast = {
  success: (msg) => alert(msg),
  error: (msg) => alert(msg),
}

const SimpleChart = ({ data, dataKey, title }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-2">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{item.day || item.category}</span>
          <div className="flex gap-2">
            {dataKey && item[dataKey] && (
              <div className="text-sm text-gray-600">{item[dataKey]}</div>
            )}
            {item.sales && <div className="text-sm font-bold text-orange-600">₹{item.sales}</div>}
            {item.inStock && <div className="text-sm font-bold text-green-600">{item.inStock}</div>}
            {item.lowStock && <div className="text-sm font-bold text-red-600">{item.lowStock}</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function OwnerDashboard() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mockWeeklySalesData = [
    { day: 'Mon', sales: 4200, orders: 24 },
    { day: 'Tue', sales: 3800, orders: 18 },
    { day: 'Wed', sales: 5200, orders: 32 },
    { day: 'Thu', sales: 4900, orders: 28 },
    { day: 'Fri', sales: 6100, orders: 35 },
    { day: 'Sat', sales: 7200, orders: 42 },
    { day: 'Sun', sales: 5800, orders: 38 },
  ]

  const mockStockStatus = [
    { category: 'Cotton', inStock: 850, lowStock: 120 },
    { category: 'Silk', inStock: 520, lowStock: 45 },
    { category: 'Polyester', inStock: 680, lowStock: 85 },
    { category: 'Denim', inStock: 420, lowStock: 60 },
    { category: 'Linen', inStock: 380, lowStock: 40 },
  ]

  const mockActivities = [
    { id: 1, type: 'stock_added', description: 'Cotton Cloth - White added', timestamp: '2 hours ago', user: 'Rajesh Kumar' },
    { id: 2, type: 'stock_sold', description: 'Silk Fabric - Blue sold', timestamp: '3 hours ago', user: 'Customer' },
    { id: 3, type: 'low_stock', description: 'Polyester - Red below minimum', timestamp: '4 hours ago', user: 'System' },
    { id: 4, type: 'stock_added', description: '500m Denim - Navy received', timestamp: '5 hours ago', user: 'Ramesh' },
    { id: 5, type: 'order_placed', description: 'New purchase order created', timestamp: '6 hours ago', user: 'Priya Singh' },
  ]

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: '₹37,300',
      subtext: 'This week',
      color: 'from-green-500 to-emerald-600',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '217',
      subtext: 'This week',
      color: 'from-blue-500 to-cyan-600',
      icon: TrendingUp,
    },
    {
      title: 'Total Inventory',
      value: '₹45,890',
      subtext: 'Current value',
      color: 'from-purple-500 to-indigo-600',
      icon: Package,
    },
    {
      title: 'Low Stock Items',
      value: '12',
      subtext: 'Need restocking',
      color: 'from-red-500 to-pink-600',
      icon: AlertCircle,
    },
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
                <span className="text-sm">Owner Portal</span>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Business Overview</h2>
          <p className="text-gray-600">Complete view of your inventory and sales performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${card.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SimpleChart data={mockWeeklySalesData} dataKey="orders" title="Weekly Sales Performance" />
          <SimpleChart data={mockStockStatus} dataKey="category" title="Stock Status by Category" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <p className="text-gray-600 text-sm mb-2">Average Order Value</p>
            <p className="text-3xl font-bold text-blue-600">₹2,850</p>
            <p className="text-xs text-gray-600 mt-2">↑ 8% from last week</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-2">Inventory Turnover</p>
            <p className="text-3xl font-bold text-green-600">4.2x</p>
            <p className="text-xs text-gray-600 mt-2">This month</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <p className="text-gray-600 text-sm mb-2">Gross Margin</p>
            <p className="text-3xl font-bold text-orange-600">38%</p>
            <p className="text-xs text-gray-600 mt-2">On all products</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>

          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'stock_added' ? 'bg-green-100' :
                  activity.type === 'stock_sold' ? 'bg-blue-100' :
                  activity.type === 'low_stock' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    activity.type === 'stock_added' ? 'text-green-600' :
                    activity.type === 'stock_sold' ? 'text-blue-600' :
                    activity.type === 'low_stock' ? 'text-red-600' :
                    'text-purple-600'
                  }`}>
                    {activity.type === 'stock_added' ? '+' :
                     activity.type === 'stock_sold' ? '-' :
                     activity.type === 'low_stock' ? '!' :
                     '•'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>By {activity.user}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
          <div>
            <p className="text-2xl font-bold">2,450</p>
            <p className="text-xs text-orange-100">Total Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold">18</p>
            <p className="text-xs text-orange-100">Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold">₹45.8K</p>
            <p className="text-xs text-orange-100">Inventory Value</p>
          </div>
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-orange-100">Low Stock Items</p>
          </div>
        </div>
      </main>
    </div>
  )
}
