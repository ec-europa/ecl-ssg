import React, { ReactNode, useEffect } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

import getLang from './Utils/getLang';

import SiteHeader from './SiteHeader';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, pageHeader }) => {
  const lang = getLang();

  return (
    <I18nextProvider i18n={i18n}>
      <SiteHeader />
      {pageHeader && (
        <>
          {pageHeader}
          <main>
            <ecl-grid container="true">
              {children}
            </ecl-grid>
          </main>
        </>
      )}
      {!pageHeader && (
        <main>
          <ecl-grid container="true">
            <ecl-grid row="true">{children}</ecl-grid>
          </ecl-grid>
        </main>
      )}
      <Footer />
    </I18nextProvider>
  );
};

export default Layout;