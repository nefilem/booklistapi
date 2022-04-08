import React from 'react'
import { Container,Row, Col } from 'react-bootstrap'



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
    <Col>1 book</Col>
    <Col>2 book</Col>
    <Col>3 book</Col>
  </Row>
  </div>
</Container>   
    
    
  )
}

export default Home
