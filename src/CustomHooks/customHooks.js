import React from "react";
import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch(url);
      const dataApi = await response.json();
      setData(dataApi);
    }
    getData();
  }, [url]);

  return [data];
}

//  const [data] = useFetch("https://dga-gym-tracker.herokuapp.com/");
