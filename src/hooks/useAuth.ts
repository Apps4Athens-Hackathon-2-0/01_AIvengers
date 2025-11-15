// ============================================
// 👨‍💻 DEVELOPER 1 - TASK 2 (Hour 2-4)
// ============================================
// 
// ΤΙ ΠΡΕΠΕΙ ΝΑ ΚΑΝΕΙΣ:
// 1. Φτιάξε functions για:
//    - signUp(email, password, role) - Εγγραφή χρήστη
//    - signIn(email, password) - Login
//    - signOut() - Logout
//    - getCurrentUser() - Πάρε τον συνδεδεμένο χρήστη
// 
// 2. Πρόσθεσε state management με useState:
//    - user (ο τρέχων χρήστης)
//    - loading (αν φορτώνει)
//    - error (αν έχει σφάλμα)
//
// 3. Χρησιμοποίησε το supabase.auth από το src/lib/supabase.ts
//
// 4. Φτιάξε role detection:
//    - Citizen (δημότης)
//    - Volunteer (εθελοντής)
//    - Municipality (δήμος)
//
// ΠΑΡΑΔΕΙΓΜΑ ΧΡΗΣΗΣ:
// const { user, loading, signIn, signOut } = useAuth()
// 
// ΧΡΟΝΟΣ: 2 ώρες
// COMMIT: "feat: implement authentication system with user roles"
// ============================================

'use client'
import { useState, useEffect } from 'react'

// Mock user type (not using Supabase for now)
export interface AppUser {
  id: string
  email: string
  name?: string
  phone?: string
  role?: string
}

// Mock demo users
const DEMO_USERS = [
  {
    id: 'citizen-1',
    email: 'citizen@helpmeanytime.gr',
    password: 'Demo123!',
    name: 'Γιώργος Παπαδόπουλος',
    phone: '210 123 4567',
    role: 'citizen'
  },
  {
    id: 'professional-1',
    email: 'professional@helpmeanytime.gr',
    password: 'Demo123!',
    name: 'Νίκος Ηλεκτρολόγος',
    phone: '210 234 5678',
    role: 'professional'
  },
  {
    id: 'admin-1',
    email: 'admin@athens.gov.gr',
    password: 'Admin123!',
    name: 'Μαρία Δημητρίου',
    phone: '210 345 6789',
    role: 'municipality'
  }
]

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('helpmeanytime_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    checkUser()
  }, [])
  
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock signup - accept any email/password
      const newUser: AppUser = {
        id: `user-${Date.now()}`,
        email,
        name: userData?.name || email.split('@')[0],
        phone: userData?.phone || '',
        role: 'citizen'
      }
      
      // Store in localStorage
      localStorage.setItem('helpmeanytime_user', JSON.stringify(newUser))
      setUser(newUser)
      
      return { success: true, data: { user: newUser }, error: null }
    } catch (err: any) {
      const errorMessage = err.message || 'Κάτι πήγε στραβά'
      setError(errorMessage)
      return { success: false, data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }
  
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Check demo users first
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password)
      
      if (demoUser) {
        const { password: _, ...userWithoutPassword } = demoUser
        const loggedUser: AppUser = userWithoutPassword
        localStorage.setItem('helpmeanytime_user', JSON.stringify(loggedUser))
        setUser(loggedUser)
        return { success: true, data: { user: loggedUser }, error: null }
      }
      
      // If not a demo user, accept any credentials (mock mode)
      const mockUser: AppUser = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'citizen'
      }
      
      localStorage.setItem('helpmeanytime_user', JSON.stringify(mockUser))
      setUser(mockUser)
      return { success: true, data: { user: mockUser }, error: null }
      
    } catch (err: any) {
      const errorMessage = err.message || 'Κάτι πήγε στραβά'
      setError(errorMessage)
      return { success: false, data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }
  
  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      localStorage.removeItem('helpmeanytime_user')
      setUser(null)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  }
}
