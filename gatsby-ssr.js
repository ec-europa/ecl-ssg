import React from "react";
import gatsbyConfig from "./gatsby-config";

const theme = gatsbyConfig.siteMetadata?.customTheme || "ec";

// SSR: ECL expects a function
global.CustomTheme = () => theme;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="ecl-theme-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            try {
              var theme = localStorage.getItem('ecl-theme') || '${theme}';
              window.CustomTheme = function () { return theme; };
              document.documentElement.setAttribute('data-ecl-theme', theme);
            } catch (e) {
              window.CustomTheme = function () { return '${theme}'; };
              document.documentElement.setAttribute('data-ecl-theme', '${theme}');
            }
          })();
        `,
      }}
    />,
  ]);
};
