import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setDarkMode } from "../redux/movies";
import darkModeButton from "./assets/dark-mode-button1.json";
import switchSound from "./assets/switch-sound.mp3";

const LottieDarkModeSwitch = () => {
  const [timerID, setTimerID] = useState(-1);
  const lottieRef = useRef<any>();
  const darkMode = useAppSelector((state) => state.movies.darkMode);
  const dispatch = useAppDispatch();
  const switchAudio = new Audio(switchSound);
  const animationSpeed = 10;
  const sunFrame = 30;
  const moonFrame = 180;

  useEffect(() => {
    let item = localStorage.getItem("darkMode");
    if (item !== null) {
      let darkMode = JSON.parse(item);
      if (darkMode) {
        lottieRef.current.goToAndStop(moonFrame, true);
        dispatch(setDarkMode(true));
      } else {
        lottieRef.current.goToAndStop(sunFrame, true);
        dispatch(setDarkMode(false));
      }
    } else {
      lottieRef.current.goToAndStop(moonFrame, true);
      dispatch(setDarkMode(true));
      localStorage.setItem("darkMode", "true");
    }
  }, []);

  const switchDarkMode = (
    animationSpeed: number,
    sunFrame: number,
    moonFrame: number,
    frameMultiplier: number,
    currentFrame: number,
    timerID: number,
    switchAudio: HTMLAudioElement
  ) => {
    const durationInFrames = moonFrame - sunFrame;
    lottieRef.current.setSpeed(animationSpeed);
    switchAudio.play();
    clearTimeout(timerID);

    if (darkMode) {
      localStorage.setItem("darkMode", JSON.stringify(false));
      lottieRef.current.setDirection(-1);
      lottieRef.current.goToAndPlay(currentFrame, true);
      const tempTimerID = setTimeout(() => {
        lottieRef.current.goToAndStop(sunFrame, true);
      }, durationInFrames / frameMultiplier / animationSpeed);
      setTimerID(tempTimerID);
      dispatch(setDarkMode(false));
    } else {
      localStorage.setItem("darkMode", JSON.stringify(true));
      lottieRef.current.setDirection(1);
      lottieRef.current.goToAndPlay(currentFrame, true);
      const tempTimerID = setTimeout(() => {
        lottieRef.current.goToAndStop(moonFrame, true);
      }, durationInFrames / frameMultiplier / animationSpeed);
      setTimerID(tempTimerID);
      dispatch(setDarkMode(true));
    }
  };

  return (
    <div className="dark-mode-button-wrapper">
      <Lottie
        lottieRef={lottieRef}
        animationData={darkModeButton}
        autoplay={false}
        className={`dark-mode-button`}
        onClick={() =>
          switchDarkMode(
            animationSpeed,
            sunFrame,
            moonFrame,
            lottieRef.current.animationItem.frameMult,
            lottieRef.current.animationItem.currentFrame,
            timerID,
            switchAudio
          )
        }
        onKeyDown={(e) =>
          e.key.match(/(Enter)/g)
            ? switchDarkMode(
                animationSpeed,
                sunFrame,
                moonFrame,
                lottieRef.current.animationItem.frameMult,
                lottieRef.current.animationItem.currentFrame,
                timerID,
                switchAudio
              )
            : null
        }
        tabIndex={0}
      />
    </div>
  );
};

export default LottieDarkModeSwitch;
