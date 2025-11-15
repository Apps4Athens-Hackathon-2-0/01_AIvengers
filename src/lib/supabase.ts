// ============================================
// 👨‍💻 DEVELOPER 1 - TASK 1 (Hour 0-2)
// ============================================
// 
// ΤΙ ΠΡΕΠΕΙ ΝΑ ΚΑΝΕΙΣ:
// 1. Πήγαινε στο https://supabase.com και φτιάξε νέο project
// 2. Από το Supabase Dashboard, πάρε:
//    - Project URL (π.χ. https://xxxxx.supabase.co)
//    - Anon Key (public key για το frontend)
// 3. Βάλτα στο .env.local:
//    NEXT_PUBLIC_SUPABASE_URL=το_url_σου
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=το_key_σου
// 4. Στο Supabase Dashboard > SQL Editor, τρέξε το database.sql
// 5. Uncomment τον κώδικα παρακάτω και δοκίμασε τη σύνδεση
//
// ΧΡΟΝΟΣ: 2 ώρες
// COMMIT: "feat: setup supabase connection and database schema"
// ============================================

// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Using mock mode.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData // role, name, etc
    }
  })
  
  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}
