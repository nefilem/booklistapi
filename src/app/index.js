import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { BooksList, BooksInsert, BooksUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route exact path="/books/list" element={<BooksList />}/>
      <Route exact path="/books/create" element={<BooksInsert />}/>
                
                <Route
                    path="/books/update/:id"
                    exact
                    component={BooksUpdate}
                />
             </Routes>
             </BrowserRouter>
    )
}

export default App
