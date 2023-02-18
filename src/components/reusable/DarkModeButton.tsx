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
  let switchAudio = new Audio(switchSound);
  const animationSpeed = 10;
  const startingFrame = 20;
  const endingFrame = 225;
  const durationInFrames = endingFrame - startingFrame;
  const frameMultiplier = lottieRef.current?.animationItem.frameMult;

  useEffect(() => {
    if (clicked) {
      lottieRef.current.setSpeed(animationSpeed);
      switchAudio.play();
      if (darkMode) {
        lottieRef.current.setDirection(-1);
        lottieRef.current.goToAndPlay(endingFrame, true);
        setTimeout(() => {
          lottieRef.current.goToAndStop(startingFrame, true);
          setClicked(false);
          dispatch(setDarkMode(false));
        }, durationInFrames / frameMultiplier / animationSpeed);
      } else {
        lottieRef.current.goToAndPlay(startingFrame, true);
        setTimeout(() => {
          lottieRef.current.goToAndStop(endingFrame, true);
          setClicked(false);
          dispatch(setDarkMode(true));
        }, durationInFrames / frameMultiplier / animationSpeed);
      }
    } else if (darkMode) lottieRef.current.goToAndStop(225, true);
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
