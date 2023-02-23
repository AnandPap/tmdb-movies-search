import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { SearchForm } from "../components/SearchForm";
import ValidationMessage from "../components-reusable/ValidationMessage";

export const HomePage = () => {
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);

  return (
    <div className={`main-page ${darkMode ? "dark" : "light"}`}>
      <SearchForm />
      {searchTerm ? (
        <Outlet />
      ) : (
        <ValidationMessage text="Type more than 2 characters to begin search." />
      )}
    </div>
  );
};
