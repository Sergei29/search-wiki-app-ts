import React from "react";
import ReactAutocomplete from "react-autocomplete";
import Input from "../Input";
import "./style.scss";

type AutocompleteProps = {
  articles: Record<string, any>[];
  searchValue: string;
  onSearchChange: (e: React.FormEvent<HTMLInputElement>) => void;
};
const Autocomplete: React.FC<AutocompleteProps> = ({
  articles,
  searchValue,
  onSearchChange,
}) => {
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

export default Autocomplete;
