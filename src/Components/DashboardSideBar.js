import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import NavItem from './NavItem';
import LogoutContainer from './LogoutContainer';
import styled from 'styled-components';
import { Figure, Image, Col, Row } from 'react-bootstrap';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { Typography } from '@material-ui/core';
import UserIcon from './../static/images/person.png';
import { store } from './../redux/store';

const StyledSideNav = styled.div`
  position: fixed; /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 250px; /* Set the width of the sidebar */
  z-index: 1; /* Stay on top of everything */
  background-color: #222; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
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
    width: 60px;
    height: 60px;
    margin-left: 20px;
    background-color: white;
  }
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:
        store.getState().currentUser.first_name +
        ' ' +
        store.getState().currentUser.last_name,
      cover: store.getState().currentUser.cover,
      activePath: props.location.pathname,
      items: [
        {
          path: '/Dashboard/projects',
          name: 'Projects',
          key: 0,
          icon: <FolderIcon />
        },
        {
          path: '/Dashboard/models',
          name: 'Models',
          key: 1,
          icon: <AccountTreeIcon />
        },
        {
          path: '/Dashboard/users',
          name: 'Users',
          key: 2,
          icon: <PersonIcon />
        },
        {
          path: '/Dashboard/settings',
          name: 'Settings',
          key: 3,
          icon: <SettingsIcon />
        }
      ],
      is_staff: store.getState().currentUser.is_staff
    };
  }

  onItemClick = path => {
    this.setState({
      activePath: path
    }); /* Sets activePath which causes rerender which causes CSS to change */
  };

  render() {
    const { items, activePath } = this.state;

    return (
      <StyledSideNav>
        <div>
          <Figure className="navImage">
            <Figure.Image alt="Nav Logo" src={'/logoNav.jpg'} />
          </Figure>
        </div>
        <Row className="currentUser">
          <Col md={4} className="my-auto">
            <Image
              className="currentUserImage"
              src={this.state.cover || UserIcon}
              roundedCircle
            />
          </Col>
          <Col md={8} className="my-auto currentUserText">
            <Typography variant="subtitle2">
              Hello, {this.state.username}!
            </Typography>
          </Col>
        </Row>
        {/* items = just array AND map() loops thru that array AND item is param of that loop */
        items.map(item => {
          let return_item =
            !this.state.is_staff &&
            (item.name === 'Users' || item.name === 'Models') ? (
              ''
            ) : (
              <NavItem
                path={item.path}
                name={item.name}
                icon={item.icon}
                onItemClick={this.onItemClick}
                active={item.path === activePath}
                key={item.key}
              />
            );
          /* Return however many NavItems in array to be rendered */
          return return_item;
          // <NavItem
          //   path={item.path}
          //   name={item.name}
          //   icon={item.icon}
          //   onItemClick={this.onItemClick}
          //   active={item.path === activePath}
          //   key={item.key}

          // />
        })}
        <LogoutContainer />
      </StyledSideNav>
    );
  }
}

const RouterSideNav = withRouter(Sidebar);

export default RouterSideNav;
