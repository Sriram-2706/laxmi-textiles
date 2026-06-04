import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, Languages } from 'lucide-react'

export default function Login({ setUser }) {
  const navigate = useNavigate()

  const [pin, setPin] = useState('')
  const [role, setRole] = useState('staff')
  const [language, setLanguage] = useState('en')

  const handleLogin = () => {
    if (pin === '1234') {
      setUser({
        role,
        language,
      })

      navigate(role === 'staff' ? '/staff' : '/owner')
    } else {
      alert('Invalid PIN. Use 1234')
      setPin('')
    }
  }

  const t =
    language === 'en'
      ? {
          title: 'Laxmi Textiles',
          subtitle: 'Inventory Management',
          pin: 'Enter PIN',
          login: 'Login',
          staff: 'Staff',
          owner: 'Owner',
        }
      : {
          title: 'लक्ष्मी टेक्सटाइल्स',
          subtitle: 'इन्वेंटरी प्रबंधन',
          pin: 'पिन दर्ज करें',
          login: 'लॉगिन',
          staff: 'कर्मचारी',
          owner: 'मालिक',
        }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
              LT
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              {t.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {t.subtitle}
            </p>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="staff"
                checked={role === 'staff'}
                onChange={(e) => setRole(e.target.value)}
              />
              {t.staff}
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="owner"
                checked={role === 'owner'}
                onChange={(e) => setRole(e.target.value)}
              />
              {t.owner}
            </label>
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-medium text-gray-700">
              {t.pin}
            </label>

            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) =>
                setPin(
                  e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 4)
                )
              }
              placeholder="1234"
              className="w-full h-14 border-2 border-gray-300 rounded-xl px-4 text-center text-2xl tracking-[10px] focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
          >
            {t.login}
          </button>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() =>
                setLanguage(language === 'en' ? 'hi' : 'en')
              }
              className="flex-1 h-11 bg-gray-100 rounded-xl flex items-center justify-center gap-2"
            >
              <Languages size={18} />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            <button
              className="flex-1 h-11 bg-blue-500 text-white rounded-xl flex items-center justify-center gap-2"
            >
              <Volume2 size={18} />
              Voice
            </button>
          </div>
        </div>

        <div className="text-center text-white mt-4">
          <p>Demo PIN: 1234</p>
        </div>
      </div>
    </div>
  )
}