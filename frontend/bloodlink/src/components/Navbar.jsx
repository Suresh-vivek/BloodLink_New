import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Home" },

    {
      path: "/live-availability",
      title: "Live Availability",
      externalLink:
        "https://www.eraktkosh.in/BLDAHIMS/bloodbank/stockAvailability.cnt",
    },
    { path: "/request", title: "Request" },
    {
      path: "/donate",
      title: "Donate",
    },
    {
      path: "/community",
      title: "Community",
    },
    {
      path: "/contact",
      title: "Contact US",
    },
    {
      path: "/signup",
      title: "Sign Up",
    },
  ];
  return (
    <header>
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} className="logo-image" /><h1 className="logo-text"> Linking Lifesavers with Lifeseekers </h1>
        </a>

        {/*Nav items for large Devices */}
        <ul className="nav-items">
          {navItems.map(({ path, title, externalLink }) => (
            <li key={path}>
              {externalLink ? (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
