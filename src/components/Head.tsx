import * as React from "react";
import CustomTheme from "./Utils/theme" 

export const Head: React.FC = () => {
  const theme = CustomTheme();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasWebtools = typeof window !== 'undefined' && window.webtools;

  return (
    <>
      <meta data-ecl-asset-path="/" />
      <link rel="stylesheet" href="/ecl-reset.css" />
      <style>
        {`.ecl p:is([class*=ecl-u-]), .ecl p:not([class*=ecl-],[class*=wt-]) {
          max-width: none !important;
        }`}
      </style>
      {!isDevelopment && (
        <>
          <script type="module" src="/ecl-webcomponents.esm.js"></script>
          <script>defineCustomElement();</script>
        </>
      )}
      {hasWebtools && (
        <script defer src="https://europa.eu/webtools/load.js" type="text/javascript"></script>
      )}
      <body className="ecl-gatsby" />
    </>
  );
};
