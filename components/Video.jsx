/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useRef, useEffect } from "react";
import {getTimeString} from "../utils/getTimeString"

const Video = ({file}) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const videoRef = useRef(null);
  const seekBarRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [isVMute, setIsVMute] = useState(false);
  const [vol, setVol] = useState("1");
  var interval;
  const [seekBarValue, setSeekBarValue] = useState("0");
  const [showVol, setShowVol] = useState(false)

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused == true) 
    video.play()
  
    const t = video.duration.toString();
    setDuration(getTimeString(t));

    const videos = video.toString();
    setCurrentTime(video.currentTime);
    for (let i = 0; i < videos.length; i++) {
      var mzminutes = Math.floor(videos[i].duration / 60);
      // console.log("mzminutes", mzminutes)
      var mzseconds = Math.floor(videos[i].duration - mzminutes * 60);
      //   setDuration(mzminutes+':'+mzseconds)
    }
  };

  const handlePlayClick = () => {
    //setIsMute(true)
    if (videoRef.current.paused == true) {
      var playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          setPlay(true)
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
      // videoRef.current.play();
      // setPlay(true);
      if (videoRef.current.muted == true) {  
        videoRef.current.muted = false;
        setIsVMute(true)
      }
      // if (videoRef.current.muted == true) {  
      //   videoRef.current.muted = false;
      // }
      // videoRef.current.currentTime = 0;
      interval = setInterval(function () {
         if(videoRef.current){
        const ct = videoRef.current.currentTime.toString();
        setCurrentTime(getTimeString(ct));
      }}, 1000);
    } else {
      // Pause the video
      videoRef.current.pause();
      if (videoRef.current.muted == true) {  
        videoRef.current.muted = false;
        setIsVMute(false)
      }
      setPlay(false);
    }
  };
  const handleVolume = () => { 
    if (videoRef.current.muted == false) {
      // Mute the video
      videoRef.current.muted = true;
      setIsVMute(true);
      // Update the button text
    } else {
      // Unmute the video
      videoRef.current.muted = false;
      setIsVMute(false);

      // Update the button text
    }
  
  };
  const handleVolumeBar = (e) => {
    // console.log("e.target.value", e.target.value)
    setVol(e.target.value);
    videoRef.current.volume = e.target.value;
    setShowVol(false)
  };


  const handleSeekBar = (e) => {
    const video = videoRef.current;
    if (!video) return;
    //  / / Calculate the new time
    var time = video.duration * (e.target.value / 100);

    // Update the video time
    video.currentTime = time;
  };
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    var value = (100 / video.duration) * video.currentTime;
    // Update the slider value
    setSeekBarValue(value);
  };
  const handleMouseDown = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlay(false);
  };
  const handleMouseUP = () => {
    const video = videoRef.current;
    if (!video) return;
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        setPlay(true);
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
   
  };
  
  useEffect(() => {
   handlePlayClick()
  var playPromise = videoRef.current.play()
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      setPlay(true)
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }

  if (videoRef.current.muted == false) {  
    videoRef.current.muted = true;
    setIsVMute(true)
  }

  }, []);

  // useEffect(() => {
  //   if (videoRef.current.muted == true) {  
  //     videoRef.current.muted = false;
  //   }
  //   }, []);

  const onendedVideo=()=>{
    setPlay(false)
  }

  useEffect(()=>{
    const callCurrentTime=async()=>{

      interval = setInterval(function () {
        // console.log(videoRef.current.currentTime);
        const ct = video.currentTime.toString();
        setCurrentTime(getTimeString(ct));
      }, 1000);
    
  }
  callCurrentTime()
  },[])

  return (
    <Fragment>
      {/* <!-- i-frame-section --> */}
      <div className="video-iframe">
        <video
          ref={videoRef}
          id="video"
          width="100%"
          height="180px"
          //maxHeight="300px"
          poster={file[0].thumbnail}
          onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          style={{objectFit:"cover"}}
          onEnded={onendedVideo}
         autoPlay muted
        >
          <source src={file[0].url} type="video/mp4" />
        </video>
        <div className="display-button">
        <img
                src={play ? "/img/stop_rec.svg" : "/img/white-play-btn.svg"}
                alt=""
                id="play-pause"
                onClick={handlePlayClick}
                style={{ height: "30px", width: "30px" }}
              />
        </div>
       
        {/* <!-- progress-bar --> */}
        <div className="progress-section vd-frame-content-video" id="video-controls">
          <div className="progress-content ">
            <div className="progress-subcontent vd-progress-subcontent">
              <img src="/img/video.svg" alt="mic" />
              <span className="play-timing">
                {currentTime} / {duration}
              </span>
            </div>
            {/* <a href="#" className="stop-playing-btn">
              <img
                src={play ? "/img/pause.png" : "/img/stop-playing.svg"}
                alt=""
                id="play-pause"
                onClick={handlePlayClick}
                style={{ height: "30px", width: "30px" }}
              />
            </a> */}
            <a href="#" className="stop-playing-btn volume-range">
              <img
                src={isVMute ? "/img/noSound.svg" : "/img/volume-btn.svg"}
                alt=""
                id="mute"
                onClick={handleVolume}
              />
             {/* {showVol &&  <input
              className="volume-bar"
                type="range"
                id="volume-bar"
                min="0"
                max="1"
                step="0.1"
                value={vol}
                onChange={handleVolumeBar}
              />} */}
            </a>
           
          </div>
          <input
            ref={seekBarRef}
            className="progress audio-progress"
            type="range"
            id="seek-bar"
            value={seekBarValue}
            style={{ marginTop: "10px" }}
            onChange={handleSeekBar}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUP}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default Video;
