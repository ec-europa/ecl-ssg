import React, { ReactNode } from "react";
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
	  query Menu {
		  allMarkdownRemark(
		    filter: { frontmatter: { title: { eq: "menu" } } }
		  ) {
		    nodes {
		      fields {
		        lang
		      }
		      html
		    }
		  }
 			allSitePage(
		    filter: {
		      path: {  nin: ["/dev-404-page/", "/en/menu/menu/",  "/en/footer/footer/"], regex: "/^/en/" },
		    }
		  ) {
		    nodes {
		      path
		    }
		  }
	  }
	`);

	let filteredNodes = [];

	if (data.allMarkdownRemark.nodes) {
		filteredNodes = data.allMarkdownRemark.nodes.filter(
	  	node => node.fields.lang === language
		);
	}

	if (!filteredNodes[0] || !filteredNodes[0].html) {
		filteredNodes = data.allSitePage.nodes;
	}

	return (
	  <>
	    {filteredNodes[0].html ? (
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
	            link={`/${language}/${page.path.replace('/en/', '')}`}
	            theme={theme}
	            key={`menu-item-${index}`}
	          >
	            {page.path.replace('/en/', '')}
	          </ecl-menu-item>
	        ))}
	      </ecl-menu>
	    )}
	  </>
	);
}

export default Menu;
