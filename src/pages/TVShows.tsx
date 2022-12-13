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
  const searchTerm = useAppSelector((state) => state.movies.searchTerm);
  const [tvshows, setTVShows] = useState<array[] | null | undefined>([]);

  useEffect(() => {
    if (searchTerm.length > 2) fetchTVShows(searchTerm, setTVShows);
  }, [searchTerm]);

  return (
    <div className="tvshows-container">
      {searchTerm ? (
        tvshows && tvshows.length > 0 ? (
          location.pathname === "/tvshows" ? (
            tvshows
              .slice(0, showItems)
              .map((tvshow, i) => <TVShow key={i} tvshowID={tvshow.id} />)
          ) : (
            <TVShow tvshowID={tvshows[0].id} />
          )
        ) : (
          <NoResults />
        )
      ) : (
        <SuggestionMessage />
      )}
    </div>
  );
};
