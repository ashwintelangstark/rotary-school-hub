import { createClient } from '@supabase/supabase-js'

// Auth configuration from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ||
                     import.meta.env.SUPABASE_URL ||
                     ''

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ||
                        import.meta.env.SUPABASE_PUBLISHABLE_KEY ||
                        ''

// Auth-specific Supabase client
export const authSupabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// User type
export interface User {
  id: string
  email: string
  name: string | null
  role: string
}

// Auth state management
let currentUser: User | null = null
let authCallbacks: ((user: User | null) => void)[] = []

// Initialize auth from localStorage and Supabase session
export async function initAuth() {
  if (typeof window === 'undefined' || !authSupabase) return null

  try {
    // Check if we have an active Supabase session
    const { data: { session }, error } = await authSupabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error)
      // Fall back to localStorage
      const storedUser = localStorage.getItem('gallery_user')
      if (storedUser) {
        try {
          currentUser = JSON.parse(storedUser)
          return currentUser
        } catch {
          return null
        }
      }
      return null
    }

    if (session?.user) {
      // Get additional user data from users table if it exists
      const { data: userData } = await authSupabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle()

      // Create user object
      const user: User = {
        id: userData?.id || session.user.id,
        email: userData?.email || session.user.email || '',
        name: userData?.name || session.user.user_metadata?.name || null,
        role: userData?.role || session.user.user_metadata?.role || 'user'
      }

      currentUser = user
      localStorage.setItem('gallery_user', JSON.stringify(user))
      return user
    } else {
      // No active session, clear localStorage and return null
      localStorage.removeItem('gallery_user')
      currentUser = null
      return null
    }
  } catch (error) {
    console.error('Error initializing auth:', error)
    // Fall back to localStorage
    const storedUser = localStorage.getItem('gallery_user')
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser)
        return currentUser
      } catch {
        return null
      }
    }
    return null
  }
}

// Login function
export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  if (!authSupabase) {
    return { success: false, error: 'Supabase not configured' }
  }

  try {
    // Use Supabase's built-in authentication
    const { data: authData, error: authError } = await authSupabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (authError || !authData.user) {
      console.error('Supabase auth error:', authError)
      return { success: false, error: 'Invalid email or password' }
    }

    // Get additional user data from users table if it exists
    const { data: userData, error: userError } = await authSupabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    // Store user data - prefer custom user data, fall back to auth user data
    const user: User = {
      id: userData?.id || authData.user.id,
      email: userData?.email || authData.user.email || email,
      name: userData?.name || authData.user.user_metadata?.name || null,
      role: userData?.role || authData.user.user_metadata?.role || 'user'
    }

    currentUser = user
    localStorage.setItem('gallery_user', JSON.stringify(user))

    // Notify all listeners
    authCallbacks.forEach(callback => callback(user))

    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

// Logout function
export async function logoutUser() {
  currentUser = null
  if (typeof window !== 'undefined') {
    localStorage.removeItem('gallery_user')
  }

  // Also sign out from Supabase Auth
  if (authSupabase) {
    try {
      await authSupabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out from Supabase:', error)
    }
  }

  authCallbacks.forEach(callback => callback(null))
}

// Get current user
export function getCurrentUser(): User | null {
  return currentUser
}

// Subscribe to auth changes
export function onAuthChange(callback: (user: User | null) => void) {
  authCallbacks.push(callback)
  // Return unsubscribe function
  return () => {
    authCallbacks = authCallbacks.filter(cb => cb !== callback)
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return currentUser !== null
}

// Initialize on load
if (typeof window !== 'undefined') {
  initAuth()
}