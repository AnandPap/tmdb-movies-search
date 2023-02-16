import { useEffect, useState } from "react";
import { fetchTVShows } from "../apis/fetchTVShows";
import { TVShowCover } from "../components/TVShowCover";
import { ValidationMessage } from "../components/reusable/ValidationMessage";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export type array = {
  id: number;
};

const showItems = 10;

export const TVShows = () => {
  const [tvshows, setTVShows] = useState<array[] | null | undefined>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const loading = useAppSelector((state) => state.movies.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchTerm.length > 2) fetchTVShows(searchTerm, setTVShows, dispatch);
  }, [searchTerm, location.pathname]);

  return (
    <div className="tvshows-container">
      {searchTerm ? (
        tvshows && tvshows.length > 0 ? (
          tvshows
            .slice(0, showItems)
            .map((tvshow, i) => <TVShowCover key={i} tvshowID={tvshow.id} />)
        ) : loading ? null : (
          <ValidationMessage text="No results" />
        )
      ) : (
        <ValidationMessage text="Type more than 2 characters to begin search." />
      )}
    </div>
  );
};
