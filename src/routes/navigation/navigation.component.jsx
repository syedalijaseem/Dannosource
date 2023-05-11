import React from "react";
import { Fragment, useState, useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

import { ReactComponent as DannsourceLogo } from "../../assets/dannosource.svg";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import { Dropdown } from "react-bootstrap";

function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //console.log(currentUser);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <DannsourceLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <div className="reports-dropdown-container">
            <Dropdown>
              <Dropdown.Toggle
                as={NavLink}
                to="#"
                id="reports-dropdown"
                className="nav-link"
              >
                REPORTS
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/reports/earnings">
                  Earnings
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/reports/bids">
                  Bids
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/jobs">
              JOBS
            </Link>
          ) : null}
          <Link className="nav-link" to="/workbench">
            WORKBENCH
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/signin">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
