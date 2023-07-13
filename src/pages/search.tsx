import React, { useEffect, useState } from 'react';
import { PageProps, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";
import defineCustomElements from '../components/Utils/define';
import BodyContent from "../templates/BodyContent";
import search, { Page, addPagesToSearchIndex } from "../templates/Search";
import SearchResults from '../components/SearchResults';

defineCustomElements();

interface SearchPageProps {
  location: Location;
}

const SearchPage: React.FC<SearchPageProps> = ({ location }) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const checkAssetsLoaded = () => {
      // Check if meta tag is present
      const metaTagExists = document.querySelector('meta[data-ecl-asset-path]') !== null;
      setAssetsLoaded(metaTagExists);
    };

    checkAssetsLoaded(); // Check immediately on mount

    const interval = setInterval(checkAssetsLoaded, 1000); // Check every second

    return () => {
      clearInterval(interval); // Clean up interval on unmount
    };
  }, []);

  // Render loading state if assets are not loaded
  if (!assetsLoaded) {
    return <div>Loading assets...</div>;
  }

  const searchQuery = new URLSearchParams(location.search).get("query");

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          frontmatter {
            lang
            title
          }
          html
        }
      }
    }
  `, { fallback: { allMarkdownRemark: { nodes: [] } } });

  const pages: Page[] = data.allMarkdownRemark.nodes.map(node => ({
    slug: node.fields.slug,
    title: node.frontmatter.title,
    content: node.html
  }));

  addPagesToSearchIndex(pages);

  const searchResults = search.search(searchQuery || "");

  return (
    <>
      <Layout>
       <BodyContent
        noDanger
        content={
          <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
        }
      />
      </Layout>
    </>
  );
};

export default SearchPage;

export { Head } from "../components/Head";
