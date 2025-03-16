import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './main.jsx'

export default function UpdatePassword({ onComplete }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const password = formData.get('password')
    
    supabase.auth.updateUser({
      password: password
    })
    .then(({ data, error }) => {
      if (error) {
        setError(error.message)
        return Promise.reject(error)
      }
      
      setMessage('Password updated successfully!')
      
      // Sign out the user after password reset
      return supabase.auth.signOut()
    })
    .then(() => {
      // Wait 2 seconds before redirecting to login
      setTimeout(() => {
        // Signal that password recovery is complete
        if (onComplete) onComplete()
        navigate('/login')
      }, 2000)
    })
    .catch(err => {
      console.error('Error updating password:', err)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength="6"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}