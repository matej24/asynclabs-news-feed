import React, {useState, useEffect, useRef} from 'react'
import {useParams, useHistory} from "react-router-dom"
import {
    EmailShareButton, EmailIcon, 
    FacebookShareButton, FacebookIcon, 
    WhatsappShareButton, WhatsappIcon} from "react-share"
import axios from "../../axios";
import "./NewsVideo.css";

const NewsVideo = () => {
    const {id} = useParams();
    const videoRef = useRef(null);
    let history = useHistory();

    const [videoUrl, setVideoUrl] = useState("");
    const [videoPlay, setVideoPlay] = useState(false);

    const videoPlayHandler = () => {
        setVideoPlay(!videoPlay);
        if(videoPlay) {
            videoRef.current.play()
        }else {
            videoRef.current.pause()
        }
    }

    useEffect(() => {
        axios.get(`/post/${id}`).then((res) => {
            setVideoUrl(res.data.video.url)
        })
    }, [id])

    return (
        <div className="newsVideo__container">
            <h1>Video ID: {id}</h1>
            <video ref={videoRef} src={videoUrl} onClick={videoPlayHandler} />
            <div className="newsVideo__shareIcons">
                <EmailShareButton url={window.location.href} body={`Check this video ${id} out`}>
                    <EmailIcon size={32} round={true} /> 
                </EmailShareButton>
                <FacebookShareButton url={window.location.href} quote={`Check this video ${id} out`}>
                    <FacebookIcon size={32} round={true} /> 
                </FacebookShareButton>
                <WhatsappShareButton url={window.location.href} title={`Check this video ${id} out`}>
                    <WhatsappIcon size={32} round={true} /> 
                </WhatsappShareButton>
            </div>            
            <button className="newsVideo__button-back" onClick={() => history.goBack()}>Go back</button>

        </div>
    )
}

export default NewsVideo
