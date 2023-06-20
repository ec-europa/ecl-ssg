import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';

import CustomTheme from './Utils/theme';
import getLang from './Utils/getLang';
import Languages from './Languages';

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const languages = Languages();
	const langCodes = Object.keys(languages);
	const lang = getLang();
	const { pathname } = useLocation();
	const path = pathname.split('/')[2] || 'home';
	const theme = CustomTheme();

	const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      {langCodes.map((language, index) => (
        <ecl-language-item
        	theme={theme}
        	slot="eu-category"
        	path={`/${language}/${path}`}
        	lang-code={language}
        	language={languages[language]}
        	key={`language-item-${index}`}
        	onClick={() => { handleLanguageChange(language) }}
        >
        </ecl-language-item>
      ))}
    </>
  );
};

export default LanguageSwitcher;
