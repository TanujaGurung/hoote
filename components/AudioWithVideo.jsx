/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from "react";
import { getTimeString } from "../utils/getTimeString";

const AudioWithVideo = ({ file }) => {
  const [audioUrl, setAudioUrl] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const playerRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [videoPlay, setVideoPlay] = useState(true)
  const [duration, setDuration] = useState("00:00");
  const [vduration, setVDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [vcurrentTime, setVCurrentTime] = useState("00:00");
  var interval;
  const [isMute, setIsMute] = useState(false);
  const [seekBarValue, setSeekBarValue] = useState("0");
  const [videoseekBarValue, setVideoSeekBarValue] = useState("0");
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video){
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

      if (video.muted == false) {  
        video.muted = true;
      }
    }
  }, []);


  useEffect(() => {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type === "AUDIO") {
        setAudioUrl(file[i].url);
      }
      if (file[i].type === "VIDEO") {
        setVideoUrl(file[i].url);
      }
    }
  }, [file]);

  const onendedAudio=()=>{
    setPlay(true)
  }
  const onendedVideo=()=>{
    setVideoPlay(true)
  }


  const handleAudioPlayClick = () => {
    const audio = playerRef.current;
    //console.log("audio", audio)
    if (!audio) return;
    if (audio.paused == true) {
      audio.play();
      if (videoRef.current) {
        videoRef.current.pause();
        setVideoPlay(true)
      }
     
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

  const handleVideoPlayClick = () => {
    const video = videoRef.current;
    //console.log("audio", audio)
    if (!video) return;
    if (video.paused == true) {
      video.play();
      if (video.muted == true) {  
        video.muted = false;
      }
      if (playerRef.current.play()){ playerRef.current.pause();
      setPlay(true);
      }
      setVideoPlay(false)
      interval = setInterval(function () {
        // console.log(videoRef.current.currentTime);
        const ct = video.currentTime.toString();
        setVCurrentTime(getTimeString(ct));
      }, 1000);
    } else {
      // Pause the video
      video.pause();
      if (videoRef.current.muted == true) {  
        videoRef.current.muted = false;
        setIsMute(false)
      }

      setVideoPlay(true)
    }
  };

  const handleLoadedMetadata = () => {
    const audio = playerRef.current;
    if (!audio) return;
    //const t = audio.duration.toString();
    const t = audio.duration;
    setDuration(getTimeString(t));
  };
  const handleLoadedMetadataVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    //const t = audio.duration.toString();
    const t = video.duration;
    const ct = video.currentTime
    setVDuration(getTimeString(t));
    setVCurrentTime(getTimeString(ct))
  };
  const handleVolume = () => {
    if (videoRef.current.muted == false) {
      // Mute the video
      videoRef.current.muted = true;
      setIsMute(true);
      // Update the button text
    } else {
      // Unmute the video
      videoRef.current.muted = false;
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
    setPlay(false)
  };

  const handleVideoSeekBar = (e) => {
    const video = videoRef.current;
    if (!video) return;
    //  / / Calculate the new time
    var time = video.duration * (e.target.value / 100);

    // Update the video time
    video.currentTime = time;
    setPlay(false)
  };
  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    var value = (100 / video.duration) * video.currentTime;
    // Update the slider value
    setVideoSeekBarValue(value);
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
    setPlay(false);
  };

  const handleVideoMouseDown = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlay(false);
  };
  const handleVideoMouseUp = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setPlay(true);
  };
  const handleMouseUP = () => {
    const audio = playerRef.current;
    if (!audio) return;
    audio.play();
    setPlay(true);
  };
  	


  // const callCurrentTime=()=>{
 
  //     interval = setInterval(function () {
  //       // console.log(videoRef.current.currentTime);
  //       const ct = video.currentTime.toString();
  //       setVCurrentTime(getTimeString(ct));
  //     }, 1000);
    
  // }
  //const calculation = useMemo(() => callCurrentTime(), [vcurrentTime]);

    useEffect(() => {
      if(videoRef.current){
      if(videoRef.current.muted)
      videoRef.current.play()
      setVideoPlay(false)
      if (videoRef.current.muted == false) {  
        videoRef.current.muted = true;
      }
    
      setIsMute(true)
      
    }}, []);

    useEffect(()=>{
      const callCurrentTime=async()=>{
 
        interval = setInterval(function () {
          // console.log(videoRef.current.currentTime);
          const ct = video.currentTime.toString();
          setVCurrentTime(getTimeString(ct));
        }, 1000);
      
    }
    callCurrentTime()
    },[])
 
  return (
    <Fragment>
      <div>
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
                src="/img/Voice.svg"
                alt="mic"
                //onClick={handleVolume}
              />
              <span className="play-timing">
                {currentTime} / {duration}
              </span>
            </div>
            <a href="#" className="stop-playing-btn">
            <img
              src={play ? "/img/stop-playing.svg":"/img/pause.svg"}
              alt=""
              onClick={handleAudioPlayClick}
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
            <span></span>
          </div>
        </div>
      </div>
      <div className="video-iframe moible_frame">
        <video
          ref={videoRef}
          id="video"
          width="100%"
          height="180px"
          //maxHeight="300px"
          poster="https://d2upio5ij5nosv.cloudfront.net/299b241a-4920-4d84-9d71-b1d82d415e98/HOOTE_IMG/VIDEO_Thumb_299b241a-4920-4d84-9d71-b1d82d415e98_1664532335156_1664532334908.jpeg"
          onLoadedMetadata={handleLoadedMetadataVideo}
          preload="metadata"
          onTimeUpdate={handleVideoTimeUpdate}
          style={{objectFit:"cover"}}
          onEnded={onendedVideo}
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
        {/* <!-- progress-bar --> */}
        <div
          className="progress-section vd-frame-content"
          id="video-controls"
          style={{ marginBottom: "-26px" }}
        >
          <div className="progress-content ">
            <div className="progress-subcontent vd-progress-subcontent-2">
              <img src="/img/video.svg" alt="mic" />
              <span className="play-timing">
                {vcurrentTime} / {vduration}
              </span>
            </div>
            <div className="display-button-2">
              <img
                src={videoPlay ? "/img/white-play-btn.svg":"/img/stop_rec.svg"}
                alt=""
                id="play-pause"
                onClick={handleVideoPlayClick}
                style={{ height: "30px", width: "30px" }}
              />
            </div>

            <a href="#" className="stop-playing-btn">
              <img
                src={isMute ? "/img/noSound.svg" : "/img/volume-btn.svg"}
                alt=""
                id="mute"
                onClick={handleVolume}
              />
               {/* <img
                src="/img/volume-btn.svg"
                alt=""
                id="mute"
                //onClick={handleVolume}
              /> */}
              {/* <input
                type="range"
                id="volume-bar"
                min="0"
                max="1"
                step="0.1"
                value={vol}
                onChange={handleVolumeBar}
              /> */}
            </a>
          </div>
          <input
            className="progress audio-progress"
            type="range"
            value={videoseekBarValue}
            style={{ width: "100%", marginTop: "10px" }}
            onChange={handleVideoSeekBar}
            onTouchStart={handleVideoMouseDown}
            onTouchEnd={handleVideoMouseUp}
            
          />
        </div>
      </div>
    </Fragment>
  );
};
export default AudioWithVideo;
