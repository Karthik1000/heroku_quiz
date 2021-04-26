import React, { Component } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";


export class home extends Component {
    render() {
        return (
            <div>
                
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"#"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link href="/create-user" className="nav-link">
                  Create Student
                </Link>
              </Nav>

              <Nav>
                <Link to={"/user-list"} className="nav-link">
                  User List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

    </div>
  
                
            </div>
        )
    }
}

export default home


