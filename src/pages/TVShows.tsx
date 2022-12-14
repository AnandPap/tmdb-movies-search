import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { fetchTVShows } from "../apis/fetchTVShows";
import { TVShow } from "../components/TVShow";
import { NoResults } from "../components/NoResults";
import { SuggestionMessage } from "../components/SuggestionMessage";

export type array = {
  id: number;
};

const showItems = 10;

export const TVShows = () => {
  const [tvshows, setTVShows] = useState<array[] | null | undefined>([]);
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);

  useEffect(() => {
    if (searchTerm.length > 2) fetchTVShows(searchTerm, setTVShows);
  }, [searchTerm, location.pathname]);

  return (
    <div className="tvshows-container">
      {searchTerm ? (
        tvshows && tvshows.length > 0 ? (
          tvshows
            .slice(0, showItems)
            .map((tvshow, i) => <TVShow key={i} tvshowID={tvshow.id} />)
        ) : (
          <NoResults text="No results" />
        )
      ) : (
        <SuggestionMessage />
      )}
    </div>
  );
};
