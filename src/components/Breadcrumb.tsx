import React from 'react';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import CustomTheme from './Utils/theme';
import Languages from './Languages';

const Breadcrumb = () => {
  const location = useLocation();
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  
  const theme = CustomTheme();
  const { title } = data.site.siteMetadata;
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const ignoreSegments = Languages(true); // Add the language prefixes to ignore here

  const breadcrumbItems = pathSegments
    .filter(segment => !ignoreSegments.includes(segment))
    .map((segment, index, segments) => {
      const isLastItem = index === segments.length - 1;
      const label = isLastItem ? segment.replace(/-/g, ' ') : segment;
      const path = `/${segments.slice(0, index + 1).join('/')}`;

      return (
        <ecl-breadcrumb-item
          key={index}
          path={isLastItem ? null : path}
          theme={theme}
          current-page={isLastItem ? 'true' : null}
        >
          {label}
        </ecl-breadcrumb-item>
      );
    });

  return (
    <ecl-breadcrumb slot="breadcrumb" variant={theme === 'ec' ? 'breadcrumbVariant' : 'default'} theme={theme} ecl-script>
      <ecl-breadcrumb-item path="/" theme={theme}>
        {title}
      </ecl-breadcrumb-item>
      {breadcrumbItems}
    </ecl-breadcrumb>
  );
};

export default Breadcrumb;
