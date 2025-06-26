import { Link } from "react-router-dom";
import "./AccordionNav.scss";

export default function AccordionNav() {
  return (
    <div className="accordion-nav">
      <h2>CATBOOK</h2>
      <div className="accordion-links-top">
        <Link to="/">FOR YOU</Link>
        <Link to="/explore">EXPLORE</Link>
      </div>

      <div className="accordion-links-bottom">
        <Link to="/profile" className="profile-button">
          PROFILE
          <span className="corner top"></span>
          <span className="corner right"></span>
          <span className="corner bottom"></span>
          <span className="corner left"></span>
        </Link>
      </div>
    </div>
  );
}
