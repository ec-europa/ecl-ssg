import React from "react";
import { graphql, PageProps } from "gatsby";
import defineCustomElements from '../components/Utils/define';
import Layout from "../components/Layout";
import BodyContent from "../templates/BodyContent";
import CustomTheme from "../components/Utils/theme";

defineCustomElements();

const Example = ({ data }) => {
  return (
    <Layout>
      <BodyContent content={`
        <ecl-spacing value="l" direction="v"></ecl-spacing>
        <h2 style="font: normal normal 400 1.5rem/1.75rem arial,sans-serif!important">You reached an example page:</h2>
        <ecl-spacing direction="b"></ecl-spacing>
        <ecl-button
          theme="${CustomTheme()}"
          type="button"
          variant="call"
          onclick="window.history.back()"
        >
          Go back to the page you were visiting
          <ecl-icon
            theme="${CustomTheme()}"
            icon="corner-arrow"
            slot="icon-before"
            transform="rotate-270"
          ></ecl-icon>
        </ecl-button>
        <ecl-spacing direction="b"></ecl-spacing>`
      } />
    </Layout>
  );
};

export default Example;
export { Head } from "../components/Head";