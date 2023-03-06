import React from "react";

type GenresProps = {
  darkMode: boolean;
  genres: string[] | null;
};

const Genres = ({ darkMode, genres }: GenresProps) => {
  return (
    <div className="genres-wrapper">
      {genres?.map((genre, i) => (
        <p key={i} className={`genre ${darkMode ? "dark" : "light"}`}>
          {genre}
        </p>
      ))}
    </div>
  );
};

export default Genres;
