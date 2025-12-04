import React, { useEffect, useState, forwardRef } from 'react';
import CustomTheme from "./Utils/theme";
import { useTranslation } from 'react-i18next';

const InPageNavigation = forwardRef((props, ref) => {
  const theme = CustomTheme();
  const [headingElements, setHeadingElements] = useState([]);
	const { t } = useTranslation();

  useEffect(() => {
    const fetchHeadingElements = () => {
      const h2Elements = Array.from(document.querySelectorAll('h2[id]'));
      setHeadingElements(h2Elements);
    };

    const delay = 100;
    const timeoutId = setTimeout(fetchHeadingElements, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ecl-inpage-navigation
      {...props}
      ref={ref}
      inpage-title={t('Page contents')}
      ecl-script
      inpage-id={Math.random().toString(36).substring(2)}
    >
      {headingElements.map((headingElement, index) => (
        <ecl-inpage-navigation-item key={index} path={`#${headingElement.id}`}>
          {headingElement.textContent}
        </ecl-inpage-navigation-item>
      ))}
    </ecl-inpage-navigation>
  );
});

export default InPageNavigation;
