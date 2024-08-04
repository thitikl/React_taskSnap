import { Form, Button } from "react-bootstrap";

const LoginPage = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchLogin = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: e.target.formBasicEmail.value,
              password: e.target.formBasicPassword.value,
            }),
          }
        );
        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };
    fetchLogin();
  };

  return (
    <div className="content" id="login">
      <Form onSubmit={handleSubmit} className="form-wrapper">
        <h1>Signin</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="form-wrapper">
        <p>Not having an acoount with us?</p>
        <a href="/register">
          <Button variant="secondary">Register</Button>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
