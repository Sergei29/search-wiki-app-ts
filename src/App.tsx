import React, { useState } from "react";
import ReactAutocomplete from "react-autocomplete";
import { useSearch, useDebounce } from "./hooks/hooks";
import Input from "./components/Input";

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const { articles } = useSearch(useDebounce(value));

  return (
    <ReactAutocomplete
      items={articles}
      renderMenu={(children, value, style) => (
        <div className="input-suggestions" style={{ ...style }}>
          {children}

          <a href={`/search?query=${value}`} className="search-link">
            see all results...
          </a>
        </div>
      )}
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
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onSelect={(value) => setValue(value)}
    />
  );
};

export default App;
