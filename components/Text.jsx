import { Fragment, useState, useEffect } from "react"

const Text=({text, deviceType,imgText})=>{
 //text="Lorem ipsum dolor sit amet, #consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. tempor incididunt ut labore et dolore.."
  const [str, setStr] = useState([])
  // console.log("imgText", imgText)
  const[redirectUrl, setRedirectUrl] = useState("");


  const handleReadmore=()=>{
    if(deviceType === "apple"){
      const url = "https://apps.apple.com/in/app/huut/id1566096141"
      setRedirectUrl(url)
    }
    else {
    const url1 = "https://play.google.com/store/apps/details?id=com.amtex.hoote";
    setRedirectUrl(url1)
    }
  }

  function containsHashChars(str) {
    const specialChars = /#/;
    return specialChars.test(str);
  }

  useEffect(()=>{
    let seperatedStr= text.split(" ")
    setStr[seperatedStr]
  },[text])

  var words = text.split(" ");
  
  //console.log("words", words)
    return(<Fragment>
          {/* <!-- text  --> */}
          {/* actual calss- content-detail */}
        <div className="content-detail-rehutt">
        <p className="left-align">
          
          {words.map((item,id)=>{
           
            return (<span key={id} style={{color:containsHashChars(item) ? "#0079E9":"white"}}> {id <= 10 ? item.substring(0,20) : "" }</span>)
          
          })}
         <a href={redirectUrl} ><span style={{color:"#0079E9"}} onClick={handleReadmore}> {words.length > 10 ? "..read more": ""} </span></a>
            </p>
          
        </div>
    </Fragment>)
}
export default Text;