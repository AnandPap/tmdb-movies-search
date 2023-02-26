import LottieDarkModeSwitch from "../components-reusable/LottieDarkModeSwitch";
import tmdbIcon from "../assets/tmdbIcon.svg";
import ChangePageButton from "./ChangePageButton";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

type HomeNavBarProps = {
  searchParam: string | null;
};

const HomeNavBar = ({ searchParam }: HomeNavBarProps) => {
  const [displayHamburgerContent, setDisplayHamburgerContent] = useState(false);
  const darkmode = useAppSelector((state) => state.movies.darkMode);

  return (
    <>
      <div className="home-nav-bar">
        <img className="tmdb-icon" src={tmdbIcon} alt="TMDB Icon" />
        <div className="nav-buttons-wrapper">
          <div className="nav-buttons-wrapper">
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
          </div>
          <LottieDarkModeSwitch />
        </div>
        <div
          className={`hamburger-menu-wrapper ${
            displayHamburgerContent ? "hamburger-open" : "hamburger-close"
          }`}
        >
          <div
            className="hamburger-menu"
            onClick={() => setDisplayHamburgerContent((s) => !s)}
          ></div>
          <div
            className={`hamburger-menu-content ${
              displayHamburgerContent ? "hamburger-open" : "hamburger-close"
            } ${darkmode ? "dark" : "light"}`}
          >
            <ChangePageButton
              className="hamburger-nav-button"
              page="/movies"
              searchParam={searchParam}
            />
            <ChangePageButton
              className="hamburger-nav-button"
              page="/tvshows"
              searchParam={searchParam}
            />
            <LottieDarkModeSwitch />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavBar;
