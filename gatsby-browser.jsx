import React, { useEffect } from "react";
import CustomTheme from "./src/components/Utils/theme";

const ThemeInjector = ({ children }) => {
  const theme = CustomTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-ecl-theme", theme);
  }, [theme]);

  return children;
};

export const wrapRootElement = ({ element }) => (
  <ThemeInjector>{element}</ThemeInjector>
);