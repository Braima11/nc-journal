import { useState, useEffect } from 'react'
import './App.css'
import AllArticles from './AllArticles'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import SingleArticle from './SIngleArticle'
import Header from './Header'
import Topics from './Topics'
import ErrorPage from './Error'
import Users from './Users'
import { supabase } from './main.jsx'
import LoginRequired from "./LoginComponent"
import UpdatePassword from './UpdatePassword.jsx'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setLoading(false)
      })
    
    console.log(session)
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event)
        
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true)
          navigate('/update-password')
        } else {
          setSession(session)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* Only show header if NOT in password recovery mode */}
      {!isPasswordRecovery && <Header session={session} />}
      
      <Routes>
        {/* Public routes - accessible without login */}
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<SingleArticle session={session} />} />
        <Route path="/topics" element={<Topics session={session} />} />
        
        {/* Login route */}
        <Route path="/login" element={
          session && !isPasswordRecovery ? <Navigate to="/articles" /> : <LoginRequired />
        } />
        
        <Route path="/update-password" element={<UpdatePassword onComplete={() => setIsPasswordRecovery(false)} />} />
        
        {/* Protected routes - require login */}
        <Route path="/users" element={
          session ? <Users /> : <Navigate to="/login" />
        } />
        
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
    </>
  )
}

export default App