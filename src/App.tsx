import React from "react";
import ReactAutocomplete from "react-autocomplete";
import { useSearch, useDebounce, useSearchForm } from "./hooks/hooks";
import Input from "./components/Input";

const App: React.FC = () => {
  const { searchValue, onSearchChange } = useSearchForm();

  const { articles } = useSearch(useDebounce(searchValue));

  return (
    <ReactAutocomplete
      items={articles}
      renderMenu={(children, value, style) => {
        return articles && articles.length ? (
          <div className="input-suggestions" style={{ ...style }}>
            {children}

            <a href={`/search?query=${value}`} className="search-link">
              see all results...
            </a>
          </div>
        ) : (
          <></>
        );
      }}
      getItemValue={(item) => item.label}
      renderInput={Input}
      inputProps={{ placeholder: "type a search word" }}
      renderItem={(item, highlighted) => (
        <div
          key={item.id}
          style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
        >
          {item.label}
        </div>
      )}
      value={searchValue}
      onChange={onSearchChange}
    />
  );
};

export default App;
