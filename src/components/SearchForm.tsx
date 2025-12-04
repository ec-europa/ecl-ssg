import React, { useState, useEffect, FormEvent } from "react";
import { navigate } from "gatsby";
import { EclSearchForm } from "@ecl/ecl-webcomponents-react/dist";
import CustomTheme from './Utils/theme';
import { useTranslation } from 'react-i18next';

const SearchForm: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = CustomTheme();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.detail);
  };

  return (
    <EclSearchForm
      id="ecl-site-header-search-form"
      onSubmit={handleSearch}
      input-id="ecl-search-form"
      width="m"
      placeholder={t('Placeholder text')}
      button-label={t('Search')}
      button-aria-label={t('Search')}
      onInputChange={handleInputChange}
    />
  );
};

export default SearchForm;
