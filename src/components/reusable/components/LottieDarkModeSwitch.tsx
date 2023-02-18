import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { setDarkMode } from "../../../redux/movies";
import darkModeButton from "../assets/dark-mode-button1.json";
import switchSound from "../assets/switch-sound.mp3";

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
    lottieRef.current.goToAndStop(moonFrame, true);
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
      lottieRef.current.setDirection(-1);
      lottieRef.current.goToAndPlay(currentFrame, true);
      const tempTimerID = setTimeout(() => {
        lottieRef.current.goToAndStop(sunFrame, true);
      }, durationInFrames / frameMultiplier / animationSpeed);
      setTimerID(tempTimerID);
      dispatch(setDarkMode(false));
    } else {
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
  );
};

export default LottieDarkModeSwitch;
