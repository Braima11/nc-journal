import { useState } from 'react'
import './App.css'
import AllArticles from './AllArticles'
import { Routes,Route } from 'react-router'
import SingleArticle from './SIngleArticle'


function App() {

  return (
    <>
      <h1 className ="title">News Journal</h1>
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="api/articles/:article_id" element={<SingleArticle/>} />
      </Routes>
    </>
  )
}

export default App
