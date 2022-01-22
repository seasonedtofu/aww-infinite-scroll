import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page, after, setAfter) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const urlQuery = `https://www.reddit.com/r/${query}.json?after=${after}&limit=25`;
      const res = await axios.get(urlQuery);
      // console.log(urlQuery); // Query you send through axios
      await setList((prev) => [...new Set([...prev, ...res.data.data.children])]);
      // console.log(res.data.data.children); // new list of posts
      setAfter(res.data.data.after);
      // res.data.data.children.map(post => console.log(post.data.title)); // title of each post logged
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  //console.log(after)

  return { loading, error, list};
}

export default useFetch;