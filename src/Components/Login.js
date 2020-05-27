import React from 'react';
import { Container, Row, Col, Button, InputGroup, Carousel, Figure, Form } from 'react-bootstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isRemember: false,
      passwordShown: false,
    };

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
    alert('An email was submitted: ' + this.state.email);
    event.preventDefault();
  }

  togglePasswordVisiblity(event) {
    this.setState({
      passwordShown: this.state.passwordShown ? false : true
    });
  };

  render() {
    
    return (
      <React.Fragment>
        <Container className="homePage">
          <Row className="vh-100">
            <Col md={5} className="pr-5 my-auto loginForm">
              <Figure>
                <Figure.Image
                  alt="171x180"
                  src= "/rms_logo.jpg"
                />
              </Figure>
              <Form className="my-3" onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>EMAIL</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="inputIcon">
                        <svg className="bi bi-envelope" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                          <path d="M.05 3.555C.017 3.698 0 3.847 0 4v.697l5.803 3.546L0 11.801V12c0 .306.069.596.192.856l6.57-4.027L8 9.586l1.239-.757 6.57 4.027c.122-.26.191-.55.191-.856v-.2l-5.803-3.557L16 4.697V4c0-.153-.017-.302-.05-.445L8 8.414.05 3.555z"/>
                        </svg>                      
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
                        <svg className="bi bi-lock" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                        </svg>                      
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="password"
                      type={this.state.passwordShown ? "text" : "password"}
                      placeholder="Enter Password"
                      aria-describedby="inputGroupPrepend"
                      onChange={this.handleInputChange}
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text onClick={this.togglePasswordVisiblity}>
                        <svg className="bi bi-eye-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    name="isRemember"
                    label="Remember me"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">SIGN IN</Button>
              </Form>
              <p class="mt-3"><a href="#" class="text-dark">Forgot Password?</a></p>
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

export default Login;
