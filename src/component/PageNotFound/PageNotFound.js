import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="pageNotFound">
            <div className="pageNotFound__container">
                <div className="pageNotFound__img">
                    <img src="/page-not-found.svg" alt="not-found" />
                </div>
                <h4>Rất tiếc, trang này hiện không khả dụng.</h4>
                <p>Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.</p>
                <div className="pageNotFound__btn">
                    <button>
                        <Link to="/">
                            Đi tới bảng tin
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
