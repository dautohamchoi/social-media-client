import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../Avatar/Avatar'
import './SearchResult.css';


function SearchResult({ user }) {
    return (
        <div className="searchResult">
            <div className="searchResult__avatar">
                <Avatar user={user} />
            </div>
            <div className="searchResult__info">
                <h4>
                    {user.nickname}
                </h4>
                <p>@{user.name}</p>
            </div>
        </div>
    )
}

export default SearchResult
