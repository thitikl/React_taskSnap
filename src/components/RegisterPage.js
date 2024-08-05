import { Form, Button } from "react-bootstrap";

const RegisterPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchRegister = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.target.formBasicName.value,
              username: e.target.formBasicEmail.value,
              password: e.target.formBasicPassword.value,
            }),
          }
        );

        if (response.status === 200) {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    };
    fetchRegister();
  };

  return (
    <div className="content" id="login">
      <Form onSubmit={handleSubmit} className="form-wrapper">
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="form-wrapper">
        <p>Already having an account?</p>
        <a href="/login">
          <Button variant="secondary">Signin</Button>
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
