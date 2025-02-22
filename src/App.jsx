import { useState } from 'react'
import './App.css'
import AllArticles from './AllArticles'
import { Routes,Route,Navigate } from 'react-router-dom'
import SingleArticle from './SIngleArticle'
import Header from './Header'
import Topics from './Topics'
import ErrorPage from './Error'
import Users from './Users'



function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<SingleArticle/>} />
         <Route path="/topics" element={<Topics/>}/>
         <Route path="/users" element={<Users/>}/>
         <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
      
    </>
  )
}

export default App
