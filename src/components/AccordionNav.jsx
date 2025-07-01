import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccordionNav.scss";
import CreatePostModal from "./CreatePostModal";

export default function AccordionNav() {
  const navigate = useNavigate();
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <div className="accordion-nav">
      <h2>CATBOOK</h2>

      <div className="accordion-links-top">
        <button onClick={() => navigate("/")}>FOR YOU</button>
        <button onClick={() => navigate("/search")}>SEARCH</button>
        <button
          className="create-post-button"
          onClick={() => setShowPostModal(true)}
        >
          NEW POST
        </button>
      </div>

      <div className="accordion-links-bottom">
        <button className="profile-button" onClick={() => navigate("/profile")}>
          PROFILE
          <span className="corner top"></span>
          <span className="corner right"></span>
          <span className="corner bottom"></span>
          <span className="corner left"></span>
        </button>
      </div>

      {showPostModal && (
        <CreatePostModal
          onClose={() => setShowPostModal(false)}
          onPostCreated={() => {
            setShowPostModal(false);
          }}
        />
      )}
    </div>
  );
}
