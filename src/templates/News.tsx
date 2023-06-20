import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from "../components/Layout";
import defineCustomElements from '../components/Utils/define';
import BodyContent from "../templates/BodyContent";
import CustomTheme from '../components/Utils/theme';

defineCustomElements();

const NewsPage = () => {
  const theme = CustomTheme();
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "news" } } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            lang
            title
            type
            image
          }
          html
        }
      }
    }`);

  const posts = data.allMarkdownRemark.nodes;

  const leftColumnPosts = [];
  const rightColumnPosts = [];
  posts.forEach((post, index) => {
    if (index % 2 === 0) {
      leftColumnPosts.push(post);
    } else {
      rightColumnPosts.push(post);
    }
  });

  const renderCardsInColumns = (columnPosts) => {
    return columnPosts.map((post, index) => (
      `<ecl-card theme="${theme}"
        image="${post.frontmatter.image.replace('/static', '')}"
      >
        <ecl-content-block
          has-title
          theme="${theme}"
        >
          <ecl-link
            slot="title"
            path="${post.fields.slug}"
            variant="standalone"
          >
            ${post.frontmatter.title}
          </ecl-link>
        </ecl-content-block>
        ${post.html}
      </ecl-card>
      ${index !== columnPosts.length - 1 ? '<ecl-spacing value="m" direction="b"></ecl-spacing>' : ''}`
    )).join('');
  };

  const leftColumnMarkup = renderCardsInColumns(leftColumnPosts);
  const rightColumnMarkup = renderCardsInColumns(rightColumnPosts);

  const markup = `
    <ecl-grid row>
      <ecl-grid columns="6">
        ${leftColumnMarkup}
      </ecl-grid>
      <ecl-grid columns="6">
        ${rightColumnMarkup}
      </ecl-grid>
    </ecl-grid>
  `;

  return (
    <Layout>
      <ecl-spacing value="l" direction="t"></ecl-spacing>
      <BodyContent
        content={markup}
      />
      <ecl-spacing value="l" direction="b"></ecl-spacing>
    </Layout>
  );
};

export default NewsPage;

export { Head } from "../components/Head";
