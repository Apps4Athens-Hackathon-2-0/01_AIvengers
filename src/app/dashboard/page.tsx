// User Dashboard - Main hub after login
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <button onClick={() => router.push('/')} className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                🆘 HelpMeAnytime
              </button>
              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => router.push('/dashboard')} className="text-indigo-600 font-semibold">
                  Dashboard
                </button>
                <button onClick={() => router.push('/professionals')} className="text-gray-600 hover:text-indigo-600 transition">
                  Ειδικοί
                </button>
                <button onClick={() => router.push('/bookings')} className="text-gray-600 hover:text-indigo-600 transition">
                  Ραντεβού
                </button>
                <button onClick={() => router.push('/help')} className="text-gray-600 hover:text-indigo-600 transition">
                  Αιτήματα
                </button>
                <button onClick={() => router.push('/projects')} className="text-gray-600 hover:text-indigo-600 transition">
                  Έργα
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Γεια σου, <strong>{user.name || user.email}</strong>!
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition"
              >
                Αποσύνδεση
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Καλώς ήρθες, {user.name || 'Φίλε'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Τι θα ήθελες να κάνεις σήμερα;
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Book Appointment */}
          <button
            onClick={() => router.push('/bookings/new')}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-left hover:shadow-xl transition transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-300"
          >
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Κλείσε Ραντεβού
            </h3>
            <p className="text-gray-600 mb-4">
              Βρες ειδικό με επιδότηση δήμου
            </p>
            <div className="text-indigo-600 font-semibold flex items-center gap-2">
              Ξεκίνα τώρα →
            </div>
          </button>

          {/* Request Help */}
          <button
            onClick={() => router.push('/help/new')}
            className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 text-left hover:shadow-xl transition transform hover:-translate-y-1 border-2 border-transparent hover:border-green-300"
          >
            <div className="text-5xl mb-4">🆘</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ζήτα Βοήθεια
            </h3>
            <p className="text-gray-600 mb-4">
              Εθελοντές θα σε βοηθήσουν δωρεάν
            </p>
            <div className="text-green-600 font-semibold flex items-center gap-2">
              Δημιούργησε αίτημα →
            </div>
          </button>

          {/* Propose Project */}
          <button
            onClick={() => router.push('/projects/create')}
            className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 text-left hover:shadow-xl transition transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-300"
          >
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Πρότεινε Έργο
            </h3>
            <p className="text-gray-600 mb-4">
              Συγκέντρωσε pledges για το έργο σου
            </p>
            <div className="text-purple-600 font-semibold flex items-center gap-2">
              Δημιούργησε έργο →
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Ραντεβού</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">🆘</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Αιτήματα</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">🏗️</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600">Έργα</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">€0</div>
            <div className="text-sm text-gray-600">Pledges</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* My Activity */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Πρόσφατη Δραστηριότητα
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">🎉</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Καλώς ήρθες στο HelpMeAnytime! Ξεκίνα τώρα με μια από τις υπηρεσίες μας.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Μόλις τώρα</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Η δραστηριότητά σου θα εμφανίζεται εδώ
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Γρήγοροι Σύνδεσμοι
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/professionals')}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition text-left"
              >
                <span className="text-2xl">👷</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Βρες Ειδικό</div>
                  <div className="text-sm text-gray-600">Επαγγελματίες με επιδότηση</div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => router.push('/bookings')}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-indigo-50 rounded-lg transition text-left"
              >
                <span className="text-2xl">📅</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Τα Ραντεβού μου</div>
                  <div className="text-sm text-gray-600">Δες όλα τα ραντεβού σου</div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => router.push('/help')}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition text-left"
              >
                <span className="text-2xl">🆘</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Αιτήματα Βοήθειας</div>
                  <div className="text-sm text-gray-600">Ζήτα ή πρόσφερε βοήθεια</div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => router.push('/projects')}
                className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-left"
              >
                <span className="text-2xl">🏗️</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Προτάσεις Έργων</div>
                  <div className="text-sm text-gray-600">Δες ενεργά έργα</div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">🎉 Έτοιμος να ξεκινήσεις;</h3>
              <p className="text-indigo-100">
                Χρησιμοποίησε τις υπηρεσίες μας και βοήθησε την κοινότητα!
              </p>
            </div>
            <button
              onClick={() => router.push('/help')}
              className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Εξερεύνησε
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
