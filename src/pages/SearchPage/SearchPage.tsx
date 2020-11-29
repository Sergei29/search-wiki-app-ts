import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSearch } from "../../hooks/hooks";
import Autocomplete from "../../components/Autocomplete";
import Container from "../../components/Container";
import ListItem from "../../components/ListItem";

const SearchPage: React.FC<RouteComponentProps> = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const { articles, status, error } = useSearch(query, 50);

  const renderArticles = () => {
    if (!articles.length && status === "SUCCESS") {
      return <p>No results for: {query}</p>;
    }

    if (status === "ERROR") {
      return <p>Error occured: {error}</p>;
    }

    return articles.map((article) => (
      <ListItem key={article.id} {...article} />
    ));
  };

  return (
    <>
      <Container>
        {({ searchValue, onSearchChange, articles }) => (
          <Autocomplete
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            articles={articles}
          />
        )}
      </Container>
      <div>{renderArticles()}</div>
    </>
  );
};

export default SearchPage;
