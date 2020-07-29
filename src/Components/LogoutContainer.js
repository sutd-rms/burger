import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from './../history';

const StyledContainer = styled.div`
  border-top: 3px solid #343a40;
  position: absolute;
  bottom: 3px;
  width: 100%;
  height: 70px;
  padding-left: 40px;

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

export default class LogoutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    history.push('/');
  };

  render() {
    return (
      <StyledContainer>
        <Link to="/" onClick={this.handleClick}>
          <div>
            <ExitToAppIcon />
            Sign Out
          </div>
        </Link>
      </StyledContainer>
    );
  }
}
