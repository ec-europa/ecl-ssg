const path = require("path");
const { createFilePath } = require('gatsby-source-filesystem');
const { graphql } = require('gatsby');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      contentTop: String
      customPath: String
      contentType: String
      showPageHeader: Boolean
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'content' });
    const { frontmatter } = node;

    createNodeField({
      node,
      name: 'customPath',
      value: frontmatter.customPath || ''
    });

    createNodeField({
      node,
      name: 'contentType',
      value: frontmatter.contentType || ''
    });
  }
};

exports.onCreatePage = ({  graphql, page, actions }) => {
  const { createPage, deletePage } = actions;
  delete page.context.path;
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query the necessary data using GraphQL
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            rawMarkdownBody
            frontmatter {
              contentTop
              showPageHeader
            }
            fields {
              slug
              langKey
              customPath
              contentType
            }
          }
        }
      }
    }
  `);

  // Create pages dynamically based on the queried data
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const isAllowedContentType = ["home", "page"].includes(node.fields.contentType);
    const isBodyNotEmpty = node.rawMarkdownBody && node.rawMarkdownBody.trim() !== "";
    const isContentTopNotEmpty = !!node.frontmatter.contentTop && node.frontmatter.contentTop.trim() !== "";

    // Skip creating the page if the content type is not allowed or if the body or contentTop is empty
    if (!isAllowedContentType || (!isBodyNotEmpty && !isContentTopNotEmpty)) {
      return;
    }

    const pagePath =
      node.fields.langKey && node.fields.customPath
        ? `/${node.fields.langKey}/${node.fields.customPath}`
        : node.fields.slug;
    let template = path.resolve('./src/templates/pages.tsx');
    if (node.fields.contentType === 'home') {
      template = path.resolve('./src/pages/index.tsx');
    }

    createPage({
      path: pagePath,
      component: template,
      context: {
        slug: pagePath,
        langKey: node.fields.langKey,
        showPageHeader: node.frontmatter.showPageHeader ?? true,
      },
    });
  });
};
