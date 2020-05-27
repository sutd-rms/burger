import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavItem from "./NavItem"
import styled from "styled-components";

const StyledSideNav = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 200px;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */
  background-color: #222; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePath: '/',
      items: [
        {
          path: '/', /* path is used as id to check which NavItem is active basically */
          name: 'Home',
          key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
        },
        {
          path: '/dashboard/users',
          name: 'About',
          key: 2,
          icon: <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                </svg>,
        },
        {
          path: '/dashboard/projects',
          name: 'NoMatch',
          key: 3
        },
      ]
    }  
  }
  
  onItemClick = (path) => {
    this.setState({ activePath: path }); /* Sets activePath which causes rerender which causes CSS to change */
  }

  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  }

  render() {

    const { items, activePath } = this.state;

    return (
      <StyledSideNav>
        {
          /* items = just array AND map() loops thru that array AND item is param of that loop */
          items.map((item) => {
            /* Return however many NavItems in array to be rendered */
            return (
              <NavItem path={item.path} name={item.name} icon={item.icon} onItemClick={this.onItemClick} /* Simply passed an entire function to onClick prop */ active={item.path === activePath} key={item.key}/>
            )
          })
        }
      </StyledSideNav>
    );
  }
}
