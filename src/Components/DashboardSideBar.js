import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import NavItem from "./NavItem"
import LogoutContainer from "./LogoutContainer"
import styled from "styled-components";
import { Figure, Image, Col, Row } from 'react-bootstrap'

const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 250px;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */
  background-color: #222; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  color: white;

  .navImage {
    background-color: white;
    padding: 20px;
    margin-bottom: 0px;
  }

  .currentUser {
    height: 100px;
    background-color: #184085;
    font-size: 1.3em;
  }

  .currentUserImage {
    width: 100%;
    height: auto;
    margin-left: 20px;
  }
`;

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePath: props.location.pathname,
      items: [
        {
          path: '/Dashboard', /* path is used as id to check which NavItem is active basically */
          name: 'Dashboard',
          key: 1, /* Key is required, else console throws error. Does this please you Mr. Browser?! */
          icon: <svg className="bi bi-house-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                  <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg>
        },
        {
          path: '/Dashboard/projects',
          name: 'Projects',
          key: 2,
          icon: <svg className="bi bi-inboxes-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1-.78.624l-3.7-4.624A.5.5 0 0 0 11.02 1H4.98a.5.5 0 0 0-.39.188L.89 5.812a.5.5 0 1 1-.78-.624L3.81.563z"/>
                  <path fillRule="evenodd" d="M.125 5.17A.5.5 0 0 1 .5 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .121-.393z"/>
                </svg>  
        },
        {
          path: '/Dashboard/models',
          name: 'Models',
          key: 3,
          icon: <svg class="bi bi-dash-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2 7.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H4z"/>
                </svg>
        },
        {
          path: '/Dashboard/users',
          name: 'Users',
          key: 4,
          icon: <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
        },
      ]
    }  
  }
  
  onItemClick = (path) => {
    this.setState({ activePath: path }); /* Sets activePath which causes rerender which causes CSS to change */
  }


  render() {

    const { items, activePath } = this.state;

    return (
      <StyledSideNav>
        <div>
          <Figure className="navImage">
            <Figure.Image
              alt="Nav Logo"
              src= "/logoNav.jpg"
            />
          </Figure>
        </div>
        <Row className="currentUser">
          <Col md={4} className="my-auto">
            <Image className="currentUserImage" src="/hamburglar.jpg" roundedCircle />
          </Col>
          <Col md={8} className="my-auto currentUserText">
            <div className="">Hello, Meng Siong!</div>
          </Col>
        </Row>
        {
          /* items = just array AND map() loops thru that array AND item is param of that loop */
          items.map((item) => {
            /* Return however many NavItems in array to be rendered */
            return (
              <NavItem 
                path={item.path} 
                name={item.name} 
                icon={item.icon} 
                onItemClick={this.onItemClick}
                active={item.path === activePath} 
                key={item.key}
              />
            )
          })
        }
        <LogoutContainer></LogoutContainer>
      </StyledSideNav>
    );
  }
}

const RouterSideNav = withRouter(Sidebar);

export default RouterSideNav;
