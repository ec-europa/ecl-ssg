import React from "react";
import { useStaticQuery, graphql } from 'gatsby';

const Languages = (keysOnly) => {
  const data = useStaticQuery(graphql`
    query LanguagesQuery {
      allSitePlugin(filter: { name: { eq: "gatsby-plugin-i18n" } }) {
        edges {
          node {
            name
            pluginOptions
          }
        }
      }
    }
  `);

  const pluginOptions = data.allSitePlugin.edges[0].node.pluginOptions.languageLabels;

  if (keysOnly) {
  	return Object.keys(pluginOptions);
  }

  return pluginOptions;
}

export default Languages;