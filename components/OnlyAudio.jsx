/* eslint-disable @next/next/no-img-element */
import { Fragment, useRef, useState, useEffect } from "react";
import { getTimeString } from "../utils/getTimeString";

const OnlyAudio=({file})=>{
  const [audioUrl, setAudioUrl] = useState()
    const playerRef = useRef(null);
    const [play, setPlay] = useState(true);
    const [duration, setDuration] = useState("00:00");
    const [currentTime, setCurrentTime] = useState("00:00");
    var interval;
    const [isMute, setIsMute] = useState(false);
    const [seekBarValue, setSeekBarValue] = useState("0");

    useEffect(()=>{
     for(let i =0 ; i< file.length; i++)
     {
      if(file[i].type === "AUDIO"){
        setAudioUrl(file[i].url)
      }
     }
    },[file])
  
    const handlePlayClick = () => {
      const audio = playerRef.current;
      //console.log("audio", audio)
      if (!audio) return;
      if (audio.paused == true) {
        audio.play();
        setPlay(false);
        interval = setInterval(function () {
          // console.log(videoRef.current.currentTime);
          const ct = audio.currentTime.toString();
          setCurrentTime(getTimeString(ct));
        }, 1000);
      } else {
        // Pause the video
        audio.pause();
        setPlay(true);
      }
    };
  
    const handleLoadedMetadata = () => {
      const audio = playerRef.current;
      if (!audio) return;
      const t = audio.duration.toString();
      setDuration(getTimeString(t));
    };
    const handleVolume = () => {
      if (playerRef.current.muted == false) {
        // Mute the video
        playerRef.current.muted = true;
        setIsMute(true);
        // Update the button text
      } else {
        // Unmute the video
        playerRef.current.muted = false;
        setIsMute(false);
  
        // Update the button text
      }
    };
    const handleSeekBar = (e) => {
      const audio = playerRef.current;
      if (!audio) return;
      //  / / Calculate the new time
      var time = audio.duration * (e.target.value / 100);
  
      // Update the video time
      audio.currentTime = time;
    };
  
    const handleTimeUpdate = () => {
      const audio = playerRef.current;
      if (!audio) return;
      var value = (100 / audio.duration) * audio.currentTime;
      // Update the slider value
      setSeekBarValue(value);
    };
    const handleMouseDown = () => {
      const audio = playerRef.current;
      if (!audio) return;
      audio.pause();
    };
    const handleMouseUP = () => {
      const audio = playerRef.current;
      if (!audio) return;
      audio.play();
    };
    const onendedAudio=()=>{
      setPlay(true)
    }
    const onendedVideo=()=>{
      setVideoPlay(true)
    }
  
    return(
<Fragment>
<audio
        id="player"
        ref={playerRef}
        src={audioUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onendedAudio}
      ></audio>

      {/* <!-- progress-bar for audio video --> */}
      <div className="progress-section pto-0">
        <div className="progress-content">
          <div className="progress-subcontent">
            <img
              src={isMute ? "/img/muteMic.svg" : "/img/Voice.svg"}
              alt="mic"
              onClick={handleVolume}
            />
            <span className="play-timing">
              {currentTime} / {duration}
            </span>
          </div>
          <a href="#" className="stop-playing-btn">
            <img
              src={play ? "/img/stop-playing.svg" : "/img/pause.svg"}
              alt=""
              onClick={handlePlayClick}
              style={{ height: "30px", width: "30px", color: "red" }}
            />
          </a>
        </div>
        <div className="progress-bar">
          <input
             className="progress audio-progress"
            type="range"
            id="seek-bar"
            value={seekBarValue}
            style={{ marginTop: "10px" }}
            onChange={handleSeekBar}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUP}
          />{" "}
         
        </div>
      </div>
     
     
    </Fragment>
    )
}
export default OnlyAudio;