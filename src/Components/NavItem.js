import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavItem = styled.div`
  height: 70px;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    color: ${(props) => props.active ? "white" : "#9FFFCB"};
    :hover {
      opacity: 0.7;
      text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`;

const NavIcon = styled.div`
`;

export default class NavItem extends React.Component {

  render() {

    const { active } = this.props;

    return (
      <StyledNavItem>
        <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
          <NavIcon>test</NavIcon>
        </Link>
      </StyledNavItem>
    );
  }
}

