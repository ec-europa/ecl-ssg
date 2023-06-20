import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'gatsby';

interface SearchResultsProps {
  searchQuery: string;
  searchResults: SearchResult[];
}

interface SearchResult {
  slug: string;
  title: string;
  content: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, searchResults }) => {
  const highlightSearchQuery = (text: string) => {
    const regex = new RegExp(searchQuery, 'gi');
    return ReactHtmlParser(text.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`));
  };

  return (
    <>
      <ecl-spacing value="l" direction="t"></ecl-spacing>
      <ecl-text level="1">Search Results</ecl-text>
      <ecl-spacing value="m" direction="b"></ecl-spacing>
      <ecl-text>Search Query: {searchQuery}</ecl-text>
      <ul>
        {searchResults.map((result) => (
          <li key={result.slug}>
            <Link to={result.slug}> 
              <ecl-text level="3" bold> {highlightSearchQuery(result.title)}</ecl-text>
            </Link>
            {highlightSearchQuery(result.content)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;

