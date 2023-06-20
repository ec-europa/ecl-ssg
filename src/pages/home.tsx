import React from "react";
import { useLocation } from '@reach/router';
import { graphql, PageProps } from "gatsby";
import defineCustomElements from '../components/Utils/define';
import Layout from "../components/Layout";
import BodyContent from "../templates/BodyContent";
import getLang from '../components/Utils/getLang';

defineCustomElements();

const HomePage = ({ data }) => {
  const { pathname } = useLocation();
  const lang = getLang();
  const nodes = data?.allMarkdownRemark?.nodes || [];
  // Filter the nodes based on the desired language
  const filteredNodes = nodes.filter(node => node.frontmatter.lang === lang && node.frontmatter.title === 'home');

  if (filteredNodes.length === 0) {
    // Render a loading state or placeholder content
    return <div>Loading...</div>;
  }

  const content = filteredNodes[0];
  const { html } = content;

  return (
    <Layout>
      <BodyContent content={html} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          lang
          title
        }
        html
      }
    }
  }`;

export default HomePage;

export { Head } from "../components/Head"
