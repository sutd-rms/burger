import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled.div`
  height: 70px;
  line-height: 70px;
  text-align: center;
  margin-bottom: 0; /* Puts space between NavItems */
  padding-left: 40px;
  background-color: ${props => (props.active ? '#343A40' : '#222')};

  :hover {
    background-color: #343a40;
  }

  a {
    font-size: 1.5em;
    color: white;
    text-decoration: none; /* Gets rid of underlining of icons */
  }

  div {
    text-align: left;
    line-height: 70px;
  }

  svg {
    font-size: 1.5em;
    margin-right: 10px;
    padding-bottom: 5px;
  }
`;

export default class NavItem extends React.Component {
  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  };

  render() {
    const { active } = this.props;

    return (
      <StyledNavItem active={active}>
        <Link to={this.props.path} onClick={this.handleClick}>
          <div>
            {this.props.icon}
            {this.props.name}
          </div>
        </Link>
      </StyledNavItem>
    );
  }
}
