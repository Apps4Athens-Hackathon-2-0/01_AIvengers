// HelpMeAnytime 2.0 - Landing Page
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                🆘 HelpMeAnytime
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Υπηρεσίες</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">Πώς Λειτουργεί</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">Σχετικά</a>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Γεια σου, {user?.name || user?.email}!</span>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push('/auth?mode=signin')}
                    className="text-gray-700 hover:text-indigo-600 transition"
                  >
                    Σύνδεση
                  </button>
                  <button
                    onClick={() => router.push('/auth?mode=signup')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                  >
                    Εγγραφή
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
              Συνδέοντας τη
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Κοινότητα της Αθήνας
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Μια ολοκληρωμένη πλατφόρμα που συνδέει δημότες, εθελοντές, επαγγελματίες και δήμο 
              για καλύτερες υπηρεσίες και συνεργατικά έργα.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Ξεκίνα Τώρα 🚀
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transition shadow-xl border-2 border-indigo-200"
              >
                Μάθε Περισσότερα
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 Τρόποι να Βοηθήσεις την Κοινότητα
            </h2>
            <p className="text-xl text-gray-600">
              Επίλεξε τον τρόπο που σου ταιριάζει περισσότερο
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Bookings */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Κλείσε Ραντεβού με Ειδικό
              </h3>
              <p className="text-gray-600 mb-6">
                Ηλεκτρολόγοι, υδραυλικοί και άλλοι ειδικοί με <strong>επιδότηση από τον δήμο</strong>. 
                Πληρώνεις μόνο μια μικρή τιμή!
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>⚡ Ηλεκτρολόγοι</li>
                <li>🚰 Υδραυλικοί</li>
                <li>🪵 Μαραγκοί</li>
                <li>🎨 Βαφείς & πολλά άλλα</li>
              </ul>
              <button
                onClick={() => router.push(isAuthenticated ? '/bookings/new' : '/auth')}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Κλείσε Ραντεβού
              </button>
            </div>

            {/* Feature 2: Help Requests */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ζήτα ή Προσφέρε Βοήθεια
              </h3>
              <p className="text-gray-600 mb-6">
                Χρειάζεσαι βοήθεια; Δημιούργησε αίτημα και <strong>εθελοντές θα σε βοηθήσουν δωρεάν</strong>!
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>📦 Μετακόμιση</li>
                <li>🛒 Ψώνια</li>
                <li>💻 Τεχνολογία</li>
                <li>👥 Συντροφιά & άλλα</li>
              </ul>
              <button
                onClick={() => router.push(isAuthenticated ? '/help/new' : '/auth')}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Ζήτα Βοήθεια
              </button>
            </div>

            {/* Feature 3: Civic Projects */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Πρότεινε Έργα
              </h3>
              <p className="text-gray-600 mb-6">
                Πρότεινε έργα για την περιοχή σου και συγκέντρωσε <strong>χρήματα, χρόνο ή υλικά</strong> από άλλους δημότες!
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>💰 Pledges χρημάτων</li>
                <li>⏰ Εθελοντικές ώρες</li>
                <li>📦 Δωρεά υλικών</li>
                <li>✅ Έγκριση από δήμο</li>
              </ul>
              <button
                onClick={() => router.push(isAuthenticated ? '/projects/create' : '/auth')}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Πρότεινε Έργο
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Πώς Λειτουργεί;
            </h2>
            <p className="text-xl text-gray-600">
              Απλά 3 βήματα για να ξεκινήσεις
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Εγγραφή</h3>
              <p className="text-gray-600">
                Δημιούργησε δωρεάν λογαριασμό σε 1 λεπτό
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Επίλεξε Υπηρεσία</h3>
              <p className="text-gray-600">
                Κλείσε ραντεβού, ζήτα βοήθεια ή πρότεινε έργο
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Συνεργάσου</h3>
              <p className="text-gray-600">
                Συνεργάσου με επαγγελματίες, εθελοντές ή συνδημότες
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Εγγεγραμμένοι Δημότες</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Επιδοτημένοι Ειδικοί</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Ολοκληρωμένα Έργα</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">€15K+</div>
              <div className="text-gray-600">Επιδοτήσεις Δήμου</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Έτοιμος να Κάνεις τη Διαφορά;
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Γίνε μέλος της κοινότητας και βοήθησε να κάνουμε την Αθήνα καλύτερη!
          </p>
          <button
            onClick={handleGetStarted}
            className="px-12 py-4 bg-white text-indigo-600 text-lg font-bold rounded-xl hover:bg-gray-100 transition shadow-2xl transform hover:scale-105"
          >
            Ξεκίνα Δωρεάν 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🆘 HelpMeAnytime</h3>
              <p className="text-gray-400">
                Συνδέοντας την κοινότητα της Αθήνας για ένα καλύτερο αύριο.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Υπηρεσίες</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📅 Ραντεβού με Ειδικούς</li>
                <li>🆘 Αιτήματα Βοήθειας</li>
                <li>🏗️ Προτάσεις Έργων</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Επικοινωνία</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@helpmeanytime.gr</li>
                <li>📞 +30 210 1234567</li>
                <li>📍 Αθήνα, Ελλάδα</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 HelpMeAnytime - Apps4Athens Hackathon 2.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
