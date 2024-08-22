import React from 'react';
import './Planner.css';

function planner({ title, address, imageSrc, onClick  }) {
    return (
        <div className="container_Planner" onClick={onClick}>
            <div className="image-container_Planner">
                <img
                        alt="img"
                        aria-hidden="true"
                        src={imageSrc}
                    />
            </div>
            <div className="text-container_Planner">
                <div className="title_Planner" title={title}>
                    <h4>{title}</h4>
                </div>
                <div className="location_Planner">
                    <h4 title={address}>{address}</h4>
                </div>
            </div>
        </div>
    );
}

export default planner;
