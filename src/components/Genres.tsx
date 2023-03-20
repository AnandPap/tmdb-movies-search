import React from "react";

type GenresProps = {
  theme: "dark" | "light";
  genres: string[] | null;
};

const Genres = ({ theme, genres }: GenresProps) => {
  return (
    <div className="genres-wrapper">
      {genres?.map((genre, i) => (
        <p key={i} className={`genre ${theme}`}>
          {genre}
        </p>
      ))}
    </div>
  );
};

export default Genres;
