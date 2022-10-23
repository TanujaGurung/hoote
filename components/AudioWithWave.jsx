/* eslint-disable @next/next/no-img-element */
import { Fragment, useRef, useState, useEffect } from "react";
import { getTimeString } from "../utils/getTimeString";
import dynamic from "next/dynamic";

const AudioWaveComponent = dynamic(() => import("./Waveform"), {
  ssr: false,
});

const AudioWithWave = ({ file }) => {
  const [audioUrl, setAudioUrl] = useState();
  const playerRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  var interval;
  const [isMute, setIsMute] = useState(false);
  const [seekBarValue, setSeekBarValue] = useState("0");
  const waveSurferRef = useRef(null);
  const videoRef = useRef(null);
  const onendedAudio = () => {
    setPlay(true);
    if (videoRef.current) videoRef.current.pause();
  };

  useEffect(() => {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type === "AUDIO") {
        setAudioUrl(file[i].url);
      }
    }
  }, [file]);

  const handlePlayClick = () => {
    const audio = playerRef.current;
    //console.log("audio", audio)
    if (!audio) return;
    if (audio.paused == true) {
      audio.play();
      if (videoRef.current) {
        if (videoRef.current.paused == true) videoRef.current.play();
      }
      setPlay(false);
      interval = setInterval(function () {
        // console.log(videoRef.current.currentTime);
        const ct = audio.currentTime.toString();
        setCurrentTime(getTimeString(ct));
      }, 1000);
    } else {
      // Pause the video
      videoRef.current.pause();
      audio.pause();
      setPlay(true);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = playerRef.current;
    if (!audio) return;
    const t = audio.duration.toString();
    setDuration(getTimeString(t));

    const audios = audio.toString();
    //  setCurrentTime(audios.currentTime);
    for (let i = 0; i < audios.length; i++) {
      var mzminutes = Math.floor(audios[i].duration / 60);
      // console.log("mzminutes", mzminutes)
      var mzseconds = Math.floor(audios[i].duration - mzminutes * 60);
      //   setDuration(mzminutes+':'+mzseconds)
    }
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
    setPlay(false);
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
    if (videoRef.current) videoRef.current.play();
  };

  useEffect(()=>{
    const audio = playerRef.current;
    //console.log("audio", audio)
    if (!audio) return;
    if (audio.paused == true) {
      audio.play();
      setPlay(false);
    }
  },[])

  return (
    <Fragment>
      <audio
        id="player"
        ref={playerRef}
        //onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onendedAudio}
        autoPlay
      >
        <source src={file[0]?.url} />
      </audio>

      {/* <!-- progress-bar for audio video --> */}
      <div className="progress-section pto-0">
        <div className="progress-content">
          <div className="progress-subcontent">
            <img
              src="/img/Voice.svg"
              alt="mic"
              // onClick={handleVolume}
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
      <div className="video-iframe-animation">
        <video
          className="animation-video"
          ref={videoRef}
          id="video"
          //maxHeight="300px"
          // poster={file[0].thumbnail}
          // onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
          //  onTimeUpdate={handleTimeUpdate}
          style={{ objectFit: "cover" }}
          loop
        >
          <source src="/img/wave_animation.mp4" type="video/mp4" />
        </video>
        {/* <AudioWaveComponent waveSurferRef={waveSurferRef} audio={file[0].url} seekBarValue={seekBarValue}/> */}
      </div>
    </Fragment>
  );
};
export default AudioWithWave;
