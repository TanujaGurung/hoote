/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Fragment } from "react"
import {calcTime} from "../utils/calcTime"
import {getThumb} from "../utils/getThumb"
import { getTimeString } from "../utils/getTimeString";

const Rehuut=({rehuut})=>{
    const [time, setTime] = useState("1h")
    const [str, setStr] = useState([])
    const [imgContent, setImgContent] = useState()
    function containsHashChars(str) {
      const specialChars = /#/;
      return specialChars.test(str);
    }

    function isEmptyObj(object) {
      for (var key in object) {
          if (object.hasOwnProperty(key)) {
              return false;
          }
      }
  }
    // console.log("rehuut?.user?.createdAt", rehuut?.hoote?.createdAt)
    useEffect(()=>{
      const t = calcTime(rehuut?.hoote?.createdAt);
      if (t.hh > 0) {
        if (t.hh < 24) {
          const temp = Math.floor(t.hh).toString() + "h";
          setTime(temp);
        }
  
        if (t.hh >= 24) {
          const temp = Math.floor(t.hh / 24).toString() + "d";
          setTime(temp);
        }
      } else {
        const temp = t.mm.toString() + "m";
        setTime(temp);
      }
      },[rehuut?.hoote?.createdAt])
      

    //   console.log("rehuut?.hoote?.text", rehuut?.hoote?.text)
    useEffect(()=>{
        if(rehuut?.hoote?.text){
        let seperatedStr= rehuut?.hoote?.text.split(" ")
        setStr(seperatedStr)
        }
      },[rehuut?.hoote?.text])

      useEffect(()=>{
        if(rehuut?.hoote?.files.length>0){
            const temp = getThumb(rehuut?.hoote?.files)
            setImgContent(temp)
           // console.log("temp", temp)
        }

      },[rehuut?.hoote?.files])
      

    return(
      <Fragment>
       <Fragment>
        <div className="main-content gray-border">
        {/* <!--  Bordered profile-section --> */}
        <div className="profile-section">
        <div className="profile-img">
            <img className="actual-img" src={rehuut?.user?.avatar ? rehuut?.user?.avatar : "/img/avatar.png"} alt="profile" />
            <div className="profile-subcontent">
                <p>{rehuut?.user?.firstname}</p>
                <p className="subcontent-child">@{rehuut?.user?.handle} <span> </span> {time}</p>
            </div>
        </div>
        </div>
    <div className="parent-vimg-content">
            {/* <!-- i-frame-section --> */}
          { imgContent ? <div className="video-iframe-minni">
                    <img src={imgContent.imgurl} alt="thumbnail" className="mini-parent-huut"/>
                {/* <!-- progress-bar --> */}
                <div className="progress-section vd-frame-content">
                    <div className="progress-content ">
                        <div className="progress-subcontent vd-progress-subcontent">
                           {imgContent?.duration !== 0 && <span className="play-timing "> {getTimeString(imgContent?.duration)}</span>}
                        </div>

                    </div>
                </div>
            </div> : <></>}
            {/* <!-- text  --> */}
            <div className="content-detail sm-size-content-detail pb-0">
            <p className="pd-0">
         {str ?<> {str.map((item,id)=>{
           
            return (<span  key={id} style={{color:containsHashChars(item) ? "#0079E9":"white"}}> {item} </span>)
          
          })}
          </>:<></>}
            </p>
               
            </div>
        </div>
        </div>
        </Fragment>

</Fragment >
    )
}
export default Rehuut;