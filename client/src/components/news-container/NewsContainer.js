import React from 'react'
import NewsItem from '../news-item/NewsItem'

export default function NewsContainer({ news }) {
    // console.log(news);
    return (
        <div className="news-container">
            {
                news && news.map((item) => <NewsItem item={item} /> )
            }
        </div>
    )
}
