// New Help Request Form - Νέο Αίτημα Βοήθειας
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useHelpRequests } from '@/hooks/useHelpRequests'
import { Heart, MapPin, Calendar, Phone, Check, ArrowLeft, AlertCircle } from 'lucide-react'

const categories = [
  { value: 'moving', label: 'Μετακόμιση/Μεταφορά', icon: '📦', description: 'Βοήθεια με μετακόμιση ή μεταφορά αντικειμένων' },
  { value: 'technology', label: 'Τεχνολογία', icon: '💻', description: 'Υποστήριξη με υπολογιστές, κινητά, internet' },
  { value: 'companionship', label: 'Συντροφιά', icon: '🤝', description: 'Συντροφιά σε ηλικιωμένους ή μοναχικά άτομα' },
  { value: 'shopping', label: 'Ψώνια', icon: '🛒', description: 'Βοήθεια με ψώνια ή αγορές' },
  { value: 'paperwork', label: 'Γραφειοκρατία', icon: '📄', description: 'Συμπλήρωση εντύπων, επίσκεψη σε υπηρεσίες' },
  { value: 'home_maintenance', label: 'Συντήρηση Σπιτιού', icon: '🔧', description: 'Μικρές επιδιορθώσεις και συντήρηση' },
  { value: 'childcare', label: 'Φύλαξη Παιδιών', icon: '👶', description: 'Προσωρινή φύλαξη παιδιών' },
  { value: 'pet_care', label: 'Φροντίδα Κατοικιδίων', icon: '🐾', description: 'Βόλτα ή φύλαξη κατοικιδίων' },
  { value: 'other', label: 'Άλλο', icon: '❓', description: 'Άλλο είδος βοήθειας' },
]

const urgencyLevels = [
  { value: 'low', label: 'Χαμηλή', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'medium', label: 'Μέτρια', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { value: 'high', label: 'Υψηλή', color: 'bg-red-100 text-red-800 border-red-300' },
]

export default function NewHelpRequestPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { createRequest, loading } = useHelpRequests()

  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      router.push('/auth?mode=signin')
      return
    }

    if (!category || !description || !phoneNumber) {
      alert('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία')
      return
    }

    const requestData = {
      category,
      description,
      location: location || undefined,
      preferredDate: preferredDate || undefined,
      phoneNumber,
      urgency,
    }

    const result = await createRequest(requestData)

    if (result) {
      setSubmitted(true)
      setTimeout(() => {
        router.push('/help')
      }, 3000)
    }
  }

  // Success State
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Το Αίτημα Δημοσιεύτηκε! 💙
          </h1>
          <p className="text-gray-600 mb-2">
            Το αίτημά σας είναι πλέον ορατό στην κοινότητα.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Θα ενημερωθείτε όταν κάποιος εθελοντής προσφερθεί να βοηθήσει.
          </p>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Θα μεταφερθείτε στη λίστα αιτημάτων...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Πίσω</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Νέο Αίτημα Βοήθειας
          </h1>
          <p className="text-gray-600">
            Περιγράψτε την βοήθεια που χρειάζεστε
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Σημαντικές Πληροφορίες</h3>
              <ul className="space-y-1 text-sm opacity-90">
                <li>✓ Το αίτημά σας θα είναι ορατό σε όλη την κοινότητα</li>
                <li>✓ Εθελοντές θα επικοινωνήσουν μαζί σας για να προσφέρουν βοήθεια</li>
                <li>✓ Δωρεάν υπηρεσία - χωρίς χρηματικές συναλλαγές</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Στοιχεία Αιτήματος
            </h2>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Κατηγορία Βοήθειας *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-4 rounded-lg border-2 text-left transition ${
                      category === cat.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-semibold text-sm text-gray-800 mb-1">
                      {cat.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {cat.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Περιγραφή Αιτήματος *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
                placeholder="Περιγράψτε λεπτομερώς την βοήθεια που χρειάζεστε..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Urgency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Επείγον *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {urgencyLevels.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setUrgency(level.value as 'low' | 'medium' | 'high')}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition ${
                      urgency === level.value
                        ? level.color + ' border-current'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Τοποθεσία (προαιρετικό)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="π.χ. Κέντρο Αθήνας, Κολωνάκι"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>

            {/* Preferred Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Προτιμώμενη Ημερομηνία (προαιρετικό)
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Τηλέφωνο Επικοινωνίας *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="210 123 4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
              <p className="text-sm text-gray-500 mt-1">
                Οι εθελοντές θα χρησιμοποιήσουν αυτό το τηλέφωνο για να επικοινωνήσουν μαζί σας
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Προσοχή για την Ασφάλειά σας</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Μη μοιράζεστε προσωπικές πληροφορίες πέρα από το απαραίτητο</li>
                    <li>• Συναντηθείτε σε δημόσιους χώρους όταν είναι δυνατόν</li>
                    <li>• Ενημερώστε κάποιον για το ραντεβού σας</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Δημοσίευση...' : 'Δημοσίευση Αιτήματος'}
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Τι συμβαίνει μετά;
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                1
              </div>
              <div>
                <p className="font-semibold mb-1">Δημοσίευση</p>
                <p className="text-gray-600">Το αίτημά σας γίνεται ορατό σε όλους τους χρήστες της πλατφόρμας</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                2
              </div>
              <div>
                <p className="font-semibold mb-1">Εθελοντές</p>
                <p className="text-gray-600">Εθελοντές θα δουν το αίτημα και θα προσφερθούν να βοηθήσουν</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                3
              </div>
              <div>
                <p className="font-semibold mb-1">Επικοινωνία</p>
                <p className="text-gray-600">Θα λάβετε τηλεφώνημα από έναν εθελοντή για συντονισμό</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                4
              </div>
              <div>
                <p className="font-semibold mb-1">Ολοκλήρωση</p>
                <p className="text-gray-600">Η βοήθεια παρέχεται και το αίτημα ολοκληρώνεται!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
