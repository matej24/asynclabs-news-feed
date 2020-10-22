import React, {useEffect, useState} from 'react';
import NewsCard from "../../components/NewsCard/NewsCard";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";
import axios from "../../axios";
import "./NewsFeed.css";


const NewsFeed = () => {

    const [allFeed, setAllFeed] = useState([]);
    const [filteredFeed, setFilteredFeed] = useState([]);
    const [searchFeedValue, setSearchFeedValue] = useState("");
    const [moreFeed, setMoreFeed] = useState(false);

    //INITIAL FETCH OF DATA BASED ON LOAD MORE or LESS
    useEffect(() => {
        if(!moreFeed){
            axios.get("/feed?page=1&sport=football").then((res) => {
                setAllFeed(res.data.slice(0,10))
            })
        } else {
            axios.get("/feed?page=1&sport=football").then((res) => {
                setAllFeed(res.data)
            })
        }
        
    }, [moreFeed])

    // FILTER FUNCTION
    useEffect(() => {
        const result = allFeed.filter(feed => 
            feed.description.toLowerCase().includes(searchFeedValue.toLowerCase()) ||
            feed.author.name.toLowerCase().includes(searchFeedValue.toLowerCase()) ||
            feed.athlete.name.toLowerCase().includes(searchFeedValue.toLowerCase())
        )
        setFilteredFeed(result);
    }, [searchFeedValue, allFeed])
    
    // FUNCTION THAT RETURNS NEWS CARDS BASED ON FILTERING
    const feedList = (type) => 
        type.map((card) => {
            return(<Link to={`/video/${card.id}`} key={card.id}><NewsCard 
             videoUrl={card.video.url} 
             description={card.description} 
             athleteName={card.athlete.name} 
             athleteAge={card.athlete.age} 
             athleteClub={card.athlete.club} 
             userName={card.author.name} 
             postedOn={card.createdAt} 
             views={card.views} 
             postedAgo={card.createdBefore} /></Link>) 
    });

    // CHECK TO USE FILTERED LIST OR INITIAL ONE
    const checkIsListFiltered = searchFeedValue ? feedList(filteredFeed) : feedList(allFeed)


    const moreNewsFeedHandler = () => {
        setMoreFeed(!moreFeed);
    }



    return( 
        <div className="newsFeed__container">
            <div className="newsFeed__wrapper">
                <div className="newsFeed__heading"><h1>News Feed</h1></div>
                <div>
                    <input 
                        className="newsFeed__search" 
                        type="text" 
                        placeholder="Search news..." 
                        value={searchFeedValue} 
                        onChange={(e) => {setSearchFeedValue(e.target.value)}} />
                </div>
                <div className="newsFeed__content">
                    {!checkIsListFiltered.length ? <Spinner/> : checkIsListFiltered}
                </div>
                <button className="newsFeed__loadMoreButton" onClick={moreNewsFeedHandler}>{!moreFeed ? "Load more" : "Load less"}</button>
            </div>
        </div>
)
   
}   

export default NewsFeed;