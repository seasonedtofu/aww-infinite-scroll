import React from 'react';

export default function Article(props) {

  const thumbnailExists = props.article.thumnbnail
    
  return (
    <article>
        <a href={ "https://reddit.com" + props.article.permalink } target="_blank">
            <h3>{ props.article.title }</h3>
            <h4>from /r/{ props.article.subreddit }</h4>
            {props.article.thumbnail != 'self' && <h4><img src={ props.article.thumbnail} alt='article thumbnail'></img></h4>}
        </a>
    </article>
    
  )
}
