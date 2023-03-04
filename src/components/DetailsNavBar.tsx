import { useNavigate } from "react-router-dom";
import BackButton from "../components-reusable/BackButton";
import tmdbIcon from "../assets/tmdbIcon.svg";
import AppIcon from "../components-reusable/AppIcon";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";
import HamburgerMenu from "../components-reusable/HamburgerMenu";
import ModalCover from "../components-reusable/ModalCover";
import { useState } from "react";

const DetailsNavBar = () => {
  const [displayHamburgerContent, setDisplayHamburgerContent] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="details-nav-bar">
      <AppIcon
        className="tmdb-icon"
        src={tmdbIcon}
        alt="TMDB Icon"
        onClick={() => navigate(-1)}
      />
      <div
        className={`nav-bar-buttons-wrapper hamburger-menu-content ${
          displayHamburgerContent ? "hamburger-open" : "hamburger-close"
        }`}
      >
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <LottieDarkModeSwitch />
      </div>
      <HamburgerMenu
        displayHamburgerContent={displayHamburgerContent}
        setDisplayHamburgerContent={setDisplayHamburgerContent}
      />
      <ModalCover
        displayHamburgerContent={displayHamburgerContent}
        setDisplayHamburgerContent={setDisplayHamburgerContent}
      />
    </div>
  );
};

export default DetailsNavBar;
