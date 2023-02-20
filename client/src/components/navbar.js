import React from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

export default function GameNavbar() {
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand className="navbar-brand" href="/">
          <img
            alt="logo"
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
            src="/logo.svg"
          ></img>
          Side Stacker
        </NavbarBrand>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/createGame">
                Create Game
              </NavLink>
            </li>
          </ul>
        </div>
      </Navbar>
    </div>
  );
}
