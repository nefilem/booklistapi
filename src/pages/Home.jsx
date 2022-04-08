import React from 'react'
import { Container,Row, Col } from 'react-bootstrap'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getAllBooks = () => api.get(`/booklist/getRandomBooks`)

const displayTop3 = () => {

  api.get(`/booklist/getRandomBooks`)
  .then((e) => {

    document.getElementById("col1b").innerHTML = "<img src='" + e.data[0].imagelink + "'/>";
    document.getElementById("col2b").innerHTML = "<img src='" + e.data[1].imagelink + "'/>";
    document.getElementById("col3b").innerHTML = "<img src='" + e.data[2].imagelink + "'/>";
    // return (
    //   <>
    //     <Col>{e.data.imagelink}</Col>
    //   </>
    // )
  })

}

const Home = () => {  

  return (
    <Container>
    <div>
        <div className="welcome">
        <h1>Welcome to our library!</h1>
        <p>Here you can choose to read and return the book. It is possible to add your book or edit an existing one.</p>
        </div>
        <div className="welcome">
        <h2>The most popular books</h2>
        </div> 
        {/* Show random books */}
  
  <Row>
    {displayTop3()}
    <Col id="col1b"></Col>
    <Col id="col2b"></Col>
    <Col id="col3b"></Col>
  </Row>
  </div>
</Container>   
    
    
  )
}

export default Home
