import { useState } from 'react'
import './App.css'
import AllArticles from './AllArticles'
import { Routes,Route } from 'react-router'
import SingleArticle from './SIngleArticle'
import Header from './Header'



function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="api/articles/:article_id" element={<SingleArticle/>} />
      </Routes>
      
    </>
  )
}

export default App
