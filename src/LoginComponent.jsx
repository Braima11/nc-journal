import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './main.jsx'

function LoginRequired() {
  return (
    <div className="auth-container">
      <h2>Login Required</h2>
      <p>You need to be logged in to view this page.</p>
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        redirectTo="/articles"
      />
    </div>
  )
}

export default LoginRequired