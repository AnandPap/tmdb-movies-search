import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TVShows = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") navigate("/tv-shows", { replace: true });
  }, []);
  return <div>TVShows</div>;
};
