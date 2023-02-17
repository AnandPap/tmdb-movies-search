import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setDarkMode } from "../../redux/movies";
import darkModeButton from "../../assets/dark-mode-button.json";
import switchSound from "../../assets/switch-sound.mp3";

const DarkModeButton = () => {
  const [clicked, setClicked] = useState(false);
  const lottieRef = useRef<any>();
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useAppDispatch();
  const speed = 5;

  useEffect(() => {
    if (clicked) {
      lottieRef.current.setSpeed(speed);
      let audio = new Audio(switchSound);
      audio.play();
      if (darkMode) {
        lottieRef.current.setDirection(-1);
        lottieRef.current.goToAndPlay(220, true);
        setTimeout(() => {
          lottieRef.current.goToAndStop(20, true);
          setClicked(false);
          dispatch(setDarkMode());
        }, 200 / lottieRef.current.animationItem.frameMult / speed);
      } else {
        lottieRef.current.goToAndPlay(20, true);
        setTimeout(() => {
          lottieRef.current.goToAndStop(220, true);
          setClicked(false);
          dispatch(setDarkMode());
        }, 200 / lottieRef.current.animationItem.frameMult / speed);
      }
    } else if (darkMode) lottieRef.current.goToAndStop(220, true);
  }, [clicked]);

  return (
    <div className="dark-mode-button">
      <Lottie
        lottieRef={lottieRef}
        animationData={darkModeButton}
        autoplay={false}
        onClick={() => setClicked(true)}
      />
    </div>
  );
};

export default DarkModeButton;
