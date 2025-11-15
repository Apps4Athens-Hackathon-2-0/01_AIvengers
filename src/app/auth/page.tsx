// Authentication Page - Login/Sign Up
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signUp, user, loading: authLoading, error: authError } = useAuth()
  
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Check URL params for mode
  useEffect(() => {
    const modeParam = searchParams.get('mode')
    if (modeParam === 'signup' || modeParam === 'signin') {
      setMode(modeParam)
    }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'signin') {
        const result = await signIn(email, password)
        if (result.error) {
          setError(result.error)
        } else {
          setSuccess(true)
          setTimeout(() => router.push('/dashboard'), 1000)
        }
      } else {
        if (!name) {
          setError('Παρακαλώ εισάγετε το όνομά σας')
          setLoading(false)
          return
        }
        const result = await signUp(email, password, { name, phone })
        if (result.error) {
          setError(result.error)
        } else {
          setSuccess(true)
          setError(null)
          // Show success message
          setTimeout(() => {
            setMode('signin')
            setSuccess(false)
          }, 2000)
        }
      }
    } catch (err) {
      setError('Κάτι πήγε στραβά. Προσπαθήστε ξανά.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition"
        >
          ← Πίσω στην Αρχική
        </button>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🆘</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'signin' ? 'Καλώς Ήρθες Πίσω!' : 'Δημιούργησε Λογαριασμό'}
            </h1>
            <p className="text-gray-600">
              {mode === 'signin' 
                ? 'Συνδέσου για να συνεχίσεις' 
                : 'Γίνε μέλος της κοινότητας'}
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {mode === 'signin' 
                ? '✓ Σύνδεση επιτυχής! Ανακατεύθυνση...' 
                : '✓ Λογαριασμός δημιουργήθηκε! Μπορείς να συνδεθείς τώρα.'}
            </div>
          )}

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error || authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Όνομα *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="π.χ. Γιώργος Παπαδόπουλος"
                    required={mode === 'signup'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Τηλέφωνο (προαιρετικό)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="π.χ. 6912345678"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Κωδικός *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {mode === 'signup' && (
                <p className="mt-2 text-sm text-gray-500">
                  Τουλάχιστον 6 χαρακτήρες
                </p>
              )}
            </div>

            {mode === 'signin' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Θυμήσου με</span>
                </label>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Ξέχασες τον κωδικό;
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'signin' ? 'Σύνδεση...' : 'Δημιουργία...'}
                </span>
              ) : (
                mode === 'signin' ? 'Σύνδεση' : 'Εγγραφή'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'signin' ? 'Δεν έχεις λογαριασμό;' : 'Έχεις ήδη λογαριασμό;'}
              {' '}
              <button
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin')
                  setError(null)
                  setSuccess(false)
                }}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                {mode === 'signin' ? 'Εγγραφή' : 'Σύνδεση'}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ή συνέχισε με</span>
            </div>
          </div>

          {/* Social Auth (Optional - Not implemented yet) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled
            >
              <span className="text-xl">🔵</span>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled
            >
              <span className="text-xl">📘</span>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Info */}
          {mode === 'signup' && (
            <p className="mt-6 text-xs text-gray-500 text-center">
              Με την εγγραφή σου, αποδέχεσαι τους{' '}
              <a href="#" className="text-indigo-600 hover:underline">Όρους Χρήσης</a>
              {' '}και την{' '}
              <a href="#" className="text-indigo-600 hover:underline">Πολιτική Απορρήτου</a>
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Προβλήματα με τη σύνδεση;</p>
          <a href="#" className="text-indigo-600 hover:text-indigo-700">
            Επικοινώνησε μαζί μας
          </a>
        </div>
      </div>
    </div>
  )
}
