import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
const OPEN_SEARCH_ENDPOINT_URI =
  "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

export type ArticlesStateType = {
  articles: { id: string; label: string }[];
  status: "IDLE" | "SUCCESS" | "ERROR";
  error: string;
};

export const useSearch = (query: string, minNumberOfResults: number = 10) => {
  const initialState: ArticlesStateType = {
    articles: [],
    status: "IDLE",
    error: "",
  };
  const [state, setState] = useState<ArticlesStateType>(initialState);

  const CancelToken = useRef<any | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!isMounted || query.length < 3) return;

    // if the new call is about to be created, cancel the current one:
    if (CancelToken.current) CancelToken.current.cancel();

    //create cancel token:
    CancelToken.current = axios.CancelToken.source();

    axios
      .get(`${OPEN_SEARCH_ENDPOINT_URI}${query}&limit=${minNumberOfResults}`, {
        cancelToken: CancelToken.current.token,
      })
      .then(({ data }) => {
        const loadedArticles = data[1].map((item: string, index: number) => ({
          id: data[3][index],
          label: item,
        }));
        setState(() => ({
          articles: loadedArticles,
          status: "SUCCESS",
          error: "",
        }));
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        const errorMessage = error.message ? error.message : "Failed to fetch.";
        setState(() => ({
          articles: [],
          error: errorMessage,
          status: "ERROR",
        }));
      });

    return () => {
      isMounted = false;
    };
  }, [query, minNumberOfResults]);

  return state;
};

export const useDebounce = (value: any, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(() => value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSearchForm = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearchChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) =>
      setSearchValue(e.currentTarget.value),
    []
  );

  return { searchValue, onSearchChange };
};
