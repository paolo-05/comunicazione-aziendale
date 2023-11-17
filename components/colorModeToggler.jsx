// Paolo Bianchessi, 28/10/2023
// This component provides a dropdown menu for choosing the color theme of the app

import { constants } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaMoon, FaStarHalfStroke, FaSun } from "react-icons/fa6";

export default function ColorModeToggler() {
  const [iconTheme, setIconTheme] = useState(FaSun);
  const [theme, setPreferredTheme] = useState(null);

  function getStoredTheme() {
    return localStorage.getItem(constants.appThemeName);
  }
  function setStoredTheme(theme) {
    return localStorage.setItem(constants.appThemeName, theme);
  }

  const getPreferredTheme = useCallback(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "auto"
      : "";
  }, []);

  const setTheme = (theme) => {
    if (theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.documentElement.style.setProperty(
          "--background-color",
          "#000011"
        );
        document.documentElement.style.setProperty(
          "--secondary-background-color",
          "#222"
        );
        document.documentElement.style.setProperty(
          "--third-level-background-color",
          "#454545"
        );
        document.documentElement.style.setProperty("--text-color", "#fff");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.documentElement.style.setProperty(
          "--background-color",
          "#fff"
        );
        document.documentElement.style.setProperty(
          "--secondary-background-color",
          "#c9d6ff"
        );
        document.documentElement.style.setProperty(
          "--third-level-background-color",
          "#eee"
        );
        document.documentElement.style.setProperty("--text-color", "#000");
      }
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
      if (theme === "dark") {
        document.documentElement.style.setProperty(
          "--background-color",
          "#000011"
        );
        document.documentElement.style.setProperty(
          "--secondary-background-color",
          "#222"
        );
        document.documentElement.style.setProperty(
          "--third-level-background-color",
          "#454545"
        );
        document.documentElement.style.setProperty("--text-color", "#fff");
      } else {
        document.documentElement.style.setProperty(
          "--background-color",
          "#fff"
        );
        document.documentElement.style.setProperty(
          "--secondary-background-color",
          "#c9d6ff"
        );
        document.documentElement.style.setProperty(
          "--third-level-background-color",
          "#eee"
        );
        document.documentElement.style.setProperty("--text-color", "#000");
      }
    }
  };

  const showActiveTheme = useCallback((theme) => {
    switch (theme) {
      case "light":
        setIconTheme(FaSun);
        break;
      case "dark":
        setIconTheme(FaMoon);
        break;
      default:
        setIconTheme(FaStarHalfStroke);
        break;
    }
  }, []);

  const handleThemeChange = (theme) => {
    setStoredTheme(theme);
    setTheme(theme);
    showActiveTheme(theme, true);
    setPreferredTheme(theme);
  };

  useEffect(() => {
    setTheme(getPreferredTheme());
    showActiveTheme(getPreferredTheme());
    setPreferredTheme(getPreferredTheme());

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== "light" && storedTheme !== "dark") {
          setTheme(getPreferredTheme());
          setPreferredTheme(getPreferredTheme());
        }
      });
  }, [getPreferredTheme, showActiveTheme, setPreferredTheme]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center show"
        type="button"
        id="themeDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="bi my-1 theme-icon-active">{iconTheme}</div>
        <span className="d-lg-none ms-2" id="bd-theme-text">
          Cambia Tema
        </span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="themeDropdown"
      >
        <li onClick={() => handleThemeChange("light")}>
          <button
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="light"
            aria-pressed="false"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaSun />
            </div>
            Chiaro
            <div className={`bi ms-auto ${theme === "light" ? "" : " d-none"}`}>
              <FaCheck />
            </div>
          </button>
        </li>
        <li onClick={() => handleThemeChange("dark")}>
          <button
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="dark"
            aria-pressed="false"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaMoon />
            </div>
            Scuro
            <div className={`bi ms-auto ${theme === "dark" ? "" : " d-none"}`}>
              <FaCheck />
            </div>
          </button>
        </li>
        <li onClick={() => handleThemeChange("auto")}>
          <button
            type="button"
            className="dropdown-item d-flex align-items-center"
            data-bs-theme-value="auto"
            aria-pressed="true"
          >
            <div className="bi me-2 opacity-50 theme-icon">
              <FaStarHalfStroke />
            </div>
            Preferenze di Sistema
            <div className={`bi ms-auto ${theme === "auto" ? "" : " d-none"}`}>
              <FaCheck />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}
