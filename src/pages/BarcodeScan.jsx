import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Barcode, Plus, Minus, Save, CheckCircle } from 'lucide-react'

const toast = {
  success: (msg) => alert(msg),
  error: (msg) => alert(msg),
}

export default function BarcodeScan() {
  const navigate = useNavigate()
  const [barcodeInput, setBarcodeInput] = useState('')
  const [scannedProduct, setScannedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const mockProducts = {
    '8901234567890': { id: 1, name: 'Cotton Cloth - White', sku: 'CTN-001', price: 250, unit: 'meter' },
    '8901234567891': { id: 2, name: 'Silk Fabric - Blue', sku: 'SLK-045', price: 450, unit: 'meter' },
    '8901234567892': { id: 3, name: 'Polyester - Red', sku: 'PLY-089', price: 180, unit: 'meter' },
    '8901234567893': { id: 4, name: 'Denim - Navy', sku: 'DNM-156', price: 320, unit: 'meter' },
    '8901234567894': { id: 5, name: 'Linen - Cream', sku: 'LNE-203', price: 380, unit: 'meter' },
  }

  const handleBarcodeInput = (e) => {
    setBarcodeInput(e.target.value)
  }

  const handleScanBarcode = () => {
    const product = mockProducts[barcodeInput]
    if (product) {
      setScannedProduct(product)
      setQuantity(1)
      toast.success('Product found!')
      setBarcodeInput('')
    } else {
      toast.error('Product not found!')
      setBarcodeInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScanBarcode()
    }
  }

  const handleSaveStock = () => {
    if (scannedProduct && quantity > 0) {
      toast.success(`Added ${quantity} ${scannedProduct.unit}(s) of ${scannedProduct.name}`)
      setShowSuccess(true)
      setTimeout(() => {
        setScannedProduct(null)
        setQuantity(1)
        setShowSuccess(false)
      }, 2000)
    } else {
      toast.error('Please select a product and quantity')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/staff')}
              className="hover:bg-orange-700 p-2 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Barcode Scanner</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Scanner Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Barcode className="text-blue-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan Product</h2>
            <p className="text-gray-600">Place your barcode scanner or enter barcode manually</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Barcode Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={barcodeInput}
                onChange={handleBarcodeInput}
                onKeyPress={handleKeyPress}
                placeholder="Scan or enter barcode..."
                autoFocus
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              />
              <button
                onClick={handleScanBarcode}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
              >
                Scan
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Tip: Press Enter after scanning</p>
          </div>

          {/* Demo Barcodes */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Demo Barcodes (Click to scan):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(mockProducts).map(([barcode, product]) => (
                <button
                  key={barcode}
                  onClick={() => {
                    setBarcodeInput(barcode)
                    setTimeout(() => handleScanBarcode(), 100)
                  }}
                  className="text-left text-xs bg-white hover:bg-gray-100 p-2 rounded border border-gray-200 transition truncate"
                >
                  <span className="font-mono font-bold text-blue-600">{barcode}</span>
                  <span className="text-gray-600 ml-2">{product.sku}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Card */}
        {scannedProduct && (
          <div className={`transition-all duration-300 ${showSuccess ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Product Name</p>
                  <p className="text-xl font-bold text-gray-800">{scannedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">SKU</p>
                  <p className="text-xl font-bold text-gray-800">{scannedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unit Price</p>
                  <p className="text-xl font-bold text-green-600">₹{scannedProduct.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unit</p>
                  <p className="text-xl font-bold text-gray-800">{scannedProduct.unit}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">Quantity to Add</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-lg flex items-center justify-center transition transform hover:scale-110 active:scale-95"
                  >
                    <Minus size={24} />
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center px-4 py-3 text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center transition transform hover:scale-110 active:scale-95"
                  >
                    <Plus size={24} />
                  </button>

                  <span className="ml-4 text-lg font-semibold text-gray-700">
                    Total: ₹{(scannedProduct.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveStock}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={24} />
                <span>Save to Stock</span>
              </button>
            </div>
          </div>
        )}

        {/* Success Animation */}
        {showSuccess && (
          <div className="flex justify-center items-center mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                <CheckCircle className="text-green-500" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Stock Updated!</h3>
              <p className="text-gray-600">Product has been added to inventory</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!scannedProduct && !showSuccess && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Barcode className="text-gray-400" size={48} />
            </div>
            <p className="text-gray-600 text-lg">Scan a barcode to continue</p>
          </div>
        )}
      </main>
    </div>
  )
}
