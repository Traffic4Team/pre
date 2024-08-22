import React from 'react';
import './Itemcontainer.css';

function Itemcontainer({ title, imageSrc, onClick, rating, address }) {


    return (
        <div className="container" onClick={onClick}> 
            <div className="image-container">
                <img
                    alt="img"
                    aria-hidden="true"
                    src={imageSrc}
                />
            </div>
            <div className="text-container">
                <div className="title" title={title}>
                    <h4>{title}</h4>
                </div>
                <div className="location">
                    <h4>평점: {rating}</h4>
                    <h4>주소: {address}</h4>
                </div>
            </div>
        </div>
    );
}

export default Itemcontainer;
