import React from "react";
import { Fragment, useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

import { ReactComponent as DannsourceLogo } from "../../assets/dannosource.svg";

import "./navigation.styles.scss";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";

/*
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <DannsourceLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/workbench">
            WORKBENCH
          </Link>
          <Link className="nav-link" to="/reports">
            REPORTS
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
*/
function Navigation() {
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
          <Link className="nav-link" to="/workbench">
            WORKBENCH
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
