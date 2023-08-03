import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import CustomTheme from './Utils/theme';
import ReactHtmlParser from 'react-html-parser';
import stripPTag from './Utils/stripP';
import getLang from './Utils/getLang';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const { t } = useTranslation();
  const language = getLang();
  const theme = CustomTheme();
  const data = useStaticQuery(graphql`
    query {
      menuItems: allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "menu" } } }
      ) {
        nodes {
          fields {
            langKey
            slug
          }
          frontmatter {
            title
          }
        }
      }
      pagesData: allMarkdownRemark(
        filter: { fields: { contentType: { in: ["home", "page"] } } }
      ) {
        nodes {
          fields {
            langKey
            customPath
            slug
          }
          frontmatter {
            title
            contentType
          }
        }
      }
    }
  `);

  let filteredNodes = [];

  if (data.menuItems.nodes) {
    filteredNodes = data.menuItems.nodes.filter(
      (node) => node.fields.langKey === language
    );
  }

  if (!filteredNodes[0] || !filteredNodes[0].html) {
    filteredNodes = data.pagesData.nodes.filter(
      (node) => node.fields.langKey === language
    );
  }

	filteredNodes.sort((a, b) => {
	  if (a.frontmatter.contentType === 'home') return -1;
	  if (b.frontmatter.contentType === 'home') return 1;
	  return 0;
	});

  return (
    <>
      {filteredNodes[0]?.html ? (
        <>{ReactHtmlParser(stripPTag(filteredNodes[0].html))}</>
      ) : (
        <ecl-menu
          slot="menu"
          theme={theme}
          close-label={t('Close')}
          back-label={t('Back')}
          menu-link="/example"
          ecl-script
          menu-title={t('Menu')}
        >
          {filteredNodes.map((page, index) => (
            <ecl-menu-item
              link={`/${language}/${
                page.fields.customPath || page.fields.slug.replace(`/${language}/`, '').slice(0, -1)
              }/`}
              theme={theme}
              key={`menu-item-${index}`}
            >
              {page.frontmatter.title}
            </ecl-menu-item>
          ))}
        </ecl-menu>
      )}
    </>
  );
};

export default Menu;
