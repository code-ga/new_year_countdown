import { useEffect, useRef, useState } from "preact/hooks";
import "./app.css";
import { Fireworks } from "./firework";

export function App() {
  return (
    <>
      <NewYearCountdown />
    </>
  );
}

interface CountdownDateData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const NewYearCountdown = () => {
  const [state, setState] = useState<CountdownDateData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // [year, month, day, hour, minute, second, millisecond]
  const timeTillDate = useRef([2024, 0, 1, 0, 0, 0, 0]);
  const max: CountdownDateData = {
    days: 31,
    hours: 24,
    minutes: 60,
    seconds: 60,
  };
  const [isFireworkShow, setIsFireworkShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      ///@ts-ignore
      const time = new Date(...timeTillDate.current).getTime() - Date.now();

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);
      if (seconds < 0) {
        // setTimeTillDate((pre) => {
        //   pre[0] = pre[0] + 1;
        //   return pre;
        // });
        timeTillDate.current[0] += 1;
      }

      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        setIsFireworkShow(true);
      }

      setState({ days, hours, minutes, seconds });

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log({ state, isFireworkShow });
  return (
    <div className="main">
      <p className="wrapper">
        <Fireworks num={isFireworkShow ? 10 : 0}></Fireworks>
        {/* popup for time left if isFireworkShow */}
        <p className={`timer__left__popup ${isFireworkShow ? "show" : ""}`}>
          Happy New Year
        </p>
        <p className="wrapper__timer">
          <a
            className="unwrap__link"
            onClick={() => window.open("https://vsus.app")}
          >
            Unwrap your year (troll by nbth)
          </a>
          <p
            className="title"
            style={{ display: isFireworkShow ? "none" : "block" }}
          >
            New Year Countdown{" "}
          </p>
          {Object.keys(state).map((v) => (
            <div>
              {/* <p className="timer__label">{v}</p> */}
              <p class="base-timer">
                <SvgCircle max={(max as any)[v]} now={(state as any)[v]} />
                <span id="base-timer-label" class="base-timer__label">
                  <div>{(state as any)[v]}</div>
                </span>
              </p>
            </div>
          ))}
        </p>
      </p>
    </div>
  );
};

const SvgCircle = ({ max, now }: { max: number; now: number }) => {
  // Divides time left by the defined time limit.
  function calculateTimeFraction() {
    return now / max;
  }
  // 283 -
  const circleDasharray = `${Number(
    (calculateTimeFraction() * 283).toFixed(0)
  )} 283`;

  return (
    <span>
      <svg
        class="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="base-timer__circle">
          <circle
            class="base-timer__path-remaining"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray={circleDasharray}
            class="base-timer__path-elapsed"
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
    </span>
  );
};
