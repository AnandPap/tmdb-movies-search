import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const TVShows = () => {
  const navigate = useNavigate();
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  useEffect(() => {
    if (location.pathname === "/") navigate("/tv-shows", { replace: true });
  }, []);
  return <div>TVShows={searchTerm}</div>;
};
