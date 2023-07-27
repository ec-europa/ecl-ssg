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
		<ecl-footer
	    theme="eu"
	    logo-alt="European Union"
	    logo-title="European Union"
	    logo-lang-code="en"
	    site-name={t('EU playground')}
	    description="This site is managed by the Directorate-General for Communication"
	    variant="harmonised"
	    logo-link=""
	  >
	    <ecl-footer-item
	      theme="eu"
	      slot="description"
	      link="https://european-union.europa.eu"
	    >
	      <span slot="ecl-footer-item-desc">{t('Discover more on')}</span>
	      europa.eu
	    </ecl-footer-item>
	    <ecl-text
	      level="1"
	      tag="h2"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	      slot="ecl-footer-list-top-middle"
	    >
	      {t('Contact site name')}
	    </ecl-text>
	    <ecl-footer-item
	      theme="eu"
	      link="('/example.html')}"
	      slot="ecl-footer-list-top-middle"
	    >
	      {t('contact')}
	    </ecl-footer-item>
	    <ecl-text
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	      slot="ecl-footer-list-top-middle-bottom"
	      level="1"
	      tag="h2"
	    >
	      {t('Follow us')}
	    </ecl-text>
	    <ecl-footer-item
	      theme="eu"
	      link="#"
	      slot="ecl-footer-list-top-middle-bottom"
	    >
	      {t('Social 1')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      theme="eu"
	      link="#"
	      slot="ecl-footer-list-top-middle-bottom"
	    >
	      {t('Social 2')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      theme="eu"
	      link=""
	      slot="ecl-footer-list-top-middle-bottom"
	    >
	      {t('Social 3')}
	    </ecl-footer-item>
	    <ecl-text
	      level="1"
	      tag="h2"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	      slot="ecl-footer-list-top-right"
	    >
	      {t('Optional links')}
	    </ecl-text>
	    <ecl-footer-item
	      theme="eu"
	      link="#"
	      slot="ecl-footer-list-top-right"
	    >
	      {t('Link 1')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      theme="eu"
	      link="#"
	      slot="ecl-footer-list-top-right"
	    >
	      {t('Link 2')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      theme="eu"
	      link="#"
	      slot="ecl-footer-list-top-right"
	    >
	      {t('Link 3')}
	    </ecl-footer-item>
	    <ecl-text
	      tag="h2"
	      level="1"
	      slot="ecl-footer-list-main"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	    >
	      {t('Contact the EU')}
	    </ecl-text>
	    <ecl-footer-item
	      theme="eu"
	      link="tel:0080067891011"
	      slot="ecl-footer-list-main"
	    >
	      <span slot="ecl-footer-item-desc">{t('Call us')}</span>
	      00 800 6 7 8 9 10 11
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/contact-eu/call-us_en"
	      theme="eu"
	      slot="ecl-footer-list-main"
	    >
	    <span slot="ecl-footer-item-desc">{t('Use other')}</span>
	      {t('telephone options')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/contact-eu/write-us_en"
	      theme="eu"
	      slot="ecl-footer-list-main"
	    >
	      <span slot="ecl-footer-item-desc">{t('Write us via')}</span>
	      contact form
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/contact-eu/meet-us_en"
	      theme="eu"
	      slot="ecl-footer-list-main"
	    >
	      <span slot="ecl-footer-item-desc">{t('Meet us at one of the')}</span>
	      {t('EU centres')}
	    </ecl-footer-item>
	    <ecl-text
	      tag="h2"
	      level="1"
	      slot="ecl-footer-list-bottom-left"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	    >
	      {t('Social Media')}
	    </ecl-text>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/contact-eu/social-media-channels_en"
	      theme="eu"
	      slot="ecl-footer-list-bottom-left"
	    >
	      <span slot="ecl-footer-item-desc">{t('Search for')}</span>
	      {t('EU social media channels')}
	    </ecl-footer-item>
	    <ecl-text
	      level="1"
	      tag="h2"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Legal')}
	    </ecl-text>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/languages-our-websites_en"
	      theme="eu"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Languages on our websites')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/privacy-policy_en"
	      theme="eu"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Privacy policy')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/privacy-policy_en"
	      theme="eu"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Legal notice')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/cookies_en"
	      theme="eu"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Cookies')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="('/example.html')}"
	      theme="eu"
	      slot="ecl-footer-list-info"
	    >
	      {t('Accessibility')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/web-accessibility-policy_en"
	      theme="eu"
	      slot="ecl-footer-list-main-bottom"
	    >
	      {t('Accessibility')}
	    </ecl-footer-item>
	    <ecl-text
	      level="1"
	      tag="h2"
	      style-class="ecl-site-footer__title ecl-site-footer__title--separator"
	      slot="ecl-footer-list-right"
	    >
	      {t('EU institutions')}
	    </ecl-text>
	    <ecl-footer-item
	      link="http://www.europarl.europa.eu/portal/"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Parliament')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://www.consilium.europa.eu/en/european-council/"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Council')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://www.consilium.europa.eu/en/home/"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('Council of the European Union')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://ec.europa.eu/commission/index_en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Commission')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://curia.europa.eu/jcms/jcms/j_6/en/"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('Court of Justice of the European Union (CJEU)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="European Central Bank (ECB)"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Central Bank (ECB)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://www.eca.europa.eu/en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Court of Auditors (ECA)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://www.eca.europa.eu/en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Court of Auditors (ECA)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://eeas.europa.eu/headquarters/headquarters-homepage_en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European External Action Service (EEAS)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://www.eesc.europa.eu/?i=portal.en.home"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Economic and Social Committee (EESC)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="http://cor.europa.eu/en/"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Committee of the Regions (CoR)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://www.eib.org/en/index.htm"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Investment Bank (EIB)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://www.ombudsman.europa.eu/en/home"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Ombudsman')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://secure.edps.europa.eu/EDPSWEB/edps/EDPS?lang=ene"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Data Protection Supervisor (EDPS)')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://edpb.europa.eu/edpb_en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('The European Data Protection Board')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://epso.europa.eu/en"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('European Personnel Selection Office')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://op.europa.eu/en/home"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('Publications Office of the European Union')}
	    </ecl-footer-item>
	    <ecl-footer-item
	      link="https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/institutions-and-bodies-profiles_en?f%5B0%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/AGENCY_DEC&f%5B1%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/AGENCY_EXEC&f%5B2%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/EU_JU"
	      theme="eu"
	      slot="ecl-footer-list-right"
	    >
	      {t('Agencies')}
	    </ecl-footer-item>
	  </ecl-footer>
	</>
	);
}

export default Footer;
