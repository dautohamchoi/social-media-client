import React from 'react'
import './Progress.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Progress({ progress }) {
    return (
        <div className={progress ? "progress active" : "progress"} >
            <div className="progress__content">
                <FontAwesomeIcon icon={faCheckCircle} />
                <span> Đăng bài thành công</span>
            </div>
        </div>
    )
}

export default Progress
