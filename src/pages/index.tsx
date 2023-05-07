import * as React from "react"
import type { HeadFC, PageProps, graphql, useStaticQuery } from "gatsby"
import { defineCustomElements } from '@ecl/ecl-webcomponents-react';

defineCustomElements();

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <ecl-site-header
        ecl-script
        theme="eu"
        login-block
        language-block
        search-block
        search-text="search"
        search-placeholder="Placeholder text"
        language="english"
        lang-code="en"
        login-text="Log in"
        eu-label="Official EU languages:"
        non-eu-label="Other languages:"
        language-title="Choose your language"
        login-link="/example.html"
        language-id="language-switcher"
        logo-alt="European Commission"
        logo-title="European commission"
        language-aria-label="Choose language"
        site-name="ECL Webcomponents in an angular app"
      >
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="bg" language="български"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="es" language="español"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="cs" language="čeština"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="da" language="dansk"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="de" language="Deutsch"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="et" language="eesti"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="el" language="ελληνικά"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="en" language="English" active></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="fr" language="français"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="ga" language="Gaeilge"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="hr" language="hrvatski"></ecl-language-item>
        <ecl-language-item theme="eu" slot="eu-category" path="/example.html" lang-code="it" language="italiano"></ecl-language-item>
        <ecl-language-item theme="eu" slot="non-eu-category" path="/example.html" lang-code="zh" language="中文"></ecl-language-item>
        <ecl-language-item theme="eu" slot="non-eu-category" path="/example.html" lang-code="tr" language="Türk"></ecl-language-item>
        <ecl-menu slot="menu" theme="eu" close-label="Close" back-label="Back" menu-link="/example.html" ecl-script menu-title="Menu">
          <ecl-menu-item link="/example.html" theme="eu"> Home </ecl-menu-item>
          <ecl-menu-item theme="eu" link="/example.html" has-children trigger-aria-label="Access item's children" current>
            Item 2 label
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 2.1 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 2.2 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child current slot="sublist"> Item 2.3 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist" external> Item 2.4 </ecl-menu-item>
          </ecl-menu-item>
          <ecl-menu-item theme="eu" has-children trigger-aria-label="Access item's children" link="/example.html">
            Item 3 with a very long label
            <ecl-menu-item theme="eu" child link="/example.html" slot="sublist"> Item 3.1 </ecl-menu-item>
            <ecl-menu-item theme="eu" child link="/example.html" slot="sublist"> Item 3.2 </ecl-menu-item>
            <ecl-menu-item theme="eu" child link="/example.html" slot="sublist"> Item 3.3 </ecl-menu-item>
          </ecl-menu-item>
          <ecl-menu-item theme="eu" link="/example.html"> Item 4 label </ecl-menu-item>
          <ecl-menu-item theme="eu" link="/example.html" has-children trigger-aria-label="Access item's children">
            Item 5 label
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 5.1 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 5.2 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 5.3 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 5.4 </ecl-menu-item>
          </ecl-menu-item>
          <ecl-menu-item theme="eu" link="/example.html" has-children trigger-aria-label="Access item's children">
            Item 6
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.1 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.2 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.3 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.4 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.5 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.6 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.7 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.8 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.9 with a very long label </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.10 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.11 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.12 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.13 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.14 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.15 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.16 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.17 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 6.18 </ecl-menu-item>
          </ecl-menu-item>
          <ecl-menu-item theme="eu" has-children link="/example.html" trigger-aria-label="Access item's children">
            Item 7 label
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.1 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.2 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.3 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.4 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.5 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.6 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.7 </ecl-menu-item>
            <ecl-menu-item theme="eu" link="/example.html" child slot="sublist"> Item 7.8 </ecl-menu-item>
          </ecl-menu-item>
        </ecl-menu>
      </ecl-site-header>
      <ecl-page-header variant="core" theme="eu" header-title="Page title" meta="Meta info | DD Month YYYY" image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg">
        <ecl-breadcrumb slot="breadcrumb" variant="default" theme="eu" ecl-script>
          <ecl-breadcrumb-item path="/example.html" theme="eu"> Home </ecl-breadcrumb-item>
          <ecl-breadcrumb-item theme="eu" ellipsis button-aria-label="Click to expand"> </ecl-breadcrumb-item>
          <ecl-breadcrumb-item path="/example.html" theme="eu"> About the European Commission </ecl-breadcrumb-item>
          <ecl-breadcrumb-item path="/example.html" theme="eu"> Organisational structure </ecl-breadcrumb-item>
          <ecl-breadcrumb-item path="/example.html" theme="eu"> How the Commission is organised </ecl-breadcrumb-item>
          <ecl-breadcrumb-item current-page theme="eu"> News </ecl-breadcrumb-item>
        </ecl-breadcrumb>
        Lorem ipsum dolor sit amet, <a class="ecl-link" href="/example.html">consectetur adipiscing elit</a>. Quisque nec ullamcorper mi. Morbi interdum fermentum tempus. Nam nec rhoncus
        risus, <a class="ecl-link" href="/example.html">eget dictum elit</a>. Vestibulum gravida tincidunt venenatis.
      </ecl-page-header>
      <div class="ecl-container">
        <div class="ecl-row">
          <ecl-grid columns="3" breakpoint="l" styleClass="ecl-sidebar">
            <ecl-inpage-navigation inpage-title="Page contents" inpage-id="inpage-id" theme="eu" ecl-script with-utils>
              <ecl-inpage-navigation-item path="#inline-nav-1" theme="eu"> Heading 1 </ecl-inpage-navigation-item>
              <ecl-inpage-navigation-item path="#inline-nav-2" theme="eu"> Heading 2 with a long title going on several lines </ecl-inpage-navigation-item>
              <ecl-inpage-navigation-item path="#inline-nav-3" theme="eu"> Heading 3 </ecl-inpage-navigation-item>
            </ecl-inpage-navigation>
          </ecl-grid>

          <ecl-grid columns="9" breakpoint="l" styleClass="ecl-main">
            <ecl-featured-item
              variant="extended"
              theme="eu"
              item-title="Featured item"
              image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"
              media-caption="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              id="inline-nav-1"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </ecl-featured-item>
            <ecl-spacing direction="t" value="l"></ecl-spacing>
            <ecl-list-illustration theme="eu" column="3" id="inline-nav-2">
              <ecl-list-illustration-item theme="eu" image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" item-title="List with illustration item 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
                felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus. Fusce sit amet sem dui. In nec lacinia eros.
              </ecl-list-illustration-item>
              <ecl-list-illustration-item theme="eu" image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" item-title="List with illustration item 2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
                felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus. Fusce sit amet sem dui. In nec lacinia eros.
              </ecl-list-illustration-item>
              <ecl-list-illustration-item theme="eu" image="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" item-title="List with illustration item 3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend quam leo, at malesuada ex viverra vitae. Nullam id felis eu lorem condimentum rutrum vitae ut
                felis. Nam ultricies, metus vel aliquam euismod, lacus dolor sodales neque, in laoreet tellus erat posuere purus. Fusce sit amet sem dui. In nec lacinia eros.
              </ecl-list-illustration-item>
            </ecl-list-illustration>
            <ecl-spacing direction="t" value="l"></ecl-spacing>
            <ecl-fact-figures columns="3" theme="eu" id="inline-nav-3">
              <ecl-fact-figures-item item-title="Lorem ipsum" value="00.0 million" icon="infographic" theme="eu">
                Nunc condimentum sapien ut nibh finibus suscipit vitae at justo. Morbi quis odio faucibus, commodo tortor id, elementum libero.
              </ecl-fact-figures-item>

              <ecl-fact-figures-item item-title="Sed hendrerit" value="00.0 million" icon="spreadsheet" theme="eu">
                Turpis varius congue venenatis, erat dui feugiat felis.
              </ecl-fact-figures-item>

              <ecl-fact-figures-item item-title="Donec suscipit interdum augue, ac dapibus eros finibus a." value="00.0 million" icon="growth" theme="eu">
                Cras vestibulum efficitur mi, quis porta tellus rutrum ut. Quisque at pulvinar sem.
              </ecl-fact-figures-item>

              <ecl-fact-figures-item item-title="Aenean dapibus" value="00.0 million" icon="digital" theme="eu">
                Aliquam lacinia diam eu sem malesuada, in interdum ante bibendum.
              </ecl-fact-figures-item>

              <ecl-fact-figures-item item-title="Aliquam faucibus nulla eget eleifend" value="00.0 million" icon="regulation" theme="eu">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec lectus tortor.
              </ecl-fact-figures-item>

              <ecl-fact-figures-item item-title="Aliquam faucibus nulla eget eleifend" value="00.0 million" icon="image" theme="eu">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec lectus tortor.
              </ecl-fact-figures-item>
            </ecl-fact-figures>
          </ecl-grid>
        </div>
        <ecl-spacing direction="t" value="l"></ecl-spacing>
        <ecl-footer
          theme="eu"
          logo-alt="European Commission"
          logo-title="European commission"
          logo-lang-code="en"
          description="This site is managed by the Directorate-General for Communication"
        >
          <h2 slot="ecl-footer-list-main" class="ecl-site-footer__title ecl-site-footer__title--separator">Contact the EU</h2>
          <ecl-footer-item theme="eu" link="tel:0080067891011" slot="ecl-footer-list-main">
            <span slot="ecl-footer-item-desc">Call us</span>
            00 800 6 7 8 9 10 11
          </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/contact-eu/call-us_en" theme="eu" slot="ecl-footer-list-main">
            <span slot="ecl-footer-item-desc">Use other</span>
            telephone options
          </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/contact-eu/write-us_en" theme="eu" slot="ecl-footer-list-main">
            <span slot="ecl-footer-item-desc">Write us via</span>
            contact form
          </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/contact-eu/meet-us_en" theme="eu" slot="ecl-footer-list-main">
            <span slot="ecl-footer-item-desc">Meet us at one of the</span>
            EU centres
          </ecl-footer-item>
          <h2 slot="ecl-footer-list-bottom-left" class="ecl-site-footer__title ecl-site-footer__title--separator">Social Media</h2>
          <ecl-footer-item link="https://european-union.europa.eu/contact-eu/social-media-channels_en" theme="eu" slot="ecl-footer-list-bottom-left">
            <span slot="ecl-footer-item-desc">Search for</span>
            EU social media channels
          </ecl-footer-item>
          <h2 class="ecl-site-footer__title ecl-site-footer__title--separator" slot="ecl-footer-list-bottom-right">Legal</h2>
          <ecl-footer-item link="https://european-union.europa.eu/languages-our-websites_en" theme="eu" slot="ecl-footer-list-bottom-right"> Languages on our websites </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/privacy-policy_en" theme="eu" slot="ecl-footer-list-bottom-right"> Privacy policy </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/privacy-policy_en" theme="eu" slot="ecl-footer-list-bottom-right"> Legal notice </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/cookies_en" theme="eu" slot="ecl-footer-list-bottom-right"> Cookies </ecl-footer-item>
          <ecl-footer-item link="https://european-union.europa.eu/web-accessibility-policy_en" theme="eu" slot="ecl-footer-list-bottom-right"> Accessibility </ecl-footer-item>
          <h2 class="ecl-site-footer__title ecl-site-footer__title--separator" slot="ecl-footer-list-right">EU institutions</h2>
          <ecl-footer-item link="http://www.europarl.europa.eu/portal/" theme="eu" slot="ecl-footer-list-right"> European Parliament </ecl-footer-item>
          <ecl-footer-item link="https://www.ombudsman.europa.eu/en/home" theme="eu" slot="ecl-footer-list-right"> European Ombudsman </ecl-footer-item>
          <ecl-footer-item link="https://secure.edps.europa.eu/EDPSWEB/edps/EDPS?lang=ene" theme="eu" slot="ecl-footer-list-right">
            European Data Protection Supervisor (EDPS)
          </ecl-footer-item>
          <ecl-footer-item link="https://edpb.europa.eu/edpb_en" theme="eu" slot="ecl-footer-list-right"> The European Data Protection Board </ecl-footer-item>
          <ecl-footer-item link="https://epso.europa.eu/en" theme="eu" slot="ecl-footer-list-right"> European Personnel Selection Office </ecl-footer-item>
          <ecl-footer-item link="https://op.europa.eu/en/home" theme="eu" slot="ecl-footer-list-right"> Publications Office of the European Union </ecl-footer-item>
          <ecl-footer-item
            link="https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/institutions-and-bodies-profiles_en?f%5B0%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/AGENCY_DEC&f%5B1%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/AGENCY_EXEC&f%5B2%5D=oe_organisation_eu_type%3Ahttp%3A//publications.europa.eu/resource/authority/corporate-body-classification/EU_JU"
            theme="eu"
            slot="ecl-footer-list-right"
          >
            Agencies
          </ecl-footer-item>
        </ecl-footer>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
