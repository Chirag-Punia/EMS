import React from "react";
import "../styles/Header.css";
import "../styles/Footer.css";
import "../styles/Main.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Homepage = ({ children }) => {
    return (
        <div className="home-page">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

const Header = () => (
    <header className="home-page-header">
        <div className="header-container">
            <Link to="/login">
                <div>
                    <img
                        src={logo}
                        alt="Suvidha Foundation Logo"
                        className="header-logo"
                    />
                </div>
            </Link>
            <h1 className="header-title">
                {"EMPLOYEE  MANAGEMENT  PORTAL".split("").map((char, index) => (
                    <span key={index} className="animated-letter">
            {char}
          </span>
                ))}
            </h1>
        </div>
    </header>
);

const Footer = () => (
    <footer className="home-page-footer">
        <div className="footer-container">
            <p className="footer-text">

            </p>
        </div>
    </footer>
);

export default Homepage;