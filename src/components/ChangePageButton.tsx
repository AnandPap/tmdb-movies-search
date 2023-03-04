import { useLocation, useNavigate } from "react-router-dom";

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
      }`}
      type="button"
      onClick={() => setPage(page)}
    >
      {page === "/movies" ? "Movies" : "TV Shows"}
    </button>
  );
};

export default ChangePageButton;
