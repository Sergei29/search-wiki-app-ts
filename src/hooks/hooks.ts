import { useState, useEffect } from "react";
import axios from "axios";
const OPEN_SEARCH_ENDPOINT_URI =
  "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

export type ArticlesStateType = {
  articles: Record<string, string>[];
  status: "IDLE" | "SUCCESS" | "ERROR";
  error: string;
};

export const useSearch = (query: string) => {
  const [state, setState] = useState<ArticlesStateType>({
    articles: [],
    status: "IDLE",
    error: "",
  });

  useEffect(() => {
    let isMounted = true;
    setState(() => ({
      articles: [],
      status: "IDLE",
      error: "",
    }));

    if (isMounted && query.length) {
      axios
        .get(`${OPEN_SEARCH_ENDPOINT_URI}${query}`)
        .then(({ data }) => {
          const loadedArcicles = data[1].map((item: string, index: number) => ({
            id: data[3][index],
            label: item,
          }));
          setState(() => ({
            articles: loadedArcicles,
            status: "SUCCESS",
            error: "",
          }));
        })
        .catch((error) => {
          const errorMessage = error.message
            ? error.message
            : "Failed to fetch.";
          setState(() => ({
            articles: [],
            error: errorMessage,
            status: "ERROR",
          }));
        });
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

  return state;
};
