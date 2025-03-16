import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js' // added

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL //adeed
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY //added

export const supabase = createClient(supabaseUrl, supabaseKey) //added

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App /> 
  </BrowserRouter>
)
