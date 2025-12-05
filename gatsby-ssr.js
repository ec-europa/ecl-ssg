import React from "react";
import gatsbyConfig from "./gatsby-config";

export const onRenderBody = ({ setPreBodyComponents }) => {
  const theme = gatsbyConfig.siteMetadata?.customTheme || "ec";

  setPreBodyComponents([
    <script
      key="ecl-theme-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            try {
              var theme = localStorage.getItem('ecl-theme') || '${theme}';
              document.documentElement.setAttribute('data-ecl-theme', theme);
            } catch (e) {
              document.documentElement.setAttribute('data-ecl-theme', '${theme}');
            }
          })();
        `,
      }}
    />,
  ]);
};
