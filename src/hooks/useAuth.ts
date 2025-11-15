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
import { supabase, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    checkUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    
    return () => subscription.unsubscribe()
  }, [])
  
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true)
      setError(null)
      const data = await supabaseSignUp(email, password, userData)
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await supabaseSignIn(email, password)
      setUser(data.user)
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      await supabaseSignOut()
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
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
  }
}
