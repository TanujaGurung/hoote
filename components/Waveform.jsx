/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";

const Waveform = ({ audio, waveSurferRef,seekBarValue }) => {
  const containerRef = useRef();

  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      barHeight: 7,
      cursorWidth: 0,
      autoCenter: true,
      backgroundColor: "black",
      
      progressColor: [ // the gradient fill styles are also available on the progressColor option
        "#FF395C",
        "#FF395C",
        "#FF5C29",
        
    ],
      // progressColor: "linear-gradient(180deg, #FF395C 0%, #FF5C29 100%)",
      barGap: "4",
    });
    waveSurfer.load(
      audio
    );
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });
    waveSurfer.setMute(true)
    waveSurfer.seekTo(0.5)

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <WaveSurferWrap>
      <div ref={containerRef} />
    </WaveSurferWrap>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

const WaveSurferWrap = styled.div`
  align-items: center;
  width:100%;
  height: 120px;
`;

export default Waveform;
