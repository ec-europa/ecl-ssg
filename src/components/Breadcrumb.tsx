import React from 'react';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
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
  const languagePrefix = location.pathname.split('/')[1];
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const ignoreSegments = Languages(true);

  const breadcrumbItems = pathSegments
    .filter(segment => !ignoreSegments.includes(segment))
    .map((segment, index, segments) => {
      const isLastItem = index === segments.length - 1;
      const label = isLastItem ? segment.replace(/-/g, ' ') : segment;
      const path = `/${languagePrefix}/${segments.slice(0, index + 1).join('/')}`;

      return (
        <ecl-breadcrumb-item
          key={index}
          path={isLastItem ? null : path}
          current-page={isLastItem ? 'true' : null}
        >
          {label}
        </ecl-breadcrumb-item>
      );
    });

  return (
    <ecl-breadcrumb slot="breadcrumb" ecl-script>
      <ecl-breadcrumb-item path="/">
        {title}
      </ecl-breadcrumb-item>
      {breadcrumbItems}
    </ecl-breadcrumb>
  );
};

export default Breadcrumb;
