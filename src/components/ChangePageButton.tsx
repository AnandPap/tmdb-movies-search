import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

type ChangePageButtonProps = {
  className: string;
  page: string;
  searchParam: string | null;
};

const ChangePageButton = ({
  className,
  page,
  searchParam,
}: ChangePageButtonProps) => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = (pageName: string) => {
    if (pageName !== location.pathname) {
      if (searchParam) navigate(`${pageName}?search=${searchParam}`);
      else navigate(`${pageName}`);
    }
  };

  return (
    <button
      className={`${className} ${
        location.pathname === page ? "selected-button" : null
      } ${darkMode ? "dark" : "light"}`}
      type="button"
      onClick={() => setPage(page)}
    >
      {page === "/movies" ? "Movies" : "TV Shows"}
    </button>
  );
};

export default ChangePageButton;
