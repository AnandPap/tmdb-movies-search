import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchTitles } from "../apis/fetchData";
import { setFetchResults, setLoading } from "../redux/movies";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Cover from "./Cover";
import PlaceholderCover from "./PlaceholderCover";
import ValidationMessage from "../components-reusable/ValidationMessage";
import { getPosterURL } from "../apis/helperFunctions";

export const SearchResults = () => {
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const fetchResults = useAppSelector((state) => state.movies.fetchResults);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const showItems = 10;
  const page = location.pathname.slice(1, location.pathname.length);

  const fetchMoviesData = async (pageType: string) => {
    dispatch(setLoading(true));
    const res = await fetchTitles(searchTerm, pageType);
    dispatch(setFetchResults({ [page]: res }));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  };

  useEffect(() => {
    if (fetchResults[page].length === 0) fetchMoviesData(location.pathname);
  }, [searchTerm, location.pathname]);

  return searchTerm ? (
    fetchResults && fetchResults[page].length > 0 && !loading ? (
      <div className="content-container">
        {fetchResults[page]
          .filter((result) => getPosterURL(result)) // Filtrira one filmove koji nemaju postera.
          .slice(0, showItems)
          .map((result, i) => (
            <Cover
              key={i}
              id={result.id}
              pageType={location.pathname}
              title={
                result.original_name ||
                result.original_title ||
                result.name ||
                result.title
              }
              posterURL={getPosterURL(result)}
            />
          ))}
      </div>
    ) : loading ? (
      <div className="content-container">
        {[...Array(10)].map((element, i) => (
          <PlaceholderCover key={i} />
        ))}
      </div>
    ) : (
      <ValidationMessage text="No results" />
    )
  ) : (
    <ValidationMessage text="Type more than 2 characters to begin search." />
  );
};
