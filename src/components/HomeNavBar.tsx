import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";
import tmdbIcon from "../assets/tmdbIcon.svg";
import ChangePageButton from "./ChangePageButton";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import AppIcon from "../components-reusable/AppIcon";

type HomeNavBarProps = {
  searchParam: string | null;
};

const HomeNavBar = ({ searchParam }: HomeNavBarProps) => {
  const [displayHamburgerContent, setDisplayHamburgerContent] = useState(false);
  const darkmode = useAppSelector((state) => state.movies.darkMode);
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
      <div
        className={`hamburger-menu-wrapper ${
          displayHamburgerContent ? "hamburger-open" : "hamburger-close"
        }`}
        onClick={() => setDisplayHamburgerContent((s) => !s)}
      >
        <div className="hamburger-menu"></div>
      </div>
    </div>
  );
};

export default HomeNavBar;
