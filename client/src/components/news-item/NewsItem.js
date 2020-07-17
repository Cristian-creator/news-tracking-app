import React from 'react'
import './NewsItem.css';

export default function NewsItem({ item }) {
    // console.log(item.journal);
    const { journal, link, title } = item;
    return (
        <div className="news-item">
            <div className="journal">
                { journal }
            </div>
            <div className="title">
                <a href={link}> {title} </a>
            </div>
        </div>
    )
}
