import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type LoadingProps = {
  height: number;
  width: number;
};

/**
 * A resizable spinning loading progress indicator
 * @param height
 * @param width
 */
export default function Loading({ height, width }: LoadingProps) {
  const [cookies] = useCookies(["theme"]);
  const [color, setColor] = useState("#fff");

  const setDarkTheme = useCallback(() => {
    setColor("#fff");
  }, []);
  const setLightTheme = useCallback(() => {
    setColor("#000");
  }, []);

  useEffect(() => {
    if (cookies.theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    } else {
      if (cookies.theme === "dark") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
  }, [cookies.theme, setDarkTheme, setLightTheme]);

  return (
    <div className="loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",

          display: "block",
          shapeRendering: "auto",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={width}
        height={height}
      >
        <g transform="rotate(0 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.9166666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.8333333333333334s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.75s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.6666666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5833333333333334s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.4166666666666667s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.3333333333333333s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.25s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.16666666666666666s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.08333333333333333s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={color}>
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </g>
      </svg>
    </div>
  );
}
