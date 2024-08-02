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
    <div className="content">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default LoginPage;
