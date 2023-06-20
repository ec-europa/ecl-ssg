import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/Layout";
import defineCustomElements from '../components/Utils/define';
import stripPTag from '../components/Utils/stripP';
import CustomTheme from '../components/Utils/theme';
import BodyContent from "../templates/BodyContent";
import SocialShare from "../components/SocialShare";

defineCustomElements();

const DrupalPage = ({ data, pageContext }) => {
  const posts = data.allNodeArticle.edges;
  const theme = CustomTheme();
  const { currentPage, numPages, language } = pageContext; // Access the language from pageContext
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage).toString();
  
  const filteredPosts = posts.filter(post => post.node.path.langcode === language); // Filter posts based on the language

  const content = (
    <>
      <ecl-spacing value="l" direction="t"></ecl-spacing>
      <ecl-list-illustration theme={theme} column="3">
        {filteredPosts.map((post) => (
          <ecl-list-illustration-item
            key={post.node.id}
            theme={theme}
            image={post.node.relationships.field_image.localFile.childImageSharp.fluid.src}
            item-title={post.node.title}
          >
            {stripPTag(post.node.body.value)}
          </ecl-list-illustration-item>
        ))}
      </ecl-list-illustration>
      <ecl-spacing value="l" direction="b"></ecl-spacing>
      <ecl-pagination
        theme={theme}
      >
        { !isFirst ?
          <ecl-pagination-item
            theme={theme}
            path={`/${language}/drupal/${prevPage}`} // Update the path with the language prefix
            previous
          >
            Previous
          </ecl-pagination-item> : ''
        }
        <ecl-pagination-item
          theme={theme}
          path={`/${language}/drupal`} // Update the path with the language prefix
          current
        >
          {currentPage}
        </ecl-pagination-item>
        { !isLast ?
          <ecl-pagination-item
            theme={theme}
            path={`/${language}/drupal/${nextPage}`} // Update the path with the language prefix
            next
          >
            Next
          </ecl-pagination-item> : ''
        }
      </ecl-pagination>
      <ecl-spacing direction="b" value="l"></ecl-spacing>
      <SocialShare />
      <ecl-spacing direction="b" inner value="l"></ecl-spacing>
    </>
  );

  return (
    <Layout>
      <BodyContent noDanger content={content} />
    </Layout>
  );
};

export default DrupalPage;

export const pageQuery = graphql`
  query DrupalPageQuery($skip: Int!, $limit: Int!, $language: String!) {
    allNodeArticle(
      sort: { created: DESC }
      limit: $limit
      skip: $skip
      filter: { path: { langcode: { eq: $language } } }
    ) {
      edges {
        node {
          id
          path {
            langcode
          }
          title
          body {
            value
          }
          created
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { Head } from "../components/Head";
