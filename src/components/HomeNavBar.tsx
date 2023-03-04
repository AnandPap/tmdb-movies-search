import { useState } from "react";
import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";
import tmdbIcon from "../assets/tmdbIcon.svg";
import ChangePageButton from "./ChangePageButton";
import { useLocation, useNavigate } from "react-router-dom";
import AppIcon from "../components-reusable/AppIcon";
import ModalCover from "../components-reusable/ModalCover";
import HamburgerMenu from "../components-reusable/HamburgerMenu";

type HomeNavBarProps = {
  searchParam: string | null;
};

const HomeNavBar = ({ searchParam }: HomeNavBarProps) => {
  const [displayHamburgerContent, setDisplayHamburgerContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="home-nav-bar">
      <AppIcon
        className="tmdb-icon"
        src={tmdbIcon}
        alt="TMDB Icon"
        onClick={() => location.pathname !== "/movies" && navigate("/movies")}
      />
      <div
        className={`nav-bar-buttons-wrapper hamburger-menu-content ${
          displayHamburgerContent ? "hamburger-open" : "hamburger-close"
        }`}
      >
        <ChangePageButton
          className="nav-button"
          page="/movies"
          searchParam={searchParam}
        />
        <ChangePageButton
          className="nav-button"
          page="/tvshows"
          searchParam={searchParam}
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

export default HomeNavBar;
