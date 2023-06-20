import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';
import { randomizedLink } from './Utils/randomizeLink';

import CustomTheme from './Utils/theme';
import stripPTag from './Utils/stripP';
import getLang from './Utils/getLang';

const Footer = () => {
	const { t } = useTranslation();
  const language = getLang();
  const theme = CustomTheme();
	const data = useStaticQuery(graphql`
	  query Footer {
		  allMarkdownRemark(
		    filter: { frontmatter: { title: { eq: "footer" } } }
		  ) {
		    nodes {
		      fields {
		        lang
		      }
		      html
		    }
		  }
		}`);

	let filteredNodes = [];

	if (data.allMarkdownRemark.nodes) {
		filteredNodes = data.allMarkdownRemark.nodes.filter(
	  	node => node.fields.lang === language
		);
	}

	return (
		<>
	    {filteredNodes[0] && filteredNodes[0].html ? (
	      <>{ReactHtmlParser(stripPTag(filteredNodes[0].html))}</>
	    ) : (
		   <ecl-footer
		    theme={theme}
		    logo-alt={t('European Commission')}
		    logo-title={t('European Commission')}
		    logo-lang-code={language}
		    site-name={t('European Commission website')}
		    variant="standardised"
		    logo-link="/"
		  >
		    <ecl-text tag="p"
		      theme={theme}
		      slot="description"
		    >
		      {t("This site is managed by: [name of the manager of the site]")}
		    </ecl-text>
		    <ecl-text
		      level="5"
		      is-bold
		      tag="h2"
		      slot="ecl-footer-list-main"
		      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
		    >
		      {t("Contact us")}
		    </ecl-text>
		    <ecl-footer-item
		      theme={theme}
		      link={randomizedLink('/example')}
		      slot="ecl-footer-list-main"
		    >
		      {t("Contact information of the DG")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-info"
		    >
		      {t("Accessibility")}
		    </ecl-footer-item>
		    <ecl-text
		      level="5"
		      is-bold
		      tag="h2"
		      slot="ecl-footer-list-main-bottom"
		      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
		    >
		      {t("Follow us on")}
		    </ecl-text>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-bottom"
		    >
		      Facebook
		      <ecl-icon
		        icon="facebook-negative"
		        slot="icon-before"
		        sprite="icons-social-media"
		        size="xs"
		      ></ecl-icon>
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-bottom"
		    >
		      Twitter
		      <ecl-icon
		        icon="twitter-negative"
		        slot="icon-before"
		        sprite="icons-social-media"
		        size="xs"
		      ></ecl-icon>
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-bottom"
		    >
		      Linkedin
		      <ecl-icon
		        icon="linkedin-negative"
		        slot="icon-before"
		        sprite="icons-social-media"
		        size="xs"
		      ></ecl-icon>
		    </ecl-footer-item>
		    <ecl-text
		      level="5"
		      tag="h2"
		      is-bold
		      slot="ecl-footer-list-main-right"
		      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
		    >
		      {t("About us")}
		    </ecl-text>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-right"
		    >
		     {t("Information about the DG")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-right"
		    >
		      {t("Information about the DG")}
		    </ecl-footer-item>
		    <ecl-text
		      level="5"
		      tag="h2"
		      is-bold
		      slot="ecl-footer-list-main-right-bottom"
		      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
		    >
		      {t("Related site")}
		    </ecl-text>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-right-bottom"
		    >
		      {t("Related link 1")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-main-right-bottom"
		    >
		      {t("Related link 2")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-middle"
		    >
		      {t("Class name 1")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-middle"
		    >
		      {t("Class name 2")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-center"
		    >
		      {t("Contact the European Commission")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-center"
		    >
		      {t("Follow the European Commission on social media")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-center"
		    >
		      {t("Resources for partners")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-right"
		    >
		      {t("Languages on our websites")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-right"
		    >
		      {t("Cookies")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-right"
		    >
		      {t("Privacy policy")}
		    </ecl-footer-item>
		    <ecl-footer-item
		      link={randomizedLink('/example')}
		      theme={theme}
		      slot="ecl-footer-list-bottom-right"
		    >
		      {t("Legal notice")}
		    </ecl-footer-item>
		  </ecl-footer>
	  )}
	</>
	);
}

export default Footer;
