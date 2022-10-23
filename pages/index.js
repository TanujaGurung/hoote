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
import OnlyText from "../components/OnlyText";
import Text from "../components/Text";
import ImageComp from "../components/ImageComp";
import AudioWithVideo from "../components/AudioWithVideo";
import { useRouter } from "next/router";
import { isAndroid, isIOS } from "react-device-detect";
import { checkTypes } from "../utils/checkTypes";
import Rehuut from "../components/Rehuut";
import ShareModal from "../components/ShareModel";
import { getThumb } from "../utils/getThumb";


const Home=({resData})=> {
  console.log("resData", resData)
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
  const metaTitle = resData?.user?.firstname + " on Huut";
  const des = resData?.hoote?.text
  let metaObjUrl;

  if(resData?.hoote?.files.length > 0){
    let metaObj= getThumb(resData?.hoote?.files)
    metaObjUrl = metaObj.imgurl
  }
  else{
    metaObjUrl = "/img/logo.svg"
  }

  console.log("metaObj", metaObjUrl)


  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:url" content="https://team-place.com/" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="2747726002141483" />
        <meta property="og:title" content={resData?.user?.firstname} />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content={resData?.hoote?.text}
        />
        <meta property="og:image" content={metaObjUrl} />
      </Head>
      {/* <h2>{resData?.user?.firstname}</h2> */}
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
export default Home

export const getServerSideProps = async (ctx) => {
  const { huut } = ctx.query;
  const finalToken = await getToken();
  const res = await getPreview(huut, finalToken);
  const json = await res.json();
  const resData = json.data;
  

  return {
    props: {
      resData,
    },
  };
};