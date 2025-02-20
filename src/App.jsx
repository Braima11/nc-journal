import { useState } from 'react'
import './App.css'
import AllArticles from './AllArticles'
import { Routes,Route } from 'react-router'
import SingleArticle from './SIngleArticle'
import Header from './Header'
import Topics from './Topics'



function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<SingleArticle/>} />
         <Route path="/topics" element={<Topics/>}/>
      </Routes>
      
    </>
  )
}

export default App
