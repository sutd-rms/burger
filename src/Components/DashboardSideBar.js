import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import NavItem from "./NavItem"
import LogoutContainer from "./LogoutContainer"
import styled from "styled-components";
import { Figure, Image, Col, Row } from 'react-bootstrap'
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PersonIcon from '@material-ui/icons/Person';

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
          icon: <HomeIcon/>
        },
        {
          path: '/Dashboard/projects',
          name: 'Projects',
          key: 2,
          icon: <FolderIcon/>
        },
        {
          path: '/Dashboard/models',
          name: 'Models',
          key: 3,
          icon: <AccountTreeIcon/>
        },
        {
          path: '/Dashboard/users',
          name: 'Users',
          key: 4,
          icon: <PersonIcon/>
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
