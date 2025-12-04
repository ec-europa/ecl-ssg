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
		{ theme === 'eu' && (
        <ecl-footer-eu
          logo-alt="European Union"
          logo-title="European Union"
          logo-lang-code="en"
          site-name="Site name"
          description="This site is managed by the Directorate-General for Communication"
          variant="harmonised"
          logo-link="/example.html"
        >
          <ecl-text
            size="l"
            tag="div"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
            slot="ecl-footer-list-top-middle"
          >
            Contact site name
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-middle">
            Link
          </ecl-footer-item>

          <ecl-text
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
            slot="ecl-footer-list-top-middle-bottom"
            size="l"
            tag="div"
          >
            Follow us
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-middle-bottom">
            Social 1
          </ecl-footer-item>
          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-middle-bottom">
            Social 2
          </ecl-footer-item>
          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-middle-bottom">
            Social 3
          </ecl-footer-item>

          <ecl-text
            size="l"
            tag="div"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
            slot="ecl-footer-list-top-right"
          >
            Optional links
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-right">
            Link 1
          </ecl-footer-item>
          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-right">
            Link 2
          </ecl-footer-item>
          <ecl-footer-item link="/example.html" slot="ecl-footer-list-top-right">
            Link 3
          </ecl-footer-item>

          <ecl-text
            tag="div"
            size="l"
            slot="ecl-footer-list-main"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
          >
            Contact the EU
          </ecl-text>

          <ecl-footer-item link="tel:0080067891011" slot="ecl-footer-list-main">
            Call us 00 800 6 7 8 9 10 11
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/contact-eu/call-us_en"
            slot="ecl-footer-list-main"
          >
            Use other telephone options
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/contact-eu/write-us_en"
            slot="ecl-footer-list-main"
          >
            Write us via our contact form
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/contact-eu/meet-us_en"
            slot="ecl-footer-list-main"
          >
            <span slot="ecl-footer-item-desc">Meet us at one of the</span>
            EU centres
          </ecl-footer-item>

          <ecl-text
            tag="div"
            size="l"
            slot="ecl-footer-list-bottom-left"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
          >
            Social Media
          </ecl-text>

          <ecl-footer-item
            link="https://european-union.europa.eu/contact-eu/social-media-channels_en"
            slot="ecl-footer-list-bottom-left"
          >
            Search for EU social media channels
          </ecl-footer-item>

          <ecl-text
            size="l"
            tag="div"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
            slot="ecl-footer-list-right-top"
          >
            Legal
          </ecl-text>

          <ecl-footer-item
            link="https://european-union.europa.eu/languages-our-websites_en"
            slot="ecl-footer-list-right-top"
          >
            Languages on our websites
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/privacy-policy_en"
            slot="ecl-footer-list-right-top"
          >
            Privacy policy
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/legal-notice_en"
            slot="ecl-footer-list-right-top"
          >
            Legal notice
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/cookies_en"
            slot="ecl-footer-list-right-top"
          >
            Cookies
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-info">
            Accessibility statement
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-logo-info">
            Discover more on europa.eu
          </ecl-footer-item>

          <ecl-footer-item
            link="https://european-union.europa.eu/web-accessibility-policy_en"
            slot="ecl-footer-list-right-top"
          >
            Accessibility
          </ecl-footer-item>

          <ecl-text
            size="l"
            tag="div"
            style-class="ecl-site-footer__title ecl-site-footer__title--separator"
            slot="ecl-footer-list-right"
          >
            EU institutions and bodies
          </ecl-text>

          <ecl-footer-item
            link="http://www.europarl.europa.eu/portal/"
            slot="ecl-footer-list-right"
          >
            Search all EU institutions and bodies
          </ecl-footer-item>
        </ecl-footer-eu>
      )}

      { theme === 'ec' && (
        <ecl-footer-ec
          logo-alt="European Commission"
          logo-title="European Commission"
          logo-lang-code="en"
          site-name="Site name"
          variant="standardised"
          description="This site is managed by:"
          logo-link="/example.html"
        >
          <ecl-social-media-follow
            variant="horizontal"
            position="left"
            style-class="ecl-site-footer__social-media sc-ecl-footer-ec-ec"
            slot="ecl-footer-social-follow-info"
          >
            <ecl-social-media-follow-item icon="x" color="inverted" hide-label share-path="http://example.html">
              X
            </ecl-social-media-follow-item>
            <ecl-social-media-follow-item icon="instagram" color="inverted" hide-label share-path="http://instagram.com">
              Instagram
            </ecl-social-media-follow-item>
            <ecl-social-media-follow-item icon="linkedin" color="inverted" hide-label share-path="http://linkedin.com">
              Linkedin
            </ecl-social-media-follow-item>
            <ecl-social-media-follow-item icon="telegram" color="inverted" hide-label share-path="http://telegram.com">
              Telegram
            </ecl-social-media-follow-item>
            <ecl-social-media-follow-item icon="chain" color="inverted" hide-label share-path="http://example.html">
              Other
            </ecl-social-media-follow-item>
          </ecl-social-media-follow>

          <ecl-text size="m" is-bold={true} tag="div" slot="ecl-footer-list-contact" style-class="ecl-site-footer__title">
            Contact us
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-contact">
            Contact information of the DG
          </ecl-footer-item>

          <ecl-text size="m" is-bold={true} tag="div" slot="ecl-footer-list-about" style-class="ecl-site-footer__title">
            About us
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-about">
            Information about the DG
          </ecl-footer-item>

          <ecl-text size="m" is-bold={true} tag="div" slot="ecl-footer-list-more" style-class="ecl-site-footer__title">
            More information on
          </ecl-text>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-more">
            Class name 1
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-more">
            Class name 2
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-bottom-left">
            Languages on our websites
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-bottom-left">
            Cookies
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-bottom-left">
            Privacy policy
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-bottom-left">
            Legal notice
          </ecl-footer-item>

          <ecl-footer-item link="/example.html" slot="ecl-footer-list-bottom-left">
            Accessibility
          </ecl-footer-item>
        </ecl-footer-ec>
       )}
	</>
	);
}

export default Footer;
