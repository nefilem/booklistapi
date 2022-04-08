import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components'
import { BooksList, BooksInsert, BooksUpdate,Home } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import './books.scss';
import image from "./bg_librery.jpg"; 


function App() {
    return ( 
        
      <div>  
    <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat" , backgroundSize:"cover", 
    height:900}}>
      
    
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/books/list" element={<BooksList />}/>
      <Route exact path="/books/create" element={<BooksInsert />}/>
      <Route exact path="/books/update/:id" element={<BooksUpdate />}/>
             </Routes>
             </BrowserRouter>
             
             </div>  
             </div>  
    )
}

export default App

