import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';

import CustomTheme from './Utils/theme';
import stripPTag from './Utils/stripP';
import getLang from './Utils/getLang';
import Languages from './Languages';

import LanguageSwitcher from './LanguageSwitcher';
import Search from "./SearchForm";
import Menu from './Menu';

const SiteHeader = () => {
	const languages = Languages();
	const { t } = useTranslation();
  const lang = getLang();
  const theme = CustomTheme();
	const data = useStaticQuery(graphql`
	  query SiteHeader {
		  allMarkdownRemark(
		    filter: { frontmatter: { title: { eq: "site-header" } } }
		  ) {
		    nodes {
		      fields {
		        langKey
		      }
		      html
		    }
		  }
		}`);

	let filteredNodes = [];

	if (data.allMarkdownRemark.nodes) {
		filteredNodes = data.allMarkdownRemark.nodes.filter(
	  	node => node.fields.langKey === lang
		);
	}

	return (
		<>
	    {filteredNodes[0] && filteredNodes[0].html ? (
	      <>{ReactHtmlParser(stripPTag(filteredNodes[0].html))}</>
	    ) : (
      <ecl-site-header
        ecl-script
        theme={theme}
        language-block
        search-block="false"
        language={languages[lang]}
        lang-code={lang}
        login-text={t('Log in')}
        eu-label={t('Official EU languages:')}
        language-title={t('Choose your language')}
        login-link="/example"
        language-id="language-switcher"
        logo-alt={t('European Commission')}
        logo-title={t('European commission')}
        language-aria-label={t('Choose language')}
        site-name={t('ECL ssg playground')}
      >
        <LanguageSwitcher />
        <Menu />
      	<div slot="search" className={`ecl-site-header__search-container sc-ecl-search-form-${theme}`}>
      		<Search
      			theme={theme} 
      	/>
      	</div>
      </ecl-site-header>
	  )}
	</>
	);
}

export default SiteHeader;
