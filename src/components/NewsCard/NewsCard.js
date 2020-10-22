import React from 'react'
import "./NewsCard.css"
import {FaRegEye, FaPlay} from "react-icons/fa";
import {MdAccessTime} from "react-icons/md";

const NewsCard = ({videoUrl, description, athleteName, athleteAge, athleteClub, userName, postedOn, views, postedAgo}) => {
    return (
        <div className="newsCard__card">
            <div className="newsCard__video">
                <video src={videoUrl}
                loop
                muted  
                onMouseOver={event => event.target.play()}
                onMouseOut={event => event.target.pause()}/>
                <div className="newsCard__video__iconWrap">
                    <FaPlay />
                </div>
            </div>
            <div className="newsCard__content">
                <p>{description}</p>
                <div className="newsCard__content__info"><h5>Player:&nbsp; </h5> <p>{athleteName}, {athleteAge}, {athleteClub}</p> </div>
                <div className="newsCard__content__info"><h5>Posted by:&nbsp; </h5><p>{userName}</p></div>
                <div className="newsCard__content__info"><h5>Posted on:&nbsp; </h5><p>{postedOn.slice(0,10)}</p></div>
                <div className="newsCard__content__details">
                    <div><FaRegEye/>&nbsp;{views} </div>
                    <div><MdAccessTime />&nbsp;{postedAgo}</div></div>
                </div>     
        </div>
    )
}

export default NewsCard
