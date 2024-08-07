import { useEffect, useState } from "react";
import { isUserLoggedIn, getToken } from "../utils/auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AccountPage = () => {
  const isLoggedIn = isUserLoggedIn();

  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/user", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        if (data) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    const fetchLogout = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/auth/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (response.ok) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLogout();
  };

  return (
    <div className="content" id="account">
      <Card text="light">
        <Card.Body>
          <h1>Account</h1>
          <Card.Text>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>{data.name}</Col>
              </Row>
              <hr />
              <Row>
                <Col>Email</Col>
                <Col>{data.username}</Col>
              </Row>
              <hr />
            </Container>
          </Card.Text>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccountPage;
