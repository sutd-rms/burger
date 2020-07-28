import React from 'react';
import { connect } from 'react-redux';
import { userLoginFetch } from '../redux/actions';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Carousel,
  Figure,
  Form
} from 'react-bootstrap';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withRouter } from 'react-router-dom';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isRemember: false,
      passwordShown: false
    };
    if (props.location.state) {
      this.state.errorMessage = props.location.state.error_message;
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isRemember' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('An email was submitted: ' + this.state.email);
    event.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password,
      isRemember: this.state.isRemember
    };

    this.props.userLoginFetch(credentials);
  }

  togglePasswordVisiblity(event) {
    this.setState({
      passwordShown: this.state.passwordShown ? false : true
    });
  }

  render() {
    return (
      <React.Fragment>
        <Container className="homePage">
          <Row className="vh-100">
            <Col md={5} className="pr-5 my-auto loginForm">
              <Figure>
                <Figure.Image alt="171x180" src="/rms_logo.jpg" />
              </Figure>
              <p className="text-danger">{this.state.errorMessage}</p>
              <Form className="my-3" onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>EMAIL</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="inputIcon">
                        <MailOutlineIcon />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      aria-describedby="inputGroupPrepend"
                      onChange={this.handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>PASSWORD</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="inputIcon">
                        <LockOutlinedIcon />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="password"
                      type={this.state.passwordShown ? 'text' : 'password'}
                      placeholder="Enter Password"
                      aria-describedby="inputGroupPrepend"
                      onChange={this.handleInputChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text onClick={this.togglePasswordVisiblity}>
                        <VisibilityIcon />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                {/* <Form.Group>
                  <Form.Check
                    name="isRemember"
                    label="Remember me"
                    onChange={this.handleInputChange}
                  />
                </Form.Group> */}
                <Button
                  variant="dark"
                  type="submit"
                  style={{ marginTop: '10px' }}
                >
                  SIGN IN
                </Button>
              </Form>
              <p className="mt-3">
                <a href="/password-reset" className="text-dark">
                  Forgot Password?
                </a>
              </p>
            </Col>
            <Col md={7} className="pl-5 my-auto homeRightSection">
              <h1>Welcome Back :)</h1>
              <h2>Let's do more with our data!</h2>
              <Carousel className="mt-5">
                <Carousel.Item className="homeCarousel">
                  <img
                    className="d-block w-100"
                    src="carousel1.png"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item className="homeCarousel">
                  <img
                    className="d-block w-100"
                    src="carousel2.jpg"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
  };
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
