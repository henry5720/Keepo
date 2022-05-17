import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <li>
        <Link to="/Timer" className="btn">
          Timer
        </Link>
      </li>
      <li>
        <Link to="/Status" className="btn">
          Stats
        </Link>
      </li>
      <li>
        <Link to="/Setting" className="btn">
          Setting
        </Link>
      </li>
    </ul>
  );
}
export default Nav;
