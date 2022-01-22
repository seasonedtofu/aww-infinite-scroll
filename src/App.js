import React, { useState, UseEffect, useEffect, useRef, useCallback} from 'react'
import Article from './components/Article'
import useFetch from "./components/useFetch";

export default function App() {
  const [after, setAfter] = useState('')
  const [query, setQuery] = useState("aww");
  const [page, setPage] = useState(1);
  const { loading, error, list} = useFetch(query, page, after, setAfter);
  const loader = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <div className="App">
      <h1>Infinite Scroll</h1>
      <input type="text" value={query} onChange={handleChange} />
      <div className='post'>
        {list.map((item => <a href={ "https://reddit.com" + item.data.permalink } target="_blank">
          <h3>{item.data.title}</h3> 
          <h4>/r/{item.data.subreddit}</h4> 
          {item.data.thumbnail != 'self' && <h4><img src={ item.data.thumbnail} alt='article thumbnail'></img></h4>}
          <hr></hr>
        </a>))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}

// export default function App() {

//   const [articles, setArticles] = useState([]);
//   const [subreddit, setSubreddit] = useState('aww')

//   useEffect(() => {
//     fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
//       if (res.status != 200) {
//         console.log("ERROR")
//         return
//       }
//       res.json().then(data => {
//         if (data != null) {
//           console.log(data)
//           setArticles(data.data.children)
//         }
//       })
//     })
//   }, [subreddit])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)}></input>
//       </header>
//       <div className="articles">
//         {
//           (articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''
//         }
//       </div>
//     </div>
//   )
// }


