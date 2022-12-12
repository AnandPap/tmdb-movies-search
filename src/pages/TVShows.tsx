import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { fetchTVShows } from "../apis/fetchTVShows";

export const TVShows = () => {
  const navigate = useNavigate();
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const [tvShows, setTVShows] = useState({});

  useEffect(() => {
    if (location.pathname === "/") navigate("/tv-shows", { replace: true });
    if (searchTerm !== "") fetchTVShows();
  }, [searchTerm]);

  return <div>TVShows={searchTerm}</div>;
};
