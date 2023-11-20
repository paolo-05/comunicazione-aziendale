// Paolo Bianchessi, 28/10/2023
// This component provides a dropdown menu for choosing the color theme of the app

import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaCheck, FaMoon, FaStarHalfStroke, FaSun } from "react-icons/fa6";

export default function ColorModeToggler() {
  const [iconTheme, setIconTheme] = useState(FaSun);
  const [theme, setPreferredTheme] = useState("");
  const [cookies, setCookie] = useCookies(["theme"]);

  const getStoredTheme = useCallback(() => {
    return cookies.theme;
  }, [cookies.theme]);

  function setStoredTheme(theme: string) {
    return setCookie("theme", theme);
  }
  function setLightTheme() {
    document.documentElement.setAttribute("data-bs-theme", "light");
    document.documentElement.style.setProperty("--background-color", "#fff");
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
  function setDarkTheme() {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    document.documentElement.style.setProperty("--background-color", "#000011");
    document.documentElement.style.setProperty(
      "--secondary-background-color",
      "#222"
    );
    document.documentElement.style.setProperty(
      "--third-level-background-color",
      "#454545"
    );
    document.documentElement.style.setProperty("--text-color", "#fff");
  }

  const getPreferredTheme = useCallback(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "auto"
      : "";
  }, [getStoredTheme]);

  const setTheme = useCallback((theme: string) => {
    if (theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
      if (theme === "dark") {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
  }, []);

  const showActiveTheme = useCallback((theme: string) => {
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

  const handleThemeChange = (theme: string) => {
    setStoredTheme(theme);
    setTheme(theme);
    showActiveTheme(theme);
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
  }, [setTheme, getPreferredTheme, showActiveTheme, getStoredTheme]);

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
