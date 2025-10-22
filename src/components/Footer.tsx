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
		        langKey
		      }
		      html
		    }
		  }
		}`);

	let filteredNodes = [];

	if (data.allMarkdownRemark.nodes) {
		filteredNodes = data.allMarkdownRemark.nodes.filter(
	  	node => node.fields.langKey === language
		);
	}

	return (
		<>
		   <ecl-footer-ec
		    theme={theme}
		    logo-alt={t('European Commission')}
		    logo-title={t('European Commission')}
		    logo-lang-code={language}
		    site-name={t('European Commission website')}
		    variant="standardised"
		    description={t('This site is managed by:')}
		    logo-link="/"
		  >
			  <ecl-social-media-follow
			      variant="horizontal"
			      position="left"
			      style-class={`ecl-site-footer__social-media sc-ecl-footer-${theme}-${theme}`}
			      slot="ecl-footer-social-follow-info"
			    >
			      <ecl-social-media-follow-item
			        icon="x"
			        color="inverted"
			        hide-label
			        share-path="http://example.html"
			      >
			        X
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="instagram"
			        color="inverted"
			        hide-label
			        share-path="http://instagram.com"
			      >
			        Instagram
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="linkedin"
			        color="inverted"
			        hide-label
			        share-path="http://linkedin.com"
			      >
			        Linkedin
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="telegram"
			        color="inverted"
			        hide-label
			        share-path="http://telegram.com"
			      >
			        Telegram
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="chain"
			        color="inverted"
			        hide-label
			        share-path="http://example.html"
			      >
			        Other
			      </ecl-social-media-follow-item>
			    </ecl-social-media-follow>
			    <ecl-text
			      size="m"
			      weight="bold"
			      tag="div"
			      slot="ecl-footer-list-contact"
			      style-class="ecl-site-footer__title"
			    >
			      {t('Contact us')}
			    </ecl-text>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-contact"
			    >
			      {t('Contact information of the DG')}
			    </ecl-footer-item>
			    <ecl-text
			      size="m"
			      weight="bold"
			      tag="div"
			      slot="ecl-footer-list-about"
			      style-class="ecl-site-footer__title"
			    >
			      {t('About us')}
			    </ecl-text>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-about"
			    >
			      {t('Information about the DG')}
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-about"
			    >
			      {t('Information about the DG')}
			    </ecl-footer-item>
			    <ecl-text
			      size="m"
			      weight="bold"
			      tag="div"
			      slot="ecl-footer-list-more"
			      style-class="ecl-site-footer__title"
			    >
			      {t('More information on')}
			    </ecl-text>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-more"
			    >
			      Class name 1
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-more"
			    >
			      Class name 2
			    </ecl-footer-item>
			    <ecl-text
			      size="m"
			      weight="bold"
			      tag="div"
			      slot="ecl-footer-list-related"
			      style-class="ecl-site-footer__title"
			    >
			      Related links
			    </ecl-text>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-related"
			    >
			      Related link 1
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-related"
			    >
			      Related link 2
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-related"
			    >
			      Related link 3
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-related"
			    >
			      Related link 4
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-related"
			    >
			      Related link 5
			    </ecl-footer-item>
			    <ecl-social-media-follow
			      variant="horizontal"
			      description={t('Follow the European Commission')}
			      position="left"
			      style-class={`ecl-site-footer__social-media sc-ecl-footer-${theme}-${theme}`}
			      inline-title={t('Follow us')}
			      slot="ecl-footer-social-follow"
			    >
			      <ecl-social-media-follow-item
			        icon="x"
			        color="inverted"
			        hide-label
			        share-path="http://example.html"
			      >
			        X
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="instagram"
			        color="inverted"
			        hide-label
			        share-path="http://instagram.com"
			      >
			        Instagram
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="linkedin"
			        color="inverted"
			        hide-label
			        share-path="http://linkedin.com"
			      >
			        Linkedin
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="telegram"
			        color="inverted"
			        hide-label
			        share-path="http://telegram.com"
			      >
			        Telegram
			      </ecl-social-media-follow-item>
			      <ecl-social-media-follow-item
			        icon="chain"
			        color="inverted"
			        hide-label
			        share-path="http://example.html"
			      >
			        {t('Other')}
			      </ecl-social-media-follow-item>
			    </ecl-social-media-follow>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-bottom-left"
			    >
			      {t('Languages on our websites')}
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-bottom-left"
			    >
			      {t('Cookies')}
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-bottom-left"
			    >
			      {t('Privacy policy')}
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-bottom-left"
			    >
			      {t('Legal notice')}
			    </ecl-footer-item>
			    <ecl-footer-item
			      link={randomizedLink('/example.html')}
			      slot="ecl-footer-list-bottom-left"
			    >
			      {t('Accessibility')}s
			    </ecl-footer-item>
			  </ecl-footer-ec>
	</>
	);
}

export default Footer;
