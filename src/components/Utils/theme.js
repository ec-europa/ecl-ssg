import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const CustomTheme = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          customTheme
        }
      }
    }
  `);

  const customTheme = data.site.siteMetadata.customTheme;

  return customTheme;
};

export default CustomTheme;