import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllArticles from './AllArticles'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className ="title">News Journal</h1>
      <AllArticles/>
    </>
  )
}

export default App
