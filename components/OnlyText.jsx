/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Fragment } from "react";
import { isValidHttpUrl } from "../utils/isValidUrl";
import { getLinkPreview } from "link-preview-js";
import SocialSection from "./SocialSection";
const youtube = require("youtube-metadata-from-url");
//var scrape = require("metatag-crawler");

const OnlyText = ({ text, bg, deviceType, setRichLink, hoote }) => {
  const [isUrl, setIsUrl] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [hrefUrl, setHrefUrl] = useState("");
  const splitText = text.split(" ");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [urlData, setUrlData] = useState();
  // console.log("text", text.length);

  const handleReadmore = () => {
    if (deviceType === "apple") {
      const url = "https://apps.apple.com/in/app/huut/id1566096141";
      setRedirectUrl(url);
    } else {
      const url1 =
        "https://play.google.com/store/apps/details?id=com.amtex.hoote";
      setRedirectUrl(url1);
    }
  };
  const getVideoId = (url) => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return null;
    }
  };

  // console.log("splitText", splitText)
  function containsHashChars(str) {
    //console.log("str", str)
    const specialChars = /#/;
    const hasBoolean = specialChars.test(str);
    const httpBoolean = isValidHttpUrl(str);
    const finalBoolean = hasBoolean || httpBoolean;
    // console.log("finalBooeal",finalBoolean)
    return specialChars.test(str) || isValidHttpUrl(str);
  }
  useEffect(() => {
    for (let i = 0; i < splitText.length; i++) {
      const test = isValidHttpUrl(splitText[i]);
      setIsUrl(test);
      if (test) {
        setHrefUrl(splitText[i]);
      }
    }
  }, [splitText, text]);
  useEffect(() => {
    if (isUrl) setRichLink(true);
  }, [isUrl]);

  const getVideoDetails = async (videoId) => {
    youtube.metadata(hrefUrl).then(
      function (json) {
        //console.log("json metadata", json);
        setTitle(json?.title);
        setThumbnailUrl(json?.thumbnail_url);
      },
      function (err) {
        console.log(err);
      }
    );
  };
  const fetchLinkData = async () => {
    const response = await fetch(`/api/getmetadata?url=${hrefUrl}`, {
      headers: {
        "user-agent": "googlebot", // fetches with googlebot crawler user agent
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      // console.log("response from local api " , response);
      setUrlData(data);
    }
    // setLinkData(data)
  };

  useEffect(() => {
    if (isUrl) {
      if (hrefUrl.includes("youtube.com") || hrefUrl.includes("youtu.b")) {
        const id = getVideoId(hrefUrl);
        getVideoDetails(id);
      } else {
        fetchLinkData(hrefUrl);
      }

      // getLinkPreview(
      //   hrefUrl, {
      //     headers: {
      //       "user-agent": "googlebot", // fetches with googlebot crawler user agent
      //     },
      //   }
      // ).then((data) => setUrlData(data));
    }
  }, [hrefUrl, isUrl, text]);
  // console.log("urlData", hrefUrl)
  // console.log("spiltTeXT", splitText);

  return (
    <Fragment>
      {isUrl ? (
        <>
          <div className="video-iframe-text">
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="youtube thbmnail"
                className="img-thumbnail"
              />
            )}
            {urlData?.images[0] && (
              <img
                src={urlData?.images[0]}
                alt="youtube thbmnail"
                className="img-thumbnail"
              />
            )}
            <div className="display-button-3">
              <a href={hrefUrl}>
                {(hrefUrl.includes("youtube.com") ||
                  hrefUrl.includes("youtu.b")) && (
                  <img
                    src="/img/white-play-btn.svg"
                    alt=""
                    id="play-pause"
                    style={{ height: "30px", width: "30px" }}
                  />
                )}
              </a>
            </div>
            <div
              className={
                hrefUrl.includes("youtube.com") || hrefUrl.includes("youtu.b")
                  ? "youtube-title-div"
                  : "article-title-div"
              }
            >
              {title ? <p className="youtube-title">{title}</p> : <></>}
              {urlData?.title ? (
                <p className="youtube-title">{urlData?.title}</p>
              ) : (
                <></>
              )}
              <div>
                <a href={hrefUrl}>
                  <img src="/img/rightArrow.svg" alt="right arrow" />
                </a>
              </div>
            </div>

            <div className="content-detail-rehutt">
              {splitText.length < 10 ? (
                <p className="left-align">
                  {splitText.map((item, id) => {
                    return (
                      <>
                        <span
                          key={id}
                          style={{
                            color: containsHashChars(item)
                              ? "#0079E9"
                              : "white",
                          }}
                        >
                          {item.length < 50 ? item : item.substring(0, 50)}
                          &nbsp;
                        </span>
                        <span  key={item}>
                          <a href={hrefUrl} style={{ color: "#0079E9" }}>
                            {item.length > 50 ? "...read more" : ""}
                          </a>
                        </span>
                      </>
                    );
                  })}
                </p>
              ) : (
                <p className="left-align">
                  {splitText.splice(0, 9).map((item, id) => {
                    return (
                      <>
                        <span
                          key={item}
                          style={{
                            color: containsHashChars(item)
                              ? "#0079E9"
                              : "white",
                          }}
                        >
                          {item.length < 50 ? item : item.substring(0, 50)}
                          &nbsp;
                        </span>
                        <span  key={id}>
                          <a href={hrefUrl} style={{ color: "#0079E9" }}>
                            {item.length > 50 ? "...read more" : ""}
                          </a>
                        </span>
                      </>
                    );
                  })}
                   {text.length > 100 ?  <span>
                          <a href={hrefUrl} style={{ color: "#0079E9" }}>
                            ...read more
                          </a>
                        </span> : ""}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        // <div class="content-detail">
        //     <p class="read-more22 pb-0"> <span>Lorem ipsum dolor sit amet, <a href="#">#consectetur</a> adipi elit,
        //         do eiusmod tempor incididunt ut
        //         dolore doloribus labore dicta </span> </p>
        //   </div>
        <div className="audio-iframe bg-black">
          {splitText.length <= 10 ? (
            <div className="only-text">{text}</div>
          ) : (
            <div className="only-text">
              {text.substring(0, 50)}&nbsp;&nbsp;&nbsp;&nbsp;
              <span onClick={handleReadmore}>
                <a href={redirectUrl} style={{ color: "red" }}>
                  ...read more
                </a>
              </span>
            </div>
          )}
        </div>
      )}
      {isUrl && (
        <div className="padding-social">
          <SocialSection hoote={hoote} deviceType={deviceType} />
        </div>
      )}
    </Fragment>
  );
};
export default OnlyText;
