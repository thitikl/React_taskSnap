import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const notShowNavbar = ["/login", "/register"];
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (notShowNavbar.includes(location.pathname)) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <>{showNavbar && children}</>;
};

export default NavbarWrapper;
