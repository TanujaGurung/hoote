/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { getToken, getPreview, getParentRefDetails } from "../utils/getPreview";
import Footer from "../components/Footer";
import Video from "../components/Video";
import AudioWithWave from "../components/AudioWithWave";
import Profile from "../components/Profile";
import SocialSection from "../components/SocialSection";
import OnlyAudio from "../components/OnlyAudio";
import dynamic from "next/dynamic";
import OnlyText from "../components/OnlyText";
import Text from "../components/Text";
import ImageComp from "../components/ImageComp";
import AudioWithVideo from "../components/AudioWithVideo";
import { useRouter } from "next/router";
import { isAndroid, isIOS } from "react-device-detect";
import { checkTypes } from "../utils/checkTypes";
import Rehuut from "../components/Rehuut";
import ShareModal from "../components/ShareModel";
import { Helmet } from "react-helmet-async";
import { hooteTokenApi, hooteApi, userApi, webPreviewUrl } from '../config';


function PreviewDetails({ resData }) {
  const [status, setStatus] = useState("loading....");
  const [data, setData] = useState();
  const [type, setType] = useState();
  const [hoote, setHoote] = useState();
  const [file, setFile] = useState();
  const [text, setText] = useState();
  const [showRehuut, setShowReHuut] = useState(false);
  const [hootType, setHootType] = useState("s");
  const [richLink, setRichLink] = useState(false);
  const [rehuut, setRehuut] = useState();
  const [open, setOpen] = useState(false);
  const [parentRefData, setParentRefData] = useState();
  const [showParentProfile, setShowParentProfile] = useState(false)
  const [targetUser, setTargetUser] = useState()
  if (Object.keys(resData).length === 0 || !resData) {
    setStatus("Sorry!! Hoote is not available");
  }
  const [deviceType, setDeviceType] = useState("");
  const handleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isAndroid) {
      setDeviceType("android");
    } else if (isIOS) {
      setDeviceType("apple");
    }
  }, []);
//   const envir = process.env.NEXT_PUBLIC_WEB_PREVIEW_URL
//  console.log("get uesr api", {envir, hooteTokenApi, hooteApi, userApi, webPreviewUrl})

  const router = useRouter();
  const { huut } = router.query;
  //console.log("router", router)
  const canonicalUrl = (`https://web.huut.com/preview` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];

  //console.log("canonicalUrl", canonicalUrl)
  // console.log("query",huut)

  // console.log("resData", resData)
  useEffect(() => {
    if (resData) {
      setData(resData);
    }
  }, [resData]);

  useEffect(() => {
    if (data) {
      setHoote(resData?.hoote);
    }
  }, [data, resData?.hoote]);
  
  console.log("resData", resData);

  useEffect(() => {
    if (hoote) {
      const finalType = checkTypes(hoote);
      setType(finalType);
      setFile(hoote.files);
      setText(hoote.text);
    }
  }, [hoote]);

  const callParentHuut = async (parentId) => {
    const finalToken = await getToken();
    //console.log("finalToken", finalToken)
    const res = await getPreview(parentId, finalToken);
    const json = await res.json();
    const parentData = await json?.data;
    setRehuut(parentData);
    // console.log("parentData", parentData)
  };

  const callParentRefDetails = async (parentId) => {
    const finalToken = await getToken();
    // console.log("finalToken", finalToken)
    const res = await getParentRefDetails(parentId, finalToken);
    const json = await res.json();
    const parentRefDataRes = await json?.data;
    setParentRefData(parentRefDataRes);
  };
  const callTargetUser = async (parentId) => {
    const finalToken = await getToken();
    // console.log("finalToken", finalToken)
    const res = await getParentRefDetails(parentId, finalToken);
    const json = await res.json();
    const parentRefDataRes = await json?.data;
    setTargetUser(parentRefDataRes);
  };


  useEffect(() => {
    if (hoote) {
      if (hoote.type === "REHOOTE_QUOTE" || hoote.type === "RAH_REQ" || hoote.type == "RAH_RESP") {
        if(hoote?.parentHooteId){
        callParentHuut(hoote?.parentHooteId);
        setShowReHuut(true);
        setHootType(hoote.type);
        }
        if (hoote.type === "RAH_REQ" || hoote.type == "RAH_RESP") {
          if(hoote?.parentHooteId){
            setShowParentProfile(true)
          }
        }
        
      }
    }
  }, [hoote]);

  useEffect(() => {
    if (hoote) {
      if (hoote?.parentRef) {
        callParentRefDetails(hoote?.parentRef?.user_id);
        //  callParentHuut(hoote?.parentHooteId)
        //  setShowReHuut(true)
        //  setHootType(hoote.type)
      }
    }
  }, [hoote]);
  useEffect(() => {
    if (hoote) {
      if (hoote?.rahRef) {
        if(hoote?.rahRef?.targetUser){
          callTargetUser(hoote?.rahRef?.targetUser);
        //  callParentHuut(hoote?.parentHooteId)
        //  setShowReHuut(true)
        //  setHootType(hoote.type)
      }
    }
    }
  }, [hoote]);
// console.log("targetUser", targetUser)
  

  function FinalComponent({ type, file, text, deviceType }) {
    switch (type) {
      case "audio":
        return (
          <Fragment>
            <AudioWithWave file={file} />
          </Fragment>
        );
      case "video":
        return (
          <Fragment>
            <Video file={file} />
          </Fragment>
        );
      case "img":
        return (
          <Fragment>
            <ImageComp file={file} />
          </Fragment>
        );
      case "text":
        return (
          <Fragment>
            <OnlyText
              text={text}
              deviceType={deviceType}
              setRichLink={setRichLink}
              hoote={hoote}
            />
          </Fragment>
        );
      case "audio_text":
        return (
          <Fragment>
            <OnlyAudio file={file} />
            <OnlyText
              text={text}
              bg="black"
              deviceType={deviceType}
              hoote={hoote}
              setRichLink={setRichLink}
            />
          </Fragment>
        );
      case "img_text":
        return (
          <Fragment>
            <ImageComp file={file} />
            <Text text={text} deviceType={deviceType} imgText="true" />
          </Fragment>
        );
      case "video_text":
        return (
          <Fragment>
            <Video file={file} />
            <Text text={text} deviceType={deviceType} />
          </Fragment>
        );
      case "audio_video":
        return (
          <Fragment>
            <AudioWithVideo file={file} />
          </Fragment>
        );
      case "audio_video_text":
        return (
          <Fragment>
            <AudioWithVideo file={file} />
            <Text text={text} deviceType={deviceType} />
          </Fragment>
        );
      case "audio_img":
        return (
          <Fragment>
            <OnlyAudio file={file} />
            <ImageComp file={file} />
          </Fragment>
        );
      case "audio_img_text":
        return (
          <Fragment>
            <OnlyAudio file={file} />
            <ImageComp file={file} />
            <Text text={text} deviceType={deviceType} imgText="true" />
          </Fragment>
        );
      default:
        return <h1>Invalid Input</h1>;
    }
  }
  // console.log("parentRefData", parentRefData)
  const metaTitle = data?.user?.firstname + " on Huut";
  const des = resData?.hoote?.text

  return (
    <div>
       <Head>
        <title>Huut</title>
        <meta property="og:url" content="web.huut.com/" />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="2747726002141483" /> */}
        {/* <meta property="og:title" content={photo?.title} /> */}
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta
          property="og:description"
          content="Your friend invited you to Huut Now"
        />
        {/* <meta property="og:image" content= "https://d2upio5ij5nosv.cloudfront.net/d1bc9da1-5343-4cf8-be65-8f629f4e4bb8/HOOTE_IMG/VIDEO_Thumb_d1bc9da1-5343-4cf8-be65-8f629f4e4bb8_1665986640711_1665986641808.jpeg"/> */}
      </Head>
    {/* <Helmet>
        {/* <title>{metaTitle}</title> */}
        {/* <meta property="og:url" content="https://web.huut.com/preview/preview" key="og-url"/>
        <meta property="og:type" content="social app" key="og-type"/>
        <meta property="fb:app_id" content="2747726002141483" />
        <meta property="og:title" content="testing og title" key="title"/>
        <meta name="twitter:card" content="summary" key="summary"/>
        {/* <meta name="description" content= {resData?.hoote?.text} key="description"/> */}
        {/* <meta
          property="og:description"
          content= {des}
          key="description"
        /> */} 
            <meta property="og:image" content= "https://d2upio5ij5nosv.cloudfront.net/d1bc9da1-5343-4cf8-be65-8f629f4e4bb8/HOOTE_IMG/VIDEO_Thumb_d1bc9da1-5343-4cf8-be65-8f629f4e4bb8_1665986640711_1665986641808.jpeg" key="image"/>
        {/* <meta property="og:image" content={photo?.url} /> */}
        {/* <link rel="canonical" href="/preview" /> */}
        {/* </Helmet> */} 
       
     
      <div className="wrapper">
        <div className="parent-container">
          <div className="child-wrapper">
            <div className="logo">
              <img src="/img/logo.svg" alt="logo" />
            </div>
          <div className="desktop_wrap">
          {/* <div className="video-iframe desktop_frame">
                <iframe src="assets/img/video-img.svg" style={{border:"none", height:"259px",width:"353px", borderRadius:"10px 0px 0px 10px"}} 
                  title="Iframe Example">
                </iframe>
                {/* <!-- progress-bar --> */}
                <div className="progress-section vd-frame-content">
                  <div className="progress-content ">
                    <div className="progress-subcontent vd-progress-subcontent">
                      <img src="/img/video.svg" alt="mic"/>
                      <span className="play-timing">0:46 / 01:24</span>
                    </div>
                    <a href="#" className="stop-playing-btn">
                      <img src="/img/volume-btn.svg" alt=""/>
                    </a>
                  </div>
                </div>
              </div> 
              <div className="main-content">
              {data ? (
                <>
                  {" "}
                  <Profile
                    userImg={data?.user?.avatar}
                    userName={data?.user?.firstname}
                    handleName={data?.user?.handle}
                    huutId={huut}
                    createdTime={data?.hoote?.createdAt}
                    rehuut={rehuut}
                    hootType={hootType}
                    verified={data?.user?.verifiedUser ? "true" : "false"}
                    handleModal={handleModal}
                  />
                  {targetUser && <div className="requested-profile">
                    <div className="profile-img">
                      <img
                        className="requested-img"
                        src={targetUser?.avatar ? targetUser?.avatar : "/img/avatar.png"}
                        alt="profile"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <span>{targetUser?.firstname},</span>
                  </div> }
                  <br />
                  {type && (
                    <FinalComponent
                      type={type}
                      file={file}
                      text={text}
                      deviceType={deviceType}
                    />
                  )}
                  {rehuut && <Rehuut rehuut={rehuut} />}
                  {!richLink && (
                    <SocialSection hoote={hoote} deviceType={deviceType} />
                  )}
                </>
              ) : (
                <>Loading.. </>
              )}
            </div>
            {/* </div> */}
          
          </div>
        
          <ShareModal open={open} handleClose={handleModal} huutId={huut} userName={data?.user?.firstname}/>

          <Footer deviceType={deviceType} />
  
          
        </div>
      </div>
    </div>
  );
}

PreviewDetails.getInitialProps = async (ctx) => {
  const { huut } = ctx.query;
  const finalToken = await getToken();
  const res = await getPreview(huut, finalToken);
  const json = await res.json();
  return { resData: json.data };
};

export default PreviewDetails;
