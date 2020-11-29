import React from "react";
import { useDebounce, useSearch, useSearchForm } from "../../hooks/hooks";

type ContainerProps = {
  children: (props: any) => JSX.Element;
};
const Container: React.FC<ContainerProps> = ({ children }) => {
  const { searchValue, onSearchChange } = useSearchForm();
  const { articles } = useSearch(useDebounce(searchValue));

  return children({ searchValue, onSearchChange, articles });
};

export default Container;
