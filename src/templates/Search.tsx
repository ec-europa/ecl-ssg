import * as JsSearch from "js-search";

interface Page {
  slug: string;
  title: string;
  content: string;
}

const search = new JsSearch.Search<Page>("slug");

search.addIndex("title");
search.addIndex("content");

export const addPagesToSearchIndex = (pages: Page[]): void => {
  search.addDocuments(pages);
};

export default search;